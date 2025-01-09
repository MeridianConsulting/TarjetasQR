<?php
class Database {
    private $host = "localhost";
    private $db_name = "transpo2_empleados_db";
    private $username = "transpo2_empleados_db";
    private $password = "empleados_db";
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            if ($this->conn->connect_error) {
                throw new Exception("Conexión fallida: " . $this->conn->connect_error);
            }
        } catch (Exception $exception) {
            die("Error: " . $exception->getMessage());
        }
        return $this->conn;
    }
}

$db = (new Database())->getConnection();
?>
