$(document).ready(function() {
    //createTestSession();
    moment.locale("es");
    ko.applyBindings(tareasTeacherViewModel);
    $("#course").change(function() {
       tareasTeacherViewModel.populateHomeworkTable($(this).val());
       tareasTeacherViewModel.currentCourse(parseInt($(this).val()));
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
    currentCourse: ko.observable(),
    session: parseSession(Cookies.getJSON("session")),

    /**
     *   function to initialize page data
     */
    init: function() {
        var self = this;
        if(self.session && self.session.isSessionActive()) {
            self.menu(self.session.getSessionMenu());
            self.courseViewModel.getCourses(self.session.getToken(), function(data){
              self.courses(data.professor);
              self.currentCourse($("#course").val());
              self.populateHomeworkTable($("#course").val());
          });

        } else {
            window.location.href = "/webapp/html/log_in.html";
        }
    },
    /**
     *   function to populate the homework table
     */
    populateHomeworkTable: function(course_id) {
        var self = this;
        self.homeworkViewModel.getHomework(course_id, self.session.getToken(), function(data) {
            if(data != null){
                for(var i = 0; i < data.homework.length; i++){
                    data.homework[i]["editable"] = ko.observable(false);
                    data.homework[i]["editTextFields"] = function() {
                        if(this.editable()) {
                            this.editable(!this.editable());
                            self.homeworkViewModel.updateHomework(this, self.session.getToken(), function(data){
                                //TODO por si se me ocurre algo
                            });
                        } else {
                            this.editable(!this.editable());
                        }
                    };
                        data.homework[i]["remove"] = function() {
                            var homework = this;
                             self.homeworkViewModel.deleteHomework(homework.id, self.session.getToken(), function(data){
                                   self.homework.remove(homework);
                             });
                        };
                    delete data.homework[i].responses;
                }

                self.homework(data.homework);
            }

        });
    },

    save: function() {
        var self = this;
        self.homeworkViewModel.update()
    },

    create: function() {
        var self = this;
        var hw = {
            title: "",
            course: self.currentCourse(),
            limit: new Date(),
            description: "",
            //tipo: "",
            closed: false,
            file: ko.observable(),
            editable: ko.observable(true),
            setFile: function(data, e){
                var hw = this;
                var file    = e.target.files[0];
                /*var reader  = new FileReader();
                reader.onloadend = function (onloadend_e){
                   var result = reader.result; // Here is your base 64 encoded file. Do with it what you want.
                   hw.file(result);
                };
                if(file){
                    reader.readAsDataURL(file);
                }*/
                hw.file(file);
            },
            editTextFields: function() {
                if(this.editable()) {
                    var tarea = this;
                    this.editable(!this.editable());
                    self.homeworkViewModel.createHomework(this, self.session.getToken(), function(data){
                        tarea.id = data.homework.id;
                    }, this.file());
                } else {
                    this.editable(!this.editable());
                }
            },
            remove: function() {
                 var homework = this;
                 self.homeworkViewModel.deleteHomework(homework.id, self.session.getToken(), function(data){
                       self.homework.remove(homework);
                 });
            }
        };
        self.homework.push(hw);
    },
    logout: function() {
        var self = this;
        self.self.session.destroySession();
        window.location.href = "/webapp/html/log_in.html";
    },

};

function createTestSession() {
    return testSession();
}