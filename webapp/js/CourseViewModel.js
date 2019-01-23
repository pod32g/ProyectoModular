var CourseViewModel = {
    //Properties
    course_id : ko.observable(),
    name: ko.observable(),
    start: ko.observable(),
    end: ko.observable(),

    //methods

    /**
     *
     */
    getCourses: function() {
       return $.ajax({
            url : "http://localhost:8000/courses/get",
            contentType : "application/json",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            method : "get",

       });
    }
};