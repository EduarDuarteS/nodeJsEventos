
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

app.get('/users', db.getUsers)
app.post('/user', db.postUser)




app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
