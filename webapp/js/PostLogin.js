$(document).ready(function(){
	ko.applyBindings(logInViewModel);
	$.ajaxSetup({
  		contentType: "application/json; charset=utf-8"
	});
	$("#main-contact-form").submit(doPost);
});

var logInViewModel = {
	code_mail : ko.observable(),
	password : ko.observable()
};

function doPost(){
	var logIn = {
		"code_mail" : logInViewModel.codigo_correo(),
		"password" : logInViewModel.password()
	}
	var loginJson = JSON.stringify(logIn);
	$.post("http://localhost:8000/account/login", loginJson, function(){
		window.location.href = "http://localhost:8000/html/log_in.html"
	});
	return false;
}

