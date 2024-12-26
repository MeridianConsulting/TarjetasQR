import React from 'react';
import Header from '../components/Header';
import ContactInfo from '../components/ContactInfo';
import SocialMedia from '../components/SocialMedia';
import DownloadVCard from '../components/DownloadVCard';
import '../assets/css/styles.css'; // Importamos la hoja de estilos

const ProfilePage = () => {
  return (
    <div className="card-container">
      <Header />
      <div className="content">
        <ContactInfo />
        <SocialMedia />
        <DownloadVCard />
      </div>
    </div>
  );
};

export default ProfilePage;
