$(document).ready(function(){
	ko.applyBindings(logInViewModel);
	$("#main-contact-form").submit(logInViewModel.login);
});

var logInViewModel = {
	code_mail : ko.observable(),
	password : ko.observable(),

	/**
	 * function to login
	 */
	login: function() {
		var logIn = {
    		"code_mail" : logInViewModel.code_mail(),
    		"password" : logInViewModel.password()
    	}

    	var loginJson = JSON.stringify(logIn);
    	$.ajax({
    		url : "http://localhost:8000/account/login/",
    		contentType : "application/json",
    		data : loginJson,
    		method : "POST",
    		success : function(response){
                Cookies.set("session", new Session(response["user_id"], response["Session"], "teacher") );
                console.log("success");
                window.location.href = "../index.html";
    		},
    		error: function(response) {
    		    console.log(response);
    		}
    	});

    	return false;
	},
};
