import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import celImage from '../assets/img/cel.png';
import buildingImage from '../assets/img/portaford.png';
import websiteImage from '../assets/img/mundo.png';
import locationImage from '../assets/img/ubi.png';
import internationalImage from '../assets/img/mundo2.png';
import emailImage2 from '../assets/img/email2.png';

/**
 * Modal que se muestra al hacer clic en el número de teléfono.
 * Va montado en el div#modal-root definido en public/index.html
 */
const Modal = ({ isOpen, onClose, onSaveContact, phoneNumber }) => {
  if (!isOpen) return null;

  const handleSaveContact = () => {
    onSaveContact(phoneNumber);
  };

  // Usamos createPortal para asegurarnos de que el modal
  // esté fuera de cualquier contenedor que use transform.
  return ReactDOM.createPortal(
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <h2>¿Deseas guardar este número?</h2>
        <p>{phoneNumber}</p>
        <div style={styles.buttonContainer}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '1rem',
              marginTop: '1rem',
            }}
          >
            <button
              style={{
                backgroundColor: '#63C9DB',
                border: 'none',
                borderRadius: '4px',
                padding: '0.8rem 1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#fff',
              }}
              onClick={handleSaveContact}
            >
              Guardar en contactos
            </button>

            <button
              style={{
                backgroundColor: '#f0f0f0',
                border: 'none',
                borderRadius: '4px',
                padding: '0.8rem 1.4rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                color: '#333',
              }}
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root') // <-- Aquí montamos el portal
  );
};

const ContactInfo = ({ userId }) => {
  const [contactData, setContactData] = useState({
    nombre: '',
    email: '',
    numero_telefonico: '',
  });
  const [telefonoInternacional, setTelefonoInternacional] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Para la notificación de "copiado"
  const [copiedItem, setCopiedItem] = useState('');

  // Control del Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState(null);

  // Tooltips
  const [showPhoneTooltip, setShowPhoneTooltip] = useState(false);
  const [showIntlPhoneTooltip, setShowIntlPhoneTooltip] = useState(false);

  // Aviso inicial
  const [showInitialTip, setShowInitialTip] = useState(false);

  // Efecto para mostrar/ocultar el aviso inicial
  useEffect(() => {
    // Mostrar aviso a los 2.5s
    const timerShow = setTimeout(() => {
      setShowInitialTip(true);
    }, 2500);

    // Ocultar aviso a los 7.5s
    const timerHide = setTimeout(() => {
      setShowInitialTip(false);
    }, 7500);

    return () => {
      clearTimeout(timerShow);
      clearTimeout(timerHide);
    };
  }, []);

  // Función para copiar al portapapeles
  const copyToClipboard = (text, itemName) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedItem(itemName);
        setTimeout(() => setCopiedItem(''), 2000);
      })
      .catch((err) => console.error('Error al copiar:', err));
  };

  // Abrir el modal al hacer clic en el número
  const handlePhoneClick = (phone) => {
    setSelectedPhoneNumber(phone);
    setIsModalOpen(true);
  };

  // Guardar en contactos (descarga .vcf)
  const saveContact = (phone) => {
    setIsModalOpen(false);
    const nombreContacto = contactData.nombre || 'Contacto Meridian';

    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${nombreContacto}
TEL;TYPE=CELL:${phone}
END:VCARD
`.trim();

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'contacto.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Cargar datos del empleado
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost/TarjetasQR/backend';
        const response = await fetch(`${apiUrl}/employees/${userId}`);
        if (!response.ok) {
          throw new Error(`Error al obtener los datos: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.nombre && data.email && data.numero_telefonico) {
          setContactData({
            nombre: data.nombre,
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

  // Mostrar o no el teléfono internacional dependiendo de la URL
  useEffect(() => {
    const currentUrl = window.location.href;
    const matchingUrls = [
      'https://tarjetaqr.transporteszircon.com/ProfilePage/79613401',
      'https://tarjetaqr.transporteszircon.com/ProfilePage/79490148',
    ];
    if (matchingUrls.includes(currentUrl)) {
      setTelefonoInternacional('Teléfono Internacional U.S.: (1) 713 623 1113');
    } else {
      setTelefonoInternacional('');
    }
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  // Datos estáticos
  const staticContactInfo = {
    empresa: 'Meridian Consulting LTDA',
    sitioWeb: 'https://meridianltda.com',
    extension: '(601) 7469090',
    direccion: 'Calle 67 No. 7 – 94 Piso 20 Bogota - Colombia',
  };

  return (
    <>
      {/* Aviso inicial */}
      {showInitialTip && (
        <div className="initial-tip">
          Pulsa el número para guardar la información de contacto
        </div>
      )}

      <div className="contact-info">
        {/* Notificación de "copiado" */}
        {copiedItem && (
          <div className="copied-notification">
            ¡{copiedItem} copiado al portapapeles!
          </div>
        )}

        {/* Modal para guardar contacto */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSaveContact={saveContact}
          phoneNumber={selectedPhoneNumber}
        />

        {/* Teléfono principal */}
        <div
          className="contact-item clickable"
          role="button"
          aria-label="Guardar este número en tus contactos"
          tabIndex={0}
          onClick={() => handlePhoneClick(contactData.numero_telefonico)}
          onMouseEnter={() => setShowPhoneTooltip(true)}
          onMouseLeave={() => setShowPhoneTooltip(false)}
          onFocus={() => setShowPhoneTooltip(true)}
          onBlur={() => setShowPhoneTooltip(false)}
        >
          <p>
            <img src={celImage} alt="Teléfono" className="contact-icon" />
            <span className="phone-link">{contactData.numero_telefonico}</span>
            {showPhoneTooltip && (
              <span className="custom-tooltip">Guardar contacto</span>
            )}
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
            <img
              src={internationalImage}
              alt="Sitio web"
              className="contact-icon"
            />
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
          onClick={() =>
            copyToClipboard(staticContactInfo.extension, 'Extensión')
          }
        >
          <p>
            <img src={celImage} alt="Extensión" className="contact-icon" />
            <span>{staticContactInfo.extension}</span>
          </p>
        </div>

        {/* Dirección */}
        <div
          className="contact-item clickable"
          onClick={() =>
            copyToClipboard(staticContactInfo.direccion, 'Dirección')
          }
        >
          <p>
            <img src={locationImage} alt="Ubicación" className="contact-icon" />
            <span>{staticContactInfo.direccion}</span>
          </p>
        </div>

        {/* Teléfono Internacional (si aplica) */}
        {telefonoInternacional && (
          <div
            className="contact-item clickable"
            role="button"
            aria-label="Guardar este número en tus contactos"
            tabIndex={0}
            onClick={() => handlePhoneClick(telefonoInternacional)}
            onMouseEnter={() => setShowIntlPhoneTooltip(true)}
            onMouseLeave={() => setShowIntlPhoneTooltip(false)}
            onFocus={() => setShowIntlPhoneTooltip(true)}
            onBlur={() => setShowIntlPhoneTooltip(false)}
          >
            <p>
              <img
                src={websiteImage}
                alt="Internacional"
                className="contact-icon"
              />
              <span className="phone-link">{telefonoInternacional}</span>
              {showIntlPhoneTooltip && (
                <span className="custom-tooltip">Guardar contacto</span>
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

// Estilos del modal (puedes moverlos a tu CSS si prefieres)
const styles = {
  backdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    maxWidth: '400px',
    width: '90%',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginTop: '1rem',
  },
};

export default ContactInfo;
