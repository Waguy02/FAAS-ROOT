from rest_framework import permissions
from annuaire_services.models import SouscriptionServiceUser


class CanModify(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.ajoute_par == request.user 

class CanUseService(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        souscription = SouscriptionServiceUser.objects.filter(user = request.user).count() != 0 or obj.ajoute_par == request.user
        return souscription