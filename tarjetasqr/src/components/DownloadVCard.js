import React, { useState } from 'react';
import QRCode from 'qrcode';

const DownloadVCard = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  // Generar QR con la URL actual de la página
  const generateQRCode = async () => {
    try {
      const url = window.location.href; // Obtener la URL actual de la página
      const qrCodeDataUrl = await QRCode.toDataURL(url); // Generar QR como Data URL
      setQrCodeUrl(qrCodeDataUrl); // Actualizar el estado con la URL del QR generado
    } catch (error) {
      console.error('Error al generar QR:', error);
    }
  };

  // Descargar el QR generado como archivo JPG
  const downloadQRCode = () => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl; // Usar el Data URL del QR generado
      link.download = 'qrcode.jpg'; // Nombre del archivo descargado
      link.click(); // Iniciar la descarga
    } else {
      console.log('No QR code to download');
    }
  };

  return (
    <div className="qr-container">
      <button className="download-btn" onClick={generateQRCode}>
        📥 GENERATE QR
      </button>
      {qrCodeUrl && (
        <div className="qr-output">
          <img className="qr-image" src={qrCodeUrl} alt="QR Code" />
          <button className="download-btn" onClick={downloadQRCode}>
            Download QR as JPG
          </button>
        </div>
      )}
    </div>
  );
};

export default DownloadVCard;

