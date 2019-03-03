$(document).ready(function(){
moment.locale("es");
    ko.applyBindings(coursesTeacherViewModel);
    coursesTeacherViewModel.init();
});

var coursesTeacherViewModel = {
    active : "Cursos",
    menu : ko.observableArray([]),
    courses : ko.observableArray([]),
    courseViewModel : CourseViewModel,
    session: parseSession(Cookies.getJSON("session")),

    init: function() {
            var self = this;
            if(self.session && self.session.isSessionActive()) {
                self.menu(self.session.getSessionMenu());
                self.populateCoursesTable();
            } else {
                window.location.href = "/webapp/html/log_in.html";
            }
        },
    populateCoursesTable: function(){
        var self = this;
        self.courseViewModel.getCourses(self.session.getToken(), function(data){
            if(data != null){
                 for(var i = 0; i < data.professor.length; i++){
                    data.professor[i]["editable"] = ko.observable(false);
                    data.professor[i]["editTextFields"] = function() {
                        if(this.editable()) {
                            this.editable(!this.editable());
                            self.courseViewModel.updateCourse(this, self.session.getToken(), function(){
                                //TODO: Por si se me ocurre algo
                            });
                        } else {
                            this.editable(!this.editable());
                        }
                    };
                    data.professor[i]["remove"] = function() {
                        var course = this;
                         self.courseViewModel.deleteCourse(course.id, self.session.getToken(), function(data){
                               self.courses.remove(course);
                         });
                    };
                    delete data.professor[i].professor;
                }

                self.courses(data.professor);
            }
        });
    },

    create: function() {
        var self = this;
        var c = {
            name: "",
            start: new Date(),
            //descripcion: "",
            end: new Date(),
            active: true,
            password: "",
            editable: ko.observable(true),
            editTextFields: function() {
                if(this.editable()) {
                    var course = this;
                    this.editable(!this.editable());
                    this.start = moment(this.start).format("YYYY-MM-DD");
                    this.end = moment(this.start).format("YYYY-MM-DD");
                    self.courseViewModel.createCourse(this, self.session.getToken(), function(data){
                        course.id = data.course.id;
                    });
                } else {
                    this.editable(!this.editable());
                }
            },
            remove: function() {
                var course = this;
                 self.courseViewModel.deleteCourse(course.id, self.session.getToken(), function(data){
                       self.courses.remove(course);
                 });
            }


        };
        self.courses.push(c);
    },
     logout: function() {
        var self = this;
         self.session.destroySession();
         window.location.href = "/webapp/html/log_in.html";
     }
};