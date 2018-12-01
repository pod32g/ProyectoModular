import json 

def get_questions():
	with open('preguntas.json') as file:
		return json.loads(file.read())