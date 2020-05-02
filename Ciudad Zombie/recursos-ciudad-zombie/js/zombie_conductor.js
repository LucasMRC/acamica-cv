/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, rangoMov, sentido/*, parametro/s extra de ZombieConductor*/) {
	/* Completar constructor a partir de Enemigo */
	Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
	this.sentido = sentido;
	/* No olvidar agregar la/s propiedad/es unicas de ZombieConductor necesarias */
}

ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;

ZombieConductor.prototype.mover = function() {
	/* Los movimientos estan basados en un numero aleatorio
	La direccion horizontal es siempre la misma y va ondulando verticalmente.
	Esto hasta llegar a sus limites, donde se invierte su direccion horizontal */
	let eje, desdeEje, hastaEje;
	this.sentido === 'vertical'
		? (eje = 'y', desdeEje = 'desdeY', hastaEje = 'hastaY')
		: (eje = 'x', desdeEje = 'desdeX', hastaEje = 'hastaX');

	this[eje] -= this.velocidad;

	/* En esta parte lo que hacemos es invertir la direccion horizontal si
	toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la
	velocidad lo que estamos haciendo es invertir su direccion. */
	if ((this[eje] < this.rangoMov[desdeEje]) || (this[eje] > this.rangoMov[hastaEje])){
		this.velocidad *= -1;
	}
}

ZombieConductor.prototype.atacar = jugador => {
	jugador.perderVidas(jugador.vidas);
}
/* Completar creacion del ZombieConductor */

/* Completar metodos para el movimiento y el ataque */
