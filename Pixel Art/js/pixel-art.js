// Variables ===============================================

let iniciado = false; // Bandera para determinar si se ha elegido al menos un color
let dibujando; // Bandera para determinar si se está dibujando
let modo = 'pixeles'; // Alternar entre Pixel mode y Canvas mode
let dibujarArcoiris = false; // El trazo cambia de color
let pincelLoco = false; // El trazo cambia de grosor
let trazoDePincel = 1;
let disminuirGrosor = false; // Controla el ancho del pincel en modo Pincel Loco
let matiz = 0; // Determina el color dinámico en el trazo arcoiris
let color; // Color elegido

// Modo Canvas: Definir canvas y el contexto
let canvas;
let contexto;

// Modo Canvas: Para el trazo del canvas
let posicionX;
let posicionY;

// Funciones =======================================================

const crearGrilla = () => {
	// Define el array con divs para rellenar la #paleta
		const contenedor = [];
		// Crea los div.paleta-color
			nombreColores.forEach(color => {
				contenedor.push(`<div class="paleta-color" style="background-color: ${color};" ></div>`);
			});
		// Agregar los div.paleta-color a la #paleta
		$('#paleta').html(contenedor);
		
}

const añadirDivs = () => {
	const grilla = [];
	if (modo === 'pixeles')
		// Agregar los divs a la grilla
		for (let i = 0; i < 1749; i++) grilla.push('<div></div>');
		else
		// Agregar el canvas a la grilla
		grilla.push('<canvas id="canvas" width="795" height="495"></canvas>');

	$('#grilla-pixeles').html(grilla);

	modo === 'pixeles'
		? ($('#grilla-pixeles div').css({
				transition: 'opacity ease 500ms',
				opacity: 0
			}),
			setTimeout(() =>
			$('#grilla-pixeles > div').css('opacity', 1), 500))

		: $('#grilla-pixeles canvas').css('transition', 'opacity ease 500ms');
}

const seleccionarColor = e => {
	color = e.target.value || window.getComputedStyle(e.target).backgroundColor;
	$('#indicador-de-color').css('background', color);
	if (!iniciado) {
		iniciado = true;
		$('.cursor-personalizado').css('cursor', 'url(./img/cursor.png), auto');
	}
};

const dibujarEnCanvas = e => {
	canvas = document.querySelector('#canvas');
	contexto = canvas.getContext('2d');
	contexto.lineJoin = 'round';
	contexto.lineCap = 'round';

	contexto.lineWidth = pincelLoco === true
		? trazoDePincel
		: 5;
	contexto.strokeStyle = dibujarArcoiris === true
		? `hsl(${matiz}, 100%, 50%)`
		: color;

	posicionX !== undefined &&
		(contexto.beginPath(),
		contexto.moveTo(posicionX, posicionY),
		contexto.lineTo(e.offsetX, e.offsetY),
		contexto.stroke());

	[ posicionX, posicionY ] = [ e.offsetX, e.offsetY ];

	// Controlar los valores en modo Arcoiris y Pincel Loco
	dibujarArcoiris === true && matiz++;
	pincelLoco === true &&
		(disminuirGrosor === false
			? trazoDePincel += .5
			: trazoDePincel -= .5);

	// Resetear valores al llegar a los límites
	(matiz === 360) && (matiz = 0);
	trazoDePincel >= 50 && (disminuirGrosor = true);
	trazoDePincel <= 1 && (disminuirGrosor = false);
}

const activarArcoiris = () => {
	dibujarArcoiris = true;
}

const alternarPincelLoco = () => {
	pincelLoco === true
		? pincelLoco = false
		: pincelLoco = true;
}

const cargarContenido = () => {
	// Contenido específico del modo pixeles
	const contenidoEnModoPixel = `<h3>Usá a tu superhéroe favorito</h3>
		<ul class="imgs pixel-imgs">
			<li>
				<img id="batman" src="img/batman.png" alt="batman">
			</li>
			<li>
				<img id="wonder" src="img/wonder.png" alt="wonder woman">
			</li>
			<li>
				<img id="flash" src="img/flash.png" alt="flash">
			</li>
			<li>
				<img id="invisible" src="img/invisible.png" alt="invisible">
			</li>
		</ul>`;
	// Contenido específico del modo canvas
	const contenidoEnModoCanvas = `<h3>Elige modalidades especiales</h3>
		<ul class="imgs canvas-imgs">
			<li>
				<img src="img/arcoiris.png" alt="" >
			</li>
			<li>
				<img id="rainbow" src="img/rainbow.jpg" alt="Arcoiris" >
			</li>
			<li>
				<img id="crazy-brush" src="img/crazy_paintbrush.png" alt="Pincel Loco" >
			</li>
			<li>
				<img src="img/pincel-loco.png" alt="" >
			</li>
		</ul>`;

	const contenido = modo === 'pixeles' ? contenidoEnModoPixel : contenidoEnModoCanvas;
	// Cargar el contenido específico
	$('#contenido-especifico').html(contenido);

	if (modo === 'pixeles') {
		// Si en modo pixeles, añadir listeners para cargar personajes
		$('#batman').on('mousedown', () => cargarSuperheroe(batman));
		$('#flash').on('mousedown', () => cargarSuperheroe(flash));
		$('#invisible').on('mousedown', () => cargarSuperheroe(invisible));
		$('#wonder').on('mousedown', () => cargarSuperheroe(wonder));
	} else {
		// Sino, añadir listener para las funcionalidades especiales
		$('#rainbow').on('mousedown', () => {
			activarArcoiris();
			$('#indicador-de-color').css('background', 'url(img/rainbow-pixel.jpg) no-repeat center/cover');
			if (!iniciado) iniciado = true;
			$('.cursor-personalizado').css('cursor', 'url(./img/cursor.png), auto');
		});
		$('#crazy-brush').on('mousedown', () => {
			alternarPincelLoco();
			const value = pincelLoco === false
				? 'none'
				: 'brightness(0.4)';
			$('#crazy-brush').css('filter', value);
		});
	}
}

const comenzar = () => {
	if (modo === 'pixeles' && dibujarArcoiris) {
		iniciado = false;
		$('#indicador-de-color').css('background', 'url(img/empty.gif)');
		$('.cursor-personalizado').css('cursor', 'not-allowed');
	}
	crearGrilla();
	añadirDivs();
	cargarContenido();
}

// Event Listeners ===================================================

// Cambiar colores seleccionados
$('#paleta').on('mousedown', e => {
	if (e.target.id === 'paleta') return;
	if (dibujarArcoiris === true) dibujarArcoiris = false;
	seleccionarColor(e);
});

$('#color-personalizado').on('change', e => {
	if (dibujarArcoiris === true) dibujarArcoiris = false;
	seleccionarColor(e);
});

// Borrar todo
$('#borrar').on('mousedown', () => {
	modo === 'pixeles'
		? $('#grilla-pixeles div').css({
			backgroundColor: '#FFF',
			transition: 'ease 500ms'
		})

		: (contexto &&
			$('#grilla-pixeles canvas').css('opacity', 0),
			setTimeout(() =>
				contexto.clearRect(0, 0, canvas.width, canvas.height), 600)
			);
});

$('#borrar').on('mouseup', () => {
	setTimeout(() => {
		modo === 'pixeles'
			? $('#grilla-pixeles div').css('transition', 'opacity ease 500ms')
			: $('#grilla-pixeles canvas').css('opacity', 1);
	}, 600);
});

// Guardar
$('#guardar').on('mousedown', () => guardarPixelArt());

// Alternar bandera de dibujo
$('#grilla-pixeles').on('mousedown', e => {
	dibujando = true;
	[ posicionX, posicionY ] = [ e.offsetX, e.offsetY ]
});

$('#grilla-pixeles').on('mouseup mouseleave', () => {
	dibujando = false;
});

// Dibujar
$('#grilla-pixeles').on('mousemove', e => {
	if (dibujando && iniciado) {
		if (color === '') return;
		modo === 'pixeles'
			? $(e.target).css('background-color', color)
			: dibujarEnCanvas(e);
	}
});

// Alternar Pixel Mode y Canvas Mode
$('#modo').on('click', () => {
	let target;
	let contenido;
	let textoDelBoton;
	if (modo === 'pixeles') {
		target = $('#grilla-pixeles div');
		modo = 'canvas';
		textoDelBoton = 'pixeles'
	} else {
		target = $('#grilla-pixeles canvas');
		modo = 'pixeles';
		textoDelBoton = 'canvas'
	}
	target.css('opacity', 0);
	$('#modo').html(`Cambiar a ${textoDelBoton}`);
	setTimeout(() => {
		comenzar();
	}, 1000);
});

comenzar();