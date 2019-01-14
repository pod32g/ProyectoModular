$(document).ready(function(){
	ko.applyBindings(signUpViewModel);
	$.ajaxSetup({
	  contentType: "application/json; charset=utf-8"
	});
	$("#main-contact-form").submit(doPost);
});

var signUpViewModel = {
	name : ko.observable(),
	lastName : ko.observable(),
	mail : ko.observable(),
	code : ko.observable(),
	password : ko.observable()
};

function doPost(){
	var signUp = {
		"name" : signUpViewModel.name(),
		"lastName" : signUpViewModel.lastName(),
		"mail" : signUpViewModel.mail(),
		"code" : signUpViewModel.code(),
		"password" : signUpViewModel.password()
	}
	var signUpJson = JSON.stringify(signUp);
	$.post("http://localhost:8000/account/signup", signUpJson, function(){
		window.location.href = "http://localhost:8000/html/registro.html"
	});
	return false;
}

