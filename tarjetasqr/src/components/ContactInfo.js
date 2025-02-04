import React, { useState, useEffect } from 'react';
import celImage from '../assets/img/cel.png';
import buildingImage from '../assets/img/portaford.png';
import websiteImage from '../assets/img/mundo.png';
import locationImage from '../assets/img/ubi.png';
import internationalImage from '../assets/img/mundo2.png';
import emailImage2 from '../assets/img/email2.png';

const ContactInfo = ({ userId }) => {
  const [contactData, setContactData] = useState({
    email: '',
    numero_telefonico: '',
  });
  const [telefonoInternacional, setTelefonoInternacional] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copiedItem, setCopiedItem] = useState('');

  const copyToClipboard = (text, itemName) => {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(itemName);
      setTimeout(() => setCopiedItem(''), 2000);
    }).catch(err => console.error('Error al copiar:', err));
  };

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch(`http://localhost/tarjetasqr/server-php/employees/${userId}`);
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
    const currentUrl = window.location.href;
    const matchingUrls = [
      'http://localhost:3000/ProfilePage/79613401',
      'http://localhost:3000/ProfilePage/79490148',
    ];

    if (matchingUrls.includes(currentUrl)) {
      setTelefonoInternacional('Teléfono Internacional U.S.: (1) 713 623 1113');
    } else {
      setTelefonoInternacional('');
    }
  }, []);
  

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Datos copiables estáticos
  const staticContactInfo = {
    empresa: 'Meridian Consulting LTDA',
    sitioWeb: 'https://meridianltda.com',
    extension: '(571) 7469090 Ext 1101',
    direccion: 'Calle 67 No. 7 – 94 Piso 20 Bogota - Colombia'
  };

  
  return (
    
    <div className="contact-info">
      {copiedItem && (
        <div className="copied-notification">
          ¡{copiedItem} copiado al portapapeles!
        </div>
      )}

      {/* Teléfono */}
      <div 
        className="contact-item clickable"
        onClick={() => copyToClipboard(contactData.numero_telefonico, 'Teléfono')}
      >
        <p>
          <img src={celImage} alt="Teléfono" className="contact-icon" />
          <span>{contactData.numero_telefonico}</span>
        </p>
      </div>

      {/* Email */}
      <div 
        className="contact-item clickable"
        onClick={() => copyToClipboard(contactData.email, 'Email')}
      >
        <p>
          <img src={emailImage2} alt="Email" className="contact-icon" />
          <span>{contactData.email}</span>
        </p>
      </div>

      {/* Empresa */}
      <div 
        className="contact-item clickable"
        onClick={() => copyToClipboard(staticContactInfo.empresa, 'Empresa')}
      >
        <p>
          <img src={buildingImage} alt="Edificio" className="contact-icon" />
          <span>{staticContactInfo.empresa}</span>
        </p>
      </div>

      {/* Sitio Web */}
      <div className="contact-item">
        <p>
          <img src={internationalImage} alt="Sitio web" className="contact-icon" />
          <span>
            <a 
              href={staticContactInfo.sitioWeb} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              meridianltda.com
            </a>
          </span>
        </p>
      </div>

      {/* Extensión */}
      <div 
        className="contact-item clickable"
        onClick={() => copyToClipboard(staticContactInfo.extension, 'Extensión')}
      >
        <p>
          <img src={celImage} alt="Extensión" className="contact-icon" />
          <span>{staticContactInfo.extension}</span>
        </p>
      </div>

      {/* Dirección */}
      <div 
        className="contact-item clickable"
        onClick={() => copyToClipboard(staticContactInfo.direccion, 'Dirección')}
      >
        <p>
          <img src={locationImage} alt="Ubicación" className="contact-icon" />
          <span>{staticContactInfo.direccion}</span>
        </p>
      </div>

      {/* Teléfono Internacional */}
      {telefonoInternacional && (
        <div 
          className="contact-item clickable"
          onClick={() => copyToClipboard(telefonoInternacional, 'Teléfono Internacional')}
        >
          <p>
            <img src={websiteImage} alt="Internacional" className="contact-icon" />
            <span>{telefonoInternacional}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;