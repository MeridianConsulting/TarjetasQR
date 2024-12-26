
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

module.exports = { agregarEmpleado };
