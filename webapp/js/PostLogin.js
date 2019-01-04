$(document).ready(function(){
	ko.applyBindings(logInViewModel);
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
<<<<<<< HEAD
		window.location.href = "http://localhost:8000/html/log_in.html"
=======
		window.location.href = "http://localhost/html/log_in.html"
>>>>>>> 65d8e5a825700bcbb8b3e82338da7d0904f6b86e
	});
	return false;
}

