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
    <div className="download-btn">
      <button onClick={generateQRCode}>📥 DOWNLOAD VCARD</button>
      {qrCodeUrl && (
        <div>
          <img src={qrCodeUrl} alt="QR Code" style={{ marginTop: '20px', width: '200px' }} />
          <button onClick={downloadQRCode} style={{ marginTop: '10px' }}>Download QR as JPG</button>
        </div>
      )}
    </div>
  );
};

export default DownloadVCard;
