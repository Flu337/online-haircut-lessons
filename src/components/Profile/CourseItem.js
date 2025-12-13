import React from "react";
// Убираем import "./CourseItem.css";

const CourseItem = ({ 
  course, 
  progress, 
  isCompleted, 
  onStartLearning, 
  onDownloadCertificate, 
  onOpenModal 
}) => {
  return (
    <div className="course-item">
      <div className="course-info">
        <span className="course-title">{course.title}</span>
        <span className={`course-status ${course.paid ? (isCompleted ? "status-completed" : "status-paid") : "status-unpaid"}`}>
          {course.paid ? (isCompleted ? "Завершен" : "В процессе") : "Не оплачен"}
        </span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="progress-text">{progress}%</div>
      </div>
      <div className="course-actions">
        {course.paid ? (
          <>
            <button 
              className="btn btn-primary"
              onClick={() => onStartLearning(course.id)}
            >
              {isCompleted ? 'Повторить курс' : 'Продолжить обучение'}
            </button>
            
            {isCompleted && (
              <button 
                className="btn btn-success"
                onClick={() => onDownloadCertificate(course.id, course.title)}
                title="Скачать сертификат"
              >
                📄 Сертификат
              </button>
            )}
          </>
        ) : (
          <button 
            className="btn btn-secondary"
            onClick={() => onOpenModal(course.id)}
          >
            Выбрать план
          </button>
        )}
      </div>
    </div>
  );
};

export default CourseItem;