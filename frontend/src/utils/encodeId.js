// Utilidad para codificar y decodificar IDs de empleados
// Esto oculta el número de cédula en la URL

/**
 * Codifica un ID numérico a una cadena base64 con transformación
 * @param {string|number} id - El ID del empleado
 * @returns {string} - ID codificado
 */
export const encodeId = (id) => {
  if (!id) return '';
  
  // Convertir a string y agregar un prefijo secreto para mayor seguridad
  const secret = 'MERIDIAN_2025';
  const combined = `${secret}_${id}`;
  
  // Codificar en base64
  const encoded = btoa(combined);
  
  // Reemplazar caracteres que podrían causar problemas en URLs
  return encoded.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * Decodifica un ID codificado de vuelta al ID original
 * Si el ID no está codificado (es numérico), lo devuelve tal cual (retrocompatibilidad)
 * @param {string} encodedId - El ID codificado o sin codificar
 * @returns {string|null} - ID original o null si es inválido
 */
export const decodeId = (encodedId) => {
  if (!encodedId) return null;
  
  // Si es un número puro (retrocompatibilidad), devolverlo directamente
  if (/^\d+$/.test(encodedId)) {
    return encodedId;
  }
  
  try {
    // Restaurar caracteres reemplazados
    let base64 = encodedId.replace(/-/g, '+').replace(/_/g, '/');
    
    // Agregar padding si es necesario
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Decodificar base64
    const decoded = atob(base64);
    
    // Extraer el ID (remover el prefijo secreto)
    const secret = 'MERIDIAN_2025';
    if (decoded.startsWith(`${secret}_`)) {
      return decoded.substring(secret.length + 1);
    }
    
    return null;
  } catch (error) {
    // No exponer errores de decodificación por seguridad
    // Si falla la decodificación, intentar usar el ID original (retrocompatibilidad)
    return encodedId;
  }
};

