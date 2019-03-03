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
    		"username" : logInViewModel.code_mail(),
    		"password" : logInViewModel.password()
    	}

    	var loginJson = JSON.stringify(logIn);
    	$.ajax({
    		url : "http://localhost:8000/account/login/",
    		contentType : "application/json",
    		data : loginJson,
    		method : "POST",
    		success : function(response){
                //TODO: check real value names with deibid backend and update testServer
                Cookies.set("session", new Session(response["token"], response["type"]) );
                //console.log("success");
                window.location.href = "../index.html";
    		},
    		error: function(response) {
    		    console.log(response);
    		}
    	});

    	return false;
	},
};
