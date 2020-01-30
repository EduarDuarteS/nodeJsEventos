const res = require('./models/respuesta')
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

const getLogin = (request, response) => {
  // const id = parseInt(request.params.id)
  const {
    email,
    contrasenia
  } = request.body


  pool.query('SELECT * FROM public."Users" WHERE email = $1 AND contrasena = $2', [email, contrasenia], (error, results) => {
    if (error) {
      throw error
    }
    let resp = new res.resp(results.rowCount == '0' ? 'ER' : 'OK', results.command, results.rows[0]);
    response.status(200).json(resp);
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
  const {
    nombres,
    apellidos,
    email,
    contrasenia
  } = request.body
  pool.query('INSERT INTO public."Users"(nombres, apellidos, email, contrasena)	VALUES ($1, $2, $3, $4)',
    [nombres, apellidos, email, contrasenia], (error, results) => {
      if (error) {
        // console.log("results", results);
        // console.log("error: ", error);
        let resp = new res.resp(error.severity, error.detail, error);
        response.status(403).send(resp)
        // throw error;
      }
      if (results) {
        let resp = new res.resp('OK', results.command, `SE CREO EL USUARIO ${email}`);
        response.status(201).send(resp)
      }
    })
}


const postEvent = (request, response) => {
  const {
    nombres,
    apellidos,
    email,
    contrasenia
  } = request.body
  pool.query('INSERT INTO public."Users"(nombres, apellidos, email, contrasena)	VALUES ($1, $2, $3, $4)',
    [nombres, apellidos, email, contrasenia], (error, results) => {
      if (error) {
        // console.log("results", results);
        // console.log("error: ", error);
        let resp = new res.resp(error.severity, error.detail, error);
        response.status(403).send(resp)
        // throw error;
      }
      if (results) {
        let resp = new res.resp('OK', results.command, `SE CREO EL USUARIO ${email}`);
        response.status(201).send(resp)
      }
    })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const {
    name,
    email
  } = request.body

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
  getLogin,
  getUserById,
  updateUser,
  deleteUser,
}
