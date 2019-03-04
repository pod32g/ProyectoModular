var CourseViewModel = {
    //Properties
    course_id : ko.observable(),
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


    getCourses: function(usr_id) {
       var path = "http://localhost:8000/courses/get/";
       if(usr_id != null){
            path += usr_id + "/";
       }
       return $.ajax({
            url : path,
            contentType : "application/json",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method : "get",

       });
    },

    createCourse: function(data) {
        var courseJson = JSON.stringify(data);
        $.ajax({
            url : "http://localhost:8000/cursos/new/",
            contentType : "application/json",
            data : courseJson,
            method : "post",
            success : function(response){
            }
        });
    },

    updateCourse: function(data){
        var courseJson = JSON.stringify(data);
        $.ajax({
            url : "http://localhost:8000/cursos/update/",
            contentType : "application/json",
            data : courseJson,
            method : "post",
            success : function(response){
            }
        });
    }


};