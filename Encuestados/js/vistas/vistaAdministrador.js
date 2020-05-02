/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaBorrada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function() {
    contexto.reconstruirLista();
  })
};

VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    this.reconstruirLista();
    this.configuracionDeBotones();
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    var nuevoItem = document.createElement('li');
    nuevoItem.classList.add('list-group-item');
    nuevoItem.id = pregunta.id;
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.innerHTML = $('.d-flex').html();
    return nuevoItem;
  },

  reconstruirLista: function() {
    this.modelo.preguntas = JSON.parse(localStorage.getItem('preguntas')) || [];
    this.modelo.ultimoId = this.modelo.preguntas
      .map(pregunta => pregunta.id)
      .sort((a, b) => b - a)[0] || 0;
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i = 0; i < preguntas.length; ++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        var inputValue = $(this).val();
        respuestas.push({textoRespuesta: inputValue, cantidad: 0});
	  })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    

    e.botonEditarPregunta.click(function() {
        var id = parseInt($('.list-group-item.active').attr('id'));
        if (!id) return;
        var nuevaPregunta = prompt('Escribe una nueva pregunta:');

        contexto.controlador.editarPregunta(id, nuevaPregunta);
    });

    e.botonBorrarPregunta.click(function() {
        var id = parseInt($('.list-group-item.active').attr('id'));
        contexto.controlador.borrarPregunta(id);
    });

    e.borrarTodo.click(function() {
        contexto.modelo.borrarTodo();
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
