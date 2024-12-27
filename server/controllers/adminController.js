const db = require('../config/db');

// Controlador para validar credenciales del administrador
exports.loginAdmin = (req, res) => {
    const { username, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Consulta a la base de datos
    const query = "SELECT * FROM admins WHERE username = ?";

    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Error en la consulta a la base de datos:", err.message);
            return res.status(500).json({ message: "An error occurred while logging in" });
        }

        // Verificar si se encontró el usuario
        if (results.length === 0) {
            console.log("Usuario no encontrado");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const admin = results[0];
        console.log("Usuario encontrado:", admin);

        // Validar la contraseña directamente (sin bcrypt)
        if (password !== admin.password) {
            console.log("Contraseña incorrecta");
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log("Login exitoso");
        return res.status(200).json({ message: "Login successful" });
    });
};
