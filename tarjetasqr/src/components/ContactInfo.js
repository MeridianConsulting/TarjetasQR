import React from 'react';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <div className="contact-item">
        <p>📞 <span>+57 313 3338414</span></p>
        <small>Mobile</small>
      </div>
      <div className="contact-item">
        <p>📧 <span>lida.soler@consultec.co</span></p>
        <small>Email</small>
      </div>
      <div className="contact-item">
        <p>🏢 <span>Consultec International</span></p>
        <small>Company</small>
      </div>
      <div className="contact-item">
        <p>🌐{' '}
          <a
            href="http://www.consultec.co"
            target="_blank"
            rel="noopener noreferrer"
          >
            www.consultec.co
          </a>
        </p>
        <small>Website</small>
      </div>
    </div>
  );
};

export default ContactInfo;
