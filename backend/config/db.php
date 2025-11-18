<?php
class Database {
    private $host = "localhost";
    private $db_name = "empleados_db";
    private $username = "empleados_db";
    private $password = "eTl!Y@AV-,_E";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            if ($this->conn->connect_error) {
                throw new Exception("Conexión fallida: " . $this->conn->connect_error);
            }
            // Configurar charset UTF-8
            $this->conn->set_charset("utf8mb4");
        } catch (Exception $exception) {
            // En producción, no mostrar detalles del error por seguridad
            error_log("Error de conexión a BD: " . $exception->getMessage());
            die("Error: No se pudo conectar a la base de datos.");
        }
        return $this->conn;
    }
}

$db = (new Database())->getConnection();
?>
