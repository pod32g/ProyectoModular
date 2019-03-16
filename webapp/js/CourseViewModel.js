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

    getAllCourses: function(token, callback){
        var request = new Request("http://localhost:8000/", token);
        request.get("courses/get/all", [], callback);
    },

    createCourse: function(course, token, callback) {
        var data = JSON.parse(JSON.stringify(course));
        if(!course.password()){
            data.password_str = null;
        }
        data.password = data.password_str;
        delete data.password_str;
        var courseJson = JSON.stringify(data);
        var request = new Request("http://localhost:8000/", token);
        request.post("courses/new/", courseJson, callback);
    },

    updateCourse: function(course, token, callback){
    var data = JSON.parse(JSON.stringify(course));
        if(!course.password()){
            data.password_str = null;
        }
        data.password = data.password_str;
        delete data.password_str;
        var courseJson = JSON.stringify(data);
        var request = new Request("http://localhost:8000/", token);
        request.post("courses/update/", courseJson, callback);
    },

    deleteCourse: function(idCourse, token, callback){
        var request = new Request("http://localhost:8000/", token);
        request.get("courses/delete", [idCourse], callback);
    },

    enrollCourse: function(data, token, callback){
        var courseJson = JSON.stringify(data);
        var request = new Request("http://localhost:8000/", token);
        request.post("courses/enroll/", courseJson, callback);
    }


};