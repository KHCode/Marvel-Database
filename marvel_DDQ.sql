

-- Table structure for table `location`

DROP TABLE IF EXISTS `location`;


CREATE TABLE `location` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




-- LOCK TABLES `location` WRITE;


INSERT INTO `location` (`name`) VALUES ('New York City'), ('Titan'), ('Asgard'), ('Latveria'), ('Zen-Whoberi'), ('Colorado');


-- UNLOCK TABLES;


-- Table structure for table `character`

DROP TABLE IF EXISTS `marvel_character`;


CREATE TABLE `marvel_character` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`alias` varchar(255) NOT NULL,
`codename` varchar(255),
`home` int(11),
`archNemesis` int(11),
PRIMARY KEY (`id`),
KEY `home` (`home`),
CONSTRAINT `character_home_fk` FOREIGN KEY (`home`) REFERENCES
`location` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- LOCK TABLES `character` WRITE, `location` READ;


INSERT INTO `marvel_character` (`alias`, `codename`, `home`, `archNemesis`) VALUES ('Peter Parker', 'Spider-Man', (SELECT `id` FROM `location` WHERE `name` = 'New York City'), NULL), 
							 ('Reed Richards', 'Mr. Fantastic', (SELECT `id` FROM `location` WHERE `name` = 'New York City'), NULL),
							 ('Victor Von Doom', 'Doctor Doom', (SELECT `id` FROM `location` WHERE `name` = 'Latvia'), NULL), 
							 ('Thor', NULL, (SELECT `id` FROM `location` WHERE `name` = 'Asgard'), NULL), 
							 ('Thanos', NULL, (SELECT `id` FROM `location` WHERE `name` = 'Titan'), NULL), 
							 ('Peter Quill', 'Star-Lord', (SELECT `id` FROM `location` WHERE `name` = 'Colorado'), NULL),
							 ('Gamora', NULL, (SELECT `id` FROM `location` WHERE `name` = 'Zen-Whoberi'), NULL);


-- UNLOCK TABLES;

-- Table structure for table `event`

DROP TABLE IF EXISTS `event`;


CREATE TABLE `event` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`start_date` date,
`end_date` date,
`description` varchar(255),
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- LOCK TABLES `event` WRITE;


INSERT INTO `event` (`name`, `start_date`, `end_date`, `description`) VALUES ('The Infinity Gauntlet', '1991-07-00', '2005-01-00', 'Thanos acquires the all-powerful infinity gauntlet and wipes out half the population of the universe. Marvel heroes fight back.'), 
																			 ('Civil War', '2006-07-00', '2007-01-00', 'After a horrific tragedy raises questions on whether or not superheroes should register with the government, longtime Avengers teammates Captain America and Iron Man end up on opposite sides of the argument.'), 
																			 ('Secret Invasion', '2008-06-00', '2009-01-00', 'The shape-shifting Skrulls have been infiltrating the Earth for years, replacing many of Marvel''s heroes with impostors, setting the stage for an all-out invasion.'), 
																			 ('Annihilation', '2007-06-00', '2008-06-00', 'Parallel stories pitting the Silver Surfer, Nova, Ronan the Accuser and the Super-Skrull against Annihilus and his forces lead into a climatic six-issue war.');


-- UNLOCK TABLES;

-- Table structure for table `character_event`

DROP TABLE IF EXISTS `character_event`;


CREATE TABLE `character_event` (
`character_id` int(11) NOT NULL,
`event_id` int(11) NOT NULL,
KEY `character_id` (`character_id`),
KEY `event_id` (`event_id`),
CONSTRAINT `character_event_fk_1` FOREIGN KEY (`character_id`) REFERENCES
`marvel_character` (`id`),
CONSTRAINT `character_event_fk_2` FOREIGN KEY (`event_id`) REFERENCES
`event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- LOCK TABLES `character_event` WRITE;


INSERT INTO `character_event` (`character_id`,`event_id`) VALUES (1, 1), (1, 2), (1, 3), (2, 2), (2, 3);


-- UNLOCK TABLES; 

-- Table structure for table `event_location`

DROP TABLE IF EXISTS `event_location`;


CREATE TABLE `event_location` (
`event_id` int(11) NOT NULL,
`location_id` int(11) NOT NULL,
KEY `location_id` (`location_id`),
KEY `event_id` (`event_id`),
CONSTRAINT `event_location_fk_1` FOREIGN KEY (`location_id`) REFERENCES
`location` (`id`),
CONSTRAINT `event_location_fk_2` FOREIGN KEY (`event_id`) REFERENCES
`event` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- LOCK TABLES `event_location` WRITE;


INSERT INTO `event_location` (`event_id`, `location_id`) VALUES (1, 1), (1, 2), (2, 1), (3, 1), (3, 6);


-- UNLOCK TABLES;

-- Table structure for table `team`

DROP TABLE IF EXISTS `team`;


CREATE TABLE `team` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




-- LOCK TABLES `team` WRITE;


INSERT INTO `team` (`name`) VALUES ('Avengers'), ('Guardians of the Galaxy'), ('X-Men'), ('Fantastic Four'), ('X-Force');


-- UNLOCK TABLES;

-- Table structure for table `team_members`

DROP TABLE IF EXISTS `team_members`;


CREATE TABLE `team_members` (
`team_id` int(11) NOT NULL,
`character_id` int(11) NOT NULL,
KEY `character_id` (`character_id`),
KEY `team_id` (`team_id`),
CONSTRAINT `team_members_fk_1` FOREIGN KEY (`character_id`) REFERENCES
`marvel_character` (`id`),
CONSTRAINT `team_members_fk_2` FOREIGN KEY (`team_id`) REFERENCES
`team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;




-- LOCK TABLES `team_members` WRITE;


INSERT INTO `team_members` (`team_id`, `character_id`) VALUES (1, 4), (2, 6), (2, 7), (4, 2);


-- UNLOCK TABLES;

-- Table structure for table `superpowers`

DROP TABLE IF EXISTS `superpowers`;


CREATE TABLE `superpowers` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- LOCK TABLES `superpowers` WRITE;


INSERT INTO `superpowers` (`description`) VALUES ('Abilities of a spider'), ('Stretches his body'), ('Super strength'), ('Super genius');


-- UNLOCK TABLES;

-- Table structure for table `superpower_characters`

DROP TABLE IF EXISTS `superpower_characters`;


CREATE TABLE `superpower_characters` (
`superpower_id` int(11) NOT NULL,
`character_id` int(11) NOT NULL,
KEY `character_id` (`character_id`),
KEY `superpower_id` (`superpower_id`),
CONSTRAINT `superpower_characters_fk_1` FOREIGN KEY (`character_id`) REFERENCES
`marvel_character` (`id`),
CONSTRAINT `superpower_characters_fk_2` FOREIGN KEY (`superpower_id`) REFERENCES
`superpowers` (`id`) 
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- LOCK TABLES `superpower_characters` WRITE;


INSERT INTO `superpower_characters` (`superpower_id`, `character_id`) VALUES (1, 1), (2, 1), (4, 2), (4, 3);


-- UNLOCK TABLES;