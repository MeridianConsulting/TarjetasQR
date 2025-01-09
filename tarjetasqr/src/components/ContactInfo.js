import React, { useState, useEffect } from 'react';

const ContactInfo = ({ userId }) => {
  const [contactData, setContactData] = useState({
    email: '',
    numero_telefonico: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL; // Usa la variable de entorno
        const response = await fetch(`${apiUrl}/employees/${userId}`);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
  
        const data = await response.json();
        if (data.email && data.numero_telefonico) {
          setContactData({
            email: data.email,
            numero_telefonico: data.numero_telefonico,
          });
        } else {
          throw new Error('Datos incompletos del empleado');
        }
      } catch (error) {
        setError(error.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
  
    fetchContactData();
  }, [userId]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="contact-info">
      <div className="contact-item">
        <p>📞 <span>{contactData.numero_telefonico}</span></p>
        <small>Mobile</small>
      </div>
      <div className="contact-item">
        <p>📧 <span>{contactData.email}</span></p>
        <small>Email</small>
      </div>
      <div className="contact-item">
        <p>🏢 <span>Meridian Consulting LTDA</span></p>
        <small>Company</small>
      </div>
      <div className="contact-item">
        <p>🌐 <span><a href="https://meridianltda.com/" target="_blank" rel="noopener noreferrer">meridianltda.com</a></span></p>
        <small>Website</small>
      </div>
    </div>
  );
};

export default ContactInfo;
