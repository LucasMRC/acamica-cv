const expect = chai.expect;
const restauranteDePrueba = new restaurante(1, 'restaurante', 'Helados', 'San Marcos Sierras', ['10:00', '12:00', '14:00', '16:00', '18:00', '20:00'], '', []);
const listadoDePrueba = new Listado(listadoDerestaurantes);
const reservaDePrueba = new Reserva(new Date(2018, 7, 25, 13, 00), 8, 350, "DES1");
let boolean,
	horarios,
	calificaciones,
	resultadoObtenido,
	resultadoEsperado;
	var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
	var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");

describe('Cuando se corre la función reservarHorarios:', () => {
	it('El largo del arreglo disminuye en uno.',
	() => {
		const cantidadDeHorarios = restauranteDePrueba.horarios.length;
		restauranteDePrueba.reservarHorario('12:00');
		boolean = restauranteDePrueba.horarios.length === cantidadDeHorarios - 1;
		expect(boolean).to.equal(true);
	});
	it('El horario correspondiente se elimina del arreglo.',
	() => {
		restauranteDePrueba.reservarHorario('10:00');
		horarios = [...restauranteDePrueba.horarios];
		boolean = !horarios.includes('10:00');
		expect(boolean).to.equal(true);
	});
	it('Los horarios restantes se mantienen en el arreglo.',
	() => {
		horarios = [...restauranteDePrueba.horarios];
		restauranteDePrueba.reservarHorario('14:00');
		boolean = restauranteDePrueba.horarios.toString() === horarios.filter(horario => horario !== '14:00').toString();
		expect(boolean).to.equal(true);
	});
	it('Si el horario no existe, el arreglo se mantiene igual.',
	() => {
		horarios = [...restauranteDePrueba.horarios];
		restauranteDePrueba.reservarHorario('22:00');
		boolean = horarios.toString() === restauranteDePrueba.horarios.toString();
		expect(boolean).to.equal(true);
	});
	it('Si no se pasa un parámetro, el arreglo se mantiene igual.',
	() => {
		horarios = [...restauranteDePrueba.horarios];
		restauranteDePrueba.reservarHorario();
		boolean = horarios.toString() === restauranteDePrueba.horarios.toString();
		expect(boolean).to.equal(true);
	});
});

describe('Cuando se corre la función obtenerPuntuacion:', () => {
	it('Si el restaurante no posee puntuación, el resultado es igual a 0.', () => {
		boolean = restauranteDePrueba.obtenerPuntuacion() === 0;
		expect(boolean).to.equal(true);
	});
	it('El promedio se calcula correctamente.', () => {
		restauranteDePrueba.calificaciones = [5, 5, 6, 7, 9, 9, 9, 9, 10, 3];
		const promedio = Math.round(restauranteDePrueba.calificaciones.reduce((a, b) => a + b) / restauranteDePrueba.calificaciones.length);
		boolean = restauranteDePrueba.obtenerPuntuacion() === promedio;
		expect(boolean).to.equal(true);
	});
});

describe('Cuando se corre la función calificar:', () => {
	it('El valor ingresado debe ser un número.', () => {
		calificaciones = [ ...restauranteDePrueba.calificaciones ];
		restauranteDePrueba.calificar('9');
		boolean = calificaciones.toString() === restauranteDePrueba.calificaciones.toString();
		expect(boolean).to.equal(true);
	});
	it('El valor ingresado debe ser un entero.', () => {
		calificaciones = [ ...restauranteDePrueba.calificaciones ];
		restauranteDePrueba.calificar(4.5)
		boolean = calificaciones.toString() === restauranteDePrueba.calificaciones.toString();
		expect(boolean).to.equal(true);
	});
	it('El valor ingresado debe estar comprendido en el rango entre 0 y 10', () => {
		calificaciones = [ ...restauranteDePrueba.calificaciones ];
		restauranteDePrueba.calificar(0);
		restauranteDePrueba.calificar(10);
		restauranteDePrueba.calificar(-1);
		restauranteDePrueba.calificar(12);
		boolean = calificaciones.toString() === restauranteDePrueba.calificaciones.toString();
		expect(boolean).to.equal(true);
	});
});

describe('Cuando se corre la función buscarRestaurante:', () => {
	it('Sólo devuelve aquel restaurante cuyo ID sea el indicado', () => {
		resultadoObenido = listadoDePrueba.buscarRestaurante(14);
		resultadoEsperado = listadoDePrueba.restaurantes.find(elemento => elemento.id === 14);
		boolean = resultadoObenido === resultadoEsperado;
		expect(boolean).to.equal(true);
	});
	it('Si el ID no pertenece a un restaurante de la lista, se muestra la leyenda indicada', () => {
		const id = 12354;
		resultadoObtenido = listadoDePrueba.buscarRestaurante(id);
		const resultadoIndefinido = listadoDePrueba.restaurantes.find(restaurante => restaurante.id === id);
		boolean = (resultadoIndefinido === undefined) && (resultadoObtenido === 'No se ha encontrado ningún restaurante');
		expect(boolean).to.equal(true);
	});
});

describe('Cuando se corre la función obtenerRestaurantes:', () => {
	it('Si los parámetros pasados son nulos, el listado se devuelve completo.', () => {
		const listado = [ ...listadoDePrueba.restaurantes ];
		resultadoObtenido = listadoDePrueba.obtenerRestaurantes(null, null, null);
		boolean = listado.toString() === resultadoObtenido.toString();
		expect(boolean).to.equal(true);
	});
	it('Si no se pasan parámetros, devuelve una lista vacía.', () => { // <== No estoy seguro de que esto sea lo que se busca..
		resultadoObtenido = listadoDePrueba.obtenerRestaurantes();
		boolean = resultadoObtenido.toString() === [].toString();
		expect(boolean).to.equal(true);
	});
	it('Si se pasa un rubro por parámetro, los resultados respetarán ese rubro.', () => {
		resultadoObtenido = listadoDePrueba.obtenerRestaurantes('Asiática', null, null);
		boolean = resultadoObtenido.every(restaurante=> restaurante.rubro === 'Asiática')
		expect(boolean).to.equal(true);
	});
	it('Si se pasa un rubro por parámetro, quedarán excluídos sólo aquellos que no sean de dicho rubro.', () => {
		resultadoObtenido = listadoDePrueba.obtenerRestaurantes('Asiática', null, null);
		const restaurantesNoObtenidos = listadoDePrueba.restaurantes.filter(restaurante=> !resultadoObtenido.includes(restaurante));
		boolean = restaurantesNoObtenidos.every(restaurante=> restaurante.rubro !== 'Asiática');
		expect(boolean).to.equal(true);
	});
});

describe('Cuando se corre la función nuevaReserva:', () => {
	it('El precio base del restaurant deberá ser calcularse multiplicando el precio por la cantidad de comensales.', () => {
		resultadoObtenido = [reservaDePrueba.calcularPrecioBase(), reserva1.calcularPrecioBase(), reserva2.calcularPrecioBase()].toString();
		resultadoEsperado = [2800, 2800, 300].toString();
		boolean = resultadoObtenido === resultadoEsperado;
		expect(boolean).to.equal(true);
	});
	it('El precio final del restaurant deberá ser calcularse descontando los descuentos y adicionando los adicionales.', () => {
		resultadoObtenido = [reservaDePrueba.calcularPrecioFinal(), reserva1.calcularPrecioFinal(), reserva2.calcularPrecioFinal()];
		resultadoEsperado = [2590, 2450, 100];
		boolean = resultadoObtenido.toString() === resultadoEsperado.toString();
		expect(boolean).to.equal(true);
	});
});