import React from 'react';
import '../../styles/ProfileComponents.css';

const CoursesList = ({ 
  courses, 
  getCourseProgress, 
  checkCourseCompletion, 
  onStartLearning, 
  onDownloadCertificate, 
  onOpenModal 
}) => {
  return (
    <div className="courses-card">
      <div className="section-header">
        <h3>Мои курсы</h3>
        <div className="courses-count">{courses.length} курса</div>
      </div>
      
      {courses.map(course => {
        const progress = getCourseProgress(course.id);
        const isCompleted = checkCourseCompletion(course.id);
        
        return (
          <div key={course.id} className="course-item">
            <div className="course-info">
              <h4 className="course-title">{course.title}</h4>
              <div className={`course-status ${isCompleted ? 'status-completed' : course.paid ? 'status-paid' : 'status-unpaid'}`}>
                {isCompleted ? '✅ Завершен' : course.paid ? '✅ Оплачен' : '⏳ Не оплачен'}
              </div>
            </div>
            
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="progress-text">
                <span>Прогресс:</span>
                <span>{progress}%</span>
              </div>
            </div>
            
            <div className="course-actions">
              {course.paid ? (
                <>
                  <button 
                    className="start-learning-btn-profile"
                    onClick={() => onStartLearning(course.id)}
                  >
                    {isCompleted ? 'Повторить курс' : 'Продолжить обучение'}
                  </button>
                  
                  {isCompleted && (
                    <button 
                      className="download-certificate-btn-profile"
                      onClick={() => onDownloadCertificate(course.id, course.title)}
                    >
                      📄 Скачать сертификат
                    </button>
                  )}
                </>
              ) : (
                <button 
                  className="choose-plan-btn"
                  onClick={() => onOpenModal(course.id)}
                >
                  💳 Оплатить курс
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CoursesList;