$(document).ready(function() {
    //createTestSession();
    configDatePicker();
    ko.applyBindings(tareasStudentViewModel);
    $("#course").change(function() {
        tareasStudentViewModel.cleanObservables();
       tareasStudentViewModel.populateHomeworkTable($(this).val());
    });
    tareasStudentViewModel.init();
});

var tareasStudentViewModel = {
    active: "Tareas",
    menu: ko.observableArray([]),
    homework: ko.observableArray(),
    homeworkViewModel: HomeworkViewModel,
    content: ko.observable(""),
    courseViewModel: CourseViewModel,
    courses: ko.observableArray(),
    file: ko.observable(),
    uploaded: ko.observable(false),
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
                data.homework.forEach(function(element){
                   element.gradeObservable = ko.observable("-");
                   element.uploaded = ko.observable(false);
                   if(element.response != null &&  element.response.length > 0){
                        if(element.response[0].graded){
                            element.gradeObservable(element.response[0].grade);
                        }
                        element.uploaded(true);
                        self.uploaded(true);
                   }
                   element.openModal = function(){
                        if(element.response != null && element.response.length > 0){
                            self.content(element.response[0].answer);
                            self.file(element.response[0].file);
                        }
                        $("#modalEnroll").modal("show");
                        self.uploaded(element.uploaded());
                        $("#modalEnroll").on("hide.bs.modal", function(){
                            self.send(element);
                            $("#modalEnroll").unbind("hide.bs.modal");
                        });
                   }
                });
                self.homework(data.homework);
            }
        });
    },

    send: function(data){
        var self = this;
        if($(document.activeElement)[0] == $("#send")[0]){
            var archivo = $("#fileupload").prop("files")[0];
            if(data.uploaded()){
                self.homeworkViewModel.updateStudentHomework(data.id, self.content(), true, archivo, self.session.getToken(), function(){
                    self.cleanObservables();
                    self.loadCourses();
                });
            }
            else{
                self.homeworkViewModel.sendHomework(data.id, self.content(), true, self.session.getToken(), archivo, function(){
                    self.cleanObservables();
                    self.loadCourses();
                });
            }
        }
    },
    destroySession: function(){
        var self = this;
        self.session.destroySession();
    },

    cleanObservables: function(){
        tareasStudentViewModel.content("");
        tareasStudentViewModel.file(null);
        tareasStudentViewModel.uploaded(false);
    }


};

function createTestSession() {
    return testSession();
}