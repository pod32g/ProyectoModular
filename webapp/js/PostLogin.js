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
	$.ajax({
		url : "http://localhost:8000/account/login",
		contentType : "application/json",
		data : loginJson,
		method : "post",
		success : function(response){
			
		}
	});
	return false;
}

