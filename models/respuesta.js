
// module.exports = function (estado, accion, descripcion) {
//   this.estado = estado;
//   this.accion = accion;
//   this.descripcion = descripcion;
// }

const resp = function (estado, accion, data) {
  this.estado = estado;
  this.accion = accion;
  this.data = data;
}


module.exports = {
  resp,
}
