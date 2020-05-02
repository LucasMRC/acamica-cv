const Reserva = function(horario, personas, precio, descuento) {
	this.horario = horario;
	this.personas = personas;
	this.precio = precio;
	this.descuento = descuento;
}

Reserva.prototype.calcularPrecioBase = function() {
	return this.precio * this.personas;
}

Reserva.prototype.calcularPrecioFinal = function() {
	return this.calcularPrecioBase() + this.calcularAdicionales() + this.calcularDescuentos();
}

Reserva.prototype.calcularAdicionales = function() {
	let precioFinal = 0;
	if (
		this.horario.getDay() === 5
		|| this.horario.getDay() === 6
		|| this.horario.getDay() === 0
	) {
		precioFinal += this.calcularPrecioBase() * 10 / 100;
	}
	if (
		this.horario.getHours() === 20
		|| this.horario.getHours() === 13
	) {
		precioFinal += this.calcularPrecioBase() * 5 / 100;
	}
	return precioFinal;
}

Reserva.prototype.calcularDescuentos = function() {
	let precioFinal = 0;
	this.personas < 4
		? null
		: (4 <= this.personas && this.personas <= 6)
			? precioFinal -= this.calcularPrecioBase() * 5 / 100
			: (7 <= this.personas && this.personas <= 8)
				? precioFinal -= this.calcularPrecioBase() * 10 / 100
				: precioFinal -= this.calcularPrecioBase() * 15 / 100;
	
	if (this.descuento) {
		this.descuento === 'DES15'
			? precioFinal -= this.calcularPrecioBase() * 15 / 100
			: this.descuento === 'DES200'
				? precioFinal -= 200
				: precioFinal -= this.precio;
	}
	return precioFinal;
}