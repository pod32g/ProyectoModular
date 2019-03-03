var CourseViewModel = {
    //Properties
    name : ko.observable(),
    start : ko.observable(),
    description : ko.observable(),
    end : ko.observable(),
    pass : ko.observable(),
    courses : ko.observableArray(),

    //methods

    /**
     *
     */


    getCourses: function(token, callback) {
       var request = new Request("http://localhost:8000/", token);
       request.get("courses/get", [], callback);
    },

    createCourse: function(data, token, callback) {
        var courseJson = JSON.stringify(data);
        var request = new Request("http://localhost:8000/", token);
        request.post("courses/new/", courseJson, callback);
    },

    updateCourse: function(data, token, callback){
        var courseJson = JSON.stringify(data);
        var request = new Request("http://localhost:8000/", token);
        request.post("courses/update/", courseJson, callback);
    },

    deleteCourse: function(idCourse, token, callback){
        var request = new Request("http://localhost:8000/", token);
        request.get("courses/delete", [idCourse], callback);
    }


};