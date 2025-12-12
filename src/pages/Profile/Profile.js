import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "./ProfilePage.css";

const initialCourses = [
  { id: 1, title: "Парикмахерский курс 1",  paid: false },
  { id: 2, title: "Стрижки и укладки",  paid: false },
  { id: 3, title: "Колористика",  paid: false },
];

// Шаблоны сертификатов для разных курсов
const certificateTemplates = {
  1: "https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Сертификат+Парикмахерский+курс+1",
  2: "https://via.placeholder.com/800x600/2196F3/FFFFFF?text=Сертификат+Стрижки+и+укладки",
  3: "https://via.placeholder.com/800x600/9C27B0/FFFFFF?text=Сертификат+Колористика"
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

  // Функция для проверки, завершен ли курс
  const checkCourseCompletion = useCallback((courseId) => {
    const progressKey = `course_progress_${courseId}`;
    const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
    
    const completedLessons = Object.values(savedProgress).filter(lesson => lesson.completed).length;
    const totalLessons = courseDetails[courseId]?.totalLessons || 0;
    
    return totalLessons > 0 && completedLessons === totalLessons;
  }, [courseDetails]);

  // Функция для получения процента выполнения курса
  const getCourseProgress = useCallback((courseId) => {
    const progressKey = `course_progress_${courseId}`;
    const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
    
    const completedLessons = Object.values(savedProgress).filter(lesson => lesson.completed).length;
    const totalLessons = courseDetails[courseId]?.totalLessons || 1;
    
    return Math.round((completedLessons / totalLessons) * 100);
  }, [courseDetails]);

  // Функция для получения даты завершения курса
  const getCourseCompletionDate = useCallback((courseId) => {
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
  }, []);

  // Функция для обновления сертификатов
  const updateCertificates = useCallback(() => {
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
    
    setCertificates(completedCertificates);
  }, [courses, getCourseProgress]);

  // Функция для генерации сертификата
  const generateCertificate = useCallback((courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (!course) return null;
    
    const completionDate = getCourseCompletionDate(courseId);
    
    return {
      id: courseId,
      name: `Сертификат по курсу "${course.title}"`,
      courseId: courseId,
      courseTitle: course.title,
      issueDate: completionDate || new Date().toISOString(),
      userName: "Кирилл Иванов",
      progress: 100
    };
  }, [courses, getCourseCompletionDate]);

  // Функция для загрузки сертификата
  const downloadCertificate = useCallback((courseId, courseTitle) => {
    const templateUrl = certificateTemplates[courseId] || certificateTemplates[1];
    const completionDate = getCourseCompletionDate(courseId);
    const dateStr = completionDate ? completionDate.toLocaleDateString() : new Date().toLocaleDateString();
    
    // Создаем временную ссылку для скачивания
    const link = document.createElement('a');
    link.href = templateUrl;
    link.download = `Сертификат_${courseTitle}_${dateStr}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [getCourseCompletionDate]);

  // Обновляем при загрузке и при изменении localStorage
  useEffect(() => {
    const savedCourses = localStorage.getItem('userCourses');
    if (savedCourses) {
      setCourses(JSON.parse(savedCourses));
    }
    
    updateCertificates();
    
    // Слушаем изменения в localStorage
    const handleStorageChange = () => {
      const savedCourses = localStorage.getItem('userCourses');
      if (savedCourses) {
        setCourses(JSON.parse(savedCourses));
      }
      updateCertificates();
    };
    
    // Добавляем обработчик события storage
    window.addEventListener('storage', handleStorageChange);
    
    // Также проверяем каждые 2 секунды (для обновления в той же вкладке)
    const interval = setInterval(updateCertificates, 2000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [updateCertificates]);

  const openCourseModal = (courseId) => {
    setSelectedCourse(courseId);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const purchaseCourse = () => {
    const updatedCourses = courses.map(course => 
      course.id === selectedCourse ? { ...course, paid: true } : course
    );
    
    setCourses(updatedCourses);
    localStorage.setItem('userCourses', JSON.stringify(updatedCourses));
    updateCertificates(); // Обновляем сертификаты после покупки
    closeModal();
  };

  const startLearning = (courseId) => {
    navigate(`/learning/${courseId}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img
          src="../../img/{BACC5AFF-C2A9-41A3-B885-9DBF0B6BB2F3}.png"
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
                <span>{course.title}</span>
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
                  
                  <div className="certificate-footer">
                    <button 
                      className="view-certificate-btn"
                      onClick={() => window.open(certificateTemplates[cert.courseId], '_blank')}
                    >
                      👁️ Просмотреть
                    </button>
                    <button 
                      className="download-certificate-btn"
                      onClick={() => downloadCertificate(cert.courseId, cert.courseTitle)}
                    >
                      📥 Скачать
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