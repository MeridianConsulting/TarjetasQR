const db = require('../config/db');

// Controlador para agregar un empleado
const agregarEmpleado = (req, res) => {
    const { nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional } = req.body;

    const sql = 'INSERT INTO empleados (nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional) VALUES (?, ?, ?, ?, ?, ?, ?)';

    db.query(sql, [nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional], (err, result) => {
        if (err) {
            console.error("Error al insertar empleado:", err); // Imprime el error en la consola
            return res.status(500).json({ 
                error: "Error al insertar empleado", 
                detalle: err.message 
            });
        }

        // Responder con un objeto JSON que incluye el ID del nuevo empleado
        res.status(201).json({ 
            message: 'Empleado agregado exitosamente',
            id: result.insertId // `insertId` devuelve el ID generado para el nuevo registro
        });
    });
};

// Controlador para obtener un empleado por ID
const obtenerEmpleadoPorId = (req, res) => {
    const { id } = req.params;

    const sql = 'SELECT * FROM empleados WHERE id = ?';
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener empleado:', err);
            return res.status(500).json({ error: 'Error al obtener empleado' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        res.status(200).json(results[0]); // Devuelve el primer resultado
    });
};

module.exports = { agregarEmpleado, obtenerEmpleadoPorId };
