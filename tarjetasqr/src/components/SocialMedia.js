import React from 'react';
import { FaLinkedin, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="social-media">
      <h3>Social Media</h3>
      <div className="social-media-icons">
        <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#0077b5' }}>
          <FaLinkedin />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#C13584' }}>
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#3b5998' }}>
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#1da1f2' }}>
          <FaTwitter />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
