import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import logoImage from "../assets/img/Logo.png";
import emailImage from "../assets/img/email.png";
import celImage2 from "../assets/img/cel2.png";
import profileDefault from "../assets/img/profile.png";

// Función para obtener la imagen del perfil desde el backend o usar imagen por defecto
function getProfileImageUrl(userId) {
  const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost/TarjetasQR/backend';
  // Intentamos cargar la imagen desde el backend
  // Si no existe, el backend debería manejar el error o podemos usar una imagen por defecto
  return `${apiUrl}/uploads/${userId}.jpg`;
}

const Header = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    cargo: "",
    email: "",
    numero_telefonico: "",
    imageUrl: "" // Se agrega el campo imageUrl
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);

  // Carga los datos del usuario, incluyendo el campo imageUrl
  useEffect(() => {
    if (!userId) return;
    
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost/TarjetasQR/backend';
        const response = await fetch(`${apiUrl}/employees/${userId}`);
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Demasiadas solicitudes. Por favor, espere un momento.');
          }
          throw new Error(`Error al obtener los datos`);
        }
        const data = await response.json();
        if (data.nombre) {
          setUserData({
            nombre: data.nombre || '',
            cargo: data.cargo || '',
            email: data.email || '',
            numero_telefonico: data.numero_telefonico || '',
            imageUrl: data.imageUrl || '' // Se guarda la URL de imagen de la base de datos
          });
        } else {
          throw new Error("Datos incompletos del empleado");
        }
      } catch (error) {
        // No exponer detalles del error por seguridad
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Si existe una imagen en la base de datos y no está vacía, se usa; de lo contrario se intenta cargar desde el backend
  const profileImageSrc = imageError 
    ? profileDefault
    : userData.imageUrl && userData.imageUrl.trim() !== ""
      ? userData.imageUrl
      : getProfileImageUrl(userId);

  // Manejador de error de carga de imagen
  const handleImageError = () => {
    setImageError(true);
  };

  // Funciones para realizar llamada o enviar correo
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
      <div className="logo-container">
        <a href="https://meridianltda.com/" target="_blank" rel="noopener noreferrer">
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
              <img 
                src={profileImageSrc} 
                alt="Profile" 
                className="profile-img"
                onError={handleImageError}
              />
            </div>
            <h2>{userData.nombre}</h2>
            {userData.cargo && <p>{userData.cargo}</p>}
            <div className="header-buttons-container">
              <div className="header-buttons">
                {userData.numero_telefonico && (
                  <button className="call-button" onClick={handleCall}>
                    <img src={celImage2} alt="Llamar" className="contact-header-icon" />
                    Llamar
                  </button>
                )}
                {userData.email && (
                  <button className="email-button" onClick={handleEmail}>
                    <img src={emailImage} alt="Enviar Email" className="contact-header-icon" />
                    Correo
                  </button>
                )}
              </div>
            </div>
          </div>
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
