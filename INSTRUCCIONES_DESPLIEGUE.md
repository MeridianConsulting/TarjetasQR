# Instrucciones de Despliegue - carnet.meridianltda.com

## Estructura de Archivos en el Servidor

```
carnet.meridianltda.com/ (DocumentRoot)
├── .htaccess (archivo de la raíz del proyecto - IMPORTANTE)
├── index.html (del frontend/build/)
├── favicon.ico (del frontend/build/)
├── logo192.png (del frontend/build/)
├── logo512.png (del frontend/build/)
├── manifest.json (del frontend/build/)
├── robots.txt (del frontend/build/)
├── static/ (carpeta completa del frontend/build/static/)
│   ├── css/
│   ├── js/
│   └── media/
└── backend/ (carpeta completa del backend/)
    ├── .htaccess (ya existe)
    ├── index.php
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── utils/
    └── uploads/
```

## Pasos para Desplegar

### 1. Subir Archivos del Frontend
- Sube TODOS los archivos de `frontend/build/` a la raíz de `carnet.meridianltda.com/`
- Asegúrate de que `index.html` esté en la raíz

### 2. Subir Archivos del Backend
- Sube TODA la carpeta `backend/` a `carnet.meridianltda.com/backend/`

### 3. Subir .htaccess
- Sube el archivo `.htaccess` de la raíz del proyecto a la raíz de `carnet.meridianltda.com/`
- Este archivo es CRÍTICO para que funcionen las rutas de React

### 4. Verificar Permisos
```bash
chmod 644 .htaccess
chmod 644 index.html
chmod 755 backend/
chmod 644 backend/index.php
chmod 755 backend/uploads/
```

## Verificación

Después de subir, verifica que funcionen estas URLs:

✅ `https://carnet.meridianltda.com/` → Debe mostrar el login
✅ `https://carnet.meridianltda.com/user/login` → Debe mostrar el login de usuarios
✅ `https://carnet.meridianltda.com/admin/login` → Debe mostrar el login de admin
✅ `https://carnet.meridianltda.com/admin` → Debe redirigir al login si no estás autenticado
✅ `https://carnet.meridianltda.com/ProfilePage/[id]` → Debe mostrar el perfil
✅ `https://carnet.meridianltda.com/backend/user/login` → Debe funcionar la API

## Problemas Comunes

### Error 404 en rutas de React
- Verifica que el `.htaccess` esté en la raíz
- Verifica que `mod_rewrite` esté habilitado en Apache
- Verifica que el `.htaccess` tenga permisos 644

### Error 404 en /backend
- Verifica que la carpeta `backend/` exista
- Verifica que `backend/index.php` exista
- Verifica que `backend/.htaccess` exista

### CORS errors
- Ya está configurado en `backend/middleware/cors.php`
- Verifica que `meridianltda.com` esté en la lista de dominios permitidos

