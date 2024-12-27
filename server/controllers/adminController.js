const db = require('../config/db');

// Controlador para validar credenciales del administrador
exports.loginAdmin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const query = "SELECT * FROM admins WHERE username = ?";

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Error en la consulta a la base de datos:", err.message);
            return res.status(500).json({ message: "An error occurred while logging in" });
        }

        if (results.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: "Invalid username or password" });
        }

        const admin = results[0];
        console.log("Usuario encontrado:", admin);

        // Verificación de contraseña
        if (password !== admin.password) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Invalid username or password" });
        }

        console.log("Login exitoso");
        return res.status(200).json({ message: "Login successful", admin });
    });
};

// Controlador para obtener todos los empleados
exports.getEmployees = (req, res) => {
    const query = "SELECT * FROM empleados";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener los empleados:", err.message);
            return res.status(500).json({ message: "Error al obtener los empleados" });
        }

        return res.status(200).json(results);
    });
};

// Controlador para obtener un empleado por ID
exports.getEmployeeById = (req, res) => {
    const { id } = req.params;

    const query = "SELECT * FROM empleados WHERE id = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al obtener el empleado:", err.message);
            return res.status(500).json({ message: "Error al obtener el empleado" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(200).json(results[0]);
    });
};

// Controlador para crear un nuevo empleado
exports.createEmployee = (req, res) => {
    const { nombre, puesto, salario } = req.body;

    if (!nombre || !puesto || !salario) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const query = "INSERT INTO empleados (nombre, puesto, salario) VALUES (?, ?, ?)";

    db.query(query, [nombre, puesto, salario], (err, results) => {
        if (err) {
            console.error("Error al crear el empleado:", err.message);
            return res.status(500).json({ message: "Error al crear el empleado" });
        }

        return res.status(201).json({ message: "Empleado creado con éxito", id: results.insertId });
    });
};

// Controlador para actualizar un empleado
exports.updateEmployee = (req, res) => {
    const { id } = req.params;
    const { nombre, puesto, salario } = req.body;

    if (!nombre || !puesto || !salario) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const query = "UPDATE empleados SET nombre = ?, puesto = ?, salario = ? WHERE id = ?";

    db.query(query, [nombre, puesto, salario, id], (err, results) => {
        if (err) {
            console.error("Error al actualizar el empleado:", err.message);
            return res.status(500).json({ message: "Error al actualizar el empleado" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(200).json({ message: "Empleado actualizado con éxito" });
    });
};

// Controlador para eliminar un empleado
exports.deleteEmployee = (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM empleados WHERE id = ?";

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error("Error al eliminar el empleado:", err.message);
            return res.status(500).json({ message: "Error al eliminar el empleado" });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        return res.status(200).json({ message: "Empleado eliminado con éxito" });
    });
};

// Controlador para obtener estadísticas de los empleados
exports.getEmployeeStatistics = (req, res) => {
    const query = "SELECT puesto, COUNT(*) as count, AVG(salario) as avgSalary FROM empleados GROUP BY puesto";

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener estadísticas de empleados:", err.message);
            return res.status(500).json({ message: "Error al obtener estadísticas" });
        }

        return res.status(200).json(results);
    });
};

// Controlador para buscar empleados por nombre
exports.searchEmployeesByName = (req, res) => {
    const { nombre } = req.query;

    if (!nombre) {
        return res.status(400).json({ message: "El nombre es obligatorio para la búsqueda" });
    }

    const query = "SELECT * FROM empleados WHERE nombre LIKE ?";

    db.query(query, [`%${nombre}%`], (err, results) => {
        if (err) {
            console.error("Error al buscar empleados:", err.message);
            return res.status(500).json({ message: "Error al buscar empleados" });
        }

        return res.status(200).json(results);
    });
};
