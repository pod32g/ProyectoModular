$(document).ready(function(){
	ko.applyBindings(cursoViewModel);
	$("#main-contact-form").submit(doPost);
});

var cursoViewModel = {
	usr_id : ko.observable(),
	pass : ko.observable(),
	nombre : ko.observable(),
	inicio : ko.observable(),
	fin : ko.observable()
};

function doPost(){
	var curso = {
		"usr_id" : cursoViewModel.usr_id(),
		"pass" : cursoViewModel.pass(),
		"nombre" : cursoViewModel.nombre(),
		"inicio" : cursoViewModel.inicio(),
		"fin" : cursoViewModel.fin()
	}
	var cursoJson = JSON.stringify(curso);
	$.ajax({
		url : "http://localhost:8000/cursos/new/",
		contentType : "application/json",
		data : cursoJson,
		method : "post",
		success : function(response){	
		}
	});
	return false;
}

