import React from "react";

const CertificateCard = ({ certificate, onDownloadCertificate }) => {
  const completionDate = new Date(certificate.issueDate);
  
  return (
    <div className="certificate-card">
      <div className="certificate-header">
        <div className="certificate-icon">📜</div>
        <div className="certificate-badge">Завершено</div>
      </div>
      
      <div className="certificate-body">
        <h4>{certificate.courseTitle}</h4>
        <div className="certificate-details">
          <div className="detail-item">
            <span className="detail-label">Выдан:</span>
            <span className="detail-value">
              {completionDate.toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Студент:</span>
            <span className="detail-value">{certificate.userName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Прогресс:</span>
            <span className="detail-value progress">{certificate.progress}%</span>
          </div>
        </div>
      </div>
      
      <div className="certificate-footer">
        <button 
          className="download-certificate-btn" 
          onClick={() => onDownloadCertificate(certificate.courseId, certificate.courseTitle)}
        >
          <span></span> Скачать сертификат
        </button>
      </div>
    </div>
  );
};

export default CertificateCard;