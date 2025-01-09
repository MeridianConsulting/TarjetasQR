import React, { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const Header = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    cargo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL; // Usa la variable de entorno
        const response = await fetch(`${apiUrl}/employees/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }

        const data = await response.json();

        if (data.nombre && data.cargo) {
          setUserData({
            nombre: data.nombre,
            cargo: data.cargo,
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
            <button className="call-button">📞 Llamar</button>
            <button className="email-button">📧 Enviar Email</button>
          </div>
        </header>
      )}
    </div>
  );
};

export default Header;
