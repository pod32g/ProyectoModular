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
    session: parseSession(Cookies.getJSON("session")),

    /**
     *   function to initialize page data
     */
    init: function() {
        var self = this;
        if(self.session && self.session.isSessionActive()) {
            self.menu(self.session.getSessionMenu());
            self.loadCourses();
        } else {
            window.location.href = "/webapp/html/log_in.html";
        }
    },

    loadCourses: function(){
        var self = this;
         self.courseViewModel.getCourses(self.session.getToken(), function(data) {
            if(data.student != null && data.student.length > 0){
                self.courses(data.student);
                self.populateHomeworkTable($("#course").val());
            }
        });
    },

    /**
     *   function to populate the homework table
     */
    populateHomeworkTable: function(course_id) {
        var self = this;
        self.homeworkViewModel.getHomework(course_id, self.session.getToken(), function(data) {
            if(data != null){
                self.homework(data.homework)
            }
        });
    },

    send: function(){
        var archivo = $("#fileupload").prop("files");
        var fileReader = new FileReader();
        var file = fileReader.readAsBinaryString(archivo[0]);
        console.log(fileReader.result);
    }
};

function createTestSession() {
    return testSession();
}