DROP DATABASE cryptosafe IF EXISTS;

CREATE DATABASE cryptosafe;

use cryptosafe

CREATE TABLE user (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NULL,
    password VARCHAR(255) NULL,
    customer_id VARCHAR(255) NULL
);

CREATE TABLE prevision (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date VARCHAR(255) NULL,
    prevision1 BOOLEAN NULL,
    prevision2 BOOLEAN NULL,
    prevision3 BOOLEAN NULL,
    prevision4 BOOLEAN NULL,
    prevision5 BOOLEAN NULL
);