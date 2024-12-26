const express = require('express');
const router = express.Router();
const { agregarEmpleado, obtenerEmpleadoPorId } = require('../controllers/usersController');

router.post('/empleados', agregarEmpleado);
router.get('/empleados/:id', obtenerEmpleadoPorId); // Nueva ruta para obtener empleado por Id

module.exports = router;
