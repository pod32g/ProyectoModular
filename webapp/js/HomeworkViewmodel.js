var HomeworkViewModel = {
	descripcion : ko.observable(),
	limite : ko.observable(),
	tipo : ko.observable(),

	/**
	 * Function to create new homework in server
	 */
	createHomework: function(usr_id, course_id) {
	    var homework = {
            "usr_id" : usr_id,
            "course_id" : course_id,
            "descripcion" : descripcion(),
            "limite" : limite(),
            "tipo" : tipo()
        }
        var homeworkJson = JSON.stringify(homework);
        $.ajax({
            url : "http://localhost:8000/tareas/new",
            contentType : "application/json",
            data : homeworkJson,
            method : "post",
            success : function(response){
            }
        });
        return false;
	},
	/**
	 * Function to update an existing homework
	 */
	updateHomework: function(usr_id, course_id) {
        var homework = {
            "usr_id" : usr_id,
            "course_id" : course_id,
            "descripcion" : descripcion(),
            "limite" : limite(),
            "tipo" : tipo()
        }
        var homeworkJson = JSON.stringify(homework);
        $.ajax({
            url : "http://localhost:8000/tareas/update",
            contentType : "application/json",
            data : homeworkJson,
            method : "post",
            success : function(response){
            }
        });
        return false;
	},
	/**
	 *Function to obtain all registered homework
	 */
	getHomework: function(usr_id, course_id) {
		var homeworks = [];
    	$.ajax({
    	    url : "http://localhost:8000/tareas/get",
            contentType : "application/json",
            data : homeworkJson,
            method : "get",
            success : function(homeworkJson) {
                var homeworksJson = JSON.parse(homeworkJson);
                homeworks = homeworkJson;
                /*
                TODO: check if this is necessary
                for(var i = 0; i < homeworksJson.length; i++){
                    var homework = {};
                    //revisar después nombres de datos de deibid
                    //homework["usr_id"] = usr_id;
                    //homework["course_id"] = homeworksJson[i].course_id;
                    homework["descripcion"] = homeworksJson[i].descripcion;
                    homework["limite"] = homeworksJson[i].limite;
                    homework["tipo"] = homeworksJson[i].tipo;
                    homeworks.push(homework);
                }*/

            }
    	});
    	return homeworks;
    }


};

