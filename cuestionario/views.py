from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden

from lib.extras import get_questions

# Create your views here.

@login_required
def show_questions(request):
	if not request.method == "GET":
		return HttpResponseForbidden()


