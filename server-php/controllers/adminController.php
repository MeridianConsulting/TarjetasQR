<?php
require_once __DIR__ . '/../config/db.php';

class AdminController {
    // Validar credenciales del administrador
    public function validateLogin($data)
    {
        // Configurar el encabezado para devolver JSON
        header('Content-Type: application/json; charset=utf-8');
    
        // Verificar si el cuerpo de la solicitud tiene los datos requeridos
        if (!isset($data['username']) || !isset($data['password'])) {
            http_response_code(400);
            echo json_encode(["success" => false, "message" => "Username y password son requeridos."]);
            return;
        }
    
        $username = $data['username'];
        $password = $data['password'];
    
        // Conexión a la base de datos
        $db = Database::getConnection();
    
        try {
            // Consultar al usuario en la base de datos
            $stmt = $db->prepare("SELECT id, password FROM admins WHERE username = ?");
            $stmt->bind_param("s", $username);
            $stmt->execute();
            $result = $stmt->get_result();
    
            // Verificar si el usuario existe
            if ($result->num_rows === 0) {
                http_response_code(401);
                echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
                return;
            }
    
            $admin = $result->fetch_assoc();
            $db_password = $admin['password'];
    
            // Verificar el password
            if (!password_verify($password, $db_password)) {
                http_response_code(401);
                echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
                return;
            }
    
            // Respuesta exitosa
            http_response_code(200);
            echo json_encode([
                "success" => true,
                "message" => "Login exitoso.",
                "redirect" => "/admin"
            ]);
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "success" => false,
                "message" => "Error interno del servidor.",
                "error" => $e->getMessage()
            ]);
        } finally {
            // Cerrar la conexión y la declaración preparada
            if (isset($stmt)) $stmt->close();
            $db->close();
        }
    }
    
     
    // Obtener todos los empleados
    public static function getEmployees() {
        $query = "SELECT * FROM empleados";
        $result = $GLOBALS['db']->query($query);

        if (!$result) {
            http_response_code(500);
            echo json_encode(["message" => "Error al obtener los empleados"]);
            return;
        }

        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }

    // Obtener un empleado por ID
    public static function getEmployeeById($id) {
        $query = "SELECT * FROM empleados WHERE id = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }

        echo json_encode($result->fetch_assoc());
    }

    // Crear un empleado
    public static function createEmployee($request) {
        $query = "INSERT INTO empleados (nombre, cargo, numero_telefonico, email, compania, telefono_empresa, telefono_internacional) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $GLOBALS['db']->prepare($query);

        $stmt->bind_param(
            "sssssss",
            $request['nombre'],
            $request['cargo'],
            $request['numero_telefonico'],
            $request['email'],
            $request['compania'],
            $request['telefono_empresa'],
            $request['telefono_internacional']
        );

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Error al crear el empleado"]);
            return;
        }

        echo json_encode(["message" => "Empleado creado con éxito", "id" => $stmt->insert_id]);
    }

    // Actualizar un empleado
    public static function updateEmployee($id, $request) {
        $query = "UPDATE empleados SET nombre = ?, cargo = ?, numero_telefonico = ?, email = ?, compania = ?, telefono_empresa = ?, telefono_internacional = ? WHERE id = ?";
        $stmt = $GLOBALS['db']->prepare($query);

        $stmt->bind_param(
            "sssssssi",
            $request['nombre'],
            $request['cargo'],
            $request['numero_telefonico'],
            $request['email'],
            $request['compania'],
            $request['telefono_empresa'],
            $request['telefono_internacional'],
            $id
        );

        if (!$stmt->execute()) {
            http_response_code(500);
            echo json_encode(["message" => "Error al actualizar el empleado"]);
            return;
        }

        if ($stmt->affected_rows === 0) {
            http_response_code(404);
            echo json_encode(["message" => "Empleado no encontrado"]);
            return;
        }

        echo json_encode(["message" => "Empleado actualizado con éxito", "id" => $id]);
    }

    // Eliminar un empleado
    public static function deleteEmployee($id) {
        $query = "DELETE FROM empleados WHERE id = ?";
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

    // Buscar empleados por nombre
    public static function searchEmployeesByName($nombre) {
        $query = "SELECT * FROM empleados WHERE nombre LIKE ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $search = "%" . $nombre . "%";
        $stmt->bind_param("s", $search);
        $stmt->execute();
        $result = $stmt->get_result();

        if (!$result) {
            http_response_code(500);
            echo json_encode(["message" => "Error al buscar empleados"]);
            return;
        }

        echo json_encode($result->fetch_all(MYSQLI_ASSOC));
    }
}

?>
