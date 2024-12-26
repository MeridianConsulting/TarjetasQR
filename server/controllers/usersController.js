const db = require('../config/db');

const agregarEmpleado = (req, res) => {
    const { Id, nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional } = req.body;
    const sql = 'INSERT INTO empleados (Id, nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    db.query(sql, [Id, nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).send('Empleado agregado');
    });
};

module.exports = { agregarEmpleado };
