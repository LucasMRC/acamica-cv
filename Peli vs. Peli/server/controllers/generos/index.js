const db = require('../../connection');

const getGenres = async (req, res, next) => {
	const genreQuery = 'SELECT * FROM genero';
	await db.query(genreQuery, (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		res.send(result);
	});
};

module.exports = {
	getGenres
};