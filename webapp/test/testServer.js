var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  console.log("Test server"); //write a response to the client
  console.log(req.url);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*, X-Requested-With, Content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  var response;
  switch(req.url) {
    case "/tareas/get":
        response = getHomework(1,1);
        break;
    case "/courses/get":
        response = getCourses();
        break;
  }
  res.write(response);
  res.end();//end the response
}).listen(8000); //the server object listens on port 8080

var homeworkTest1 = {
    id: 123,
    titulo: "Tarea pendeja",
    fecha_limite: new Date(),
    descripcion: "tarea sobre algo",
    tipo: "auditivo",
    closed: false
};

var coursesTest1 = [
    {
        course_id: 1,
        name: "curso 1",
        start: new Date(),
        end: new Date()
    },{
        course_id: 2,
        name: "curso 2",
        start: new Date(),
        end: new Date()
    }, {
        course_id: 3,
        name: "curso 3",
        start: new Date(),
        end: new Date()
    }

];

function getHomework(user_id, course_id) {
    return JSON.stringify(homeworkTest1);
}

function getCourses() {
    return JSON.stringify(coursesTest1);
}