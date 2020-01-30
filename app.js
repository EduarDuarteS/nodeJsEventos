
const express = require('express')
const bodyParser = require('body-parser')
const db = require ('./queries')
const app = express()
const port = 80

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

console.log("hola...")

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', db.getUsers);

//Crear un USUARIO nota: no permite duplicados de correo
app.post('/user', db.postUser);

//Validar login con correo y contraseña
app.get('/login', db.getLogin);

//Crear un evento app.post('/postEvent')

//Eliminar un evento app.post('/deleteEvent')
 
//Actualizar un evento app.post('/putEvent')





app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
