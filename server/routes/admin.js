const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para el login del administrador
router.post('/login', adminController.loginAdmin);

module.exports = router;
