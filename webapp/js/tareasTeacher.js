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
            self.courseViewModel.getCourses(self.session.getUserID()).done(function(data) {
                self.courses(data);
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
        self.homeworkViewModel.getHomework(self.session.getUserID(), course_id).done(function(data) {
            for(var i = 0; i < data.length; i++){
                data[i]["editable"] = ko.observable(false);
                data[i]["editTextFields"] = function() {
                    if(this.editable()) {
                        this.editable(!this.editable());
                        self.homeworkViewModel.updateHomework(this);
                    } else {
                        this.editable(!this.editable());
                    }
                };
                    data[i]["remove"] = function() {
                        //
                        self.homework.remove(this);
                    };
            }

            self.homework(data);
        });
    },

    save: function() {
        var self = this;
        self.homeworkViewModel.update()
    },
    create: function() {
        var self = this;
        var hw = {
            titulo: "",
            course_id: self.currentCourse(),
            usr_id: self.session.getUserID(),
            fecha_limite: new Date(),
            descripcion: "",
            tipo: "",
            closed: false,
            editable: ko.observable(true),
            editTextFields: function() {
                if(this.editable()) {
                    this.editable(!this.editable());
                    self.homeworkViewModel.createHomework(this)
                } else {
                    this.editable(!this.editable());
                }
            },
            remove: function() {
                 self.homework.remove(this);
            }


        };
        self.homework.push(hw);
    },
    logout: function() {
        var self = this;
        self.self.session.destroySession();
        window.location.href = "/webapp/html/log_in.html";
    }
};

function createTestSession() {
    return testSession();
}