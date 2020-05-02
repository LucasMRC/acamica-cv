// Declaración de variables
const nombreUsuario = 'Lucas Reyna Córdoba';
let saldoCuenta = 200;
let limiteExtraccion = 4000;
let monto;
let cuentaRetenida;

/* ========================================== */

// Declarar funciones para las validaciones
const noHaySaldoSuficiente = () => monto > saldoCuenta;
const montoEsMayorAlLimite = () => monto > limiteExtraccion;
const noEsMultiploDeCien = () => monto % 100 !== 0;

const chequearElValorIngresado = () => {
	// No continuar si usuario cancela la operación
	if (!monto) {
		alert('Operación cancelada.');
		return true;
	}
	// Chequear que el valor ingresado sea un número
	if (monto && !Number(monto)) {
		alert('Debes ingresar un número válido.');
		return true;
	}
};

const chequearEstadoDeCuenta = () => {
	if (cuentaRetenida) {
		alert(
			'Por razones de seguridad, su cuenta se encuentra momentáneamente retenida.\nPara recuperarla, pónganse en contacto con su banco.'
		);
		return true;
	}
};

/* ========================================== */

// Función para pagar el servicio seleccionado
const pagarServicioElegido = servicio => {
	if (noHaySaldoSuficiente()) {
		return alert('No hay suficiente saldo para pagar este servicio.');
	}
	const saldoAnterior = saldoCuenta;
	saldoCuenta -= monto;
	actualizarSaldoEnPantalla();
	alert(
		`Has pagado el servicio ${servicio}.\n
		Saldo anterior: $${saldoAnterior}
		Dinero descontado: $${monto}
		Saldo actual: $${saldoCuenta}`
	);
};

/* ========================================== */

// Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
	iniciarSesion();
	cargarNombreEnPantalla();
	actualizarSaldoEnPantalla();
	actualizarLimiteEnPantalla();
};

/* ========================================== */
/* = Comienza definición de funciones de HB = */
/* ========================================== */

// Funciones que tenes que completar

function cambiarLimiteDeExtraccion() {
	if (chequearEstadoDeCuenta()) return;

	monto = prompt('Ingrese el nuevo límite de extracción');

	if (chequearElValorIngresado()) return;

	limiteExtraccion = monto;
	actualizarLimiteEnPantalla();
	alert(`El nuevo límite de extracción es de $${limiteExtraccion}`);
}

/* ========================================== */

function extraerDinero() {
	if (chequearEstadoDeCuenta()) return;

	monto = prompt('Ingrese el monto que desea extraer');

	if (chequearElValorIngresado()) return;

	if (noHaySaldoSuficiente()) {
		return alert(
			'No hay saldo disponible en tu cuenta para extraer esa cantidad de de dinero.'
		);
	}
	if (montoEsMayorAlLimite()) {
		return alert(
			'La cantidad de dinero que deseas extraer es mayor a tu límite de extracción.'
		);
	}
	if (noEsMultiploDeCien()) {
		return alert('Sólo puedes extraer billetes de 100.');
	}

	const saldoAnterior = saldoCuenta;
	saldoCuenta -= Number(monto);
	actualizarSaldoEnPantalla();
	alert(
		`Has extraído $${monto}.
	Tu saldo anterior era de $${saldoAnterior}.
	Tu saldo actual es de $${saldoCuenta}.`
	);
}

/* ========================================== */

function depositarDinero() {
	if (chequearEstadoDeCuenta()) return;

	monto = prompt('Ingrese el monto que desea depositar');

	if (chequearElValorIngresado()) return;

	const saldoAnterior = saldoCuenta;
	saldoCuenta += Number(monto);
	actualizarSaldoEnPantalla();
	alert(
		`Has depositado $${monto}
	Tu saldo anterior era de $${saldoAnterior}
	Tu saldo actual es de $${saldoCuenta}`
	);
}

/* ========================================== */

function pagarServicio() {
	if (chequearEstadoDeCuenta()) return;

	const agua = 350;
	const telefono = 425;
	const luz = 210;
	const internet = 570;

	const servicio = prompt(
		`Ingrese el número que corresponda con el servicio que desea pagar.\n
	1 - Agua
	2 - Luz
	3 - Internet
	4 - Teléfono`
	);

	// No continua si se cancela la operación
	if (!servicio) {
		alert('Operación cancelada.');
		return true;
	}

	switch (Number(servicio)) {
		case 1:
			monto = agua;
			pagarServicioElegido('Agua');
			break;
		case 2:
			monto = luz;
			pagarServicioElegido('Luz');
			break;
		case 3:
			monto = internet;
			pagarServicioElegido('Internet');
			break;
		case 4:
			monto = telefono;
			pagarServicioElegido('Teléfono');
			break;
		default:
			return alert(
				'Por favor, ingresa una opción válida para continuar con la operación.'
			);
	}
}

/* ========================================== */

function transferirDinero() {
	if (chequearEstadoDeCuenta()) return;

	const cuentaAmiga1 = 1234567;
	const cuentaAmiga2 = 7654321;

	monto = prompt('Ingrese el monto que desea transferir.');

	if (chequearElValorIngresado()) return;

	if (noHaySaldoSuficiente()) {
		return alert(
			'No hay saldo disponible en tu cuenta para realizar esa transferencia.'
		);
	}

	const cuentaDestino = Number(
		prompt('Ingresa el número de la cuenta a la que quiere transferir.')
	);
	if (cuentaDestino !== cuentaAmiga1 && cuentaDestino !== cuentaAmiga2) {
		return alert(
			'Sólo puedes transferir dinera a una de tus cuentas amigas.'
		);
	}

	saldoCuenta -= Number(monto);
	actualizarSaldoEnPantalla();
	alert(
		`Se han transferido $${monto}
		Cuenta destino: ${cuentaDestino}`
	);
}

/* ========================================== */

function iniciarSesion() {
	const contraseña = 3333;
	let codigoIngresado = Number(
		prompt('Por favor, ingrese su código de seguridad.')
	);

	while (!codigoIngresado) {
		codigoIngresado = Number(
			prompt(
				'No puede operar sin ingresar a su cuenta.\nPor favor, ingrese su código de seguridad.'
			)
		);
	}

	if (codigoIngresado !== contraseña) {
		saldoCuenta = 0;
		actualizarSaldoEnPantalla();
		cuentaRetenida = true;
		return alert(
			'Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad.'
		);
	}
	return alert(
		`Bienvenido ${nombreUsuario}, ya puedes comenzar a realizar operaciones.`
	);
}

/* ========================================== */

function salir() {
	if (chequearEstadoDeCuenta()) return;

	const verificación = confirm('¿Salir de la cuenta?');

	if (verificación) {
		alert('Muchas gracias por elegirnos.\n¡Hasta luego!');
		window.location.reload(false);
	}
}

/* ========================================== */
/* == Fin de definición de funciones de HB == */
/* ========================================== */

// Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
	let mensaje;
	!cuentaRetenida
		? (mensaje = `Bienvenido/a ${nombreUsuario}`)
		: (mensaje = 'Cuenta Retenida');
	document.getElementById('nombre').innerHTML = mensaje;
}

function actualizarSaldoEnPantalla() {
	document.getElementById('saldo-cuenta').innerHTML = `$${saldoCuenta}`;
}

function actualizarLimiteEnPantalla() {
	let mensaje;
	!cuentaRetenida
		? (mensaje = `Tu límite de extracción es: $${limiteExtraccion}`)
		: (mensaje = 'Cuenta Retenida');
	document.getElementById('limite-extraccion').innerHTML = mensaje;
}
