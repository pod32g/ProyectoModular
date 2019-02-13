$(document).ready(function(){
    ko.applyBindings(coursesTeacherViewModel);
    coursesTeacherViewModel.init();
});

var coursesTeacherViewModel = {
    active : "Courses",
    menu : ko.observableArray([]),
    courses : ko.observableArray(),
    courseViewModel : CourseViewModel,

    init: function() {
            var self = this;
            var session = parseSession(Cookies.getJSON("session"));
            if(session.isSessionActive()) {
                self.menu(session.getSessionMenu());
                self.populateCoursesTable();
            } else {
                //redirect or whatever should happen if no session exists
            }
        },
    populateCoursesTable: function(){
        var self = this;
        var session = parseSession(Cookies.getJSON("session"));
        self.courseViewModel.getCourses(session.getUserID()).done(function(data){
            self.courses(data);
        });
    }
};