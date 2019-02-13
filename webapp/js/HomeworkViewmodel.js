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
            url : "http://localhost:8000/tareas/new/",
            contentType : "application/json",
            data : homeworkJson,
            method : "post",
            success : function(response){
            }
        });
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
            url : "http://localhost:8000/tareas/update/",
            contentType : "application/json",
            data : homeworkJson,
            method : "post",
            success : function(response){
            }
        });
	},
	/**
	 *Function to obtain all registered homework
	 */
	getHomework: function(usr_id, course_id) {
		return 	$.ajax({
    	    url : "http://localhost:8000/tareas/get/" + usr_id + "/" + course_id + "/",
            contentType : "application/json",
            method : "get"
    	});
    }


};

