$(document).ready(function(){
	$.getJSON("http://localhost:8000/calificaciones/update/", function(calificacionesJson){
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
	var calificaciones = {
		"usr_id" : calificacionesViewModel.usr_id(),
		"course_id" : calificacionesViewModel.course_id(),
		"prof_id" : calificacionesViewModel.prof_id(),
		"home_id" : calificacionesViewModel.home_id(),
		"note" : calificacionesViewModel.note()
	}
	var calificacionesJson = JSON.stringify(calificaciones);
	$.ajax({
		url : "http://localhost:8000/update/",
		contentType : "application/json",
		data : calificacionesJson,
		method : "post",
		success : function(response){	
		}
	});
	return false;
}

