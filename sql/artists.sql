CREATE OR REPLACE TABLE Artists (
  artistId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(128) NOT NULL,
  genre varchar(128) DEFAULT NULL,
  debutDate DATE,
  photoURL VARCHAR(1024),
  shortBio VARCHAR(1024)
);

DELETE FROM Artists;
INSERT INTO Artists VALUES
    (1, 'ABBA', 'Pop', '1972-11-12', 'https://upload.wikimedia.org/wikipedia/commons/c/cb/ABBA_-_TopPop_1974_5.png', 'ABBA are a Swedish pop group formed in Stockholm in 1972 by Agnetha Fältskog, Björn Ulvaeus, Benny Andersson, and Anni-Frid Lyngstad. The groups name is an acronym of the first letters of their first names. They became one of the most commercially successful acts in the history of popular music, topping the charts worldwide from 1974 to 1983. In 1974 ABBA were Sweden\'s first winner of the Eurovision Song Contest, with the song "Waterloo", which in 2005 was chosen as the best song in the competition\'s history as part of the 50th anniversary celebration of the contest.'),
    (2, 'Porter Robinson', 'Electro', '2010-05-30', 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Porter_Robinson_2014_profile_pic.png', 'Porter Weston Robinson (born July 15, 1992) is an American DJ, record producer, musician, and singer from Chapel Hill, North Carolina. His debut full-length studio album, Worlds, was released in 2014 and peaked at number one on Billboard’s Top Dance/Electronic Albums.'),
    (3, 'Muse', 'Rock', '1994-02-05', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/MuseBristol_050619-118_%2848035812973%29.jpg/1920px-MuseBristol_050619-118_%2848035812973%29.jpg', 'Muse are an English rock band from Teignmouth, Devon, formed in 1994. The band consists of Matt Bellamy (lead vocals, guitar, keyboards), Chris Wolstenholme (bass guitar, backing vocals), and Dominic Howard (drums).'),
    (4, 'Lil Nas X', 'Rap', '2018-12-03', 'https://upload.wikimedia.org/wikipedia/commons/5/56/191125_Lil_Nas_X_at_the_2019_American_Music_Awards.png', 'Montero Lamar Hill (born April 9, 1999), known by his stage name Lil Nas X, is an American rapper, singer, songwriter, and media personality. He rose to prominence with the release of his country rap single "Old Town Road", which first achieved viral popularity in early 2019 before climbing music charts internationally and becoming diamond certified by November of that same year.'),
    (5, 'Pendulum', 'Drum & Bass', '2002-06-02', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Pendulum_Live_Electric_2007.jpg/2560px-Pendulum_Live_Electric_2007.jpg', 'Pendulum is an Australian drum and bass band founded in 2002. Pendulum originally formed in the city of Perth, Western Australia, by Rob Swire, Gareth McGrillen and Paul "El Hornet" Harding. The band was later expanded to include members Ben Mount, Peredur ap Gwynedd and KJ Sawka. Members Swire and McGrillen also formed the electro house duo Knife Party. The group is notable for its distinctive sound, mixing electronic music with hard rock and covering a wide range of genres.'),
    (6, 'POWERWOLF', 'Power metal', '2003-07-13', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Powerwolf_%C3%A0_Colmar_en_2018..jpg/1920px-Powerwolf_%C3%A0_Colmar_en_2018.jpg', 'Powerwolf, often stylized as POWERWOLF, is a German power metal band founded in 2003 in Saarbrücken by members of Red Aim. The band consists of vocalist Karsten Brill as "Attila Dorn", lead guitarist Benjamin Buss as "Matthew Greywolf", bassist/rhythm guitarist David Vogt as "Charles Greywolf", keyboardist Christian Jost as "Falk Maria Schlegel" and drummer Roel van Helden.'),
    (7, 'Foo Fighters', 'Rock', '1994-07-14', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/FoosLondonStad220618-124_%2842989552522%29.jpg/2560px-FoosLondonStad220618-124_%2842989552522%29.jpg', 'Foo Fighters is an American rock band formed in Seattle, Washington, in 1994. It was founded by former Nirvana drummer Dave Grohl as a one-man project following the dissolution of Nirvana after the suicide of Kurt Cobain. The group took its name from "Foo fighter", a nickname coined by Allied aircraft pilots for UFOs and other aerial phenomena. Over the course of their career, Foo Fighters have won 12 Grammy Awards, including Best Rock Album four times. The band has also won an American Music Award, four Brit Awards, and two MTV Video Music Awards. As of 2015, Foo Fighters have sold over 12 million albums in the U.S.'),
    (8, 'Daft Punk', 'Electro', '1997-01-20', 'https://upload.wikimedia.org/wikipedia/commons/4/41/Daftpunklapremiere2010.jpg', 'Daft Punk were a French electronic music duo formed in 1993 in Paris by Guy-Manuel de Homem-Christo and Thomas Bangalter. Often considered one of the most influential acts in dance music history, they achieved popularity in the late 1990s as part of the French house movement. They also had success in the years following, combining elements of house music with funk, techno, disco, indie rock and pop.');
    