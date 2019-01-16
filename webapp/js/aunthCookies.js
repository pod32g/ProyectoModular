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

var noUser = [
	{menu : "Inicio", url : "index.html"},
	{menu : "Iniciar Sesión", url : "html/log_in.html"},
	{menu : "Crear Cuenta", url : "html/registro.html"},
	];

var withUser = [
	{menu : "Inicio", url : "index.html"},
	{menu : "Tareas", url : "html/tareas.html"},
	{menu : "Test", url : "html/cuestionario.html"},
	{menu : "Calificaciones", url : "html/calificaciones.html"},
	{menu : "Cerrar Sesión"},
	]; 


var menuViewModel = {
	menu : ko.observableArray(noUser)
};

console.log(Cookies.get('Session'))