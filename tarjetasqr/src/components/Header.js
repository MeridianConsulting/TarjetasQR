import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import logoImage from "../assets/img/Logo.png";
import emailImage from "../assets/img/email.png";
import celImage2 from "../assets/img/cel2.png";

// Función para devolver la ruta de la imagen según el ID
function getProfileImagePath(userId) {
  try {
    // Primero intenta con .jpg
    return require(`../assets/img/personas/${userId}.jpg`);
  } catch {
    try {
      // Si no, .png
      return require(`../assets/img/personas/${userId}.png`);
    } catch {
      // Si no existe ninguna, fallback a un ícono genérico
      return require(`../assets/img/profile.png`); 
    }
  }
}

const Header = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    cargo: "",
    email: "",
    numero_telefonico: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Lógica para cargar datos del usuario (AJAX)
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(
          `${apiUrl}/employees/${userId}`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }

        const data = await response.json();
        if (data.nombre && data.cargo && data.email && data.numero_telefonico) {
          setUserData({
            nombre: data.nombre,
            cargo: data.cargo,
            email: data.email,
            numero_telefonico: data.numero_telefonico,
          });
        } else {
          throw new Error("Datos incompletos del empleado");
        }
      } catch (error) {
        setError(error.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Manejo de llamadas y envío de correo
  const handleCall = () => {
    if (userData.numero_telefonico) {
      window.location.href = `tel:${userData.numero_telefonico}`;
    } else {
      alert("Número telefónico no disponible.");
    }
  };

  const handleEmail = () => {
    if (userData.email) {
      const subject = "Consulta Rápida";
      const body = `Hola ${userData.nombre}, quisiera consultarte sobre tu cargo como ${userData.cargo}.`;
      window.location.href = `mailto:${userData.email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    } else {
      alert("Correo electrónico no disponible.");
    }
  };

  return (
    <div className="header-container">
      {/* Logo en la esquina superior izquierda (fijo) */}
      <div className="logo-container">
        <a
          href="https://meridianltda.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={logoImage} alt="Logo" className="logo" />
        </a>
      </div>
  
      {loading ? (
        <div className="loading-spinner">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <header className="header">
          <div className="header-content">
            <div className="img-container">
              {/* Imagen dinámica según userId */}
              <img
                src={getProfileImagePath(userId)}
                alt="Profile"
                className="profile-img"
              />
            </div>
            <h2>{userData.nombre}</h2>
            <p>{userData.cargo}</p>
  
            {/* Contenedor de botones sin líneas */}
            <div className="header-buttons-container">
              <div className="header-buttons">
                <button className="call-button" onClick={handleCall}>
                  <img
                    src={celImage2}
                    alt="Llamar"
                    className="contact-header-icon"
                  />
                  Llamar
                </button>
                <button className="email-button" onClick={handleEmail}>
                  <img
                    src={emailImage}
                    alt="Enviar Email"
                    className="contact-header-icon"
                  />
                  Correo
                </button>
              </div>
            </div>
          </div>
  
          {/* Líneas amarillas ahora están alineadas con los botones */}
          <div className="header-lines">
            <div className="header-line left-header-line"></div>
            <div className="header-line right-header-line"></div>
          </div>
        </header>
      )}
    </div>
  );
  
};

export default Header;