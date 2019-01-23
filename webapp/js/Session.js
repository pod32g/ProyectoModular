var noUser = [
	{menu : "Inicio", url : "index.html"},
	{menu : "Iniciar SesiÃ³n", url : "html/log_in.html"},
	{menu : "Crear Cuenta", url : "html/registro.html"},
];

var withUserStudent = [
	{menu : "Inicio", url : "index.html"},
	{menu : "Cursos", url : "html/student/tareas.html"},
	{menu : "Test", url : "html/student/cuestionario.html"},
	{menu : "Calificaciones", url : "html/student/calificaciones.html"},
	{menu : "Cerrar Sesi&oacuten"},
];

var withUserTeacher = [
	{menu : "Inicio", url : "index.html"},
	{menu : "Cursos", url : "html/teacher/cursos.html"},
	{menu : "Tareas", url : "html/teacher/tareas.html"}
];

var withUserAdmin = [
	{menu : "Inicio", url : "index.html"},
	{menu : "Usuarios", url : "html/admin/usuarios.html"}
];

function Session(user_id, token, userType) {
    var self = this;

    self.user_id = user_id;
    self.token = token;
    self.userType = userType;

    //Functions

    /**
    */
    self.isSessionActive =  function() {
        var cookie = Cookies.get("Session");
        return cookie !== null ? true : false;
    };
    /**
     */
    self.getSessionMenu = function() {
        switch(userType) {
            case "student": return withUserStudent;
            case "administrator": return withUserAdmin;
            case "teacher": return withUserTeacher;
        }
    };
    /**
     */
    self.getUserID = function() {
        return self.user_id;
    }
}

function testSession() {
    var session =  new Session("1","testtoken", "teacher");
    Cookies.set("session", session);
    return session;
}