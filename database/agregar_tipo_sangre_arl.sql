-- Añadir columnas tipo_sangre y ARL a la tabla empleados
-- Ejecutar sobre la base de datos empleados_db

USE `empleados_db`;

ALTER TABLE `empleados`
  ADD COLUMN `tipo_sangre` varchar(5) DEFAULT NULL AFTER `imageUrl`,
  ADD COLUMN `arl` varchar(100) DEFAULT NULL AFTER `tipo_sangre`;
