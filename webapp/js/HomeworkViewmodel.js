var HomeworkViewModel = {
	descripcion : ko.observable(),
	limite : ko.observable(),
	tipo : ko.observable(),

	/**
	 * Function to create new homework in server
	 */
	createHomework: function(data) {
        var homeworkJson = JSON.stringify(data);
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
	updateHomework: function(data,usr_id, course_id) {
        var homeworkJson = JSON.stringify(data);
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
