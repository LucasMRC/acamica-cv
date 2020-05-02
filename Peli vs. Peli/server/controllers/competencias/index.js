const db = require('../../connection');

/* ===================================================== */
/* ============== COMIENZAN LAS RUTAS .GET ============= */
/* ===================================================== */

const getCompetitions = async (req, res, next) => {
	const competitionsQuery = 'SELECT * FROM competencia';
	await db.query(competitionsQuery, (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		res.send(result);
	});
};

	/* =================================================================================================== */

const getCompetitionData = async (req, res, next) => {
	const { id } = req.params;
	const competitionQuery = `SELECT c.nombre, d.nombre as director_nombre, a.nombre as actor_nombre, g.nombre as genero_nombre FROM competencia c LEFT JOIN director d ON (c.director_id = d.id) LEFT JOIN actor a ON (c.actor_id = a.id) LEFT JOIN genero g ON (c.genero_id = g.id) WHERE c.id = ?`;
	await db.query(competitionQuery, [ Number(id) ], (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		const competencia = result[0];
		if (!competencia) return res.status(404).json('No existe esa competencia.');
		res.send(competencia);
	});
};

	/* =================================================================================================== */

const getOptions = async (req, res, next) => {
	const { id } = req.params;
	const competitionQuery = 'SELECT nombre, genero_id, director_id, actor_id FROM competencia c WHERE c.id = ?';
	await db.query(competitionQuery, [ id ], async (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		if (result.length === 0) return res.status(404).json('No existe esa competencia.');
		const genero = result[0].genero_id;
		const director = result[0].director_id;
		const actor = result[0].actor_id;
		const competencia = result[0].nombre;
		const extraKeys = `${director ? ` JOIN director d ON (p.director = d.nombre)` : ''}${actor ? ` JOIN actor_pelicula ap ON (p.id = ap.pelicula_id) JOIN actor a ON (ap.actor_id = a.id)` : ''}${genero ? ` WHERE genero_id = ${genero}`: ''}${director ? `${genero ? ' AND ' : ' WHERE '} d.id = ${director}` : ''}${actor ? `${director || genero ? ' AND ' : ' WHERE '} a.id = ${actor}` : ''}`;
		const movieQuery = `SELECT p.id, p.titulo, p.poster FROM pelicula p${extraKeys} ORDER BY RAND() LIMIT 2`;
		await db.query(movieQuery, (err, result, fields) => {
			if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
			const peliculas = result;
			res.send({ competencia, peliculas });
		});
	});
};

	/* =================================================================================================== */

const getResults = async (req, res, next) => {
	const { id } = req.params;
	const queryCompetition = 'SELECT nombre FROM competencia WHERE id = ?';
	await db.query(queryCompetition, [ id ], async (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		if (result.length === 0) return res.status(404).json('No existe esa competencia.');
		const competencia = result[0].nombre;
		const queryResults = 'SELECT titulo, pelicula_id, poster, count(*) AS votos FROM pelicula JOIN votos ON (pelicula.id = pelicula_id) WHERE (votos.competencia_id = ?) GROUP BY titulo ORDER BY count(*) DESC LIMIT 3';
		await db.query(queryResults, [ Number(id) ], (err, result, fields) => {
			if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
			const resultados = result;
			res.send({ resultados, competencia });
		});
	});
};

/* ====================================================== */
/* ============= COMIENZAN LAS RUTAS .POST ============== */
/* ====================================================== */

const postVotation = async (req, res, next) => {
	const { id: idCompetencia } = req.params;
	const { idPelicula } = req.body;
	const queryVote = 'INSERT INTO votos (pelicula_id, competencia_id) VALUES ((SELECT p.id FROM pelicula p WHERE p.id = ?), (SELECT c.id FROM competencia c WHERE c.id = ?))';
	await db.query(queryVote, [ Number(idPelicula), Number(idCompetencia) ], (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		res.status(200).json('El voto fue procesado con éxito.');
	});
};

	/* =================================================================================================== */

const createCompetition = async (req, res, next) => {
	const { nombre, genero, director, actor } = req.body;
	// Validamos que el nombre no venga vacío
	if (nombre.trim().length === 0)
		return res.status(400).json('Debes ingresar un nombre para crear la campaña.');
	// Filtramos los datos del req.body para saber cuáles tienen un valor relevante
	const extraKeys = Object.keys(req.body).filter(item => item !== 'Guardar' && item !== 'nombre' && req.body[item] !== '0');
	console.log(req.body[extraKeys[0]]);
	let query = 'SELECT COUNT(*) as opciones FROM pelicula p';
	/* ================================= Si hay valores adicionales al nombre =================================== */
	/* = Validar que tengamos suficientes películas con las especificaciones seleccionadas para hacer una compe = */
	if (extraKeys.length > 0) {
		const whereClause = [];
		await extraKeys.forEach(key => {
			switch(key) {
				case 'genero':
					query += ' JOIN genero g ON (p.genero_id = g.id)';
					whereClause.push(`g.id = ${genero}`);
					break;
				case 'director':
					query += ' JOIN director d ON (d.nombre = p.director)';
					whereClause.push(`d.id = ${director}`);
					break;
				case 'actor':
					query += ' JOIN actor_pelicula ap ON (p.id = ap.pelicula_id) JOIN actor a ON (ap.actor_id = a.id)';
					whereClause.push(`a.id = ${actor}`);
					break;
				default:
					break;
			}
		});
		query += ` WHERE ${whereClause.join(' AND ')}`;
	}
	console.log(query);
	await db.query(query, async (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			console.log(err);
			flag = true;
		} else if (result[0].opciones < 2) {
			return res.status(422).json('No hay suficientes películas para generar esta competencia.');
		} else {
			console.log(result);
			
			/* ============================================================================== */
			/* ========= Si pasa las validaciones entonces vamos a crear la compe!! ========= */
			const extraValues = Object.values(req.body)
			.filter(item => item !== '0' && (genero === item || director === item || actor === item))
			.map(item => Number(item));
			// Armamos la query si mandamos algún dato adicional al nombre
			const extraColumns = `${genero !== '0' ? ', genero_id' : ''}${director !== '0' ? ', director_id' : ''}${actor !== '0' ? ', actor_id' : ''}`;
			// Generamos la string de signos de pregunta para la query
			const questionMarks = new Array(extraValues.length + 1).fill('?').join(', ');
			const newCompetitionQuery = `INSERT INTO competencia (nombre${extraColumns}) VALUES (${questionMarks})`;
			// Generamos el array de valores que se van a insertar en la query
			const queryOptions = [ nombre, ...extraValues ].flat();

			await db.query(newCompetitionQuery, queryOptions, (err, result, fields) => {
				if (err) {
					err.code === 'ER_DUP_ENTRY'
						? res.status(422).json('El nombre ingresado ya ha sido utilizado anteriormente.')
						: res.status(500).json('Disculpa, hubo un error en el servidor.');
					return console.log(err);
				}
				res.status(200).json('La competencia se ha creado con éxito.');
			});
		};
	});
	/* =================================================================================================== */
};

/* ===================================================== */
/* ============== COMIENZAN LAS RUTAS .PUT ============= */
/* ===================================================== */

const editCompetition = (req, res, next) => {
	const { id } = req.params;
	const { nombre } = req.body
	const editQuery = 'UPDATE competencia SET nombre = ? WHERE id = ?';
	db.query(editQuery, [ nombre, id ], (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		console.log(result);
		console.log(fields);
		return res.status(200).json('La competencia ha sido modificada con éxito.');
	});
};

/* ======================================================== */
/* ============== COMIENZAN LAS RUTAS .DELETE ============= */
/* ======================================================== */


const removeCompetition = async (req, res, next) => {
	const { id } = req.params;
	const removeQuery = 'DELETE FROM competencia WHERE id = ?';
	await db.query(removeQuery, [ Number(id) ], (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		if (result.length === 0) return res.status(404).json('No existe esa competencia.');
		res.status(200).json('La competencia fue eliminada con éxito.');
	});
};

/* ======================================================== */

const removeVotes = async (req, res, next) => {
	const { id } = req.params;
	const removeCompQuery = 'DELETE FROM votos WHERE competencia_id = ?';
	await db.query(removeCompQuery, [ Number(id) ], (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		if (result.length === 0) return res.status(404).json('No existe esa competencia.');
		res.status(200).json('La competencia ha sido reiniciada con éxito.');
	});
};

/* ======================================================== */
/* ======================================================== */
/* ======================================================== */

module.exports = {
	getCompetitions,
	getOptions,
	postVotation,
	getResults,
	createCompetition,
	getCompetitionData,
	removeCompetition,
	removeVotes,
	editCompetition
};