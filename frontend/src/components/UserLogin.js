import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { encodeId } from "../utils/encodeId";
import logoImage from "../assets/img/Logo.png";
import "../assets/css/userLogin.css";

const UserLogin = ({ onLogin }) => {
  // Agregar clase al body para aplicar estilos específicos del login
  useEffect(() => {
    document.body.classList.add('user-login-page');
    document.documentElement.classList.add('user-login-page');
    
    return () => {
      document.body.classList.remove('user-login-page');
      document.documentElement.classList.remove('user-login-page');
    };
  }, []);
  const [cedula, setCedula] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!cedula || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    // Validar formato de cédula (solo números, 6-10 dígitos)
    if (!/^\d{6,10}$/.test(cedula)) {
      setError("Por favor, ingrese un número de cédula válido.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost/TarjetasQR/backend';
      const response = await fetch(`${apiUrl}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cedula, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Guardar token de sesión (opcional, para futuras funcionalidades)
        if (data.token) {
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userCedula', data.cedula);
        }
        onLogin(true);
        // Redirigir a la página del perfil del usuario usando el ID codificado
        const encodedId = data.encodedId || encodeId(cedula);
        navigate(`/ProfilePage/${encodedId}`);
      } else {
        setError(data.message || "Credenciales inválidas.");
        onLogin(false);
      }
    } catch (err) {
      setError("No se pudo conectar con el servidor. Verifique su conexión.");
      onLogin(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-login-container">
      <div className="user-login-card">
        <div className="user-login-header">
          <img src={logoImage} alt="Meridian Consulting" className="user-login-logo" />
          <h1 className="user-login-title">Carnets Virtuales</h1>
          <p className="user-login-subtitle">Ingrese sus credenciales para acceder</p>
        </div>

        <form onSubmit={handleLogin} className="user-login-form">
          <div className="user-input-group">
            <label htmlFor="cedula" className="user-input-label">
              <i className="fas fa-id-card"></i> Número de Cédula
            </label>
            <input
              id="cedula"
              type="text"
              value={cedula}
              onChange={(e) => {
                // Solo permitir números
                const value = e.target.value.replace(/\D/g, '');
                setCedula(value);
                setError("");
              }}
              placeholder="Ingrese su número de cédula"
              className="user-input-field"
              maxLength="10"
              required
              autoComplete="username"
            />
          </div>

          <div className="user-input-group">
            <label htmlFor="password" className="user-input-label">
              <i className="fas fa-lock"></i> Contraseña
            </label>
            <div className="user-password-wrapper">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Ingrese su contraseña"
                className="user-input-field"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="user-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showPassword ? (
                  <i className="fas fa-eye-slash"></i>
                ) : (
                  <i className="fas fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="user-error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="user-login-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Verificando...
              </>
            ) : (
              <>
                <i className="fas fa-sign-in-alt"></i>
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="user-login-footer">
          <p>¿Problemas para acceder? Contacte al administrador</p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;

