import React from "react";

const CourseModal = ({ 
  selectedCourse, 
  courseDetails, 
  onClose, 
  onPurchase 
}) => {
  if (!selectedCourse || !courseDetails[selectedCourse]) return null;
  
  const course = courseDetails[selectedCourse];
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h2>{course.title}</h2>
        <p className="course-description">
          {course.description}
        </p>
        
        <div className="course-stats">
          <div className="stat-item">
            <span className="stat-label">Длительность:</span>
            <span className="stat-value">{course.duration}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Уроков:</span>
            <span className="stat-value">{course.totalLessons}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Сертификат:</span>
            <span className="stat-value"> Выдается по завершении</span>
          </div>
        </div>
        
        <div className="modules-section">
          <h3>Структура курса</h3>
          <ul className="modules-list">
            {course.modules.map((module, index) => (
              <li key={index} className="module-item">
                <span className="module-name">{module.name}</span>
                <span className="module-lessons">{module.lessons} уроков</span>
              </li>
            ))}
          </ul>
        </div>
        
<div className="modal-actions">
          <button className="btn btn-primary" onClick={onPurchase}>  {/* Изменено */}
            Оплатить курс
          </button>
          <button className="btn btn-cancel" onClick={onClose}> 
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;