
const express = require('express')
const bodyParser = require('body-parser')
const db = require ('./queries')
const app = express()
const port = 80

var cors = require ('cors');
app.use(cors({
    origin:['http://localhost:4200','http://127.0.0.1:4200'],
    credentials:true
}));

app.use(function (req, res, next) {

  res.header('Access-Control-Allow-Origin', "http://localhost:4200");
  res.header('Access-Control-Allow-Headers', true);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', db.getUsers);

//Crear un USUARIO nota: no permite duplicados de correo
app.post('/createUser', db.postUser);

//Validar login con correo y contraseña
app.post('/login', db.getLogin);

//Crear un evento
app.post('/creatEvent', db.postEvent);

//Eliminar un evento
app.delete('/deleteEvent', db.deleteEvent);

//Actualizar un evento
app.put('/updatevent', db.putEvent);





app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
