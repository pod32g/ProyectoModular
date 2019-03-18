$(document).ready(function(){
    configDatePicker();
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
    status: ko.observable(),
    message: ko.observable(),

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
                    data.professor[i]["startObservable"] = ko.observable(new Date(data.professor[i].start.replace("-", "/")));
                    data.professor[i]["endObservable"] = ko.observable(new Date(data.professor[i].end.replace("-", "/")));
                    data.professor[i]["password"] = ko.observable(data.professor[i].password);
                    data.professor[i]["editTextFields"] = function() {
                        if(this.editable()) {
                            this.editable(!this.editable());
                            this.start = this.startObservable();
                            this.end = this.endObservable();
                            this.start = moment(this.start).format("YYYY-MM-DD");
                            this.end = moment(this.end).format("YYYY-MM-DD");
                            self.courseViewModel.updateCourse(this, self.session.getToken(), function(data){
                                self.status(data.code);
                                if(data.code == 200){
                                    self.message("Se ha modificado correctamente el curso");
                                    $("#alert").show();
                                }
                                else{
                                    self.message("Algo ha salido mal");
                                    $("#alert").show();
                                }
                            });
                        } else {
                            this.editable(!this.editable());
                        }
                    };
                    data.professor[i]["remove"] = function() {
                        var course = this;
                         self.courseViewModel.deleteCourse(course.id, self.session.getToken(), function(data){
                               self.status(data.code);
                               if(data.code == 200){
                                   self.message("Se ha elminado correctamente el curso");
                                    $("#alert").show();
                                    self.courses.remove(course);
                               }
                               else{
                                    self.message("Algo ha salido mal");
                                    $("#alert").show();
                               }
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
            password_str: "",
            password: ko.observable(false),
            editable: ko.observable(true),
            editTextFields: function() {
                if(this.editable()) {
                    var course = this;
                    this.editable(!this.editable());
                    this.start = this.startObservable();
                    this.end = this.endObservable();
                    this.start = moment(this.start).format("YYYY-MM-DD");
                    this.end = moment(this.end).format("YYYY-MM-DD");
                    self.courseViewModel.createCourse(this, self.session.getToken(), function(data){
                        self.status(data.code);
                        if(data.code == 112){
                            self.message("Algo ha salido mal");
                            $("#alert").show();
                        }
                        else if(data.code == 200){
                           course.id = data.course.id;
                           self.message("Se ha creado el curso correctamente");
                            $("#alert").show();
                        }
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
        c.startObservable = ko.observable(c.start);
        c.endObservable = ko.observable(c.end);
        self.courses.push(c);
    },
     destroySession: function(){
         var self = this;
         self.session.destroySession();
     }
};