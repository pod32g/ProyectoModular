$(document).ready(function() {
    createTestSession();
    ko.applyBindings(tareasTeacherViewModel);
    tareasTeacherViewModel.init();
});

var tareasTeacherViewModel = {
    session: createTestSession(),
    menu: ko.observableArray(),
    homework: ko.observableArray(),
    homeworkViewModel: HomeworkViewModel,
    courseViewModel: CourseViewModel,
    courses: ko.observableArray(),

    /**
     *   function to initialize page data
     */
    init: function() {
        var self = this;
        if(self.session.isSessionActive()) {
            self.menu(self.session.getSessionMenu());
            self.courseViewModel.getCourses().done(function(data) {
                console.log(data);
                self.courses(data);
            });
            $("#course").change(function() {
                self.populateHomeworkTable($(this).val());
            });
        } else {
            //redirect or whatever should happen if no session exists
        }
    },
    /**
     *   function to populate the homework table
     */
    populateHomeworkTable: function(course_id) {
        self.homework(self.homeworkViewModel.getHomeWork(self.session.getUserID(), course_id));
    }
};

function createTestSession() {
    return testSession();
}