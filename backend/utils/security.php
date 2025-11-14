<?php
/**
 * Utilidades de seguridad para proteger el acceso a datos de empleados
 */

class SecurityUtils {
    // Almacenamiento simple de rate limiting (en producción usar Redis o similar)
    private static $rateLimitStore = [];
    
    /**
     * Valida que un ID sea numérico y esté en un rango válido
     */
    public static function validateEmployeeId($id) {
        // Solo aceptar números
        if (!is_numeric($id) || !ctype_digit((string)$id)) {
            return false;
        }
        
        // Validar rango (cédulas colombianas típicamente entre 6 y 10 dígitos)
        $idLength = strlen((string)$id);
        if ($idLength < 6 || $idLength > 10) {
            return false;
        }
        
        // Validar que no sea un número obviamente inválido
        if ($id <= 0) {
            return false;
        }
        
        return true;
    }
    
    /**
     * Rate limiting básico - limita solicitudes por IP
     */
    public static function checkRateLimit($ip, $maxRequests = 100, $timeWindow = 3600) {
        $key = $ip . '_' . floor(time() / $timeWindow);
        
        if (!isset(self::$rateLimitStore[$key])) {
            self::$rateLimitStore[$key] = 0;
        }
        
        self::$rateLimitStore[$key]++;
        
        // Limpiar entradas antiguas (más de 1 hora)
        foreach (self::$rateLimitStore as $k => $v) {
            if (strpos($k, '_') !== false) {
                $parts = explode('_', $k);
                $window = (int)end($parts);
                if (time() / $timeWindow - $window > 1) {
                    unset(self::$rateLimitStore[$k]);
                }
            }
        }
        
        return self::$rateLimitStore[$key] <= $maxRequests;
    }
    
    /**
     * Obtiene la IP del cliente
     */
    public static function getClientIp() {
        $ipKeys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
        foreach ($ipKeys as $key) {
            if (array_key_exists($key, $_SERVER) === true) {
                foreach (explode(',', $_SERVER[$key]) as $ip) {
                    $ip = trim($ip);
                    if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE) !== false) {
                        return $ip;
                    }
                }
            }
        }
        return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    }
    
    /**
     * Sanitiza datos antes de enviarlos al frontend
     */
    public static function sanitizeEmployeeData($employee) {
        if (!is_array($employee)) {
            return $employee;
        }
        
        // Remover el ID de la respuesta (no debe exponerse)
        unset($employee['Id']);
        
        return $employee;
    }
    
    /**
     * Valida el formato de un ID codificado
     */
    public static function isValidEncodedId($encodedId) {
        if (empty($encodedId)) {
            return false;
        }
        
        // Los IDs codificados no deben ser solo números
        // Deben tener caracteres base64
        if (preg_match('/^[A-Za-z0-9_-]+$/', $encodedId) && !preg_match('/^\d+$/', $encodedId)) {
            return true;
        }
        
        return false;
    }
}

