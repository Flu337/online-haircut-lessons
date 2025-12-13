import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "./ProfilePage.css";

const initialCourses = [
  { id: 1, title: "Парикмахерский курс 1", paid: false },
  { id: 2, title: "Стрижки и укладки", paid: false },
  { id: 3, title: "Колористика", paid: false },
];


const certificateTemplates = {
  1: "/img/image.png", 
  2: "/img/image.png", 
  3: "/img/image.png",
};

export default function ProfilePage() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('userCourses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });
  
  const [certificates, setCertificates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();
  const isMounted = useRef(false);

  const courseDetails = {
    1: {
      title: "Парикмахерский курс 1",
      description: "Полный курс по основам парикмахерского искусства. Изучите базовые техники стрижек, укладок и ухода за волосами.",
      modules: [
        { name: "Введение в профессию", lessons: 3 },
        { name: "Инструменты и материалы", lessons: 4 },
        { name: "Базовые техники стрижек", lessons: 6 },
        { name: "Укладки и стайлинг", lessons: 5 },
        { name: "Работа с клиентами", lessons: 3 },
      ],
      totalLessons: 21,
      duration: "4 недели"
    },
    2: {
      title: "Стрижки и укладки",
      description: "Продвинутый курс по современным техникам стрижек и укладок. Освойте трендовые методы работы.",
      modules: [
        { name: "Мужские стрижки", lessons: 5 },
        { name: "Женские стрижки", lessons: 6 },
      ],
      totalLessons: 11,
      duration: "3 недели"
    },
    3: {
      title: "Колористика",
      description: "Курс по современной колористике. Научитесь подбирать и смешивать цвета, создавать сложные окрашивания.",
      modules: [
        { name: "Основы цветоведения", lessons: 4 },
        { name: "Техники окрашивания", lessons: 4 },
      ],
      totalLessons: 8,
      duration: "2 недели"
    }
  };


  const getCourseProgress = useCallback((courseId) => {
    try {
      const progressKey = `course_progress_${courseId}`;
      const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
      
      const completedLessons = Object.values(savedProgress).filter(lesson => lesson.completed).length;
      const totalLessons = courseDetails[courseId]?.totalLessons || 1;
      
      const progress = Math.round((completedLessons / totalLessons) * 100);
      return isNaN(progress) ? 0 : progress;
    } catch (error) {
      console.error('Error getting course progress:', error);
      return 0;
    }
  }, []);

 
  const checkCourseCompletion = useCallback((courseId) => {
    const progress = getCourseProgress(courseId);
    return progress === 100;
  }, [getCourseProgress]);

  
  const getCourseCompletionDate = useCallback((courseId) => {
    try {
      const progressKey = `course_progress_${courseId}`;
      const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
      
      let latestDate = null;
      Object.values(savedProgress).forEach(lesson => {
        if (lesson.completedAt) {
          const lessonDate = new Date(lesson.completedAt);
          if (!latestDate || lessonDate > latestDate) {
            latestDate = lessonDate;
          }
        }
      });
      
      return latestDate;
    } catch (error) {
      console.error('Error getting completion date:', error);
      return null;
    }
  }, []);

  
  const generateCertificate = useCallback((courseId) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course) return null;
      
      const completionDate = getCourseCompletionDate(courseId);
      
      return {
        id: courseId,
        name: `Сертификат по курсу "${course.title}"`,
        courseId: courseId,
        courseTitle: course.title,
        issueDate: completionDate ? completionDate.toISOString() : new Date().toISOString(),
        userName: "Кирилл Иванов",
        progress: 100
      };
    } catch (error) {
      console.error('Error generating certificate:', error);
      return null;
    }
  }, [courses, getCourseCompletionDate]);


  const updateCertificates = useCallback(() => {
    try {
      const completedCertificates = [];
      
      courses.forEach(course => {
        if (course.paid) {
          const progress = getCourseProgress(course.id);
          const isCompleted = progress === 100;
          
          if (isCompleted) {
            const certificate = generateCertificate(course.id);
            if (certificate) {
              completedCertificates.push(certificate);
            }
          }
        }
      });
      
  
      setCertificates(prev => {
        const prevIds = prev.map(c => c.id).sort().join(',');
        const newIds = completedCertificates.map(c => c.id).sort().join(',');
        
        if (prevIds !== newIds) {
          return completedCertificates;
        }
        return prev;
      });
    } catch (error) {
      console.error('Error updating certificates:', error);
    }
  }, [courses, getCourseProgress, generateCertificate]);

 
  useEffect(() => {
    if (isMounted.current) return;
    isMounted.current = true;
    
   
    const savedCourses = localStorage.getItem('userCourses');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        setCourses(parsedCourses);
        
        
        setTimeout(() => {
          updateCertificates();
        }, 100);
      } catch (error) {
        console.error('Error parsing courses:', error);
      }
    }
  }, []);

  
  useEffect(() => {
    if (!isMounted.current) return;
    
    const timer = setTimeout(() => {
      updateCertificates();
    }, 500);
    
    return () => clearTimeout(timer);
  }, [courses, updateCertificates]);

  const openCourseModal = (courseId) => {
    setSelectedCourse(courseId);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const purchaseCourse = () => {
    try {
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse ? { ...course, paid: true } : course
      );
      
      setCourses(updatedCourses);
      localStorage.setItem('userCourses', JSON.stringify(updatedCourses));
      

      setTimeout(() => {
        updateCertificates();
      }, 100);
      
      closeModal();
    } catch (error) {
      console.error('Error purchasing course:', error);
      alert('Ошибка при покупке курса. Попробуйте еще раз.');
    }
  };

  const startLearning = (courseId) => {
    try {
      const course = courses.find(c => c.id === courseId);
      if (!course) {
        alert('Курс не найден');
        return;
      }
      
      if (!course.paid) {
        alert('Сначала оплатите курс!');
        openCourseModal(courseId);
        return;
      }
      
   
      navigate(`/learning/${courseId}`);
    } catch (error) {
      console.error('Error starting learning:', error);
      alert('Ошибка при переходе к обучению');
    }
  };

  const handleLogout = () => {
    navigate("/");
  };


  const downloadCertificate = useCallback((courseId, courseTitle) => {
    try {
      const templateUrl = certificateTemplates[courseId] || "/img/image.png";
      const completionDate = getCourseCompletionDate(courseId);

      const dateStr = completionDate ? 
        completionDate.toLocaleDateString('ru-RU', { 
          day: '2-digit', 
          month: '2-digit', 
          year: 'numeric' 
        }).replace(/\./g, '-') : 
        new Date().toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit', 
          year: 'numeric'
        }).replace(/\./g, '-');
      
     
      const cleanTitle = courseTitle
        .replace(/\s+/g, '_')
        .replace(/[^а-яА-Яa-zA-Z0-9_]/g, '')
        .slice(0, 50);
      
    
      const fileName = `Сертификат_${cleanTitle}_${dateStr}.png`;
      
   
      const link = document.createElement('a');
      link.href = templateUrl;
      link.download = fileName;
      

      link.onclick = () => {
        setTimeout(() => {
          if (link.parentNode) {
            document.body.removeChild(link);
          }
        }, 1000);
      };
      
      document.body.appendChild(link);
      link.click();
      

      alert(`✅ Сертификат по курсу "${courseTitle}" скачивается!\n\nФайл: ${fileName}`);
      
    } catch (error) {
      console.error('❌ Ошибка при скачивании сертификата:', error);
      alert('Ошибка при скачивании сертификата');
    }
  }, [getCourseCompletionDate]);

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="/img/{BACC5AFF-C2A9-41A3-B885-9DBF0B6BB2F3}.png"
          alt="avatar"
          className="avatar"
        />
        <div className="profile-info">
          <h2 className="username">Кирилл Иванов</h2>
          <p className="user-email">kirill@example.com</p>
        </div>
      </div>

      <div className="courses-card">
        <div className="section-header">
          <h3>Мои курсы</h3>
          <span className="courses-count">
            {courses.filter(c => c.paid).length} из {courses.length} оплачено
          </span>
        </div>
        
        {courses.map((course) => {
          const progress = getCourseProgress(course.id);
          const isCompleted = checkCourseCompletion(course.id);
          
          return (
            <div key={course.id} className="course-item">
              <div className="course-info">
                <span className="course-title">{course.title}</span>
                <span className={`status ${course.paid ? "paid" : "unpaid"}`}>
                  {course.paid ? (isCompleted ? "Завершен" : "В процессе") : "Не оплачен"}
                </span>
              </div>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${progress}%` }}
                ></div>
                <span className="progress-text">{progress}%</span>
              </div>
              <div className="course-actions">
                {course.paid ? (
                  <>
                    <button 
                      className="start-learning-btn-profile"
                      onClick={() => startLearning(course.id)}
                    >
                      {isCompleted ? 'Повторить курс' : 'Продолжить обучение'}
                    </button>
                    
                    {isCompleted && (
                      <button 
                        className="download-certificate-btn-profile"
                        onClick={() => downloadCertificate(course.id, course.title)}
                        title="Скачать сертификат"
                      >
                        📄 Сертификат
                      </button>
                    )}
                  </>
                ) : (
                  <button 
                    className="choose-plan-btn"
                    onClick={() => openCourseModal(course.id)}
                  >
                    Выбрать план
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="certificates-section">
        <div className="section-header">
          <h3>Мои сертификаты</h3>
          <span className="certificates-count">
            {certificates.length} сертификат{certificates.length !== 1 ? 'а' : ''}
          </span>
        </div>
        
        {certificates.length === 0 ? (
          <div className="no-certificates">
            <div className="certificate-placeholder">
              <div className="certificate-icon">📜</div>
              <h4>Пока нет сертификатов</h4>
              <p>Завершите один из курсов, чтобы получить сертификат</p>
            </div>
          </div>
        ) : (
          <div className="certificates-grid">
            {certificates.map((cert) => {
              const completionDate = new Date(cert.issueDate);
              
              return (
                <div key={cert.id} className="certificate-card">
                  <div className="certificate-header">
                    <div className="certificate-icon">📜</div>
                    <div className="certificate-badge">Завершено</div>
                  </div>
                  
                  <div className="certificate-body">
                    <h4>{cert.courseTitle}</h4>
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
                        <span className="detail-value">{cert.userName}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Прогресс:</span>
                        <span className="detail-value">{cert.progress}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Убрана кнопка "Просмотреть", оставлена только кнопка "Скачать" */}
                  <div className="certificate-footer">
                    <button 
                      className="download-certificate-btn"
                      onClick={() => downloadCertificate(cert.courseId, cert.courseTitle)}
                    >
                      📥 Скачать сертификат
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          Выйти на главную
        </button>
        <p className="logout-hint">Вернуться на главную страницу сайта</p>
      </div>

      {/* Модальное окно курса */}
      {modalOpen && selectedCourse && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <h2>{courseDetails[selectedCourse]?.title}</h2>
            <p className="course-description">
              {courseDetails[selectedCourse]?.description}
            </p>
            
            <div className="course-stats">
              <div className="stat-item">
                <span className="stat-label">Длительность:</span>
                <span className="stat-value">{courseDetails[selectedCourse]?.duration}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Уроков:</span>
                <span className="stat-value">{courseDetails[selectedCourse]?.totalLessons}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Сертификат:</span>
                <span className="stat-value">✅ Выдается по завершении</span>
              </div>
            </div>
            
            <div className="modules-section">
              <h3>Структура курса</h3>
              <ul className="modules-list">
                {courseDetails[selectedCourse]?.modules.map((module, index) => (
                  <li key={index} className="module-item">
                    <span className="module-name">{module.name}</span>
                    <span className="module-lessons">{module.lessons} уроков</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="modal-actions">
              <button className="purchase-btn" onClick={purchaseCourse}>
                Оплатить курс
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}