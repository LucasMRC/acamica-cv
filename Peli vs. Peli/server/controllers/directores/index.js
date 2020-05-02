const db = require('../../connection');

const getDirectors = async (req, res, next) => {
	const directorsQuery = 'SELECT * FROM director';
	await db.query(directorsQuery, (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		res.send(result);
	});
};

module.exports = {
	getDirectors
};