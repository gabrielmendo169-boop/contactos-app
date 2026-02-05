CREATE DATABASE IF NOT EXISTS contactos_db;
USE contactos_db;

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefono VARCHAR(20) NOT NULL
);
