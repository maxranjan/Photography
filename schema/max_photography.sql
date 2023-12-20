/**
 * Schema for the database Max Photography Database.
 */
----
-- Table: contact
----
CREATE TABLE IF NOT EXISTS `contact`(
    `sno` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `country` VARCHAR(30) NOT NULL,
    `contents` VARCHAR(300) NOT NULL
);