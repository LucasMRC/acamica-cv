var Jugador = {
	sprite: 'imagenes/auto_rojo_abajo.png',
	x: 130,
	y: 160,
	ancho: 15,
	alto: 30,
	velocidad: 10,
	vidas: 5,
	mover: (movX, movY) => {
		if (movX !== 0) {
			if (movX < 0) this.Jugador.sprite = 'imagenes/auto_rojo_izquierda.png';
			else this.Jugador.sprite = 'imagenes/auto_rojo_derecha.png';
			this.Jugador.ancho = 30;
			this.Jugador.alto = 15;
		} else {
			if (movY < 0) this.Jugador.sprite = 'imagenes/auto_rojo_arriba.png';
			else this.Jugador.sprite = 'imagenes/auto_rojo_abajo.png';
			this.Jugador.ancho = 15;
			this.Jugador.alto = 30;
		}
		this.Jugador.x += movX;
		this.Jugador.y += movY;
	},
	perderVidas: vidasPerdidas => {
		if (vidasPerdidas > this.Jugador.vidas) return this.Jugador.vidas = 0;
		this.Jugador.vidas -= vidasPerdidas;
	}
}