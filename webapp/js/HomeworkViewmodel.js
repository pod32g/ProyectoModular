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
	updateHomework: function(hw, token, callback) {
        var data = JSON.parse(JSON.stringify(hw));
        delete data.responses;
        delete data.calificar;
        var homeworkJson = JSON.stringify(data);
        var formData = new FormData();
        formData.append("file", hw.file());
        formData.append("request", homeworkJson);
	    var request = new Request("http://localhost:8000/", token);
	    request.post("homework/update/", formData, callback, false, false);
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
    },

    updateStudentHomework: function(id, answer, sent, file, token, callback){
        var json = {
            "id": id,
            "answer": answer,
            "sent": sent
        }
        var homeworkJson = JSON.stringify(json);
        var formData = new FormData();
        formData.append("file", file);
        formData.append("request", homeworkJson);
        var request = new Request("http://localhost:8000/", token);
        request.post("homework/response/update/",formData, callback, false, false);
    },

    getResponsesHomework: function(id, token, callback){
        var request = new Request("http://localhost:8000/", token);
        request.get("homework/response/get", [id], callback);
    },

    sendGrades: function(data, token, callback){
        gradesObj = new Object;
        gradesObj.grades = data;
        var gradesJson = JSON.stringify(gradesObj);
        var request = new Request("http://localhost:8000/", token);
        request.post("homework/response/grade/", gradesJson, callback);
    }
};
