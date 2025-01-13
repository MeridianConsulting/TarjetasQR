import React, { useState, useEffect } from 'react';

const ContactInfo = ({ userId }) => {
  const [contactData, setContactData] = useState({
    email: '',
    numero_telefonico: '',
  });
  const [telefonoInternacional, setTelefonoInternacional] = useState(''); // Campo adicional
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

  useEffect(() => {
    // Verificar la URL actual
    const currentUrl = window.location.href;
    const matchingUrls = [
      'https://tarjetaqr.transporteszircon.com/ProfilePage/79613401',
      'https://tarjetaqr.transporteszircon.com/ProfilePage/79490148',
    ];

    if (matchingUrls.includes(currentUrl)) {
      setTelefonoInternacional('Teléfono Internacional U.S.: (1) 713 623 1113'); // Establecer Teléfono Internacional en blanco
    } else {
      setTelefonoInternacional(''); // Número predeterminado
    }
  }, []);

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
      <div className="contact-item">
        <p>📞 <span>(571) 7469090 Ext 1101</span></p>
        <small>Teléfono Directo</small>
      </div>
      <div className="contact-item">
        <p>📍 <span>Calle 67 No. 7 – 94 Piso 20 Bogota - Colombia</span></p>
        <small>Dirección</small>
      </div>
      {telefonoInternacional !== '' && (
        <div className="contact-item">
          <p>🌎 <span>{telefonoInternacional}</span></p>
          <small>Teléfono Internacional</small>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
