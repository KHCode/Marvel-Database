Project Group 76
Derk Kieft
Kristopher Hill
CS 340
Project Step 3 


Data Definition Queries




--
-- Table structure for table `character`
--
DROP TABLE IF EXISTS `character`;


CREATE TABLE `character` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`alias` varchar(255) NOT NULL,
`codename` varchar(255),
`home` int(11),
`archNemesis` int(11),
PRIMARY KEY (`id`),
KEY `home` (`home`),
CONSTRAINT `location` FOREIGN KEY (`home`) REFERENCES
`character` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `character` WRITE;


INSERT INTO character VALUES (“Peter Parker”, “Spider-Man”, (SELECT id FROM location WHERE name = “New York City”), NULL), (“Reed Richards”, “Mr. Fantastic”, (SELECT id FROM location WHERE name = “New York City”), NULL), (“Victor Von Doom”, “Doctor Doom”, (SELECT id FROM location WHERE name = “Latvia”), (SELECT id FROM character WHERE codename = “Mr. Fantastic”)), (“Thor”, NULL, (SELECT id FROM location WHERE name = “Asgard”), NULL), (“Thanos”, NULL, (SELECT id FROM location WHERE name = “Titan”), NULL), (“Peter Quill”, “Star-Lord”, (SELECT id FROM location WHERE name = “Colorado”), (SELECT id FROM character WHERE alias = “Thanos”)), (“Gamora”, NULL, (SELECT id FROM location WHERE name = “Zen-Whoberi”), (SELECT id FROM character WHERE alias = “Thanos”));


UNLOCK TABLES;


--
-- Table structure for table `event`
--
DROP TABLE IF EXISTS `event`;


CREATE TABLE `event` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
`start_date` date,
`end_date` date,
`description` varchar(255)
PRIMARY KEY (`id`),
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `event` WRITE;


INSERT INTO event VALUES (“The Infinity Gauntlet”, 1991-07-00, 2005-01-00, “Thanos acquires the all-powerful infinity gauntlet and wipes out half the population of the universe. Marvel heroes fight back.”), (“Civil War”, 2006-07-00, 2007-01-00, “After a horrific tragedy raises questions on whether or not superheroes should register with the government, longtime Avengers teammates Captain America and Iron Man end up on opposite sides of the argument.”), (“Secret Invasion”, 2008-06-00, 2009-01-00, “The shape-shifting Skrulls have been infiltrating the Earth for years, replacing many of Marvels heroes with impostors, setting the stage for an all-out invasion.”), (“Annihilation”, 2007-06-00, 2008-06-00, “Parallel stories pitting the Silver Surfer, Nova, Ronan the Accuser and the Super-Skrull against Annihilus and his forces lead into a climatic six-issue war.”);


UNLOCK TABLES;


--
-- Table structure for table `character_event`
--
DROP TABLE IF EXISTS `character_event`;


CREATE TABLE `character_event` (
`character_id` int(11) NOT NULL,
`event_id` int(11) NOT NULL,
KEY `character_id` (`character_id`),
KEY `event_id` (`event_id`),
CONSTRAINT `character` FOREIGN KEY (`id`) REFERENCES
`character` (`id`),
CONSTRAINT `event` FOREIGN KEY (`id`) REFERENCES
`event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `character_event` WRITE;


INSERT INTO `character_event` VALUES (0, 0), (0, 1), (0, 2), (1, 1), (1, 2);


UNLOCK TABLES; 


--
-- Table structure for table `location`
--
DROP TABLE IF EXISTS `location`;


CREATE TABLE `location` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;




LOCK TABLES `location` WRITE;


INSERT INTO `location` VALUES (“New York City”), (“Titan”), (“Asgard”), (“Latveria”), (“Zen-Whoberi”), (“Colorado”);


UNLOCK TABLES;


--
-- Table structure for table `event_location`
--
DROP TABLE IF EXISTS `event_location`;


CREATE TABLE `event_location` (
`event_id` int(11) NOT NULL,
`location_id` int(11) NOT NULL,
KEY `location_id` (`location_id`),
KEY `event_id` (`event_id`),
CONSTRAINT `location` FOREIGN KEY (`id`) REFERENCES
`location` (`id`),
CONSTRAINT `event` FOREIGN KEY (`id`) REFERENCES
`event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `event_location` WRITE;


INSERT INTO `event_location` VALUES (0, 0), (0, 1), (1, 0), (2, 0), (2, 5);


UNLOCK TABLES;




--
-- Table structure for table `team`
--
DROP TABLE IF EXISTS `team`;


CREATE TABLE `team` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`name` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;




LOCK TABLES `team` WRITE;


INSERT INTO `team` VALUES (“Avengers”), (“Guardians of the Galaxy”), (“X-Men”), (“Fantastic Four”), (“X-Force”);


UNLOCK TABLES;


--
-- Table structure for table `team_members`
--
DROP TABLE IF EXISTS `team_members`;


CREATE TABLE `team_members` (
`team_id` int(11) NOT NULL,
`character_id` int(11) NOT NULL,
KEY `character_id` (`character_id`),
KEY `team_id` (`event_id`),
CONSTRAINT `character` FOREIGN KEY (`id`) REFERENCES
`character` (`id`),
CONSTRAINT `team` FOREIGN KEY (`id`) REFERENCES
`team` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;




LOCK TABLES `team_members` WRITE;


INSERT INTO `team_members` VALUES (0, 3), (1, 5), (1, 6), (3, 1);


UNLOCK TABLES;


--
-- Table structure for table `superpowers`
--
DROP TABLE IF EXISTS `superpowers`;


CREATE TABLE `superpowers` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`description` varchar(255) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `superpowers` WRITE;


INSERT INTO `superpowers` VALUES (“Abilities of a spider”), (“Stretches his body”), (“Super strength”), (“Super genius”);


UNLOCK TABLES;


--
-- Table structure for table `superpower_characters`
--
DROP TABLE IF EXISTS `superpower_characters`;


CREATE TABLE `superpower_characters` (
`superpower_id` int(11) NOT NULL,
`character_id` int(11) NOT NULL,
KEY `character_id` (`character_id`),
KEY `superpower_id` (`event_id`),
CONSTRAINT `character` FOREIGN KEY (`id`) REFERENCES
`character` (`id`),
CONSTRAINT `superpower` FOREIGN KEY (`id`) REFERENCES
`superpower` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;


LOCK TABLES `superpower_characters` WRITE;


INSERT INTO `superpower_characters` VALUES (0, 0), (1, 0), (3, 1), (3, 2);


UNLOCK TABLES;