CREATE DATABASE conexionTec;

CREATE TABLE Users (
	uPNombre VARCHAR(20) NOT NULL,
	uApellido VARCHAR(20) NOT NULL,
	userName VARCHAR(15) NOT NULL PRIMARY KEY,
	uPassword VARCHAR(30) NOT NULL,
	uEmail VARCHAR(25) NOT NULL
);

CREATE TABLE Proyecto (
	mID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	mNombre VARCHAR(70) NOT NULL,
	mDescripcion VARCHAR(70) NOT NULL
);

CREATE TABLE Orders (
	orderID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	oUserName VARCHAR(15) NOT NULL REFERENCES Users(userName),
	oTotalPrice INT NOT NULL,
	oAddress VARCHAR(70) NOT NULL REFERENCES Users(uAddress),
	oToGo BOOLEAN NOT NULL
);

CREATE TABLE Comments (
	ID INT NOT NULL AUTO_INCREMENT,
	username VARCHAR(50) NOT NULL,
	comment VARCHAR(140) NOT NULL,
	fname VARCHAR(30) NOT NULL,
	lname VARCHAR(30) NOT NULL,
	email VARCHAR(25) NOT NULL,
	PRIMARY KEY (ID),
	FOREIGN Key (username) references Users (userName)

);

INSERT INTO Users(uPNombre, uApellido, userName, uPassword, uEmail)
VALUES ('Luis', 'Flores', 'lucfg', 'password123', 'luis@mail.com');

INSERT INTO Proyecto(mNombre, mDescripcion)
VALUES ('Papel Reciclado', 'Se trabajo el desarrollo de un proceso para el reciclaje del papel');

INSERT INTO Comments(username, comment, fname, lname, email)
VALUES  ('alfredo08', 'I really like this site!', 'Alfredo','Salazar', 'alfredo@mail.com'),
		('thePam22', 'The design has a greate minimalistic trend.', 'Pamela', 'Rodriguez', 'pamela@mail.com');