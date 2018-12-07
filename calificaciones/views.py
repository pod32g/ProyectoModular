from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def calificaciones(request):
	return HttpResponse("calificaciones")
