import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Header = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    cargo: "",
    email: "",
    numero_telefonico: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(""); // Mensaje de éxito o error al guardar
  const [showModal, setShowModal] = useState(false); // Controla el modal

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(`${apiUrl}/employees/${userId}`, {
          headers: { "Content-Type": "application/json" },
        });

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

  const handleAddToContacts = async () => {
    if (userData.numero_telefonico) {
      try {
        await navigator.clipboard.writeText(userData.numero_telefonico);
        setMessage(
          "Número copiado al portapapeles. Ahora puedes abrir tu aplicación de contactos y agregarlo manualmente."
        );
        setShowModal(true);
      } catch (error) {
        setMessage("No se pudo copiar el número al portapapeles.");
        setShowModal(true);
      }
    } else {
      setMessage("Número telefónico no disponible.");
      setShowModal(true);
    }
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="header-container">
      {loading ? (
        <div className="loading-spinner">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <header className="header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/5324/5324000.png"
            alt="Profile"
            className="profile-img"
          />
          <h2>{userData.nombre}</h2>
          <p>{userData.cargo}</p>
          <div className="header-buttons">
            <button className="call-button" onClick={handleCall}>
              📞 Llamar
            </button>
            <button className="email-button" onClick={handleEmail}>
              📧 Enviar Email
            </button>
            <button className="add-contact-button" onClick={handleAddToContacts}>
              ➕ Copiar Número
            </button>
          </div>
        </header>
      )}
    {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{message}</h3>
            <button className="close-modal-button" onClick={closeModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Header;
