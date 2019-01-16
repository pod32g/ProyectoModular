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
		"code_mail" : logInViewModel.code_mail(),
		"password" : logInViewModel.password()
	}
	
	var loginJson = JSON.stringify(logIn);
	$.ajax({
		url : "http://localhost:8000/account/login/",
		contentType : "application/json",
		data : loginJson,
		method : "post",
		success : function(response){
			if (response['Status'] === "All OK") {
				Cookies.set('Session', {
					'usr_id' : response['usr_id'],
					'token' : response['Session']
				})
				console.log("All OK")
			} else {
				//TODO: reload page with error message
				console.log("Wrong Credentials")
			}
		}
	});

	
	

	return false;
}

