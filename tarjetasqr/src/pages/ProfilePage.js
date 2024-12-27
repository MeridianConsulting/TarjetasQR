import React from 'react';
import { useParams } from 'react-router-dom'; // Importar useParams
import Header from '../components/Header';
import ContactInfo from '../components/ContactInfo';
import SocialMedia from '../components/SocialMedia';
import DownloadVCard from '../components/DownloadVCard';
import '../assets/css/styles.css'; // Importamos la hoja de estilos

const ProfilePage = () => {
  const { id } = useParams(); // Obtener el parámetro :id de la URL

  return (
    <div className="card-container">
       <Header userId={id} />
      <div className="content">
        {/* Pasar el userId al componente ContactInfo */}
        <ContactInfo userId={id} />
        <SocialMedia />
        <DownloadVCard />
      </div>
    </div>
  );
};

export default ProfilePage;
