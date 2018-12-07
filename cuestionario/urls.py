from django.urls import path
from . import views

urlpatterns = [
    path('', views.cuestionario , name = "cuestionario"),
    path('json/', views.questions_endpoint, name = "questions_fake_endpoint"),
    path('calificar/', views.calificar, name = "calificar_fake_endpoint")
]