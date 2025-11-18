/**
 * Configuración de la API - SIMPLIFICADA
 * Usa siempre el mismo dominio desde donde se accede
 */

// Función que se ejecuta cada vez que se llama (no se cachea)
export const getApiBaseUrl = () => {
  if (typeof window === 'undefined') {
    return 'http://localhost/TarjetasQR/backend';
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const port = window.location.port ? `:${window.location.port}` : '';

  // Localhost para desarrollo
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost/TarjetasQR/backend';
  }

  // SIEMPRE usar el mismo dominio actual + /backend
  return `${protocol}//${hostname}${port}/backend`;
};

// Getter que se calcula cada vez (no constante)
export const API_BASE_URL = getApiBaseUrl();

