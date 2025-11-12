import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

const DownloadVCard = ({ showButtonOnly, showQRCodeOnly, userName }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const generateQRCode = async () => {
      try {
        const url = window.location.href;
        const qrCodeDataUrl = await QRCode.toDataURL(url, {
          color: {
            dark: '#FFFFFF',
            light: '#00000000'
          }
        });
        setQrCodeUrl(qrCodeDataUrl);
      } catch (error) {
        console.error('Error al generar QR:', error);
      }
    };
    generateQRCode();
  }, []);

  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      // Generar nombre del archivo
      const formattedName = userName 
        ? `${userName.toUpperCase().replace(/ /g, '_')}_QR.jpg`
        : 'qrcode.jpg';
      link.download = formattedName;
      link.click();
    }
  };

  if (!qrCodeUrl) return null;

  if (showButtonOnly) {
    return (
      <div className="download-btn-container">
        <div className="download-btn-bg"></div>
        <button className="download-btn" onClick={downloadQRCode}>
          Descargar QR
        </button>
      </div>
    );
  }

  if (showQRCodeOnly) {
    return <img className="qr-image" src={qrCodeUrl} alt="QR Code" />;
  }

  return (
    <div className="qr-container">
      <div className="qr-output">
        <img className="qr-image" src={qrCodeUrl} alt="QR Code" />
        <div className="download-btn-container">
          <div className="download-btn-bg"></div>
          <button className="download-btn" onClick={downloadQRCode}>
            Descargar QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadVCard;