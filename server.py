import json, random
from flask import Flask, request

app = Flask(__name__)

app.config.update(dict(
	SECRET_KEY="2IiEM37P1QRKfKPJVvja"
	))

visual = [
	"Me ayuda trazar o escribir a mano las palabras cuando tengo que aprenderlas de memoria",
	"Necesito copiar los ejemplos de la pizarra del maestro para examinarlos mas tarde",
	"Prefiero las clases que requiren una prueba sobre lo que se lee en el libro de texto", 
	"Prefiero las instrucciones escritas sobre las orales",
	"Me ayuda ver diapositivas y videos para comprender un tema",
	"Recuerdo mas cuando leo un libro que cuando escucho una conferencia",
	"Por lo general, tengo que escribir los numeros del telefono para recordarlos bien",
	"Prefiero las instrucciones orales del maestro a aquellas escritas en un examen o en la pizarra"
]

auditivo = [
	"Recuerdo mejor un tema al escuchar una conferencia en vez de leer un libro de texto",
	"Al prestar atención a una conferencia, puedo recordar las ideas principales sin anotarlas",
	"Prefiero recibir las noticias escuchando la radio en vez de leerlas en un periodico", 
	"Cuando escribo algo, necesito leerlo en voz alta para oir como suena",
	"Me gusta escuchar musica al estudiar una obra, novela, etc.",
	"Prefiero las instrucciones orales del maestro a aquellas escritas en un examen o en la pizarra", 
	"Puedo recordar los numeros de telefono cuando los oigo"                      
]

kinestesico = [
	"Me gusta tener algo como un boligrafo o un lapiz en la mano cuando estudio",
	"Me gusta comer bocados y mascar chicle, cuando estudio",
	"Yo resuelvo bien los rompecabezas y los laberintos",
	"Prefiero las clases que requieran una prueba sobre lo que se representa durante una conferencia",
	"Puedo corregir mi tarea examninandola y encontrando la mayoria de los errores",
	"Gozo el trabajo que me exige usar la mano o herramientas",
	"Puedo recordar mejor las cosas cuando puedo moverme mientras estoy aprendiendolas por ejemplo: caminar al estudiaro participar en una actividad que me permita moverme, etc."                
]

#x.pop(random.randrange(len(x)))


@app.route('/cuestionario/inicio')
def get_first_questions():
	questions = dict()

	questions['visual'] = []
	questions['auditivo'] = []
	questions['kinestesico'] = []

	for x in range(0, 3):
		questions['visual'].append(visual.pop(random.randrange(len(visual))))
		questions['auditivo'].append(auditivo.pop(random.randrange(len(auditivo))))
		questions['kinestesico'].append(kinestesico.pop(random.randrange(len(kinestesico))))

	return json.dumps(questions, ensure_ascii=False)

if __name__ == '__main__':
	app.run(debug=True)