var HomeworkViewModel = {

	/**
	 * Function to create new homework in server
	 */
	createHomework: function(data, token, callback) {
        var homeworkJson = JSON.stringify(data);
        var request = new Request("http://localhost:8000/", token);
        request.post("homework/new/", homeworkJson, callback);
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
    }
};
