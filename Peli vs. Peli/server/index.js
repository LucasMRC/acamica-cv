const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8080;
const {
	getCompetitions,
	getOptions,
	postVotation,
	getResults,
	createCompetition,
	getCompetitionData,
	removeCompetition,
	removeVotes,
	editCompetition
} = require('./controllers/competencias');
const { getActors } = require('./controllers/actores');
const { getDirectors } = require('./controllers/directores');
const { getGenres } = require('./controllers/generos');

// Configuración de la aplicación
app.use(cors());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());

/* ======================== */
/* ==== COMIENZO DE RUTAS ==== */
/* ======================== */

// GET ROUTES
app.get('/competencias', getCompetitions);
app.get('/competencias/:id', getCompetitionData);
app.get('/actores', getActors);
app.get('/directores', getDirectors);
app.get('/generos', getGenres);
app.get('/competencias/:id/peliculas', getOptions);
app.get('/competencias/:id/resultados', getResults);

// POST ROUTES
app.post('/competencias', createCompetition);
app.post('/competencias/:id/voto', postVotation);

// PUT ROUTES
app.put('/competencias/:id', editCompetition);

// DELETE ROUTES
app.delete('/competencias/:id', removeCompetition);
app.delete('/competencias/:id/votos', removeVotes);

/* ======================== */
/* ======================== */
/* ======================== */

app.listen(port, () => {
	console.log('Up & Running!');
});