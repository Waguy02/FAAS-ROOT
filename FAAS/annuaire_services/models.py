from django.db import models
from django.conf import settings
# Create your models here.
from datetime import datetime
from django.db import models
from django.utils import dates
from django.urls import reverse
from django.contrib.auth.models import User
from rest_framework.reverse import reverse as api_reverse
# Create your models here.


class Service(models.Model):
    app_id = models.CharField(max_length=100, unique=True, verbose_name='ID du service')
    nom_service = models.CharField(max_length=100, db_index=True)
    description = models.TextField(blank=True, help_text=" Svp entrez une description de votre service")
    route_entree = models.TextField(help_text="Entrez l'URL menant au service")
    ajoute_par = models.ForeignKey(User, on_delete = models.CASCADE)
    icone = models.CharField(max_length=20, blank=True)
    date_ajout = models.DateTimeField(auto_now=True)
    etat_supression = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'service'

    def __str__(self):
        return self.app_id

    def get_api_url(self, request = None):
        return api_reverse("post-ru", kwargs = {'app_id':self.app_id}, request = request)

class SouscriptionServiceUser(models.Model):
    user =  models.ForeignKey(User, on_delete = models.CASCADE)
    service = models.ForeignKey(Service, on_delete = models.CASCADE)
    def get_api_url(self, request = None):
        return api_reverse("souscription-rud", kwargs = {'id':self.pk}, request = request)