$(document).ready(function(){
	ko.applyBindings(logInViewModel);
	$("#main-contact-form").submit(doPost);
});

var logInViewModel = {
	codigo_correo : ko.observable(),
	password : ko.observable()
};

function doPost(){
	var logIn = {
		"codigo_correo" : logInViewModel.codigo_correo(),
		"password" : logInViewModel.password()
	}
	var loginJson = JSON.stringify(logIn);
	$.post("http://localhost:8000/account/login", loginJson, function(){
		window.location.href = "http://localhost/html/log_in.html"
	});
	return false;
}

