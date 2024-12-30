# Proyecto de Tarjetas QR para Identificación de Empleados

Este proyecto permite identificar de manera fácil y rápida a los empleados de la empresa mediante un código QR. Al descargar el QR, el empleado será redirigido a una página con su tarjeta de presentación digital. La aplicación está diseñada para ser fácil de usar y permite gestionar la información de los empleados a través de una base de datos en MySQL.

## Tecnologías utilizadas

- **Node.js**: Backend para manejar la lógica del servidor.
- **React**: Framework para la creación de la aplicación web.
- **MySQL**: Motor de base de datos para almacenar la información de los empleados y generar los QR.
- **Express**: Framework para Node.js utilizado en la construcción del servidor y API.
- **CORS**: Cliente HTTP para hacer peticiones al backend desde la aplicación web.

## Descripción

Este proyecto permite a los empleados generar su propia tarjeta de presentación digital a través de un código QR único. Este código QR puede ser escaneado por cualquier dispositivo móvil, lo que redirige a la página con la información del empleado, como su nombre, puesto, contacto y otros datos relevantes.

La base de datos MySQL almacena la información de cada empleado, y la API de Node.js permite gestionar la creación de los QR y la actualización de los datos del empleado.

## Funcionalidades

- **Generación de QR**: Cada empleado recibe un código QR único que lo redirige a su tarjeta de presentación.
- **Redirección a la tarjeta de presentación**: Al escanear el QR, el empleado es dirigido a su página con los detalles relevantes.
- **Interfaz en React**: La aplicación web permite la visualización de los QR y la gestión de los datos del empleado.
- **Administración de datos**: El backend en Node.js se encarga de gestionar los datos de los empleados y generar los códigos QR.
- **Base de datos MySQL**: Se utiliza para almacenar y recuperar la información de los empleados.

## Instalación

### Prerequisitos

1. **Node.js**: Asegúrate de tener instalada la última versión de Node.js.
2. **MySQL**: Debes tener MySQL instalado y configurado en tu sistema.
3. **React**: Para correr la aplicación en un dispositivo o emulador.

### Backend (Node.js)

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio/backend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Configura las credenciales de la base de datos en el archivo `.env`:

   ```bash
   DB_HOST=localhost
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_de_tu_base_de_datos
   ```

4. Inicia el servidor:

   ```bash
   npm start
   ```

### Frontend (React Native)

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio/frontend
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Corre la aplicación:

   ```bash
   npm start
   ```

## Estructura del Proyecto

```
tu-repositorio/
│
├── backend/                   # Backend con Node.js y MySQL
│   ├── server.js              # Servidor principal
│   ├── routes/                # Rutas para la API
│   ├── models/                # Modelos de la base de datos
│   └── .env                   # Configuración del entorno
│
└── frontend/                  # Aplicación móvil en React Native
    ├── App.js                 # Componente principal
    ├── components/            # Componentes reutilizables
    ├── screens/               # Pantallas principales
    └── assets/                # Imágenes y recursos
```

## Contribución

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-característica`).
3. Realiza tus cambios.
4. Haz un commit (`git commit -am 'Agrega nueva característica'`).
5. Haz un push a tu rama (`git push origin feature/nueva-característica`).
6. Abre un pull request.

## Licencia

Este proyecto está bajo la Licencia MIT - consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Gracias por revisar el proyecto. Si tienes alguna duda o sugerencia, ¡no dudes en abrir un issue o enviar un pull request!
```
