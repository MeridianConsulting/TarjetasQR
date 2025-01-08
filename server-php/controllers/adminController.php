<?php
require_once __DIR__ . '/../config/db.php';

class AdminController {

    // Validar credenciales del administrador
    public static function loginAdmin($request) {
        $username = $request['username'] ?? null;
        $password = $request['password'] ?? null;

        if (!$username || !$password) {
            http_response_code(400);
            echo json_encode(["message" => "Username and password are required"]);
            return;
        }

        $query = "SELECT * FROM admins WHERE username = ?";
        $stmt = $GLOBALS['db']->prepare($query);
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid username or password"]);
            return;
        }

        $admin = $result->fetch_assoc();

        if ($password !== $admin['password']) {
            http_response_code(401);
            echo json_encode(["message" => "Invalid username or password"]);
            return;
        }

        echo json_encode(["message" => "Login successful", "admin" => $admin]);
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
