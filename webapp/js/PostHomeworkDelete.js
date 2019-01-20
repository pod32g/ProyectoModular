$(document).ready(function(){
	$.getJSON("http://localhost:8000/tareas/get/<int:usr_id>/<int:course_id>/", function(homeworkJson){
		var homework = JSON.parse(homeworkJson);
		homeworkViewModel.usr_id(homework.usr_id);
		homeworkViewModel.course_id(homework.course_id);
		homeworkViewModel.descripcion(homework.descripcion);
		homeworkViewModel.limite(homework.limite);
		homeworkViewModel.tipo(homework.tipo);
	});
	ko.applyBindings(homeworkViewModel);
	$("#main-contact-form").submit(doPost);
});

var homeworkViewModel = {
	home_id : ko.observable(),
	usr_id : ko.observable(),
	course_id : ko.observable(),
	descripcion : ko.observable(),
	limite : ko.observable(),
	tipo : ko.observable()
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

