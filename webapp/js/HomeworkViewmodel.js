var HomeworkViewModel = {

	/**
	 * Function to create new homework in server
	 */
	createHomework: function(data, token, callback, file) {
        var homeworkJson = JSON.stringify(data);
        var formData = new FormData();
        formData.append("file", file);
        formData.append("request", homeworkJson);
        var request = new Request("http://localhost:8000/", token);
        request.post("homework/new/", formData, callback, false, false);
	},
	/**
	 * Function to update an existing homework
	 */
	updateHomework: function(data, token, callback) {
	    var homeworkJson = JSON.stringify(data);
	    var request = new Request("http://localhost:8000/", token);
	    request.post("homework/update/", homeworkJson, callback);
	},
	/**
	 *Function to obtain all registered homework
	 */
	getHomework: function(course_id, token, callback) {
	    var request = new Request("http://localhost:8000/", token);
	    request.get("homework/get", [course_id], callback);
    },

    deleteHomework: function(hw_id, token, callback){
        var request = new Request("http://localhost:8000/", token);
        request.get("homework/delete",[hw_id], callback);
    },

    sendHomework: function(id, answer, sent, token, file, callback){
        if(file == null){
            console.log("El archivo esta empty");
            return;
        }
        var json = {
            "homework": id,
            "answer": answer,
            "sent": sent
        }
        var homeworkJson = JSON.stringify(json);
        var formData = new FormData();
        formData.append("file", file);
        formData.append("request", homeworkJson);
        var request = new Request("http://localhost:8000/", token);
        request.post("homework/response/new/",formData, callback, false, false);
    }
};
