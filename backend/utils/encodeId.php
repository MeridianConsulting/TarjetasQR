<?php
/**
 * Utilidad para codificar IDs en PHP (compatible con JavaScript)
 */
class EncodeId {
    private static $secret = 'MERIDIAN_2025';
    
    public static function encode($id) {
        if (empty($id)) {
            return '';
        }
        
        $combined = self::$secret . '_' . $id;
        $encoded = base64_encode($combined);
        
        // Reemplazar caracteres que podrían causar problemas en URLs
        return str_replace(['+', '/', '='], ['-', '_', ''], $encoded);
    }
    
    public static function decode($encodedId) {
        if (empty($encodedId)) {
            return null;
        }
        
        // Si es un número puro (retrocompatibilidad), devolverlo directamente
        if (preg_match('/^\d+$/', $encodedId)) {
            return $encodedId;
        }
        
        try {
            // Restaurar caracteres reemplazados
            $base64 = str_replace(['-', '_'], ['+', '/'], $encodedId);
            
            // Agregar padding si es necesario
            while (strlen($base64) % 4) {
                $base64 .= '=';
            }
            
            // Decodificar base64
            $decoded = base64_decode($base64);
            
            // Extraer el ID (remover el prefijo secreto)
            if (strpos($decoded, self::$secret . '_') === 0) {
                return substr($decoded, strlen(self::$secret) + 1);
            }
            
            return null;
        } catch (Exception $e) {
            return null;
        }
    }
}
?>

