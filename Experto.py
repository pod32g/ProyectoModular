import json
from flask import Flask, request

app = Flask(__name__)

app.config.update(dict(
    SECRET_KEY='2IiEM37P1QRKfKPJVvja'
))

def suma_puntajes(respuestas):
    modeloAprendizaje = [
                        #Visual
                    (respuestas['respuestas'][0]+respuestas['respuestas'][2]+
                    respuestas['respuestas'][5]+respuestas['respuestas'][8]+
                    respuestas['respuestas'][9]+respuestas['respuestas'][10]+
                    respuestas['respuestas'][13]),   
                        #Auditivo
                    (respuestas['respuestas'][1]+respuestas['respuestas'][4]+
                    respuestas['respuestas'][11]+respuestas['respuestas'][14]+
                    respuestas['respuestas'][17]+respuestas['respuestas'][20]+
                    respuestas['respuestas'][22]), 
                        #Kinestésico
                    (respuestas['respuestas'][3]+respuestas['respuestas'][6]+
                    respuestas['respuestas'][7]+respuestas['respuestas'][12]+
                    respuestas['respuestas'][18]+respuestas['respuestas'][21]+
                    respuestas['respuestas'][23])
    ]
    
    return calificar_respuestas(modeloAprendizaje)

def calificar_respuestas(modeloAprendizaje):
    if modeloAprendizaje.index(max(modeloAprendizaje)) == 0:
        return "V"
    elif modeloAprendizaje.index(max(modeloAprendizaje)) == 1:
        return "A"
    elif modeloAprendizaje.index(max(modeloAprendizaje)) == 2:
        return "K"  

@app.route('/cuestionario/respuestas', methods=['POST'])
def recibe_respuestas():
    if not request.method == 'POST':
        return "Eh we, la cagaste :v"

    respuestas = json.loads(request.get_json(force=True))
    return suma_puntajes(respuestas)



if __name__ == '__main__':
    app.run(debug=True)