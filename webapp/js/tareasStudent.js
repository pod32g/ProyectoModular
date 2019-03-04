$(document).ready(function() {
    //createTestSession();
    ko.applyBindings(tareasStudentViewModel);
    $("#course").change(function() {
       tareasStudentViewModel.populateHomeworkTable($(this).val());
    });
    tareasStudentViewModel.init();
});

var tareasStudentViewModel = {
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
        if(session && session.isSessionActive()) {
            self.menu(session.getSessionMenu());
            self.courseViewModel.getCourses(session.getUserID()).done(function(data) {
                console.log(data);
                self.courses(data);
            });
            self.populateHomeworkTable($("#course").val());
        } else {
            window.location.href = "/webapp/html/log_in.html";
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