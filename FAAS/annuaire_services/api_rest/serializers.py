from rest_framework import serializers

from annuaire_services.models import *


class ServiceSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = Service
        fields = [
            'app_id',
            'description',
            'url',
            'date_ajout',
            'route_entree',
            'nom_service',
            'etat_supression'
        ]
        # exclude = ['app_id']
        read_only_fields = ['date_ajout']

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request)


class ServiceCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        exclude = ['ajoute_par']

class SouscriptionSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only = True)
    service = serializers.SerializerMethodField()
    user = serializers.SerializerMethodField(read_only = True)

    class Meta:
        model = SouscriptionServiceUser
        fields = ['user', 'service', 'url']
        read_only_fields = ['user']

    def get_url(self, obj):
        request = self.context.get("request")
        return obj.get_api_url(request)

    def get_service(self, obj):
        return obj.service.app_id
    
    def get_user(self, obj):
        return obj.user.username

class SouscriptionCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = SouscriptionServiceUser
        fields = '__all__'
        read_only_fields = ['user']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']