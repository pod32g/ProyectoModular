$(document).ready(function(){
	ko.applyBindings(signUpViewModel);
	$("#main-contact-form").submit(doPost);
});

var signUpViewModel = {
	nombre : ko.observable(),
	correo : ko.observable(),
	codigo : ko.observable(),
	password : ko.observable()
};

function doPost(){
	var signUp = {
		"nombre" : signUpViewModel.nombre(),
		"correo" : signUpViewModel.correo(),
		"codigo" : signUpViewModel.codigo(),
		"password" : signUpViewModel.password()
	}
	var signUpJson = JSON.stringify(signUp);
	$.post("http://localhost:8000/account/signup", signUpJson, function(){
		window.location.href = "http://localhost:8000/html/registro.html"
	});
	return false;
}

