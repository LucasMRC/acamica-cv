CREATE TABLE competencia (
	id int(11) unsigned NOT NULL auto_increment,
	nombre varchar(255) NOT NULL UNIQUE,
	PRIMARY KEY (id),
	genero_id int(11) unsigned,
	actor_id int(11) unsigned,
	director_id int(11) unsigned,
	KEY competencia_genero_id (genero_id),
	KEY competencia_actor_id (actor_id),
	KEY competencia_director_id (director_id),
	CONSTRAINT competencia_genero_id FOREIGN KEY (genero_id) REFERENCES genero(id),
	CONSTRAINT competencia_actor_id FOREIGN KEY (actor_id) REFERENCES actor(id),
	CONSTRAINT competencia_director_id FOREIGN KEY (director_id) REFERENCES director(id)
);

INSERT INTO competencia (nombre) VALUES ("¿Cuál es la peor peli del mundo mundial?"), ("¿Cuál es la mejor peli del mundo mundial?"), ("¿Cuál es la peli mas 'neh' del mundo mundial?");

CREATE TABLE votos (
	id int NOT NULL auto_increment,
	pelicula_id int unsigned,
	competencia_id int unsigned,
	PRIMARY KEY (id),
	KEY votos_pelicula_id (pelicula_id),
	KEY votos_competencia_id (competencia_id),
	CONSTRAINT votos_pelicula_id FOREIGN KEY (pelicula_id) REFERENCES pelicula(id) ON DELETE CASCADE,
	CONSTRAINT votos_competencia_id FOREIGN KEY (competencia_id) REFERENCES competencia(id) ON DELETE CASCADE
);