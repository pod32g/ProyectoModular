$(document).ready(function() {
	ko.applyBindings(menuViewModel);
  	var user = Cookies.get('username');
  	if (user != null) {
    	menuViewModel.menu(withUser);
  	} else {
    	user = prompt("Please enter your name:", "");
    	if (user != "" && user != null) {
      		Cookies.set('username', user,{expires: 1});
    	}
  }
});




var menuViewModel = {
	menu : ko.observableArray(noUser)
};

console.log(Cookies.get('Session'))