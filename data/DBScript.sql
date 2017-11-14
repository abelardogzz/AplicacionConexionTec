CREATE DATABASE conexionTec2;

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
	vsCurrent BOOLEAN NOT NULL
);

CREATE TABLE Projecto (
	project_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	virtualSample_id INT NOT NULL,
	user_id INT NOT NULL,
	pNombre VARCHAR(70) NOT NULL,
	pDescripcion VARCHAR(70) NOT NULL,
	pImage VARCHAR(400) NOT NULL,
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
	FOREIGN KEY (project_id) references Projecto(project_id)
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
		(3,'Javier','Sierra','Sierra','891','jav@mail.com','Publico',FALSE);

INSERT INTO VirtualSample(virtualSample_id,vsStart_Date,vsEnd_Date,vsCurrent)
VALUES	(1,'2017-01-17','2017-05-05',FALSE),
		(2,'2017-08-17','2017-12-05',TRUE);

INSERT INTO Projecto(project_id,virtualSample_id,user_id,pNombre, pDescripcion,pArea,Deleted,pImagen,pImagen2,pVideo)
VALUES 	(1,2,2,'PrepaNet Matematicas','Videojuego para enseñar matematicas',FALSE, 'https://previews.123rf.com/images/fer737ng/fer737ng1004/fer737ng100400018/6929700-Cerca-de-un-antiguo-libro-de-texto-con-las-f-rmulas-de-lgebra-Fondo-de-n-meros-y-letras--Foto-de-archivo.jpg','Tecnologica', NULL, NULL),
		(2,1,1,'Reciclaje de Papel','Formas practicas de recliclar papel en casa',FALSE,'http://3.bp.blogspot.com/-5bPMewqA-_Q/UjidB_Dcf1I/AAAAAAAAIRo/dFwqI1QrJ7c/s320/papel-reciclado.jpg','Ciencia',NULL, NULL);

INSERT INTO Comments(comment_id, user_id, project_id, cDate, comment)
VALUES	(1,3,1,'2017-09-17','Muy interesante los juegos'),
		(2,3,2,'2017-10-17','Fascienante el papel reciclado');

INSERT INTO Grade(project_id,user_id,grade)
VALUES	(1,3,9),
		(2,3,10);