CREATE DATABASE coolBeans_db;

USE coolBeans_db;

-- DROP TABLE IF EXISTS words;
-- DROP TABLE IF EXISTS scores;
-- DROP TABLE IF EXISTS users;

-- CREATE TABLE words (
--   id int NOT NULL AUTO_INCREMENT,
--   difficulty VARCHAR(15) NOT NULL,
--   words VARCHAR(25) NOT NULL UNIQUE,
--   letterCount INTEGER,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE scores (
--   id int NOT NULL AUTO_INCREMENT,
--   player VARCHAR(50) NOT NULL,
--   score INTEGER NOT NULL,
--   PRIMARY KEY (id)
-- );

-- CREATE TABLE users (
--   id int NOT NULL AUTO_INCREMENT,
--   userRole VARCHAR(50) NOT NULL,
--   email VARCHAR(50) NOT NULL UNIQUE,
--   pword VARCHAR(50) NOT NULL,
--   PRIMARY KEY (id)
-- );