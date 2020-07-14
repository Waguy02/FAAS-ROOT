from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from annuaire_services.models import Service

User = get_user_model()
class ServiceAPITestCase(APITestCase):
    def setUp(self):
        user = User.objects.create_user(username = 'testc', email = 'test@gmail.com')
        user.set_password('someRP')
        user.save()
        
        service = Service(app_id = "kjd", 
                        description = " df",
                        nom_service = "nomS",
                        route_entree = "sfhsjd", 
                        icone = "cdjk")
    
    def test_single_user(self):
        user_count = User.objects.count()
        self.assertEqual(user_count, 1)

    def test_single_post(self):
        post_count = Service.objects.count()
        self.assertEqual(post_count, 1)
    