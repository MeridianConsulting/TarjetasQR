import React, { useEffect } from 'react';
import extensionImage from '../assets/img/x.png'; // Twitter / X
import facebookImage from '../assets/img/facebook.png';
import linkedinImage from '../assets/img/in.png';
import instagramImage from '../assets/img/ig.png';
import tiktokImage from '../assets/img/tiktok.png'; // TikTok icon

const SocialMedia = () => {
  useEffect(() => {
    // Always display the message in console
    console.log(
      "%c🚀 Developed by José Mateo López Cifuentes",
      "font-size: 14px; color: #2ecc71; font-weight: bold;"
    );
    console.log(
      "%c📧 Email: josemateolopezcifuentes@gmail.com",
      "font-size: 12px; color: #3498db;"
    );
    console.log(
      "%c🔗 LinkedIn: José Mateo López Cifuentes (Visit: https://shorturl.at/Sx0PY)",
      "font-size: 12px; color: #e74c3c;"
    );

    // Store in localStorage to prevent duplicate logs in the same session
    if (!localStorage.getItem("authorMessageShown")) {
      localStorage.setItem("authorMessageShown", "true");
    }
  }, []);

  return (
    <div className="social-media">
      <div className="social-media-icons">
        {/* LinkedIn */}
        <a
          href="https://co.linkedin.com/company/meridian-consulting-ltda?trk=public_profile_experience-item_profile-section-card_subtitle-click"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="social-icon" src={linkedinImage} alt="LinkedIn" />
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/meridian_consultingltda/ " target="_blank" rel="noopener noreferrer">
          <img className="social-icon" src={instagramImage} alt="Instagram" />
        </a>

        {/* Twitter / X */}
        <a href="https://x.com/meridianLTDA" target="_blank" rel="noopener noreferrer">
          <img className="social-icon" src={extensionImage} alt="Twitter / X" />
        </a>

        {/* TikTok */}
        <a href="https://www.tiktok.com/@meridianltda" target="_blank" rel="noopener noreferrer">
          <img className="social-icon" src={tiktokImage} alt="TikTok" />
        </a>
      </div>
    </div>
  );
};

export default SocialMedia;
