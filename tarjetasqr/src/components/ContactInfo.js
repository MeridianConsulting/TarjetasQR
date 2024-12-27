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
        const response = await fetch(`http://localhost:3001/api/empleados/${userId}`);
        if (!response.ok) {
          throw new Error('Error al obtener los datos del empleado');
        }
        const data = await response.json();
        setContactData({
          email: data.email,
          numero_telefonico: data.numero_telefonico,
        });
        setLoading(false);
      } catch (error) {
        setError(error.message);
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
    </div>
  );
};

export default ContactInfo;
