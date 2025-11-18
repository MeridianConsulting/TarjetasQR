<?php
require_once __DIR__ . '/../config/db.php';

class AdminController {
    private $db;
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    
    public function validateLogin($data) {
        if (!isset($data['username'], $data['password'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Username y password son requeridos."]);
            return;
        }
        try {
            // Buscar el usuario por username solamente
            $stmt = $this->db->prepare("SELECT id, password FROM admins WHERE username = ?");
            $stmt->bind_param("s", $data['username']);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows === 0) {
                // Simular tiempo de procesamiento para evitar timing attacks
                usleep(500000); // 0.5 segundos
                http_response_code(401);
                echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
                $stmt->close();
                return;
            }
            
            $admin = $result->fetch_assoc();
            $stmt->close();
            
            // Verificar la contraseña usando password_verify
            // Si la contraseña en BD no es un hash (migración), comparar directamente y actualizar
            $passwordValid = false;
            if (password_verify($data['password'], $admin['password'])) {
                $passwordValid = true;
            } elseif ($admin['password'] === $data['password']) {
                // Compatibilidad: si la contraseña está en texto plano, actualizarla a hash
                $passwordValid = true;
                $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                $updateStmt = $this->db->prepare("UPDATE admins SET password = ? WHERE id = ?");
                $updateStmt->bind_param("si", $hashedPassword, $admin['id']);
                $updateStmt->execute();
                $updateStmt->close();
            }
            
            if ($passwordValid) {
                http_response_code(200);
                echo json_encode(["success" => true, "message" => "Login exitoso."]);
            } else {
                http_response_code(401);
                echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error en el servidor."]);
        }
    }
    
    // Obtener todos los empleados (SELECT * incluye imageUrl)
    public function getEmployees() {
        global $db;
        $sql = 'SELECT * FROM empleados';
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["error" => "No se encontraron empleados"]);
        } else {
            $empleados = $result->fetch_all(MYSQLI_ASSOC);
            echo json_encode($empleados);
        }
        $stmt->close();
    }
    
    // Obtener un empleado por Id (SELECT * incluye imageUrl)
    public static function getEmployeeById($Id) {
        $query = "SELECT * FROM empleados WHERE Id = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param("i", $Id);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }
        echo json_encode($result->fetch_assoc());
    }
    
    // Crear un empleado (incluyendo el campo Id y imageUrl)
    public function crearEmpleado($data) {
        global $db;
        
        if (!isset($data['Id'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "error" => "El campo 'Id' es requerido."]);
            return;
        }
        
        $sql = 'INSERT INTO empleados (Id, nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional, imageUrl) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        $stmt = $db->prepare($sql);
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al preparar la consulta", "detalle" => $db->error]);
            return;
        }
        
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
            echo json_encode(["success" => true, "message" => "Empleado creado exitosamente", "id" => $data['Id']]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al insertar empleado", "detalle" => $stmt->error]);
        }
        $stmt->close();
    }
    
    // Actualizar un empleado (ahora actualiza también imageUrl)
    public static function updateEmployee($id, $request) {
        $query = "UPDATE empleados SET nombre = ?, cargo = ?, numero_telefonico = ?, email = ?, compania = ?, telefono_empresa = ?, telefono_internacional = ?, imageUrl = ? WHERE Id = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param(
            "ssssssssi",
            $request['nombre'],
            $request['cargo'],
            $request['numero_telefonico'],
            $request['email'],
            $request['compania'],
            $request['telefono_empresa'],
            $request['telefono_internacional'],
            $request['imageUrl'],
            $id
        );
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Error al actualizar el empleado", "detalle" => $stmt->error]);
            return;
        }
        // Incluso si affected_rows es 0 (por tener datos iguales), consideramos la operación exitosa
        echo json_encode(["message" => "Empleado actualizado con éxito", "id" => $id]);
    }
    
    // Eliminar un empleado
    public static function deleteEmployee($id) {
        $query = "DELETE FROM empleados WHERE Id = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param("i", $id);
        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Error al eliminar el empleado"]);
            return;
        }
        if ($stmt->affected_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }
        echo json_encode(["message" => "Empleado eliminado con éxito"]);
    }
    
    // Obtener estadísticas de empleados
    public static function getEmployeeStatistics() {
        $query = "SELECT puesto, COUNT(*) as count, AVG(salario) as avgSalary FROM empleados GROUP BY puesto";
        $result = $GLOBALS['db']->query($query);
        if (!$result) {
            http_response_code(500);
            echo json_encode(["message" => "Error al obtener estadísticas"]);
            return;
        }
        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }
}

class ProfileController {
    private $db;
    public function __construct() {
        $this->db = (new Database())->getConnection();
    }
    // Actualiza la URL de la imagen en la base de datos
    public function updateProfileImageUrl($userId) {
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data['imageUrl'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "El campo 'imageUrl' es requerido."]);
            return;
        }
        $imageUrl = $data['imageUrl'];
        $stmt = $this->db->prepare("UPDATE empleados SET imageUrl = ? WHERE Id = ?");
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al preparar la consulta", "detalle" => $this->db->error]);
            return;
        }
        $stmt->bind_param("si", $imageUrl, $userId);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "URL de imagen actualizada correctamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al actualizar la URL de la imagen.", "detalle" => $stmt->error]);
        }
        $stmt->close();
    }
    // Elimina la URL de la imagen (establece el campo a NULL)
    public function deleteProfileImageUrl($userId) {
        $stmt = $this->db->prepare("UPDATE empleados SET imageUrl = NULL WHERE Id = ?");
        if (!$stmt) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al preparar la consulta", "detalle" => $this->db->error]);
            return;
        }
        $stmt->bind_param("i", $userId);
        if ($stmt->execute()) {
            http_response_code(200);
            echo json_encode(["success" => true, "message" => "URL de imagen eliminada correctamente."]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => "Error al eliminar la URL de la imagen.", "detalle" => $stmt->error]);
        }
        $stmt->close();
    }
}
?>
