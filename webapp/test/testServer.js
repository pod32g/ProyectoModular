var http = require('http');

//create a server object:
http.createServer(function (req, res) {
  console.log("Test server"); //write a response to the client
  console.log(req.method + " " + req.url);
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*, X-Requested-With, Content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  var response;

 if(req.method === "GET") {
     if(req.url.includes("/tareas/get")) {
        var args = req.url.split("/");
        response = getHomework(parseInt(args[3]), parseInt(args[4]));
     } else if (req.url.includes("/courses/get")) {
        response = getCourses();
     }
      res.write(response);
      console.log(response);
      res.end();//end the response
    } else if (req.method === "POST" ) {
        if(req.url.includes("/account/login")) {
            getBody(req, function(response){
                var auth = login(response);

                if(!auth) {
                    res.statusCode = 403;
                    res.write("No tienes acceso")
                    console.log("credenciales incorrectas");
                } else {
                     res.write(auth);
                     console.log(auth);
                }
                res.end();
            });
        }
  } else if (req.method === "OPTIONS") {
        res.write("ok");
        res.end();
  }

}).listen(8000); //the server object listens on port 8080

var homeworkTest1 = [{
        id: 1,
        titulo: "Tarea pendeja 1",
        course_id: 1,
        user_id: 1,
        fecha_limite: new Date(),
        descripcion: "tarea sobre algo",
        tipo: "auditivo",
        closed: false
   }, {
        id: 2,
        titulo: "Tarea pendeja 2",
        course_id: 1,
        user_id: 1,
        fecha_limite: new Date(),
        descripcion: "tarea sobre no se que",
        tipo: "visual",
        closed: false
   }, {
        id: 3,
       titulo: "Tarea pendeja 3",
       course_id: 1,
       user_id: 1,
       fecha_limite: new Date(),
       descripcion: "tarea sobre algo mas",
       tipo: "kinestesico",
       closed: false
   },{
     id: 1,
     titulo: "Tarea pendeja 4",
     course_id: 2,
     user_id: 1,
     fecha_limite: new Date(),
     descripcion: "tarea sobre algo",
     tipo: "auditivo",
     closed: false
    }, {
     id: 2,
     titulo: "Tarea pendeja 5",
     course_id: 2,
     user_id: 1,
     fecha_limite: new Date(),
     descripcion: "tarea sobre no se que",
     tipo: "visual",
     closed: false
    }, {
     id: 3,
    titulo: "Tarea pendeja 6",
    course_id: 2,
    user_id: 1,
    fecha_limite: new Date(),
    descripcion: "tarea sobre algo mas",
    tipo: "kinestesico",
    closed: false
}

];


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

var account = {
    user_id : 1,
    username: "pol",
    userType: "teacher",
    Session: Buffer.from("Hola amigo").toString('base64'),
    pass: "pass1"
};

function getHomework(user_id, course_id) {
    var response = [];
    for(var i = 0; i < homeworkTest1.length; i++) {
        var t = homeworkTest1[i];
        if(t.course_id === course_id && t.user_id === user_id) {
            response.push(t);
        }
    }
    return JSON.stringify(response);
}

function getCourses() {
    return JSON.stringify(coursesTest1);
}

function login(credentials) {
    var credentials = JSON.parse(credentials);
    var user = credentials["code_mail"];
    var pass = credentials["password"];

    if(account.username === user && account.pass === pass) {
        return JSON.stringify(account);
    }
    return false;

}

function getBody(req, callback) {
    var body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();
      callback(body);
    });
}