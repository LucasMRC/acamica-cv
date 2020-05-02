const db = require('../lib/conexionbd');

const getAllMovies = async (req, res, next) => {
	const {
		anio,
		titulo,
		genero,
		columna_orden,
		tipo_orden,
		pagina,
		cantidad
	} = req.query;
	let filters = '';
	if (anio) filters += ` where anio = ${anio}`;
	if (titulo) filters += ` ${anio ? 'and' : 'where'} titulo like '%${titulo}%'`;
	if (genero) filters += ` ${anio || titulo ? 'and' : 'where'} genero_id = ${genero}`;
	
	const sql = `select * from pelicula${filters} order by ${columna_orden} ${tipo_orden} limit ${pagina}, ${cantidad};`;
	await db.query(sql, async (err, result, fields) => {
		if (err) return console.log(err);
		const peliculas = result;
		const sql = `select count(id) as total from pelicula${filters}`;
		await db.query(sql, (err, result, fields) => {
			if (err) return console.log(err);
			const total = result[0].total;
			res.send({ peliculas, total });
		});
	});
};

const getGenres = async (req, res, next) => {
	const sql = 'select * from genero';
	await db.query(sql, (err, result, fields) => {
		if (err) return console.log(err);
		res.send({ generos: result });
	});
};

const getMovieInfo = async (req, res, next) => {
	const movieId = req.params.id;
	const sql = `select * from pelicula where id = ${movieId}`;
	await db.query(sql, async (err, result, fields) => {
		if (err) return console.log(err);
		const pelicula = result[0];
		if (!pelicula) {
			return res.send('../../cliente/html/error.html');
		} else {
			const sql = `select nombre from actor join actor_pelicula on actor_pelicula.actor_id = actor.id join pelicula on pelicula.id = actor_pelicula.pelicula_id where pelicula.id = ${movieId};`;
			await db.query(sql, async (err, result, fields) => {
				if (err) return console.log(err);
				const actores = result;
				const sql = `select nombre from genero join pelicula on genero.id = pelicula.genero_id where pelicula.id = ${movieId};`;
				await db.query(sql, (err, result, fields) => {
					if (err) return console.log(err);
					const genero = result[0];
					res.send({ pelicula, actores, genero });
				});
			});
		}
	});
};

const getRecomendation = async (req, res, next) => {
	const { query } = req;
	const params = Object.keys(query);
	
	let filters = '';
	params.forEach((param, index) => {
		if (!param) return;
		else if (param !== 'anio_fin' && index === 0) filters += ' where ';
		else if (param !== 'anio_fin') filters += ' and ';

		switch(param) {
			case 'genero':
				filters += `genero.nombre = '${query.genero}'`;
				break;
			case 'puntuacion':
				filters += `pelicula.puntuacion >= ${query.puntuacion}`;
				break;
			case 'anio_inicio':
				filters += `pelicula.anio between ${query.anio_inicio} and ${query.anio_fin}`;
				break;
			default:
				return;
		}
	})

	const sql = `select pelicula.id, poster, trama, nombre, titulo from pelicula join genero on pelicula.genero_id = genero.id${filters};`;
	await db.query(sql, (err, result, fields) => {
		if (err) return console.log(err);
		res.send({ peliculas: result });
	});
};

module.exports = {
	getAllMovies,
	getGenres,
	getMovieInfo,
	getRecomendation
};