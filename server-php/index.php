<?php
require_once __DIR__ . '/controllers/adminController.php';
require_once __DIR__ . '/controllers/userController.php';
require_once __DIR__ . '/middleware/cors.php';

header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);
error_log("Method: $method, Path: $path");


// Captura el método y la ruta de la solicitud
$method = $_SERVER['REQUEST_METHOD'];
$path = trim(str_replace('/tarjetasqr/server-php', '', parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)), "/");

// Debug para verificar la ruta
error_log("Requested path: " . $path);

// Manejador de rutas
function handleRequest($method, $path) {
    $path = trim($path, "/"); // Eliminar `/` inicial y final

    // Rutas para usuarios
    if ($path === "users" && $method === "GET") {
        $controller = new UserController();
        $controller->getUsers();
    } elseif ($path === "users" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $controller = new UserController();
        $controller->addUser($data);
    }

    // Rutas para empleados
    elseif ($path === "employees" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $controller = new UserController();
        $controller->agregarEmpleado($data);
    } elseif (preg_match("#^employees/(\d+)$#", $path, $matches) && $method === "GET") {
        $id = $matches[1];
        $controller = new UserController();
        $controller->obtenerEmpleadoPorId($id);
    //Rutas para Administradores

    } elseif ($path === "employees/statistics" && $method === "GET") {
        $controller = new AdminController();
        $controller->getEmployeeStatistics();
    } elseif ($path === "employees/search" && $method === "GET") {
        $queryParams = [];
        parse_str(parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY), $queryParams);
        $controller = new AdminController();
        $controller->searchEmployeesByName($queryParams);
    } elseif (preg_match("#^employees/(\d+)$#", $path, $matches) && $method === "PUT") {
        $id = $matches[1];
        $data = json_decode(file_get_contents("php://input"), true);
        $controller = new AdminController();
        $controller->updateEmployee($id, $data);
    } elseif (preg_match("#^employees/(\d+)$#", $path, $matches) && $method === "DELETE") {
        $id = $matches[1];
        $controller = new AdminController();
        $controller->deleteEmployee($id);
    }

    // Rutas para administradores
    elseif ($path === "admin/login" && $method === "POST") {
        $data = json_decode(file_get_contents("php://input"), true);
        $controller = new AdminController();
        $controller->validateLogin($data);
    }
    
        
    

    // Si no se encuentra la ruta
    else {
        http_response_code(404);
        echo json_encode(["message" => "Ruta no encontrada"]);
    }
}

// Llamar al manejador de rutas
handleRequest($method, $path);
?>
