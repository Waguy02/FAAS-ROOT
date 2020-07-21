
from annuaire_services.models import Service
from .serializers import *
from rest_framework import generics, mixins , response, status
from .permissions import  CanModify, CanUseService
from django.shortcuts import redirect
from rest_framework.reverse import reverse 
from rest_framework.authtoken.models import Token
from django.views import View
from django.http import HttpResponse

"""from rest_framework import viewsets


class ServiceViewSet(viewsets.ModelViewSet):
    lookup_field = 'app_id'
    serializer_class = ServiceSerializer
    queryset = Service.objects.all()
    def get_serializer_context(self, *args, **kwargs):
        return {"request":self.request}
    """

class ServiceCreateAPIView(generics.CreateAPIView):
    serializer_class = ServiceCreateSerializer
    queryset = Service.objects.all()

    def perform_create(self, serializer):
        serializer.save(ajoute_par = self.request.user)
        
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ServiceListAPIView(generics.ListAPIView):
    lookup_field = 'app_id'
    serializer_class = ServiceSerializer
    def get_queryset(self):
        qs = Service.objects.all()
        query = self.request.GET.get("q")
        if query is not None:
            qs = qs.filter(nom_service__icontains = query)
        return qs

    def get(self , request , *args , **kwargs):
        query = self.get_queryset()
        data = self.serializer_class(query , many=True).data
        souscriptions = SouscriptionServiceUser.objects.filter(user = self.request.user)
        token = Token.objects.get(user=request.user)
        for item in data:
            for souscription in souscriptions:
                if item['pk'] == souscription.service.pk:
                    item['id_souscr'] = souscription.pk
                    break
            if 'id_souscr' not in item.keys():
                item['id_souscr'] = -1
            item['route_entree'] += "?token={}".format(token.key)
            item.pop('url')
            """new_url = reverse('redirect_view', request = self.request)
            item['route_entree'] = new_url + '?to='+ item['route_entree']"""
        
        return response.Response(data , status=status.HTTP_200_OK)

    def get_serializer_context(self, *args, **kwargs):
        return {"request":self.request}
        
    

class ServiceRUView(generics.RetrieveUpdateAPIView):
    lookup_field = 'app_id'
    serializer_class = ServiceSerializer
    permission_classes = [CanModify, CanUseService]

    def get_queryset(self):
        return Service.objects.all()

    def get(self, request , *args , **kwargs):
        query = self.get_object()
        data = self.serializer_class(query , many=False).data   
        token = Token.objects.get(user=request.user)
        data['route_entree'] += "?token={}".format(token.key)
        #new_url = reverse('redirect_view', request = self.request)
        #data['route_entree'] = new_url + '?to='+ data['route_entree']
        return response.Response(data , status=status.HTTP_200_OK)

    def get_serializer_context(self, *args, **kwargs):
        return {"request": self.request}

class SouscriptionView(generics.CreateAPIView):
    lookup_field = 'id'
    serializer_class = SouscriptionCreateSerializer

    def perform_create(self, serializer):
        service = Service.objects.get(id=self.request.data['service'])
        serializer.save(user = self.request.user, service = service)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class SouscriptionListView(generics.ListAPIView):
    lookup_field = 'id'
    serializer_class = SouscriptionSerializer

    def get_queryset(self):
        user = self.request.user
        return SouscriptionServiceUser.objects.filter(user = user)

    def get_serializer_context(self, *args, **kwargs):
        return {"request":self.request}

class SouscriptionRudView(generics.RetrieveUpdateDestroyAPIView):
    lookup_field = 'id'
    serializer_class = SouscriptionSerializer
    permission_classes = [CanUseService]

    def get_queryset(self):
        user = self.request.user
        return SouscriptionServiceUser.objects.filter(user = user)

    def get_serializer_context(self, *args, **kwargs):
        return {"request":self.request}


def redirect_view(request):
    params = request.GET.copy()
    to = params.pop('to', None)
    url_redirect = to[0]
    token = Token.objects.get(user=request.user)
    url_redirect += '?token={}'.format(token.key)

    #params['token'] = request.user.id
    return redirect(to=url_redirect, permanent=True)

class CheckUserView(View):
    http_method_names = ['get']
    def get(self , request , *args , **kwargs):
        key_token = self.request.GET['token']
        try:
            user = Token.objects.get(key = key_token).user
            if user.is_authenticated:
                return HttpResponse(status=status.HTTP_200_OK)
        except Token.DoesNotExist:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)
        return HttpResponse(status=status.HTTP_401_UNAUTHORIZED)
    
    def get_queryset(self):
        return User.objects.all()