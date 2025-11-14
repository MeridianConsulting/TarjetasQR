-- Agregar campo password a la tabla empleados
-- Si el campo ya existe, este script no causará error

ALTER TABLE `empleados` 
ADD COLUMN IF NOT EXISTS `password` VARCHAR(255) DEFAULT NULL;

-- Actualizar contraseñas por defecto: usar la cédula como contraseña inicial
-- Los usuarios podrán cambiar su contraseña después
UPDATE `empleados` 
SET `password` = CAST(`Id` AS CHAR) 
WHERE `password` IS NULL;

