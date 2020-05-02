// Elementos del DOM =========================================================================

const easyBtn = document.querySelector('#easy');
const mediumBtn = document.querySelector('#medium');
const hardBtn = document.querySelector('#hard');
const startBtn = document.querySelector('#start');
const buttons = document.querySelectorAll('#botonera > button');
const ultimoMov = document.querySelector('#flecha');

// Conceptos del juego ========================================================================

let grilla,
	grillaFinal,
	filaVacia,
	columnaVacia,
	numeroDePiezaFaltante,
	nivelDeJuego,
	MovimientosIniciales;

// Intrucciones del juego
const instrucciones = ['Utiliza las flechas para desenvolverte en el juego', 'Desplaza las piezas de a una por vez', 'Arma la imagen final'];

// Arreglo para ir guardando los movimientos que se vayan realizando
let movimientos = [];

// Funciones iniciales ========================================================================

const buttonHandler = () => {
	buttons.forEach(btn => btn.classList.remove('active'));
	ultimoMov.style.display = 'none';
}

const startBtnHandler = () => {
	startBtn.style.display = 'none';
	iniciar();	
}

const setValues = () => {
	filaVacia = grilla.length - 1;
	columnaVacia = filaVacia;
	numeroDePiezaFaltante = grilla.length * grilla.length;
	startBtn.innerText = '¡Comenzar!';
	startBtn.removeAttribute('disabled');
	startBtn.style.cssText = 'opacity: 1; cursor: pointer;';
}

// Función para esconder el modulo
const hideModule = () => {
	const modulo = document.querySelector('#modulo');
	modulo.classList.remove('show');
}

// Funciones para definir modalidades ===========================================================

const playItEasy = () => {
	grilla = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	];
	grillaFinal = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9]
	];
	MovimientosIniciales = 30;
	buttonHandler();
	easyBtn.classList.add('active');
	nivelDeJuego = 'easy';
	setValues();
	startBtn.innerText = '¡Comenzar!';
};

const playItMedium = () => {
	grilla = [
		[1, 2, 3, 4, 5],
		[6, 7, 8, 9, 10],
		[11, 12, 13, 14, 15],
		[16, 17, 18, 19, 20],
		[21, 22, 23, 24, 25]
	];
	grillaFinal = [
		[1, 2, 3, 4, 5],
		[6, 7, 8, 9, 10],
		[11, 12, 13, 14, 15],
		[16, 17, 18, 19, 20],
		[21, 22, 23, 24, 25]
	];
	MovimientosIniciales = 100;
	buttonHandler();
	mediumBtn.classList.add('active');
	nivelDeJuego = 'medium';
	setValues();
	startBtn.innerText = '¡Comenzar!';
}

const playItHard = () => {
	grilla = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14, 15, 16, 17, 18],
		[19, 20, 21, 22, 23, 24, 25, 26, 27],
		[28, 29, 30, 31, 32, 33, 34, 35, 36],
		[37, 38, 39, 40, 41, 42, 43, 44, 45],
		[46, 47, 48, 49, 50, 51, 52, 53, 54],
		[55, 56, 57, 58, 59, 60, 61, 62, 63],
		[64, 65, 66, 67, 68, 69, 70, 71, 72],
		[73, 74, 75, 76, 77, 78, 79, 80, 81]
	];
	grillaFinal = [
		[1, 2, 3, 4, 5, 6, 7, 8, 9],
		[10, 11, 12, 13, 14, 15, 16, 17, 18],
		[19, 20, 21, 22, 23, 24, 25, 26, 27],
		[28, 29, 30, 31, 32, 33, 34, 35, 36],
		[37, 38, 39, 40, 41, 42, 43, 44, 45],
		[46, 47, 48, 49, 50, 51, 52, 53, 54],
		[55, 56, 57, 58, 59, 60, 61, 62, 63],
		[64, 65, 66, 67, 68, 69, 70, 71, 72],
		[73, 74, 75, 76, 77, 78, 79, 80, 81]
	];
	MovimientosIniciales = 200;
	buttonHandler();
	hardBtn.classList.add('active');
	nivelDeJuego = 'hard';
	setValues();
}

// Captadores de eventos =====================================================================

startBtn.addEventListener('click', startBtnHandler);
easyBtn.addEventListener('click', playItEasy);
mediumBtn.addEventListener('click', playItMedium);
hardBtn.addEventListener('click', playItHard);

/* Esta función deberá recorrer el arreglo de instrucciones pasado por parámetro.
Cada elemento de este arreglo deberá ser mostrado en la lista con id 'lista-instrucciones'.
Para eso deberás usar la función ya implementada mostrarInstruccionEnLista().
Podés ver su implementación en la ultima parte de este codigo. */
function mostrarInstrucciones(instrucciones) {
	const listaDeInstrucciones = document.querySelector('#lista-instrucciones');
	if (listaDeInstrucciones.innerText !== '') return;
	let stringDeLista = '';
	instrucciones.forEach(instruccion => {
		stringDeLista += `<li>${instruccion}</li>`;
	});
	listaDeInstrucciones.innerHTML = stringDeLista;
}

function sumarMovimiento(movimiento) {
	movimientos.push(movimiento);
	actualizarUltimoMovimiento(movimiento);
}
/* COMPLETAR: Crear función que agregue la última dirección al arreglo de movimientos
y utilice actualizarUltimoMovimiento para mostrarlo en pantalla */

/* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora.
Existen diferentes formas de hacer este chequeo a partir de la grilla. */
function chequearSiGano() {
	if (movimientos.length <= MovimientosIniciales) return false;

	if (grilla.toString() === grillaFinal.toString()) {

		const pieceNumber = numeroDePiezaFaltante < 10 ? `0${numeroDePiezaFaltante}` : numeroDePiezaFaltante;
		const disabled = document.createAttribute('disabled');
		const modulo = document.getElementById('modulo');

		let missingPiece = document.querySelector(`.col-60 .pieza${numeroDePiezaFaltante}`);

		ultimoMov.style.display = 'none';
		startBtn.innerText = 'Juega nuevamente'
		startBtn.style.cssText = 'opacity: .5; cursor: not-allowed; display: block;';
		startBtn.setAttributeNode(disabled);

		missingPiece.innerHTML = `<img src="./images/${nivelDeJuego}/image_part_0${pieceNumber}.jpg" alt="Pieza${numeroDePiezaFaltante}">`;
		modulo.classList.add('show');

		return true;
	};
	return false;
}

/* Función que intercambia dos posiciones en la grilla.
Pensar como intercambiar dos posiciones en un arreglo de arreglos.
Para que tengas en cuenta:
Si queremos intercambiar las posiciones [1, 2] con la [0, 0], si hacemos:
arreglo[1][2] = arreglo[0][0];
arreglo[0][0] = arreglo[1][2];

En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
Se te ocurre cómo solucionar esto con una variable temporal?
*/
function intercambiarPosicionesGrid(filaPos1, columnaPos1, filaPos2, columnaPos2) {
	var posicion1 = grilla[filaPos1][columnaPos1];
	var posicion2 = grilla[filaPos2][columnaPos2];
	grilla[filaPos1][columnaPos1] = posicion2;
	grilla[filaPos2][columnaPos2] = posicion1;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
	filaVacia = nuevaFila;
	columnaVacia = nuevaColumna;
}


// Para chequear si la posición está dentro de la grilla.
function posicionValida(fila, columna) {
	if (
		fila < 0 || columna < 0 ||
		fila > (grilla.length - 1) || columna > (grilla.length - 1)
		) {
		return;
	};
	return grilla[fila][columna];
}

/* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
function moverEnDireccion(direccion) {
	var nuevaFilaPiezaVacia;
	var nuevaColumnaPiezaVacia;

	// Mueve pieza hacia la abajo, reemplazandola con la blanca
	if (direccion === codigosDireccion.ABAJO) {
		nuevaFilaPiezaVacia = filaVacia - 1;
	nuevaColumnaPiezaVacia = columnaVacia;
}

	// Mueve pieza hacia arriba, reemplazandola con la blanca
	else if (direccion === codigosDireccion.ARRIBA) {
		nuevaFilaPiezaVacia = filaVacia + 1;
	nuevaColumnaPiezaVacia = columnaVacia;
	}

	// Mueve pieza hacia la derecha, reemplazandola con la blanca
	else if (direccion === codigosDireccion.DERECHA) {
	nuevaFilaPiezaVacia = filaVacia;
	nuevaColumnaPiezaVacia = columnaVacia - 1;
	}
	
	// Mueve pieza hacia la izquierda, reemplazandola con la blanca
	else if (direccion === codigosDireccion.IZQUIERDA) {
	nuevaFilaPiezaVacia = filaVacia;
	nuevaColumnaPiezaVacia = columnaVacia + 1;
}

	/* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia.
	Para que esta parte del código funcione correctamente deberás haber implementado
	las funciones posicionValida, intercambiarPosicionesGrid y actualizarPosicionVacia */
	
	if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
		intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
		actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
		chequearSiGano();
	//COMPLETAR: Agregar la dirección del movimiento al arreglo de movimientos
		sumarMovimiento(direccion);
	} else {
		movimientos.push('Inválido');
	}
}

//////////////////////////////////////////////////////////
////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
/////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
//////////////////////////////////////////////////////////

/* Las funciones y variables que se encuentran a continuación ya están implementadas.
No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
entiendas perfectamente lo que estás haciendo! */

/* codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
	IZQUIERDA: 37,
	ARRIBA: 38,
	DERECHA: 39,
	ABAJO: 40
}

/* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrid() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
	// Intercambio posiciones en la grilla
	const pieza = grilla[fila1][columna1];
	const piezaVacía = grilla[fila2][columna2];

	intercambiarPosicionesDOM(`.pieza${pieza}`,`.pieza${piezaVacía}`);
	intercambiarPosicionesGrid(fila1, columna1, fila2, columna2);
}

/* Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
	// Intercambio posiciones en el DOM
	
	const elementoPieza1 = document.querySelector(`.col-60 > ${idPieza1}`);
	const elementoPieza2 = document.querySelector(`.col-60 > ${idPieza2}`);

	const padre = elementoPieza1.parentNode;

	const clonElemento1 = elementoPieza1.cloneNode(true);
	const clonElemento2 = elementoPieza2.cloneNode(true);

	padre.replaceChild(clonElemento1, elementoPieza2);
	padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
	switch (direccion) {
		case codigosDireccion.ARRIBA:
			ultimoMov.textContent = '↑';
		break;
		case codigosDireccion.ABAJO:
			ultimoMov.textContent = '↓';
		break;
		case codigosDireccion.DERECHA:
			ultimoMov.textContent = '→';
		break;
		case codigosDireccion.IZQUIERDA:
			ultimoMov.textContent = '←';
		break;
	}
}

/* Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
	var ul = document.getElementById(idLista);
	var li = document.createElement("li");
	li.textContent = instruccion;
	ul.appendChild(li);
}

/* Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
	// const disabled = document.createAttribute('disabled');
	buttons.forEach(button => {
		if (veces <= 0) {
			button.removeAttribute('disabled');
			button.style.cssText = 'cursor: pointer; opacity: 1;';
		} else {
			button.setAttribute('disabled', true);
			button.style.cssText = 'cursor: not-allowed; opacity: 0.4;';
		}
	});
	if (veces <= 0) return;

	var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
		codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
	];

	var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
	moverEnDireccion(direccion);

	setTimeout(function() {
		mezclarPiezas(veces - 1);
	}, 100);
}

/* capturarTeclas: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora,
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
	document.body.onkeydown = (function(evento) {
		if (chequearSiGano()) return;
		if (evento.which === codigosDireccion.ABAJO ||
		evento.which === codigosDireccion.ARRIBA ||
		evento.which === codigosDireccion.DERECHA ||
		evento.which === codigosDireccion.IZQUIERDA) {
			moverEnDireccion(evento.which);
		}
	})
}

/* Se inicia el rompecabezas mezclando las piezas 60 veces
y ejecutando la función para que se capturen las teclas que
presiona el usuario */
function iniciar() {
	const modulo = document.getElementById('modulo');
	modulo.classList.contains('show') !== -1 && modulo.classList.remove('show');
	mostrarInstrucciones(instrucciones);
	const missingPiece = document.querySelector(`.col-60 .pieza${numeroDePiezaFaltante}`);
	missingPiece.innerHTML = '';
	try {
		ultimoMov.style.display = 'block';
		mezclarPiezas(MovimientosIniciales);
	} finally {
		capturarTeclas();
	}
	movimientos = [];
}