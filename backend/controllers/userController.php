<?php 
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../utils/security.php';

class UserController {
    public function agregarEmpleado($data) {
        global $db; 
        if (!isset($data['Id'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "El campo 'Id' es requerido."]);
            return;
        }
        // Se incluye el campo imageUrl en la inserción
        $sql = 'INSERT INTO empleados (Id, nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional, imageUrl) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
        // Si no se envía imageUrl, se asigna cadena vacía
        $imageUrl = isset($data['imageUrl']) ? $data['imageUrl'] : '';
        $stmt->bind_param("issssssss", 
            $data['Id'], 
            $data['nombre'], 
            $data['cargo'], 
            $data['numero_telefonico'], 
            $data['email'], 
            $data['compania'], 
            $data['telefono_empresa'], 
            $data['telefono_internacional'],
            $imageUrl
        );
        if ($stmt->execute()) {
            http_response_code(201);
            // NO devolver el ID en la respuesta por seguridad
            echo json_encode(["success" => true, "message" => "Empleado agregado exitosamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al insertar empleado", "detalle" => $stmt->error]);
        }
        $stmt->close();
    }

    public function obtenerEmpleadoPorId($id) {
        global $db;
        
        // Validaciones de seguridad
        $ip = SecurityUtils::getClientIp();
        
        // Rate limiting
        if (!SecurityUtils::checkRateLimit($ip, 100, 3600)) {
            http_response_code(429);
            echo json_encode(["error" => "Demasiadas solicitudes. Por favor, intente más tarde."]);
            return;
        }
        
        // Validar formato del ID
        if (!SecurityUtils::validateEmployeeId($id)) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            return;
        }
        
        $sql = 'SELECT * FROM empleados WHERE Id = ?';
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            // No revelar si el ID existe o no (protección contra enumeración)
            http_response_code(404);
            echo json_encode(["error" => "Empleado no encontrado"]);
        } else {
            $empleado = $result->fetch_assoc();
            // Remover el ID antes de enviar la respuesta
            $empleado = SecurityUtils::sanitizeEmployeeData($empleado);
            echo json_encode($empleado);
        }
        $stmt->close();
    }

    public function validateUserLogin($data) {
        global $db;
        
        // Validaciones de seguridad
        $ip = SecurityUtils::getClientIp();
        
        // Rate limiting más estricto para login (5 intentos por 15 minutos)
        if (!SecurityUtils::checkRateLimit($ip . '_login', 5, 900)) {
            http_response_code(429);
            echo json_encode([
                "success" => false,
                "message" => "Demasiados intentos de inicio de sesión. Por favor, espere 15 minutos."
            ]);
            return;
        }
        
        if (!isset($data['cedula']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Cédula y contraseña son requeridos."
            ]);
            return;
        }
        
        $cedula = trim($data['cedula']);
        $password = $data['password'];
        
        // Validar formato de cédula
        if (!SecurityUtils::validateEmployeeId($cedula)) {
            http_response_code(400);
            echo json_encode([
                "success" => false,
                "message" => "Cédula inválida."
            ]);
            return;
        }
        
        // Buscar empleado por cédula
        // Intentar seleccionar password, si no existe la columna, usar NULL
        $sql = 'SELECT Id, nombre';
        // Verificar si existe la columna password
        $checkColumn = $db->query("SHOW COLUMNS FROM empleados LIKE 'password'");
        if ($checkColumn && $checkColumn->num_rows > 0) {
            $sql .= ', password';
        }
        $sql .= ' FROM empleados WHERE Id = ?';
        
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Error al preparar la consulta."
            ]);
            return;
        }
        
        $stmt->bind_param("i", $cedula);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows === 0) {
            // No revelar si la cédula existe o no (protección contra enumeración)
            // Simular tiempo de procesamiento para evitar timing attacks
            usleep(500000); // 0.5 segundos
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Cédula o contraseña incorrectos."
            ]);
            $stmt->close();
            return;
        }
        
        $empleado = $result->fetch_assoc();
        $stmt->close();
        
        // Verificar contraseña
        // Si no hay contraseña en la BD, usar la cédula como contraseña por defecto
        $storedPassword = isset($empleado['password']) && !empty($empleado['password']) 
            ? $empleado['password'] 
            : $cedula;
        
        // Comparación de contraseñas
        // Si la contraseña almacenada es un hash, usar password_verify
        // Si no, comparar directamente (para compatibilidad con cédula como contraseña)
        $passwordValid = false;
        if (password_verify($password, $storedPassword)) {
            $passwordValid = true;
        } elseif ($storedPassword === $password) {
            $passwordValid = true;
        }
        
        if ($passwordValid) {
            // Generar token simple (en producción usar JWT)
            $token = bin2hex(random_bytes(32));
            
            // Codificar el ID para la URL
            require_once __DIR__ . '/../utils/encodeId.php';
            $encodedId = EncodeId::encode($cedula);
            
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Login exitoso",
                "token" => $token,
                "cedula" => $cedula,
                "encodedId" => $encodedId,
                "nombre" => $empleado['nombre']
            ]);
        } else {
            http_response_code(401);
            echo json_encode([
                "success" => false,
                "message" => "Cédula o contraseña incorrectos."
            ]);
        }
    }
}
?>
