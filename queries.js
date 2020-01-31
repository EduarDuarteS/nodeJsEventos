const url = require('url');
const res = require('./models/respuesta')
const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'eduard',
  host: 'localhost',
  database: 'DBEventos',
  password: '2614eduard',
  port: 5432,
})


const getEvents = (request, response) => {
  let q = url.parse(request.url, true);
  let qdata = q.query;
  // console.log(qdata.id_user);
  pool.query('Select * from public."eventos" WHERE id_user = $1 order by created_at asc', [qdata.id_user],(error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    response.status(200).json(results.rows)
  })
}

const getUsers = (request, response) => {
  pool.query('SELECT * FROM public."Users" ORDER BY id_user ASC', (error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    response.status(200).json(results.rows)
  })
}

const getLogin = (request, response) => {
  console.log(request.body);
  console.log(request);
  // const id = parseInt(request.params.id)
  const {
    email,
    contrasenia
  } = request.body


  pool.query('SELECT * FROM public."Users" WHERE email = $1 AND contrasena = $2', [email, contrasenia], (error, results) => {
    if (error) {
      console.log(error);
      return;
    }
    let resp = new res.resp(results.rowCount == '0' ? 'ER' : 'OK', results.command, results.rows[0]);
    response.status(200).json(resp);
  })
}


const getUserById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT * FROM public."Users" WHERE id_user = $1', [id], (error, results) => {
    if (error) {
      console.log(error);
      return;
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
  } = request.body;
  pool.query('INSERT INTO public."Users"(nombres, apellidos, email, contrasena)	VALUES ($1, $2, $3, $4)',
    [nombres, apellidos, email, contrasenia], (error, results) => {
      if (error) {
        // console.log("results", results);
        // console.log("error: ", error);
        let resp = new res.resp(error.severity, error.detail, error);
        response.status(403).send(resp);
        console.log(error);
        return;
      }
      if (results) {
        let resp = new res.resp('OK', results.command, `SE CREO EL USUARIO ${email}`);
        response.status(201).send(resp);
      }
    })
};


const postEvent = (request, response) => {
  const {
    id_user,
    nombre,
    lugar,
    direccion,
    date_inicio,
    date_fin,
    tipo_evento,
    id_categoria
  } = request.body;
  pool.query('INSERT INTO public."eventos"(id_user, nombre, lugar, direccion, date_inicio, date_fin, tipo_evento, id_categoria)	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
    [id_user, nombre, lugar, direccion, date_inicio, date_fin, tipo_evento, id_categoria], (error, results) => {
      if (error) {
        // console.log("results", results);
        // console.log("error: ", error);
        let resp = new res.resp(error.severity, error.detail, error);
        response.status(403).send(resp)
        console.log(error);
        return;
      }
      if (results) {
        let resp = new res.resp('OK', results.command, `SE CREO EL EVENTO ${nombre}`);
        response.status(201).send(resp)
      }
    })
};


const putEvent = (request, response) => {

  const {
    id,
    id_user,
    nombre,
    lugar,
    direccion,
    date_inicio,
    date_fin,
    id_categoria,
    tipo_evento
  } = request.body
  console.log(id, id_user, nombre, lugar, direccion, date_inicio, date_fin, id_categoria, tipo_evento);

  pool.query(
    'UPDATE public."eventos" SET nombre=$3, lugar=$4, direccion=$5, date_inicio=$6, date_fin=$7, id_categoria=$8, tipo_evento=$9 WHERE id=$1 and id_user = $2',
    [id, id_user, nombre, lugar, direccion, date_inicio, date_fin, id_categoria, tipo_evento],
    (error, results) => {
      if (error) {
        let resp = new res.resp(error.severity, error.detail, error);
        response.status(403).send(resp)
        console.log(error);
        return;
      }
      console.log(results);
      if (results.rowCount === 1)
        var resp = new res.resp('OK', results.command, `Evento UpDate with ID: ${id}`);
      else if (results.rowCount === 0)
        var resp = new res.resp('ER', 'NO_FOUND', `Evento con ID: ${id} y user ${id_user} no hizo UpDate`);
      else
        var resp = new res.resp('OK', results.command, results);
      response.status(200).send(resp);
    }
  )
}

const deleteEvent = (request, response) => {
  let q = url.parse(request.url, true);
  let qdata = q.query;
  const id = parseInt(qdata.id);
  const id_user = parseInt(qdata.id_user);

  pool.query('DELETE FROM public."eventos" WHERE id = $1 and id_user = $2', [id, id_user], (error, results) => {
    if (error) {
      let resp = new res.resp(error.severity, error.detail, error);
      response.status(403).send(resp)
      console.log(error);
      return;
    }
    if (results.rowCount === 1)
      var resp = new res.resp('OK', results.command, `Evento deleted with ID: ${id}`);
    else if (results.rowCount === 0)
      var resp = new res.resp('ER', 'NO_FOUND', `Evento con ID: ${id} y user ${id_user} no fue Eliminado`);
    else
      var resp = new res.resp('OK', results.command, results);
    response.status(200).send(resp)
  })
}

module.exports = {
  getUsers,
  getEvents,
  postUser, //createUser
  postEvent, //creatEvent
  deleteEvent, //deleteEvent
  putEvent, //upDateEvent
  getLogin,
  getUserById,
}
