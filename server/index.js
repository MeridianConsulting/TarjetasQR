const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin"); // Ruta para las operaciones del administrador

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api", userRoutes);
app.use("/api/admin", adminRoutes); // Agregar rutas para administrador

// Puerto en el que escucha el servidor
const PORT = 3001; // Cambiar a un puerto diferente al 3306
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Cierre de la conexión
process.on("SIGINT", () => {
    db.end((err) => {
        if (err) {
            console.error("Error al cerrar la conexión a la base de datos: ", err);
        } else {
            console.log("Conexión a la base de datos cerrada");
        }
        process.exit();
    });
});
