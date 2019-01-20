$(document).ready(function(){
	$.getJSON("http://localhost:8000/calificaciones/<int:usr_id>/<int:course_id>/", function(calificacionesJson){
		var calificaciones = JSON.parse(calificacionesJson);
		calificacionesViewModel.usr_id(calificaciones.usr_id);
		calificacionesViewModel.course_id(calificaciones.course_id);
		calificacionesViewModel.home_id(calificaciones.home_id);
		calificacionesViewModel.note(calificaciones.note);
	});
	ko.applyBindings(homeworkViewModel);
	$("#main-contact-form").submit(doPost);
});

var calificacionesViewModel = {
	prof_id : ko.observable(),
	home_id : ko.observable(),
	usr_id : ko.observable(),
	course_id : ko.observable(),
	note : ko.observable()
};

function doPost(){
	var homework = {
		"usr_id" : homeworkViewModel.usr_id(),
		"course_id" : homeworkViewModel.course_id(),
		"descripcion" : homeworkViewModel.descripcion(),
		"limite" : homeworkViewModel.limite(),
		"tipo" : homeworkViewModel.tipo()
	}
	var homeworkJson = JSON.stringify(homework);
	$.ajax({
		url : "http://localhost:8000/tareas/new/",
		contentType : "application/json",
		data : homeworkJson,
		method : "post",
		success : function(response){	
		}
	});
	return false;
}

