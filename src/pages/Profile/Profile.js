import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import "./ProfilePage.css";

const initialCourses = [
  { id: 1, title: "Парикмахерский курс 1", progress: 0, paid: false },
  { id: 2, title: "Стрижки и укладки", progress: 0, paid: false },
  { id: 3, title: "Колористика", progress: 0, paid: false },
];

const certificates = [
  { id: 1, name: "Сертификат базового курса" },
  { id: 2, name: "Сертификат продвинутого курса" },
];

export default function ProfilePage() {
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('userCourses');
    return savedCourses ? JSON.parse(savedCourses) : initialCourses;
  });
  
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
        { name: "Детские стрижки", lessons: 3 },
        { name: "Вечерние укладки", lessons: 4 },
        { name: "Свадебные прически", lessons: 5 },
      ],
      totalLessons: 23,
      duration: "5 недель"
    },
    3: {
      title: "Колористика",
      description: "Курс по современной колористике. Научитесь подбирать и смешивать цвета, создавать сложные окрашивания.",
      modules: [
        { name: "Основы цветоведения", lessons: 4 },
        { name: "Техники окрашивания", lessons: 6 },
        { name: "Сложные формы мелирования", lessons: 5 },
        { name: "Коррекция цвета", lessons: 4 },
        { name: "Уход за окрашенными волосами", lessons: 3 },
      ],
      totalLessons: 22,
      duration: "4 недели"
    }
  };

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
          <span className="courses-count">{courses.filter(c => c.paid).length} из {courses.length} оплачено</span>
        </div>
        {courses.map((course) => (
          <div key={course.id} className="course-item">
            <div className="course-info">
              <span>{course.title}</span>
              <span className={`status ${course.paid ? "paid" : "unpaid"}`}>
                {course.paid ? "Оплачен" : "Не оплачен"}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${course.progress}%` }}
              ></div>
            </div>
            <div className="course-actions">
              {course.paid ? (
                <button 
                  className="start-learning-btn-profile"
                  onClick={() => startLearning(course.id)}
                >
                  Начать обучение
                </button>
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
        ))}
      </div>

      <div className="certificates-section">
        <h3>Сертификаты</h3>
        <ul>
          {certificates.map((cert) => (
            <li key={cert.id}>
              <span className="certificate-name">{cert.name}</span>
              <button className="download-certificate">📥 Скачать</button>
            </li>
          ))}
        </ul>
      </div>

      <div className="settings-section">
        <h3>Настройки</h3>
        <div className="settings-buttons">
          <button className="settings-btn">
            <span className="btn-icon">👤</span>
            Изменить профиль
          </button>
          <button className="settings-btn">
            <span className="btn-icon">🔒</span>
            Сменить пароль
          </button>
          <button className="settings-btn">
            <span className="btn-icon">🔔</span>
            Уведомления
          </button>
        </div>
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