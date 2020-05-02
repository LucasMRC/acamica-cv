create table pelicula (
	id int not null auto_increment,
	titulo varchar(100) not null,
	duracion int not null,
	director varchar(400) not null,
	anio int not null,
	fecha_lanzamiento date,
	puntuacion int,
	poster varchar(300),
	trama varchar(700),
	primary key (id)
);

create table genero (
	id int not null auto_increment,
	nombre varchar(30),
	primary key (id)
);

create table actor (
	id int not null auto_increment,
	nombre varchar(70),
	primary key (id)
);

create table actor_pelicula (
	id int not null auto_increment,
	actor_id int,
	pelicula_id int,
	primary key (id)
);