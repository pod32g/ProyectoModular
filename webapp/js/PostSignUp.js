console.log(Cookies.get("Session"))

$(document).ready(function(){
	ko.applyBindings(signUpViewModel);
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

