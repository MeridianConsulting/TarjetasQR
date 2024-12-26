const db = require('../config/db');

const agregarEmpleado = (req, res) => {
    const { nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional } = req.body;
    const sql = 'INSERT INTO empleados (nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional], (err, result) => {
        if (err) {
            console.error("Error al insertar empleado:", err); // Imprime el error en la consola
            return res.status(500).send({ error: "Error al insertar empleado", detalle: err.message });
        }
        res.status(201).send('Empleado agregado');
    });
};

const obtenerEmpleadoPorId = (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM empleados WHERE Id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Error al obtener empleado:", err); // Imprime el error en la consola
            return res.status(500).send({ error: "Error al obtener empleado", detalle: err.message });
        }
        if (result.length === 0) {
            return res.status(404).send('Empleado no encontrado');
        }
        res.status(200).send(result[0]);
    });
};

module.exports = { agregarEmpleado, obtenerEmpleadoPorId };
