import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ContactInfo from '../components/ContactInfo';
import SocialMedia from '../components/SocialMedia';
import DownloadVCard from '../components/DownloadVCard';
import '../assets/css/styles.css';

const ProfilePage = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  // Nueva lógica para obtener datos del usuario
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        const response = await fetch(
          `${apiUrl}/employees/${id}`,
          { headers: { "Content-Type": "application/json" } }
        );

        if (!response.ok) throw new Error('Error al obtener datos');
        
        const data = await response.json();
        if (data.nombre) {
          setUserData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserData();
  }, [id]);

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