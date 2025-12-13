import React from "react";
import CertificateCard from "./CertificateCard";

const CertificatesList = ({ certificates, onDownloadCertificate }) => {
  if (certificates.length === 0) {
    return (
      <div className="certificates-section">
        <div className="section-header">
          <h3>Мои сертификаты</h3>
          <span className="certificates-count">
            0 сертификатов
          </span>
        </div>
        
        <div className="no-certificates">
          <div className="certificate-placeholder">
            <div className="certificate-icon">📜</div>
            <h4>Пока нет сертификатов</h4>
            <p>Завершите один из курсов, чтобы получить сертификат</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="certificates-section">
      <div className="section-header">
        <h3>Мои сертификаты</h3>
        <span className="certificates-count">
          {certificates.length} сертификат{certificates.length !== 1 ? 'а' : ''}
        </span>
      </div>
      
      <div className="certificates-grid">
        {certificates.map((cert) => (
          <CertificateCard
            key={cert.id}
            certificate={cert}
            onDownloadCertificate={onDownloadCertificate}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificatesList;