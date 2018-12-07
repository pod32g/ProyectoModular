function CuestionarioViewModel(){
	var self = this;
	self.preguntas = ko.observableArray();
	self.tipo = ko.observable();
	self.codigo = ko.observable();
}

var cuestionarioViewModel = new CuestionarioViewModel();
$(document).ready(function(){
	$.getJSON(preguntas_url, function(cuestionarioJSON){
		cuestionarioViewModel.preguntas(cuestionarioJSON.visual);
		ko.utils.arrayPushAll(cuestionarioViewModel.preguntas, cuestionarioJSON.auditivo);
		ko.utils.arrayPushAll(cuestionarioViewModel.preguntas, cuestionarioJSON.kinestesico);

	});
	ko.applyBindings(cuestionarioViewModel);
});

function sendAnswers(){
		var respuestasJSON = {
			visual : [],
			auditivo : [],
			kinestesico : [],
		};
		var respuestas = $("input:checked");
		for (var i = 0; i < respuestas.length; i++) {
			if(i < 8){
				respuestasJSON.visual.push(respuestas[i].value);
			}else if(i >= 8 && i < 15){
				respuestasJSON.auditivo.push(respuestas[i].value);
			}else if(i >= 15){
				respuestasJSON.kinestesico.push(respuestas[i].value);
			}
		}
		$.post(calificar_url, JSON.stringify(respuestasJSON), function(data){
			cuestionarioViewModel.tipo(data);
		});
	}