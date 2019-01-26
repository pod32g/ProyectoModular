var noUser = [
	{menu : "Inicio", url : "/webapp/index.html"},
	{menu : "Iniciar SesiÃ³n", url : "/webapp/html/log_in.html"},
	{menu : "Crear Cuenta", url : "/webapp/html/registro.html"},
];

var withUserStudent = [
	{menu : "Inicio", url : "/webapp/index.html"},
	{menu : "Cursos", url : "/webapp/html/student/tareas.html"},
	{menu : "Test", url : "/webapp/html/student/cuestionario.html"},
	{menu : "Calificaciones", url : "/webapp/html/student/calificaciones.html"},
	{menu : "Cerrar Sesi&oacuten"},
];

var withUserTeacher = [
	{menu : "Inicio", url : "/webapp/index.html"},
	{menu : "Cursos", url : "/webapp/html/teacher/cursos.html"},
	{menu : "Tareas", url : "/webapp/html/teacher/tareas.html"}
];

var withUserAdmin = [
	{menu : "Inicio", url : "/webapp/index.html"},
	{menu : "Usuarios", url : "/webapp/html/admin/usuarios.html"}
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
    Cookies.set("session", "session");
    return session;
}

function parseSession(obj) {
    return new Session(obj.user_id, obj.token, obj.userType);
}