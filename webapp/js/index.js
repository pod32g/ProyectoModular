$(document).ready(function(){
	ko.applyBindings(indexViewModel);
	indexViewModel.init();
});

var indexViewModel = {
    menu :ko.observableArray([]),

    init : function() {
        var self = this;
        var session = parseSession(Cookies.getJSON("session"));
         if(session.isSessionActive()) {
            self.menu(session.getSessionMenu());
         }
    }
};
