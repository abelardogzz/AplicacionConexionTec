CREATE DATABASE conexionTec;

CREATE TABLE Users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	uPNombre VARCHAR(20) NOT NULL,
	uApellidoP VARCHAR(20) NOT NULL,
	uApellidoM VARCHAR(20) NOT NULL,
	uPassword VARCHAR(200) NOT NULL,
	uEmail VARCHAR(25) NOT NULL,
	TipoDeUsuario VARCHAR(25) NOT NULL,
	Deleted BOOLEAN NOT NULL
);

CREATE TABLE VirtualSample(
	virtualSample_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	vsStart_Date Date NOT NULL,
	vsEnd_Date Date NOT NULL,
	vsCurrent BOOLEAN NOT NULL,
	Calificacion BOOLEAN NOT NULL,
	Registro BOOLEAN NOT NULL
);

CREATE TABLE Project (
	project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	virtualSample_id INT NOT NULL,
	user_id INT NOT NULL,
	pNombre VARCHAR(70) NOT NULL,
	pDescripcion VARCHAR(70) NOT NULL,
	pArea VARCHAR(50) NOT NULL,
	Deleted BOOLEAN NOT NULL,
	pFechaRegistro DATE NOT NULL,
	pImagen1 VARCHAR(500),
	pImagen2 VARCHAR(500),
	pVideo VARCHAR(500) NOT NULL,
	FOREIGN KEY (virtualSample_id) references VirtualSample(virtualSample_id),
	FOREIGN KEY (user_id) references Users(user_id)
);


CREATE TABLE Comments (
	comment_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
	project_id INT NOT NULL,
	cDate Date NOT NULL,
	comment VARCHAR(140) NOT NULL,
	FOREIGN KEY (user_id) references Users (user_id),
	FOREIGN KEY (project_id) references Project(project_id)
);

CREATE TABLE Grade (
	project_id INT NOT NULL,
	user_id INT NOT NULL,
	grade INT NOT NULL,
	PRIMARY KEY (project_id,user_id)
);

INSERT INTO Users(user_id,uPNombre, uApellidoP, uApellidoM, uPassword, uEmail,TipoDeUsuario,Deleted)
VALUES 	(1,'Regina','Gallardo','Gallardo','567','reg@mail.com','AdminProyecto',FALSE),
		(2,'Abelardo','Gonzalez','Gonzalez','1234','abe@mail.com','AdminProyecto',FALSE),
		(5,'Alfonso','Guerrero','Guerrero','1234','pon@mail.com','AdminProyecto',FALSE),
		(4,'Alfredo','Salazar','Salazar','567','fred@mail.com','Admin',FALSE),
		(3,'Javier','Sierra','Sierra','891','jav@mail.com','Publico',FALSE);

INSERT INTO VirtualSample(virtualSample_id,vsStart_Date,vsEnd_Date,vsCurrent,Calificacion,Registro)
VALUES	(1,'2016-01-17','2016-05-05',FALSE,FALSE,FALSE),
		(2,'2016-08-17','2016-12-05',FALSE,FALSE,FALSE),
		(3,'2017-01-17','2017-05-05',FALSE,FALSE,FALSE),
		(4,'2017-08-17','2017-12-05',TRUE,FALSE,FALSE);

INSERT INTO Project(project_id, virtualSample_id, user_id, pNombre, pDescripcion,pArea,Deleted,pImagen1,pImagen2,pVideo)
VALUES 	(1,2,2,'PrepaNet Matematicas',
		'Videojuego para enseñar matematicas',
		'Tecnologica',
		FALSE, 
		'https://previews.123rf.com/images/fer737ng/fer737ng1004/fer737ng100400018/6929700-Cerca-de-un-antiguo-libro-de-texto-con-las-f-rmulas-de-lgebra-Fondo-de-n-meros-y-letras--Foto-de-archivo.jpg',
		 NULL, 
		 NULL),

		(2,4,3,'Reciclaje de Papel','Formas practicas de recliclar papel en casa','Ciencia',FALSE,'http://3.bp.blogspot.com/-5bPMewqA-_Q/UjidB_Dcf1I/AAAAAAAAIRo/dFwqI1QrJ7c/s320/papel-reciclado.jpg',NULL, NULL),

		(3,2,1,'PrepaNet Quimica',
		'Material para enseñar Quimica',
		'Tecnologica ciencias',
		FALSE, 
		'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera-course-photos.s3.amazonaws.com/fa/6926005ea411e490ff8d4c5d4ff426/chemistry_logo.png',
		'https://s-media-cache-ak0.pinimg.com/originals/39/61/0b/39610be9432c4292217b320d4c0e5457.png', 
		 NULL),
		(4,3,2,'EscuchaT',
		'Reproductor de Musica para la estimulacion temprana',
		'Tecnologica Musica',
		FALSE, 
		'http://2.bp.blogspot.com/-sy6CELely4U/UVDJK-fWwSI/AAAAAAAAPlY/s1ZUitc0gfY/s1600/ense%C3%B1ar+con+musica.jpeg',
		 'http://4.bp.blogspot.com/_JNsRrlwcve4/TNCu0auQ5GI/AAAAAAAAABA/QBh8BaKnV-s/s1600/musica-nino01a.jpg', 
		 NULL),
		(5,3,1,'AuxiliaT',
		'Juego para niños con discapacidades',
		'Diseño comunidad',
		FALSE, 
		'http://1.bp.blogspot.com/_S1sstT6kL5w/TPUFedIs4YI/AAAAAAAAAAw/uQUDYtBlBi4/s1600/rompecabeza.JPG',
		NULL, 
		 NULL),
		(6,4,1,'EjercitaT',
		'Juego para motivar al ejercicio',
		'Diseño comunidad deportes',
		FALSE, 
		'http://www.bikozulu.co.ke/wp-content/uploads/2017/05/ftrd-sportdaykg-485x275.jpg',
		NULL, 
		 NULL);

INSERT INTO Comments(comment_id, user_id, project_id, cDate, comment)
VALUES	(1,3,1,'2017-09-17','Muy interesante los juegos de matematicas'),
		(3,3,3,'2017-09-17','Muy interesante los temas de Quimica'),
		(4,3,4,'2017-09-17','Muy interesante la musica'),
		(5,3,5,'2017-09-17','Muy interesante los ejercicios para discapasitados'),
		(2,3,2,'2017-10-17','Fascienante papel reciclado');

INSERT INTO Grade(project_id,user_id,grade)
VALUES	(1,3,3),
		(2,3,4),
		(3,3,4),
		(4,3,5),
		(5,3,5),
		(6,3,2);
