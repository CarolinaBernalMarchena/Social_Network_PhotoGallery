/*RN-C01*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerMaxNumberPhotosUser
	BEFORE INSERT ON Pictures
	FOR EACH ROW 
	BEGIN
		DECLARE currentPhotos INT;
		SET currentPhotos = (SELECT COUNT(*) FROM pictures WHERE pictures.userId = new.userId);
			IF (currentPhotos > 49) THEN
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot insert more than 50 photos';
			END IF;
	END//
DELIMITER ;

/*RN-C02*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerInappropiateTiltleAndDescription
	BEFORE INSERT ON Pictures
	FOR EACH ROW 
	BEGIN 
		DECLARE inappropiate INT;
		SET inappropiate = (SELECT COUNT(*) FROM inappropriatewords WHERE (new.title LIKE CONCAT('%',inappropriatewords.word,'%') OR new.description LIKE CONCAT('%',inappropriatewords.word,'%')));
			IF (inappropiate > 0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot use inappropiate words';
			END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER triggerInappropiateTiltleAndDescriptionUpdate
	BEFORE UPDATE ON Pictures
	FOR EACH ROW 
	BEGIN 
		DECLARE inappropiate INT;
		SET inappropiate = (SELECT COUNT(*) FROM inappropriatewords WHERE (new.title LIKE CONCAT('%',inappropriatewords.word,'%') OR new.description LIKE CONCAT('%',inappropriatewords.word,'%')));
			IF (inappropiate > 0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot use inappropiate words';
			END IF;
	END//
DELIMITER ;

/*RN-C04*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerRatingsRestriction
	BEFORE INSERT ON Ratings 
	FOR EACH ROW 
	BEGIN 
		DECLARE currentRating INT;
		SET currentRating = (SELECT COUNT(*) FROM ratings WHERE ratings.userId = new.userId AND ratings.pictureId = new.pictureId);
			IF (currentRating > 0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot insert more than 1 rating per photo';
			END IF;
	END//
DELIMITER ;

/*RN-B05*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerDeletePhotoWithComments
	BEFORE DELETE ON Pictures 
	FOR EACH ROW 
	BEGIN 
		DECLARE deletePhoto INT;
		SET deletePhoto = (SELECT COUNT(*) FROM comments WHERE comments.pictureId = old.pictureId);
			IF (deletePhoto > 0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot delete a photo with comments';
			END IF;
	END//
DELIMITER ;

DELIMITER //
CREATE OR REPLACE TRIGGER triggerPrivatePhotoWithComments
	BEFORE Update ON Pictures 
	FOR EACH ROW 
	BEGIN 
		DECLARE coments INT;
		DECLARE itWasPublic VARCHAR(100);
		SET coments = (SELECT COUNT(*) FROM comments WHERE comments.pictureId = new.pictureId);
		SET itWasPublic = (SELECT visibility FROM pictures WHERE pictures.pictureId = new.pictureId);
			IF(itWasPublic='PUBLIC' AND new.visibility = 'PRIVATE' AND coments>0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'A photo with comments cannot be private';
			END IF;
	END//
DELIMITER ;

/*RN-B07*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerInappropiateComments
	BEFORE INSERT ON Comments
	FOR EACH ROW 
	BEGIN 
		DECLARE inappropiate2 INT;
		SET inappropiate2 = (SELECT COUNT(*) FROM inappropriatewords WHERE new.commentText LIKE CONCAT('%',inappropriatewords.word,'%'));
			IF (inappropiate2 > 0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot use inappropiate words';
			END IF;
	END//
DELIMITER ;

/*RN-A08*/
DELIMITER //
CREATE OR REPLACE TRIGGER triggerFollowYourself
	BEFORE INSERT ON Userfollowers
	FOR EACH ROW 
	BEGIN 
		IF (new.followerId = new.accountOwnerId) THEN 
			SIGNAL SQLSTATE '45000' SET message_text = 
			'You cannot follow yourself';
		END IF;
	END//
DELIMITER ;





/*DELIMITER //
CREATE OR REPLACE TRIGGER triggerINumbers
	BEFORE INSERT ON Comments
	FOR EACH ROW 
	BEGIN 
		DECLARE numbers INT;
		SET numbers = (SELECT COUNT(*) FROM comments WHERE commentText REGEXP '^[0-9]+$');
			IF (numbers > 0) THEN 
				SIGNAL SQLSTATE '45000' SET message_text = 
				'You cannot use inappropiate words';
			END IF;
	END//
DELIMITER ;*/