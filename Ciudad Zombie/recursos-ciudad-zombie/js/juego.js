/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var Juego = {
	// Aca se configura el tamanio del canvas del juego
	anchoCanvas: 961,
	altoCanvas: 577,
	jugador: Jugador,
	vidasInicial: Jugador.vidas,
	fondo: 'Mensaje1',
	// Indica si el jugador gano
	ganador: false,

	obstaculosCarretera: [
		/* Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
		de ejemplo, pero podras agregar muchos mas. */
		new Obstaculo('imagenes/auto_verde_derecha.png', 90, 430, 30, 15, 1),
		new Obstaculo('imagenes/valla_vertical.png', 290, 400, 30, 30, 1),
		new Obstaculo('imagenes/bache.png', 460, 370, 15, 15, 1),
		new Obstaculo('imagenes/auto_verde_abajo.png', 520, 280, 15, 30, 1),
		new Obstaculo('imagenes/bache.png', 400, 210, 15, 15, 1),
		new Obstaculo('imagenes/valla_vertical.png', 470, 110, 30, 30, 1),
		new Obstaculo('imagenes/auto_verde_derecha.png', 710, 90, 30, 15, 1),
		new Obstaculo('imagenes/bache.png', 820, 290, 15, 15, 1),
		new Obstaculo('imagenes/valla_horizontal.png', 780, 490, 30, 30, 1),
		new Obstaculo('imagenes/valla_horizontal.png', 780, 490, 30, 30, 1),
	],
	/* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
	Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
	que son invisibles. No tenes que preocuparte por ellos.*/
	bordes: [
		// Bordes
		new Obstaculo('', 0, 5, 961, 18, 0),
		new Obstaculo('', 0, 559, 961, 18, 0),
		new Obstaculo('', 0, 5, 18, 572, 0),
		new Obstaculo('', 943, 5, 18, 572, 0),
		// Veredas
		new Obstaculo('', 18, 23, 51, 536, 1),
		new Obstaculo('', 69, 507, 690, 52, 1),
		new Obstaculo('', 587, 147, 173, 360, 1),
		new Obstaculo('', 346, 147, 241, 52, 1),
		new Obstaculo('', 196, 267, 263, 112, 1),
		new Obstaculo('', 196, 23, 83, 244, 1),
		new Obstaculo('', 279, 23, 664, 56, 1),
		new Obstaculo('', 887, 79, 56, 480, 1)
	],
	// Los enemigos se agregaran en este arreglo.
	
	enemigos: [
		// sprite, x, y, ancho, alto, velocidad, rangoMov
		new ZombieCaminante('imagenes/zombie1.png', 90, 300, 15, 15, 1, {
			desdeX: 80,
			desdeY: 300,
			hastaX: 160,
			hastaY: 350
		}),
		new ZombieCaminante('imagenes/zombie4.png', 300, 190, 15, 15, 1, {
			desdeX: 80,
			hastaX: 550,
			desdeY: 400,
			hastaY: 500
		}),
		new ZombieCaminante('imagenes/zombie3.png', 521, 251, 15, 15, 1, {
			desdeX: 470,
			desdeY: 250,
			hastaX: 573,
			hastaY: 350
		}),
		new ZombieCaminante('imagenes/zombie4.png', 603, 123, 15, 15, 1, {
			desdeX: 550,
			desdeY: 100,
			hastaX: 773,
			hastaY: 125
		}),
		new ZombieCaminante('imagenes/zombie2.png', 821, 669, 15, 15, 1, {
			desdeX: 768,
			desdeY: 400,
			hastaX: 860,
			hastaY: 500
		}),
		new ZombieConductor('imagenes/tren_horizontal.png', 20, 325, 100, 30, 5, {
			desdeX: 20,
			hastaX: 961 - 100
		}, 'horizontal'),
		new ZombieConductor('imagenes/tren_vertical.png', 643.5, 22, 30, 100, 5, {
			desdeY: 22,
			hastaY: 577 - 100
		}, 'vertical'),
		new ZombieConductor('imagenes/tren_vertical.png', 673.5, 400, 30, 100, 7, {
			desdeY: 22,
			hastaY: 577 - 100
		}, 'vertical')
	]
}

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
	Resources.load([
		'imagenes/mapa.png',
		'imagenes/clickOrSpace.png',
		'imagenes/mensaje_gameover.png',
		'imagenes/Splash.png',
		'imagenes/bache.png',
		'imagenes/tren_horizontal.png',
		'imagenes/Mensaje1.png',
		'imagenes/Mensaje2.png',
		'imagenes/tren_vertical.png',
		'imagenes/valla_horizontal.png',
		'imagenes/valla_vertical.png',
		'imagenes/zombie1.png',
		'imagenes/zombie2.png',
		'imagenes/zombie3.png',
		'imagenes/zombie4.png',
		'imagenes/zombie1Back.png',
		'imagenes/zombie2Back.png',
		'imagenes/zombie3Back.png',
		'imagenes/zombie4Back.png',
		'imagenes/auto_rojo_abajo.png',
		'imagenes/auto_rojo_arriba.png',
		'imagenes/auto_rojo_derecha.png',
		'imagenes/auto_rojo_izquierda.png',
		'imagenes/auto_verde_abajo.png',
		'imagenes/auto_verde_derecha.png',
		'imagenes/corazon-rojo.png',
		'imagenes/corazon-negro.png',
		'imagenes/finish.png',
	]);
	Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
	return this.obstaculosCarretera.concat(this.bordes);
};

// Esta bandera es para evitar llamar buclePrincipal más de una vez
let gameStarted = false;

Juego.cambiarFondo = function(e) {
	if (e.type === 'keypress' && e.keyCode !== 32) return;
	if (gameStarted) {
		Dibujante.canvas.removeEventListener('click', Juego.cambiarFondo);
		return document.removeEventListener('keypress', Juego.cambiarFondo);
	}
	else if (Juego.fondo === 'Mensaje1') Juego.fondo = 'Mensaje2';
	else {
		Juego.fondo = 'mapa';
		Juego.buclePrincipal();
		gameStarted = true;
	}
	Dibujante.borrarAreaDeJuego();
	Dibujante.dibujarImagen(`imagenes/${Juego.fondo}.png`, 0, 0, Juego.anchoCanvas, Juego.altoCanvas);
	if (Juego.fondo === 'Mensaje2') Dibujante.dibujarImagen(`imagenes/clickOrSpace.png`, 370, 500, 250, 25);
}

Juego.comenzar = function() {
	// Inicializar el canvas del juego
	Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
	Dibujante.canvas.addEventListener('click', this.cambiarFondo);
	document.addEventListener('keypress', this.cambiarFondo);
	Dibujante.dibujarImagen(`imagenes/${Juego.fondo}.png`, 0, 0, Juego.anchoCanvas, Juego.altoCanvas);
	Dibujante.dibujarImagen(`imagenes/clickOrSpace.png`, 370, 500, 250, 25);
};

Juego.buclePrincipal = function() {

	// Con update se actualiza la logica del juego, tanto ataques como movimientos
	this.update();
	// Funcion que dibuja por cada fotograma a los objetos en pantalla.
	this.dibujar();
	// Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
	window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
	this.calcularAtaques();
	this.moverEnemigos();
}
// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
	var movX = 0;
	var movY = 0;
	var velocidad = this.jugador.velocidad;

	// El movimiento esta determinado por la velocidad del jugador
	if (tecla == 'izq') {
		movX = -velocidad;
	}
	if (tecla == 'arriba') {
		movY = -velocidad;
	}
	if (tecla == 'der') {
		movX = velocidad;
	}
	if (tecla == 'abajo') {
		movY = velocidad;
	}

	// Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
	if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
		/* Aca tiene que estar la logica para mover al jugador invocando alguno
		de sus metodos */
		this.jugador.mover(movX, movY);
		/* COMPLETAR */
	}
};

Juego.dibujar = function() {
	// Borrar el fotograma actual
	Dibujante.borrarAreaDeJuego();
	//Se pinta la imagen de fondo segun el estado del juego
	this.dibujarFondo();
	/* Aca hay que agregar la logica para poder dibujar al jugador principal
	utilizando al dibujante y los metodos que nos brinda.
	"Dibujante dibuja al jugador" */
	Dibujante.dibujarEntidad(Jugador);
	/* Completar */
	// Se recorren los obstaculos de la carretera pintándolos
	this.obstaculosCarretera.forEach(obstaculo => Dibujante.dibujarEntidad(obstaculo));
	
	// Se recorren los enemigos pintándolos
	this.enemigos.forEach(enemigo => Dibujante.dibujarEntidad(enemigo));
	
	// El dibujante dibuja las vidas del jugador
	let color;
	for (var i = 0; i < 5; i++) {
		color = i < this.jugador.vidas ? 'rojo' : 'negro';
		Dibujante.dibujarImagen(`imagenes/corazon-${color}.png`, 910 - (i * 27), 30, 25, 25);
	}
};




/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
	this.enemigos.forEach(enemigo => {
		enemigo.mover();
	});
};

/* Recorre los enemigos para ver cuál está colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el método posicionValida. Allí
se ven las colisiones con los obstáculos. En este caso será con los zombies. */
Juego.calcularAtaques = function() {
	this.enemigos.forEach(function(enemigo) {
		if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
			/* Si el enemigo colisiona debe empezar su ataque
			COMPLETAR */
			enemigo.comenzarAtaque(this.jugador);
		} else {
			/* Sino, debe dejar de atacar
			COMPLETAR */
			enemigo.dejarDeAtacar();
		}
	}, this);
};



/* Aca se chequea si el jugador se peude mover a la posicion destino.
Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
	var puedeMoverse = true
	this.obstaculos().forEach(function(obstaculo) {
		if (this.intersecan(obstaculo, this.jugador, x, y)) {
			/*COMPLETAR, obstaculo debe chocar al jugador*/
			obstaculo.chocar(this.jugador);
			puedeMoverse = false;
		}
	}, this)
	return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function(elemento1, elemento2, x, y) {
	var izquierda1 = elemento1.x
	var derecha1 = izquierda1 + elemento1.ancho
	var techo1 = elemento1.y
	var piso1 = techo1 + elemento1.alto
	var izquierda2 = x
	var derecha2 = izquierda2 + elemento2.ancho
	var techo2 = y
	var piso2 = y + elemento2.alto
	
	return ((piso1 >= techo2) && (techo1 <= piso2) &&
	(derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function() {
	// Si se termino el juego hay que mostrar el mensaje de game over de fondo
	if (this.terminoJuego() || this.ganoJuego()) {
		Dibujante.limpiarCanvas();
		Dibujante.dibujarImagen(`imagenes/${this.fondo}.png`, 0, 5, this.anchoCanvas, this.altoCanvas);
		document.getElementById('reiniciar').style.visibility = 'visible';
		document.addEventListener('keypress', function(e) {
			if (e.keyCode !== 32) return;
			window.location.reload();
		});
	}
	if (this.terminoJuego()) {
		// Si se terminó el juego hay que mostrar el mensaje de terminoJuego de fondo
		Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
	} else if (this.ganoJuego()) {
		// Si se ganó el juego hay que mostrar el mensaje de ganoJuego de fondo
		Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
	} else {
		Dibujante.dibujarImagen(`imagenes/${this.fondo}.png`, 0, 5, this.anchoCanvas, this.altoCanvas);
		Dibujante.dibujarImagen('imagenes/finish.png', 759, 510, 128, 60);
	}
};

Juego.terminoJuego = function() {
	return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
	return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener('keydown', function(e) {
	var allowedKeys = {
		37: 'izq',
		38: 'arriba',
		39: 'der',
		40: 'abajo'
	};
	Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
