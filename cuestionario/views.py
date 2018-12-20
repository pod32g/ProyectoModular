from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden, HttpResponse
from django.views.decorators.csrf import csrf_exempt

from cuestionario.models import Cuestionario

from lib.extras import shuffle_questions, get_profile_instance, grade_answers, save_grades, TYPE

import json


# Create your views here.

@login_required
def cuestionario(request):
	if not request.method == "GET":
		return HttpResponseForbidden()

	kind = None

	try:
		kind = Cuestionario.objects.get(profile = get_profile_instance(request.session['_auth_user_id']))
	except Cuestionario.DoesNotExist as e:
		print(e)
		return render(request, 'cuestionario/cuest.html')

	return render(request, 'cuestionario/gracias.html', {'tipo' : TYPE[kind.results]})


@login_required
def questions_endpoint(request):
	return HttpResponse(json.dumps(shuffle_questions()))

@csrf_exempt
def calificar(request):
	if not request.method == "POST":
		return HttpResponseForbidden()

	ans = json.loads(request.body)

	print(request.body)

	kind = grade_answers(ans)

	if kind == None:
		print("KIND IS NONE I REPEAT KIND IS NONE")
		return render(request, 'cuestionario/cuest.html', {'error' : True})
 
	save_grades(kind, request.session['_auth_user_id'])



	return redirect('/cuestionario')








