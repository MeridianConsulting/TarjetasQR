const express = require('express');
const router = express.Router();
const { agregarEmpleado, obtenerEmpleadoPorId } = require('../controllers/usersController');

// Ruta para agregar un empleado
router.post('/empleados', agregarEmpleado);

// Ruta para obtener un empleado por ID
router.get('/empleados/:id', obtenerEmpleadoPorId);

module.exports = router;
