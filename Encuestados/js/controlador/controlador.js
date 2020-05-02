/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id) {
	  this.modelo.borrarPregunta(id);
  },
  editarPregunta: function(id, pregunta) {
	this.modelo.editarPregunta(id, pregunta);
  },
  agregarVoto: function(id, voto) {
	  this.modelo.agregarVoto(id, voto);
  }
};
