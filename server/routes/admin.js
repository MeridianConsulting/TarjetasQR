const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para el login del administrador
router.post('/login', adminController.loginAdmin);

// Rutas para el CRUD de empleados
router.get('/employees', adminController.getEmployees); // Obtener todos los empleados
router.get('/employees/:id', adminController.getEmployeeById); // Obtener un empleado por ID
router.post('/employees', adminController.createEmployee); // Crear un nuevo empleado
router.put('/employees/:id', adminController.updateEmployee); // Actualizar un empleado
router.delete('/employees/:id', adminController.deleteEmployee); // Eliminar un empleado

// Ruta para obtener estadísticas de los empleados
router.get('/employees/statistics', adminController.getEmployeeStatistics);

// Ruta para buscar empleados por nombre
router.get('/employees/search', adminController.searchEmployeesByName);

module.exports = router;
