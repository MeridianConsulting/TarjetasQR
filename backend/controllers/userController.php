<?php 
require_once __DIR__ . '/../config/db.php';

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
            echo json_encode(["success" => true, "message" => "Empleado agregado exitosamente", "id" => $data['Id']]);
        } else {
            http_response_code(500);
            echo json_encode(["success" => false, "error" => "Error al insertar empleado", "detalle" => $stmt->error]);
        }
        $stmt->close();
    }

    public function obtenerEmpleadoPorId($id) {
        global $db;
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
            http_response_code(404);
            echo json_encode(["error" => "Empleado no encontrado"]);
        } else {
            $empleado = $result->fetch_assoc();
            echo json_encode($empleado);
        }
        $stmt->close();
    }
}
?>
