const express = require("express");
const cors = require('cors');
const db = require('./config/db');
const userRoutes = require('./routes/users');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api', userRoutes);

// Puerto en el que escucha el servidor
app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

// Cierre de la conexión
process.on('SIGINT', () => {
    db.end(err => {
        if (err) {
            console.error("Error al cerrar la conexión a la base de datos: ", err);
        } else {
            console.log("Conexión a la base de datos cerrada");
        }
        process.exit();
    });
});
