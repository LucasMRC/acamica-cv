const db = require('../../connection');

const getActors = async (req, res, next) => {
	const actorQuery = 'SELECT * FROM actor';
	await db.query(actorQuery, (err, result, fields) => {
		if (err) {
			res.status(500).json('Disculpa, hubo un error en el servidor.');
			return console.log(err);
		}
		res.send(result);
	});
};


module.exports = {
	getActors
};