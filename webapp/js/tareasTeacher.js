$(document).ready(function() {
    //createTestSession();
    ko.applyBindings(tareasTeacherViewModel);
    $("#course").change(function() {
       tareasTeacherViewModel.populateHomeworkTable($(this).val());
    });
    tareasTeacherViewModel.init();
});

var tareasTeacherViewModel = {
    active: "Tareas",
    menu: ko.observableArray([]),
    homework: ko.observableArray(),
    homeworkViewModel: HomeworkViewModel,
    courseViewModel: CourseViewModel,
    courses: ko.observableArray(),

    /**
     *   function to initialize page data
     */
    init: function() {
        var self = this;
        var session = parseSession(Cookies.getJSON("session"));
        if(session.isSessionActive()) {
            self.menu(session.getSessionMenu());
            self.courseViewModel.getCourses().done(function(data) {
                console.log(data);
                self.courses(data);
            });
            self.populateHomeworkTable($("#course").val());
        } else {
            //redirect or whatever should happen if no session exists
        }
    },
    /**
     *   function to populate the homework table
     */
    populateHomeworkTable: function(course_id) {
        var self = this;
        var session = parseSession(Cookies.getJSON("session"));
        self.homeworkViewModel.getHomework(session.getUserID(), course_id).done(function(data) {
            self.homework(data);
        });
    }
};

function createTestSession() {
    return testSession();
}