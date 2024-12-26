const express = require('express');
const router = express.Router();
const { agregarEmpleado } = require('../controllers/usersController');

router.post('/empleados', agregarEmpleado);

module.exports = router;
