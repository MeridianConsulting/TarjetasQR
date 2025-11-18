<?php
// Dominios permitidos para CORS
$allowedOrigins = [
    'http://carnet.meridian.com',
    'https://carnet.meridian.com',
    'http://meridianltda.com',
    'https://meridianltda.com',
    'http://www.meridianltda.com',
    'https://www.meridianltda.com',
    'http://localhost', // Para desarrollo local
    'http://localhost:3000', // Para desarrollo con React
];

// Obtener el origen de la solicitud
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Verificar si el origen está permitido
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // Si no hay origen (petición directa) o no está en la lista, no establecer el header
    // Esto previene que cualquier sitio pueda hacer peticiones
}

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");

// Responder a las solicitudes OPTIONS de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
?>
