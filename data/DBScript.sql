CREATE DATABASE conexionTec;

CREATE TABLE Users (
	IdUsuario INT NOT NULL PRIMARY KEY,
	uPNombre VARCHAR(20) NOT NULL,
	uApellidoP VARCHAR(20) NOT NULL,
	uApellidoM VARCHAR(20) NOT NULL,
	userName VARCHAR(15) NOT NULL ,
	uPassword VARCHAR(30) NOT NULL,
	uEmail VARCHAR(25) NOT NULL,
	TipoDeUsuario VARCHAR(25) NOT NULL
);

CREATE TABLE Proyecto (
	mID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mNombre VARCHAR(70) NOT NULL,
	mDescripcion VARCHAR(70) NOT NULL
);

CREATE TABLE Comments (
	ID INT NOT NULL AUTO_INCREMENT,
	IdUsuario INT NOT NULL,
	comment VARCHAR(140) NOT NULL,
	fname VARCHAR(30) NOT NULL,
	lname VARCHAR(30) NOT NULL,
	email VARCHAR(25) NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN Key (IdUsuario) references Users(IdUsuario)
);

CREATE TABLE UserProyecto(
	IdUsuario INT NOT NULL,
	IDproyecto INT NOT NULL,
	PRIMARY KEY (IdUsuario,IDproyecto),
	FOREIGN Key (IdUsuario) references Users (IdUsuario),
	FOREIGN Key (IDproyecto) references Proyecto (mID)

);

INSERT INTO Users(IdUsuario,uPNombre, uApellidoP, uApellidoM, userName, uPassword, uEmail,TipoDeUsuario)
VALUES ('1','Luis', 'Flores','Gallardo', 'lucfg', 'password123', 'luis@mail.com','AdminProyecto');

INSERT INTO Proyecto(mNombre, mDescripcion)
VALUES ('Papel Reciclado', 'Se trabajo el desarrollo de un proceso para el reciclaje del papel');

INSERT INTO UserProyecto(IdUsuario,IDproyecto)
VALUES ('1','1');

INSERT INTO Comments(ID,IdUsuario, comment, fname, lname, email)
VALUES  ('1','1','alfredo08', 'I really like this site!', 'Alfredo','Salazar', 'alfredo@mail.com')