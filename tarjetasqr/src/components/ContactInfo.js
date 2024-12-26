import React from 'react';

const ContactInfo = () => {
  return (
    <div className="contact-info">
      <p>
        📞 <span>+57 313 3338414 (Mobile)</span>
      </p>
      <p>
        📧 <span>lida.soler@consultec.co</span>
      </p>
      <p>
        🏢 <span>Consultec International</span>
      </p>
      <p>
        🌐{' '}
        <a
          href="http://www.consultec.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.consultec.co
        </a>
      </p>
    </div>
  );
};

export default ContactInfo;
