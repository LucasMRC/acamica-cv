/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaBorrada = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.votoAgregado = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
	  return this.ultimoId;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(pregunta, respuestas) {
	  if (pregunta === '' || respuestas.length === 0) return;
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = { 'textoPregunta': pregunta, 'id': id, 'cantidadPorRespuesta': respuestas };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
	this.preguntaAgregada.notificar();
	this.ultimoId = id;
  },

  borrarPregunta: function(id) {
	  var preguntaBorrada = this.preguntas.find(pregunta => pregunta.id === id);
	  this.preguntas = this.preguntas.filter(pregunta => pregunta !== preguntaBorrada);
	  this.guardar();
	  this.preguntaBorrada.notificar();
  },

	editarPregunta: function(id, nuevaPregunta) {
	  var preguntaElegida = this.preguntas.find(pregunta => pregunta.id === id);
	  var index = this.preguntas.indexOf(preguntaElegida);

	  preguntaElegida.textoPregunta = nuevaPregunta;
	  this.preguntas[index] = preguntaElegida;

	  this.guardar();
	  this.preguntaEditada.notificar();
	},
	
	agregarVoto: function(textoPregunta, respuesta) {
	  var preguntaElegida = this.preguntas.find(pregunta => pregunta.textoPregunta === textoPregunta);
	  var index = this.preguntas.indexOf(preguntaElegida);

	  preguntaElegida.cantidadPorRespuesta.forEach(item => {
	  	if (item.textoRespuesta === respuesta) item.cantidad++;
	  });
	  this.preguntas[index] = preguntaElegida;

	  this.guardar();
	  this.votoAgregado.notificar();
	},
	
	borrarTodo: function() {
	  this.preguntas = [];
	  localStorage.clear();
	  this.preguntaBorrada.notificar();
	},
	
  guardar: function(){
	  localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
