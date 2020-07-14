import re
import logging
from django.conf import settings
from django.http.response import JsonResponse
from django.utils.deprecation import MiddlewareMixin
from rest_framework import response, status
from rest_framework.exceptions import AuthenticationFailed, NotAuthenticated
import json
import datetime
import base64
import requests
from django.http import HttpResponse, HttpResponseRedirect


class AuthorizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.
        

        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        if request.META['QUERY_STRING'] != '':
            token = request.META['QUERY_STRING'].split('=')[1]
            status = requests.get('http://127.0.0.1:8000/api_rest/user/?token={}'.format(token)).status_code
            
            if status == 404: 
                return HttpResponse(content = "Il se pourrait que vous ne soyez pas un utilisateur enregistré", status = 404)
            elif status == 401:
                return HttpResponse(content = "Vous n'êtes pas authentifié", status = 404)
        else:
            return HttpResponse(content = "Il se pourrait que vous ne soyez pas un utilisateur enregistré", status = 404)
        return None