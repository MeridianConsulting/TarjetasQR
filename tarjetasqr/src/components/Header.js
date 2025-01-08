import React, { useState, useEffect } from "react";

const Header = ({ userId }) => {
  const [userData, setUserData] = useState({
    nombre: "",
    cargo: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost/tarjetasqr/server-php/employees/${userId}`, {
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

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <header className="header">
      <img
        src="https://cdn-icons-png.flaticon.com/512/5324/5324000.png"
        alt="Profile"
        className="profile-img"
      />
      <h2>{userData.nombre}</h2>
      <p>{userData.cargo}</p>
      <div className="header-buttons">
        <button className="call-button">
          📞 Llamar
        </button>
        <button className="email-button">
          📧 Enviar Email
        </button>
      </div>
    </header>
  );
};

export default Header;
