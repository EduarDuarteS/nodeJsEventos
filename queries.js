const res = require ('./models/respuesta')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'eduard',
  host: 'localhost',
  database: 'DBEventos',
  password: '2614eduard',
  port: 5432,
})


const getUsers = (request, response) => {
  pool.query('SELECT * FROM public."Users" ORDER BY id_user ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM public."Users" WHERE id_user = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const postUser = (request, response) => {
  console.log(request.body);
  const { nombres, apellidos, email, contrasenia } = request.body
  pool.query('INSERT INTO public."Users"(nombres, apellidos, email, contrasena)	VALUES ($1, $2, $3, $4)',
  [nombres, apellidos, email, contrasenia], (error, results) => {
    if (error) {

      throw error;
    }
    let resp = new res('OK', 'INSERT', `SE CREO EL USUARIO ${email}`);
    console.log(results);
    console.log(results.fields);
    // console.log("json",response.json(results));
    response.status(201).send(`User added with ID: ${response.json(resp)}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id_user = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM public."Users" WHERE id_user = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  postUser, //createUser
  getUserById,
  updateUser,
  deleteUser,
}
