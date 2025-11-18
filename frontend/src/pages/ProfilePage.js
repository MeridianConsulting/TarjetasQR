import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ContactInfo from '../components/ContactInfo';
import SocialMedia from '../components/SocialMedia';
import DownloadVCard from '../components/DownloadVCard';
import { decodeId } from '../utils/encodeId';
import { getApiBaseUrl } from '../config/api';
import '../assets/css/styles.css';

const ProfilePage = () => {
  const { id: encodedId } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  
  // Decodificar el ID de la URL
  const id = decodeId(encodedId);

  // Agregar meta tags para evitar indexación en buscadores
  useEffect(() => {
    // Crear o actualizar meta tags
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute('content', 'noindex, nofollow, noarchive, nosnippet');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'robots';
      meta.content = 'noindex, nofollow, noarchive, nosnippet';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Agregar meta tag para Google específicamente
    const metaGooglebot = document.querySelector('meta[name="googlebot"]');
    if (metaGooglebot) {
      metaGooglebot.setAttribute('content', 'noindex, nofollow');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'googlebot';
      meta.content = 'noindex, nofollow';
      document.getElementsByTagName('head')[0].appendChild(meta);
    }

    // Actualizar título dinámicamente
    if (userData?.nombre) {
      document.title = `Carnet Virtual - ${userData.nombre}`;
    }
  }, [userData]);

  // Nueva lógica para obtener datos del usuario
  useEffect(() => {
    if (!id) {
      setError('ID inválido o no se pudo decodificar');
      // No exponer el ID en logs por seguridad
      return;
    }

    const fetchUserData = async () => {
      try {
        // Se elimina el header para la solicitud GET
        const apiUrl = getApiBaseUrl();
        const response = await fetch(`${apiUrl}/employees/${id}`);
        if (!response.ok) {
          if (response.status === 429) {
            throw new Error('Demasiadas solicitudes. Por favor, espere un momento.');
          }
          throw new Error(`Error al obtener datos: ${response.statusText}`);
        }
        
        const data = await response.json();
        if (data.nombre) {
          setUserData(data);
        }
      } catch (error) {
        // No exponer detalles del error que puedan revelar información sensible
        setError('Error al cargar los datos del empleado');
      }
    };

    fetchUserData();
  }, [id, encodedId]);

  // Mostrar error si no hay ID válido
  if (error && !id) {
    return (
      <div className="page-container" style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <p>Por favor, verifica que la URL sea correcta.</p>
      </div>
    );
  }

  return (
    <>
      <div className="page-container">
        <Header userId={id} />

        {/* Líneas decorativas entre el header y la información de contacto */}
        <div className="decorative-lines">
          <div className="line left-line"></div>
          <div className="line right-line"></div>
        </div>

        <div className="card-container">
          <div className="content">
            <div className="bicolor-bar-top"></div>
            <ContactInfo userId={id} />
            <div className="bicolor-bar-bottom"></div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="footer-section">
          <div className="footer-top-bar" />
          
          {/* Contenedor principal del footer */}
          <div className="footer-content">
            
            {/* Columna izquierda: Íconos + botón */}
            <div className="footer-social-and-button">
              <SocialMedia />
              
              {/* Botón de descarga con prop userName */}
              <DownloadVCard 
                showButtonOnly 
                userName={userData?.nombre} // Pasamos el nombre aquí
              />
            </div>
            
            {/* Columna derecha: Solo el QR */}
            <div className="footer-qr">
              <DownloadVCard showQRCodeOnly />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
