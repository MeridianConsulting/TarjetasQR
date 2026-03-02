<?php
// CORS primero, para que las preflight OPTIONS siempre tengan los headers
require_once __DIR__ . '/middleware/cors.php';

require_once __DIR__ . '/controllers/adminController.php';
require_once __DIR__ . '/controllers/userController.php';

// Configuración de errores para producción
// Solo reportar errores críticos, no mostrar detalles
error_reporting(E_ERROR | E_WARNING | E_PARSE);
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', __DIR__ . '/logs/php_errors.log');

// Base path - detectar dinámicamente
// Obtener el directorio del script actual relativo al DocumentRoot
$scriptPath = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));
$documentRoot = str_replace('\\', '/', $_SERVER['DOCUMENT_ROOT']);
$currentDir = str_replace('\\', '/', __DIR__);

// Calcular el BASE_PATH relativo al DocumentRoot
$relativePath = str_replace($documentRoot, '', $currentDir);
$relativePath = str_replace('\\', '/', $relativePath);

// Si no se puede calcular, usar el SCRIPT_NAME como fallback
if (empty($relativePath) || $relativePath === $currentDir) {
    $relativePath = dirname($_SERVER['SCRIPT_NAME']);
}

// Asegurar que comience con /
if (substr($relativePath, 0, 1) !== '/') {
    $relativePath = '/' . $relativePath;
}

// Eliminar barra final si existe
$relativePath = rtrim($relativePath, '/');

define('BASE_PATH', $relativePath);

// Captura el método y la ruta de la solicitud
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(str_replace(BASE_PATH, '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), "/");

// Debug para verificar la ruta
error_log("Method: $method, Path: $path");

// Manejador de rutas
function handleRequest($method, $path) {
    $path = trim($path, "/");
    $controller = null;

    // Ruta para servir imágenes estáticas desde el directorio uploads
    if (preg_match("#^uploads/(.+)$#", $path, $matches) && $method === "GET") {
        $filename = $matches[1];
        $filePath = __DIR__ . '/uploads/' . $filename;
        
        if (file_exists($filePath)) {
            // Determinar el tipo MIME según la extensión
            $extension = pathinfo($filePath, PATHINFO_EXTENSION);
            $mimeTypes = [
                'jpg' => 'image/jpeg',
                'jpeg' => 'image/jpeg',
                'png' => 'image/png',
                'gif' => 'image/gif',
                'webp' => 'image/webp'
            ];
            
            $mimeType = $mimeTypes[strtolower($extension)] ?? 'application/octet-stream';
            
            // Headers CORS para las imágenes - restringir a dominios permitidos
            $allowedOrigins = [
                'http://carnet.meridian.com',
                'https://carnet.meridian.com',
                'http://meridianltda.com',
                'https://meridianltda.com',
                'http://www.meridianltda.com',
                'https://www.meridianltda.com',
                'http://localhost',
                'http://localhost:3000',
            ];
            $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
            if (in_array($origin, $allowedOrigins)) {
                header('Access-Control-Allow-Origin: ' . $origin);
            }
            header('Access-Control-Allow-Methods: GET');
            header('Access-Control-Allow-Headers: Content-Type');
            header('Content-Type: ' . $mimeType);
            header('Content-Length: ' . filesize($filePath));
            header('Cache-Control: public, max-age=31536000'); // Cache por 1 año
            readfile($filePath);
            exit;
        } else {
            http_response_code(404);
            header("Content-Type: application/json");
            echo json_encode(["message" => "Imagen no encontrada"]);
            exit;
        }
    }

    if ($path === "employees" && $method === "POST") {
        header("Content-Type: application/json");
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new UserController();
        $controller->agregarEmpleado($data);

    } elseif (preg_match("#^employees/(\d+)$#", $path, $matches) && $method === "GET") {
        header("Content-Type: application/json");
        // Validación adicional: solo aceptar IDs numéricos
        $id = filter_var($matches[1], FILTER_VALIDATE_INT);
        if ($id === false || $id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            return;
        }
        $controller = new UserController();
        $controller->obtenerEmpleadoPorId($id);

    } elseif ($path === "admin/employees" && $method === "GET") {
        header("Content-Type: application/json");
        $controller = new AdminController();
        $controller->getEmployees();

    } elseif ($path === "admin/employees/statistics" && $method === "GET") {
        header("Content-Type: application/json");
        $controller = new AdminController();
        $controller->getEmployeeStatistics();

    } elseif ($path === "admin/employees/search" && $method === "GET") {
        header("Content-Type: application/json");
        $queryParams = [];
        parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $queryParams);
        $controller = new AdminController();
        $controller->searchEmployeesByName($queryParams);

    // Ruta para actualizar la URL de imagen de perfil
    } elseif (preg_match("#^admin/employees/(\d+)/update-image-url$#", $path, $matches) && $method === "PUT") {
        header("Content-Type: application/json");
        $userId = $matches[1];
        $controller = new ProfileController();
        $controller->updateProfileImageUrl($userId);

    // Ruta para eliminar la URL de imagen de perfil
    } elseif (preg_match("#^admin/employees/(\d+)/delete-image-url$#", $path, $matches) && $method === "DELETE") {
        header("Content-Type: application/json");
        $userId = $matches[1];
        $controller = new ProfileController();
        $controller->deleteProfileImageUrl($userId);

    } elseif (preg_match("#^admin/employees/(\d+)$#", $path, $matches) && $method === "PUT") {
        header("Content-Type: application/json");
        $id = $matches[1];
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new AdminController();
        $controller->updateEmployee($id, $data);

    } elseif (preg_match("#^admin/employees/(\d+)$#", $path, $matches) && $method === "DELETE") {
        header("Content-Type: application/json");
        $id = $matches[1];
        $controller = new AdminController();
        $controller->deleteEmployee($id);

    } elseif ($path === "user/login" && $method === "POST") {
        header("Content-Type: application/json");
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Datos inválidos"]);
            return;
        }
        $controller = new UserController();
        $controller->validateUserLogin($data);

    } elseif ($path === "admin/login" && $method === "POST") {
        header("Content-Type: application/json");
        $data = json_decode(file_get_contents("php://input"), true);
        if (!$data) {
            http_response_code(400);
            echo json_encode(["message" => "Datos inválidos"]);
            return;
        }
        $controller = new AdminController();
        $controller->validateLogin($data);

    } else {
        header("Content-Type: application/json");
        http_response_code(404);
        echo json_encode(["message" => "Ruta no encontrada"]);
    }
}

// Llamar al manejador de rutas
handleRequest($method, $path);
?>
