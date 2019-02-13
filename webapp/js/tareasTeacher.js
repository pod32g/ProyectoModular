$(document).ready(function() {
    //createTestSession();
    ko.applyBindings(tareasTeacherViewModel);
    $("#course").change(function() {
       tareasTeacherViewModel.populateHomeworkTable($(this).val());
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

    /**
     *   function to initialize page data
     */
    init: function() {
        var self = this;
        var session = parseSession(Cookies.getJSON("session"));
        if(session.isSessionActive()) {
            self.menu(session.getSessionMenu());
            self.courseViewModel.getCourses(session.getUserID()).done(function(data) {
                console.log(data);
                self.courses(data);
            });
            self.populateHomeworkTable($("#course").val());
        } else {
            //redirect or whatever should happen if no session exists
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
    },

    editTextFields: function(){
        /**
          We're defining the event on the `body` element,
          because we know the `body` is not going away.
          Second argument makes sure the callback only fires when
          the `click` event happens only on elements marked as `data-editable`
        */
        $('body').on('click', '[data-editable]', function(){

          var $el = $(this);

          var $input = $('<input/>').val( $el.text() );
          $el.replaceWith( $input );

          var save = function(){
            var $p = $('<h3 data-editable />').text( $input.val() );
            $input.replaceWith( $p );
          };

          /**
            We're defining the callback with `one`, because we know that
            the element will be gone just after that, and we don't want
            any callbacks leftovers take memory.
            Next time `p` turns into `input` this single callback
            will be applied again.
          */
          $input.on('blur', save).focus();

        });
    }
};

function createTestSession() {
    return testSession();
}