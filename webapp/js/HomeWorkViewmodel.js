var homeworkViewModel = {
	usr_id : ko.observable(),
	course_id : ko.observable(),
	descripcion : ko.observable(),
	limite : ko.observable(),
	tipo : ko.observable(),
	homeworks : ko.observableArray()
};

function createHomework(){
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

function updateHomework(){
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

function getHomework(usr_id, course_id){
	var homeworks = [];
	$.getJSON("http://localhost:8000/tareas/get/"+usr_id+"/"+course_id+"/", function(homeworkJson){
		var homeworksJson = JSON.parse(homeworkJson);
		for(var i = 0; i < homeworksJson.length; i++){
			var homework = {};
			//revisar después nombres de datos de deibid
			homework["usr_id"] = homeworksJson[i].usr_id;
			homework["course_id"] = homeworksJson[i].course_id;
			homework["descripcion"] = homeworksJson[i].descripcion;
			homework["limite"] = homeworksJson[i].limite;
			homework["tipo"] = homeworksJson[i].tipo;
			homeworks.push(homework);
		}
	}
	return homeworks;
}

