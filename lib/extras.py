import json 
from random import shuffle
from lib.preguntas import get_questions

from authentication.models import Profile
from cuestionario.models import Cuestionario

TYPE = {
	0 : "kinestesico",
	1 : "auditivo", 
	2 : "visual"
}


def shuffle_questions():
	questions = get_questions()

	for kind in questions.values():
		shuffle(kind)

	return questions

def get_profile_instance(user_id):
	
	user = None

	try:
		user = Profile.objects.get(user = user_id)

	except Profile.DoesNotExist as e:
		print(e)
		return None

	return user

def grade_answers(answers):

	if len(answers['kinestesico']) == 0:
		return None

	sums = [sum([int(x) for x in answers['kinestesico']]), sum([int(x) for x in answers['auditivo']]),\
				 sum([int(x) for x in answers['visual']])]

	return sums.index(max(sums)) 

def save_grades(kind, user_id):

	user = Profile.objects.get(user = user_id)

	Cuestionario.objects.create(
			profile = user,
			results = kind
		)