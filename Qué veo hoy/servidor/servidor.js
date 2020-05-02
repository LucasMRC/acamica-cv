//paquetes necesarios para el proyecto
const express = require('express');
const cors = require('cors');
const controlador = require('./controladores');

const app = express();

app.use(cors());

app.use(express.urlencoded({
	extended: true
}));

app.use(express.json());

app.get('/peliculas', controlador.getAllMovies);

app.get('/generos', controlador.getGenres);

app.get('/peliculas/recomendacion', controlador.getRecomendation);

app.get('/peliculas/:id', controlador.getMovieInfo);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
const puerto = process.env.PORT || 8080;

app.listen(puerto, function () {
	console.log( "Escuchando en el puerto " + puerto );
});

