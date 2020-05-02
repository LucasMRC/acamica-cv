const sumatoria = arr => {
	return arr.reduce((a, b) => a + b);
}

const promedio = arr => {
	return sumatoria(arr) / arr.length;
}

var restaurante = function(id, nombre, rubro, ubicacion, horarios, imagen, calificaciones) {
    this.id = id;
    this.nombre = nombre;
    this.rubro = rubro;
    this.ubicacion = ubicacion;
    this.horarios = horarios;
    this.imagen = imagen;
    this.calificaciones = calificaciones;
}

restaurante.prototype.reservarHorario = function(horarioReservado) {
	const horarios = [ ...this.horarios ];
	this.horarios = horarios.filter(horario => horario !== horarioReservado);
}

restaurante.prototype.calificar = function(nuevaCalificacion) {
    if (Number.isInteger(nuevaCalificacion) && nuevaCalificacion > 0 && nuevaCalificacion < 10) {
        this.calificaciones.push(nuevaCalificacion);
    }
}

restaurante.prototype.obtenerPuntuacion = function() {
    if (this.calificaciones.length === 0) {
        return 0;
    } else {
        return Math.round(promedio(this.calificaciones));
    }

}

