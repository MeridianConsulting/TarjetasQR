import React, { useState, useEffect } from "react";

const Header = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    cargo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Obtener los datos del empleado (nombre y cargo)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/empleados/${userId}`);
        if (!response.ok) {
          throw new Error("Error al obtener los datos del empleado");
        }
        const data = await response.json();

        // Asegúrate de que los datos existen en la respuesta
        if (data.nombre && data.cargo) {
          setUserData({
            nombre: data.nombre,
            cargo: data.cargo,
          });
        } else {
          throw new Error("Datos incompletos del empleado");
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header className="header">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5324/5324000.png"
        alt="Profile"
      />
      <h2>{userData.nombre}</h2>
      <p>{userData.cargo}</p>
      <div className="header-buttons">
        <button className="call-button">
          <i className="fa fa-phone"></i> Call
        </button>
        <button className="email-button">
          <i className="fa fa-envelope"></i> Email
        </button>
      </div>
    </header>
  );
};

export default Header;
