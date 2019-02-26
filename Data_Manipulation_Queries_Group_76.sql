-- Project Group 76
-- Derk Kieft
-- Kristopher Hill
-- CS 340
-- Project Step 3 


-- Data Manipulation Queries




-- Show Character table
SELECT * FROM character;


-- Show Event table
SELECT * FROM event;


-- Show Location table
SELECT * FROM location;


-- Show Superpower table
SELECT * FROM superpower;


-- Show Character Superpowers:
SELECT character.alias, character.codename, superpower.description FROM characters
INNER JOIN character_superpower ON character.id=character_superpower.character_id
INNER JOIN superpower ON character_superpower.superpower_id=superpower.id;


-- Add a new character (add_character)
INSERT INTO character (`id`, `alias`, `codename`, `home`, `archnemesis`)
VALUES (NULL, :alias, :codename, :home, :nemesis);


-- Add a new superpower (Add_superpower)
INSERT INTO superpower (`id`, `description`)
VALUES (NULL, :description);


-- Add a new location (Add_location)
INSERT INTO location (`id`, `name`)
VALUES (NULL, :name);


-- Add new event (Add_event)
INSERT INTO event (`id`, `name`, `start_date`, `end_date`, `description`)
VALUES (NULL, :name, :start, :end, :description);


-- Add new team (Add_team)
INSERT INTO team (`id`, `name`)
VALUES (NULL, :name);


-- Delete character (del_character)
DELETE FROM character WHERE id = :id;


-- Delete Superpower (del_superpower)
DELETE FROM superpower WHERE id = :id;


-- Delete location (del_location)
DELETE FROM location WHERE id = :id;


-- Delete event (del_event)
DELETE FROM event WHERE id = :id;


-- Delete team (del_team)
DELETE FROM team WHERE id = :id;


-- Modify existing character (mod_character)
UPDATE character
SET alias =:alias, codename = :codename,  home = :value,  archnemesis = :nemesis
WHERE id = :id; 


-- Modify existing Superpower (mod_superpower)
UPDATE superpower
SET description = :description
WHERE id = :id; 


-- Modify existing location (mod_location)
UPDATE location
SET name = :location
WHERE id = :id; 


-- Modify existing location (mod_event)
UPDATE event
SET name = :name, start_date= :start, end_date= :end, description= :description
WHERE id = :id;  


-- Modify existing team (mod_team)
UPDATE team
SET name = :name
WHERE id = :id; 


-- Add Superpower to character (add_char_sp)
INSERT INTO character_superpower (`character_id`, `superpower_id`)
VALUES (:cid, :sid);


-- Add character to event (add_char_event)
INSERT INTO character_event (`character_id`, `event_id`)
VALUES (:cid, :eid);


-- Add character to team (add_char_team)
INSERT INTO team_members (`character_id`, `team_id`)
VALUES (:cid, :tid);


-- Add location to event (add_event_loc)
INSERT INTO character_location (`character_id`, `location_id`)
VALUES (:cid, :lid);


-- Remove superpower from character (Del_char_sp)
DELETE FROM character_superpower WHERE character_id = :cid AND superpower_id = :sid;


-- Delete character from event (Del_char_event)
DELETE FROM character_event WHERE  character_id = :cid AND event_id = :eid ;


-- Delete character from team (del_char_team)
DELETE FROM character_team WHERE character_id = :cid AND team_id = :tid;


-- Delete location from event (Del_event_loc)
DELETE FROM event_location WHERE event_id = :eid AND location_id = :lid;