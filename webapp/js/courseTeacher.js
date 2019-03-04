$(document).ready(function(){
moment.locale("es");
    ko.applyBindings(coursesTeacherViewModel);
    coursesTeacherViewModel.init();
});

var coursesTeacherViewModel = {
    active : "Cursos",
    menu : ko.observableArray([]),
    courses : ko.observableArray(),
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
        self.courseViewModel.getCourses(self.session.getUserID()).done(function(data){
            for(var i = 0; i < data.length; i++){
                data[i]["editable"] = ko.observable(false);
                data[i]["editTextFields"] = function() {
                    if(this.editable()) {
                        this.editable(!this.editable());
                        self.courseViewModel.updateCourse(this);
                    } else {
                        this.editable(!this.editable());
                    }
                };
                data[i]["remove"] = function() {
                    //self.courseViewModel.deleteCourse();
                    self.courses.remove(this);
                };
            }

            self.courses(data);
        });
    },

    create: function() {
        var self = this;
        var c = {
            name: "",
            usr_id: self.session.getUserID(),
            start: new Date(),
            descripcion: "",
            end: new Date(),
            editable: ko.observable(true),
            editTextFields: function() {
                if(this.editable()) {
                    this.editable(!this.editable());
                    self.courseViewModel.createCourse(this)
                } else {
                    this.editable(!this.editable());
                }
            },
            remove: function() {
                self.courses.remove(this);
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