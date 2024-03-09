DROP TABLE IF EXISTS InappropriateWords;
DROP TABLE IF EXISTS Userfollowers;
DROP TABLE IF EXISTS PictureCategories;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Comments;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS Pictures;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users(
	userId INT AUTO_INCREMENT,
	name VARCHAR(60),
	surname VARCHAR(60),
	phoneNumber INT,
	email VARCHAR(60) UNIQUE,
	userName VARCHAR(60) UNIQUE,
	password VARCHAR(1000),
	profilePictureUrl VARCHAR(1000),
	PRIMARY KEY (userId)
);
/* Datos de Prueba */
INSERT INTO Users(name, surname, phoneNumber, email, userName, PASSWORD, profilePictureUrl) VALUES ('Carolina', 'Bernal', 644343507, 'carbermar3@alum.us.es', 'Carbermar3','pbkdf2:sha256:150000$Ob5AC1H0$220d6ad9705f27896b1a563d5edf61bae85b6b8191688864258fc2cf00ff0770','https://i.imgur.com/zWVCtHh.png');
INSERT INTO Users(name, surname, phoneNumber, email, userName, PASSWORD, profilePictureUrl) VALUES ('Celia', 'Florencia', 794107613, 'celiaflorencia@gmail.com', 'BirdCrafts','pbkdf2:sha256:150000$Ob5AC1H0$220d6ad9705f27896b1a563d5edf61bae85b6b8191688864258fc2cf00ff0770','https://i.imgur.com/KkPp3DH.png');
INSERT INTO Users(name, surname, phoneNumber, email, userName, PASSWORD, profilePictureUrl) VALUES ('Ai', 'Yamada', 639240366, 'yamai21@gmail.com', 'YamAi','pbkdf2:sha256:150000$Ob5AC1H0$220d6ad9705f27896b1a563d5edf61bae85b6b8191688864258fc2cf00ff0770','https://i.imgur.com/baey96R.png');
INSERT INTO Users(name, surname, phoneNumber, email, userName, PASSWORD, profilePictureUrl) VALUES ('Prueba', 'Prueba', 789456123, 'prueba@gmail.com', 'Prueba','pbkdf2:sha256:150000$fMjpNnJE$cce4155e6c82c61753e44d753d3c8a816e661621e71585d7fa33b8778d8db388','https://i.imgur.com/jAijC4H.jpg');


CREATE TABLE Pictures(
	pictureId INT AUTO_INCREMENT,
	userId INT,
	url VARCHAR(100),
	uploadDate DATE,
	title VARCHAR(100),
	description VARCHAR(1000),
	visibility VARCHAR(10),
	PRIMARY KEY (pictureId),
	FOREIGN KEY (userId) REFERENCES Users (userId)
);
/* Datos de Prueba */
INSERT INTO Pictures(userId, url, uploadDate, title, description, visibility) VALUES (1, 'https://i.imgur.com/oFFdgR3.jpg', '2021-12-15', 'Lovely flowers field', 'The other day I saw this flowers field and I couldnt resist to take a picture','PUBLIC');
INSERT INTO Pictures(userId, url, uploadDate, title, description, visibility) VALUES (2, 'https://i.imgur.com/buNEXb8.jpg', '2021-12-14', 'Robert the budgie', 'Robert is so handsome! Those eyes...','PUBLIC');
INSERT INTO Pictures(userId, url, uploadDate, title, description, visibility) VALUES (3, 'https://i.imgur.com/LCkv2FE.png', '2021-12-14', 'Neon Street', 'Hong Kong streets at night','PUBLIC');
INSERT INTO Pictures(userId, url, uploadDate, title, description, visibility) VALUES (2, 'https://i.imgur.com/Cbz3Do7.jpg', '2021-11-14', 'Cute bird', 'Love it','PUBLIC');


CREATE TABLE Ratings(
	ratingId INT AUTO_INCREMENT,
	userId INT,
	pictureId INT,
	ratingDate DATE,
	ratingValue INT,
	PRIMARY KEY (ratingId),
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (pictureId) REFERENCES Pictures (pictureId)
);
/* Datos de Prueba */
INSERT INTO Ratings(userId, pictureId, ratingDate, ratingValue) VALUES (1,3,'2021-09-12',5);
INSERT INTO Ratings(userId, pictureId, ratingDate, ratingValue) VALUES (2,1,'2021-09-11',4);
INSERT INTO Ratings(userId, pictureId, ratingDate, ratingValue) VALUES (3,2,'2021-09-10',4);


CREATE TABLE Comments(
	commentId INT AUTO_INCREMENT,
	userId INT,
	pictureId INT,
	commentText VARCHAR(1000),
	commentDate DATE,
	PRIMARY KEY (commentId),
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (pictureId) REFERENCES Pictures (pictureId)
);
/* Datos de Prueba */
INSERT INTO Comments(userId, pictureId, commentText, commentDate) VALUES (1,3,'Stunning','021-09-12');
INSERT INTO Comments(userId, pictureId, commentText, commentDate) VALUES (2,1,'Looks like something out of a fairy tale','2021-09-11');
INSERT INTO Comments(userId, pictureId, commentText, commentDate) VALUES (3,2,'He is a model','2021-09-10');

CREATE TABLE Categories(
	categoryId INT AUTO_INCREMENT,
	categoryName VARCHAR(20) UNIQUE,
	PRIMARY KEY (categoryId)
);
/* Datos de Prueba */
INSERT INTO Categories(categoryName) VALUES ('ART');
INSERT INTO Categories(categoryName) VALUES ('NATURE');
INSERT INTO Categories(categoryName) VALUES ('FLOWERS');


CREATE TABLE PictureCategories(
	pictureCategoryId INT AUTO_INCREMENT,
	pictureId INT,
	categoryId INT,
	PRIMARY KEY (pictureCategoryId),
	FOREIGN KEY (pictureId) REFERENCES Pictures (pictureId),
	FOREIGN KEY (categoryId) REFERENCES Categories (categoryId)
);
/* Datos de Prueba */
INSERT INTO PictureCategories(pictureId, categoryId) VALUES (3,1);
INSERT INTO PictureCategories(pictureId, categoryId) VALUES (1,2);
INSERT INTO PictureCategories(pictureId, categoryId) VALUES (1,3);


CREATE TABLE Userfollowers(
	UserfollowerId INT AUTO_INCREMENT,
	followerId INT, 
	accountOwnerId INT,
	PRIMARY KEY (UserfollowerId),
	FOREIGN KEY (followerId) REFERENCES Users (userId),
	FOREIGN KEY (accountOwnerId) REFERENCES Users (userId)
);
/* Datos de Prueba */
INSERT INTO Userfollowers(followerId, accountOwnerId) VALUES (1,3);
INSERT INTO Userfollowers(followerId, accountOwnerId) VALUES (2,1);
INSERT INTO Userfollowers(followerId, accountOwnerId) VALUES (3,2);


CREATE TABLE InappropriateWords(
	inappropriateWordId INT AUTO_INCREMENT,
	word VARCHAR(100), 
	PRIMARY KEY (inappropriateWordId)
);
/* Datos de Prueba */
INSERT INTO InappropriateWords(word) VALUES ("stupid");
INSERT INTO InappropriateWords(word) VALUES ("fuck");
INSERT INTO InappropriateWords(word) VALUES ("shit");
INSERT INTO InappropriateWords(word) VALUES ("asshole");