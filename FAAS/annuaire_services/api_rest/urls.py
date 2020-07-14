"""from annuaire_services.api_rest.views import  ServiceViewSet

from rest_framework.routers import  DefaultRouter

router = DefaultRouter()
router.register(r'services', ServiceViewSet, base_name='services')
urlpatterns = router.urls"""
from django.urls import path

from .views import *

urlpatterns = [
    path('services/', ServiceListAPIView.as_view(), name='services_list'),
    path('service/create/', ServiceCreateAPIView.as_view(), name='post-create'),
    path('services/<str:app_id>', ServiceRUView.as_view(), name='post-ru'),
    path('souscription/', SouscriptionView.as_view(), name='souscription'),
    path('souscriptions/', SouscriptionListView.as_view(), name='souscription-list'),
    path('souscription/<int:id>', SouscriptionRudView.as_view(), name='souscription-rud'),
    path('service/access/', redirect_view, name='redirect_view' ),
    path('user/', CheckUserView.as_view(), name='get-user'),
]