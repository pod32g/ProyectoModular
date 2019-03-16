$(document).ready(function(){
    signUpViewModel.init();
	ko.applyBindings(signUpViewModel);
	$("#main-contact-form").submit(doPost);
});

var signUpViewModel = {
	name : ko.observable(),
	lastName : ko.observable(),
	mail : ko.observable(),
	code : ko.observable(),
	password : ko.observable(),
	menu : ko.observableArray([]),

	init : function(){
	    var self = this;
	    var session = parseSession(Cookies.getJSON("session"));
        if(session != null && session.isSessionActive()) {
            window.location.href = "../index.html";
         }
        self.menu(getNoUserMenu());
	}
};

function doPost(){
	var signUp = {
		"first_name" : signUpViewModel.name(),
		"last_name" : signUpViewModel.lastName(),
		"email" : signUpViewModel.mail(),
		"code" : signUpViewModel.code(),
		"password" : signUpViewModel.password()
	}
	var signUpJson = JSON.stringify(signUp);
	$.ajax({
		url : "http://localhost:8000/account/signup/",
		contentType : "application/json",
		data : signUpJson,
		method : "post",
		success : function(response){	
		}
	});
	return false;
}

