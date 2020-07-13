# Aaas
Projet Django creation d'un annuaire


#Routes utilisees dans l'API
route provisoire de l'API : /api/services

- /newApi/services/ pour la liste des services.  disponible en ['GET', 'POST']
- /newApi/service/ pour poster un service . ['POST']
- /newApi/<int:id>/ pour avoir access a un service ayant pour id "id". ['GET', 'PUT', 'DELETE']

# Dependance
    Version python
        + python 3
##Dependance Django
###Django 3
    + pip install Django===3.0.7
###Django Rest
    + pip install djangorestframework
    + pip install django-cors-headers
###Dependance supplementaire

    + pip install markdown
    + pip install django-filter

###### Lien de la doc
    [lien pour la doc] : https://www.django-rest-framework.org/#installation
    
##Dependance BD
    + langage SQL

    + SGBD : postgresql
    
###### connecteur Django postgre a installer
+ pg12
    