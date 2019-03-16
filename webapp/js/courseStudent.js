$(document).ready(function(){
    coursesStudentViewModel.init();
    ko.applyBindings(coursesStudentViewModel);
});

var coursesStudentViewModel = {
    active : "Cursos",
    menu : ko.observableArray([]),
    courses : ko.observableArray([]),
    courseViewModel : CourseViewModel,
    professor : ko.observable(),
    start : ko.observable(),
    end : ko.observable(),
    needsPassword : ko.observable(false),
    password : ko.observable(""),
    session: parseSession(Cookies.getJSON("session")),

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
          self.courseViewModel.getAllCourses(self.session.getToken(), function(data){
                if(data.courses != null && data.courses.length > 0){
                  self.professor(data.courses[0].professor.name);
                  self.start(data.courses[0].start);
                  self.end(data.courses[0].end);
                  self.courses(data.courses);
                  self.needsPassword(data.courses[0].password);
                }
          });
          $("#course").change(function(){
              var courseId = $("#course").val();
              for(var i = 0; i < self.courses().length; i++){
                  if(self.courses()[i].id == courseId){
                      self.professor(self.courses()[i].professor.name);
                      self.start(self.courses()[i].start);
                      self.end(self.courses()[i].end);
                      self.needsPassword(self.courses()[i].password);
                      return;
                  }
              }
          });
        },



    enroll: function(){
        var self = this;
        var enrollObj = {
            course: parseInt($("#course").val()),
            password: self.password(),
        }
        self.courseViewModel.enrollCourse(enrollObj, self.session.getToken(), function(data){
            self.loadCourses();
        });
    },

    destroySession: function(){
        var self = this;
        self.session.destroySession();
    }
};