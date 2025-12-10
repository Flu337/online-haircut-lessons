import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./LearningPage.css";

// Полные данные курсов, соответствующие модальным окнам
const courseData = {
  1: {
    id: 1,
    title: "Парикмахерский курс 1",
    description: "Полный курс по основам парикмахерского искусства. Изучите базовые техники стрижек, укладок и ухода за волосами.",
    modules: [
      {
        id: 1,
        title: "Введение в профессию",
        lessonsCount: 3,
        lessons: [
          { 
            id: 1, 
            title: "История парикмахерского искусства", 
            duration: "15:00", 
            videoId: "video1",
            provider: "rutube" 
          },
          { 
            id: 2, 
            title: "Инструменты и их назначение", 
            duration: "20:00", 
            videoId: "video2",
            provider: "rutube" 
          },
          { 
            id: 3, 
            title: "Техника безопасности", 
            duration: "12:00", 
            videoId: "video3",
            provider: "rutube" 
          },
        ]
      },
      {
        id: 2,
        title: "Инструменты и материалы",
        lessonsCount: 4,
        lessons: [
          { 
            id: 4, 
            title: "Ножницы и их виды", 
            duration: "18:00", 
            videoId: "video4",
            provider: "rutube" 
          },
          { 
            id: 5, 
            title: "Расчески и щетки", 
            duration: "16:00", 
            videoId: "video5",
            provider: "rutube" 
          },
          { 
            id: 6, 
            title: "Стайлинговые средства", 
            duration: "22:00", 
            videoId: "video6",
            provider: "rutube" 
          },
          { 
            id: 7, 
            title: "Уход за инструментами", 
            duration: "14:00", 
            videoId: "video7",
            provider: "rutube" 
          },
        ]
      },
      {
        id: 3,
        title: "Базовые техники стрижек",
        lessonsCount: 6,
        lessons: [
          { 
            id: 8, 
            title: "Техника тушевки", 
            duration: "25:00", 
            videoId: "video8",
            provider: "rutube" 
          },
          { 
            id: 9, 
            title: "Техника градуировки", 
            duration: "28:00", 
            videoId: "video9",
            provider: "rutube" 
          },
          { 
            id: 10, 
            title: "Техника каскада", 
            duration: "30:00", 
            videoId: "video10",
            provider: "rutube" 
          },
          { 
            id: 11, 
            title: "Техника асимметрии", 
            duration: "22:00", 
            videoId: "video11",
            provider: "rutube" 
          },
          { 
            id: 12, 
            title: "Работа с машинкой", 
            duration: "35:00", 
            videoId: "video12",
            provider: "rutube" 
          },
          { 
            id: 13, 
            title: "Финализация стрижки", 
            duration: "18:00", 
            videoId: "video13",
            provider: "rutube" 
          },
        ]
      },
      {
        id: 4,
        title: "Укладки и стайлинг",
        lessonsCount: 5,
        lessons: [
          { 
            id: 14, 
            title: "Основные виды укладок", 
            duration: "20:00", 
            videoId: "video14",
            provider: "rutube" 
          },
          { 
            id: 15, 
            title: "Работа с феном", 
            duration: "25:00", 
            videoId: "video15",
            provider: "rutube" 
          },
          { 
            id: 16, 
            title: "Укладка на брашинг", 
            duration: "30:00", 
            videoId: "video16",
            provider: "rutube" 
          },
          { 
            id: 17, 
            title: "Вечерние прически", 
            duration: "40:00", 
            videoId: "video17",
            provider: "rutube" 
          },
          { 
            id: 18, 
            title: "Создание локонов", 
            duration: "35:00", 
            videoId: "video18",
            provider: "rutube" 
          },
        ]
      },
      {
        id: 5,
        title: "Работа с клиентами",
        lessonsCount: 3,
        lessons: [
          { 
            id: 19, 
            title: "Консультация клиента", 
            duration: "15:00", 
            videoId: "video19",
            provider: "rutube" 
          },
          { 
            id: 20, 
            title: "Подбор стрижки по типу лица", 
            duration: "25:00", 
            videoId: "video20",
            provider: "rutube" 
          },
          { 
            id: 21, 
            title: "Заключительный этап обслуживания", 
            duration: "10:00", 
            videoId: "video21",
            provider: "rutube" 
          },
        ]
      }
    ],
    totalLessons: 21,
    duration: "4 недели"
  },
  2: {
    id: 2,
    title: "Стрижки и укладки",
    description: "Продвинутый курс по современным техникам стрижек и укладок. Освойте трендовые методы работы.",
    modules: [
      {
        id: 1,
        title: "Мужские стрижки",
        lessonsCount: 5,
        lessons: [
          { id: 1, title: "Классическая мужская стрижка", duration: "25:00", videoId: "m1", provider: "rutube" },
          { id: 2, title: "Модные тенденции 2024", duration: "20:00", videoId: "m2", provider: "rutube" },
          { id: 3, title: "Стрижка канадка", duration: "30:00", videoId: "m3", provider: "rutube" },
          { id: 4, title: "Фейд и текстурирование", duration: "35:00", videoId: "m4", provider: "rutube" },
          { id: 5, title: "Борода и усы", duration: "28:00", videoId: "m5", provider: "rutube" },
        ]
      },
      {
        id: 2,
        title: "Женские стрижки",
        lessonsCount: 6,
        lessons: [
          { id: 6, title: "Короткие женские стрижки", duration: "32:00", videoId: "w1", provider: "rutube" },
          { id: 7, title: "Стрижки на средние волосы", duration: "28:00", videoId: "w2", provider: "rutube" },
          { id: 8, title: "Длинные волосы: техники", duration: "40:00", videoId: "w3", provider: "rutube" },
          { id: 9, title: "Челки и их виды", duration: "22:00", videoId: "w4", provider: "rutube" },
          { id: 10, title: "Асимметричные стрижки", duration: "35:00", videoId: "w5", provider: "rutube" },
          { id: 11, title: "Многослойные стрижки", duration: "38:00", videoId: "w6", provider: "rutube" },
        ]
      },
      {
        id: 3,
        title: "Детские стрижки",
        lessonsCount: 3,
        lessons: [
          { id: 12, title: "Особенности детских волос", duration: "18:00", videoId: "c1", provider: "rutube" },
          { id: 13, title: "Стрижки для мальчиков", duration: "25:00", videoId: "c2", provider: "rutube" },
          { id: 14, title: "Стрижки для девочек", duration: "30:00", videoId: "c3", provider: "rutube" },
        ]
      },
      {
        id: 4,
        title: "Вечерние укладки",
        lessonsCount: 4,
        lessons: [
          { id: 15, title: "Гладкие укладки", duration: "28:00", videoId: "e1", provider: "rutube" },
          { id: 16, title: "Объемные прически", duration: "35:00", videoId: "e2", provider: "rutube" },
          { id: 17, title: "Плетение кос", duration: "40:00", videoId: "e3", provider: "rutube" },
          { id: 18, title: "Укладки с аксессуарами", duration: "32:00", videoId: "e4", provider: "rutube" },
        ]
      },
      {
        id: 5,
        title: "Свадебные прически",
        lessonsCount: 5,
        lessons: [
          { id: 19, title: "Классические свадебные укладки", duration: "45:00", videoId: "w1", provider: "rutube" },
          { id: 20, title: "Современные тренды", duration: "38:00", videoId: "w2", provider: "rutube" },
          { id: 21, title: "Прически с фатой", duration: "42:00", videoId: "w3", provider: "rutube" },
          { id: 22, title: "Мужские свадебные стрижки", duration: "28:00", videoId: "w4", provider: "rutube" },
          { id: 23, title: "Экспресс-укладки", duration: "35:00", videoId: "w5", provider: "rutube" },
        ]
      }
    ],
    totalLessons: 23,
    duration: "5 недель"
  },
  3: {
    id: 3,
    title: "Колористика",
    description: "Курс по современной колористике. Научитесь подбирать и смешивать цвета, создавать сложные окрашивания.",
    modules: [
      {
        id: 1,
        title: "Основы цветоведения",
        lessonsCount: 4,
        lessons: [
          { id: 1, title: "Цветовой круг", duration: "18:00", videoId: "color1", provider: "rutube" },
          { id: 2, title: "Теплые и холодные тона", duration: "16:00", videoId: "color2", provider: "rutube" },
          { id: 3, title: "Нюансы и полутона", duration: "20:00", videoId: "color3", provider: "rutube" },
          { id: 4, title: "Сочетаемость цветов", duration: "22:00", videoId: "color4", provider: "rutube" },
        ]
      },
      {
        id: 2,
        title: "Техники окрашивания",
        lessonsCount: 6,
        lessons: [
          { id: 5, title: "Однотонное окрашивание", duration: "25:00", videoId: "tech1", provider: "rutube" },
          { id: 6, title: "Мелирование", duration: "30:00", videoId: "tech2", provider: "rutube" },
          { id: 7, title: "Омбре и балаяж", duration: "35:00", videoId: "tech3", provider: "rutube" },
          { id: 8, title: "Шатуш и сомбре", duration: "32:00", videoId: "tech4", provider: "rutube" },
          { id: 9, title: "Тонирование", duration: "28:00", videoId: "tech5", provider: "rutube" },
          { id: 10, title: "Колорирование", duration: "40:00", videoId: "tech6", provider: "rutube" },
        ]
      },
      {
        id: 3,
        title: "Сложные формы мелирования",
        lessonsCount: 5,
        lessons: [
          { id: 11, title: "Венецианское мелирование", duration: "45:00", videoId: "adv1", provider: "rutube" },
          { id: 12, title: "Бабушка и пират", duration: "38:00", videoId: "adv2", provider: "rutube" },
          { id: 13, title: "Мелирование на фольгу", duration: "42:00", videoId: "adv3", provider: "rutube" },
          { id: 14, title: "Бронд и шатен", duration: "35:00", videoId: "adv4", provider: "rutube" },
          { id: 15, title: "Экспресс-мелирование", duration: "30:00", videoId: "adv5", provider: "rutube" },
        ]
      },
      {
        id: 4,
        title: "Коррекция цвета",
        lessonsCount: 4,
        lessons: [
          { id: 16, title: "Снятие краски", duration: "50:00", videoId: "cor1", provider: "rutube" },
          { id: 17, title: "Избавление от желтизны", duration: "28:00", videoId: "cor2", provider: "rutube" },
          { id: 18, title: "Коррекция домашних окрашиваний", duration: "40:00", videoId: "cor3", provider: "rutube" },
          { id: 19, title: "Переход на другой цвет", duration: "45:00", videoId: "cor4", provider: "rutube" },
        ]
      },
      {
        id: 5,
        title: "Уход за окрашенными волосами",
        lessonsCount: 3,
        lessons: [
          { id: 20, title: "Профессиональные средства", duration: "25:00", videoId: "care1", provider: "rutube" },
          { id: 21, title: "Домашний уход", duration: "20:00", videoId: "care2", provider: "rutube" },
          { id: 22, title: "Сохранение цвета", duration: "18:00", videoId: "care3", provider: "rutube" },
        ]
      }
    ],
    totalLessons: 22,
    duration: "4 недели"
  }
};

const LearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const iframeRef = useRef(null);


  useEffect(() => {
    const course = courseData[courseId];
    if (!course) {
      navigate("/profile");
      return;
    }
    
    setCourse(course);
    
    
    const savedProgress = JSON.parse(localStorage.getItem(`course_progress_${courseId}`)) || {};
    setProgress(savedProgress);
  }, [courseId, navigate]);


  const isLessonAvailable = (moduleId, lessonId, lessonIndex) => {
    const lessonProgress = progress[lessonId];
    

    if (lessonProgress?.completed) {
      return true;
    }
    

    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return false;
    

    if (lessonIndex === 0) {
      return true;
    }
    

    const previousLesson = module.lessons[lessonIndex - 1];
    const previousProgress = progress[previousLesson.id];
    
    return previousProgress?.completed === true;
  };


  const isFirstAvailableLesson = (moduleId) => {
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return false;
    
    for (let i = 0; i < module.lessons.length; i++) {
      if (!progress[module.lessons[i].id]?.completed) {
        return i === 0 || progress[module.lessons[i-1].id]?.completed;
      }
    }
    return false;
  };


  const markLessonAsCompleted = (moduleId, lessonId, watchedTime = 0) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        completed: true,
        completedAt: new Date().toISOString(),
        watchedTime: watchedTime,
        lastPosition: currentVideoTime
      }
    };
    
    setProgress(newProgress);
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(newProgress));
    

    const currentModuleIndex = course.modules.findIndex(m => m.id === moduleId);
    const currentLessonIndex = course.modules[currentModuleIndex].lessons.findIndex(l => l.id === lessonId);
    

    if (currentLessonIndex < course.modules[currentModuleIndex].lessons.length - 1) {
      const nextLesson = course.modules[currentModuleIndex].lessons[currentLessonIndex + 1];
      openLesson(moduleId, nextLesson);
    } 

    else if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        const nextLesson = nextModule.lessons[0];
        openLesson(nextModule.id, nextLesson);
      } else {
        setShowVideoModal(false);
      }
    } else {
      setShowVideoModal(false);
    }
  };

  const openLesson = (moduleId, lesson) => {
    const module = course.modules.find(m => m.id === moduleId);
    const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
    
    if (!isLessonAvailable(moduleId, lesson.id, lessonIndex)) {
      alert("Этот урок пока недоступен. Сначала пройдите предыдущий урок.");
      return;
    }
    
    if (selectedLesson) {
      const currentProgress = progress[selectedLesson.lesson.id];
      if (currentProgress) {
        currentProgress.lastPosition = currentVideoTime;
      }
    }
    
    setSelectedLesson({ moduleId, lesson });
    setShowVideoModal(true);
    setVideoCompleted(false);
    setCurrentVideoTime(0);
  };

  const getRuTubeEmbedUrl = (videoId, autoplay = true) => {
    return `https://rutube.ru/play/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&t=${currentVideoTime}`;
  };

  const getVideoUrl = (lesson, autoplay = true) => {
    return getRuTubeEmbedUrl(lesson.videoId, autoplay);
  };

  const calculateProgress = () => {
    if (!course) return 0;
    
    const completedLessons = Object.keys(progress).filter(id => progress[id]?.completed).length;
    
    return course.totalLessons > 0 ? Math.round((completedLessons / course.totalLessons) * 100) : 0;
  };

  const calculateModuleProgress = (module) => {
    const completedLessons = module.lessons.filter(lesson => progress[lesson.id]?.completed).length;
    return module.lessons.length > 0 ? Math.round((completedLessons / module.lessons.length) * 100) : 0;
  };

  const getProviderIcon = (provider) => {
    switch (provider) {
      case "rutube":
        return (
          <span className="provider-icon rutube" title="RuTube">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.57 14.86c.28.53.28 1.14 0 1.67-.57 1.14-2.29 1.43-3.81 1.43H7.24c-1.52 0-3.24-.29-3.81-1.43-.28-.53-.28-1.14 0-1.67.57-1.14 2.29-1.43 3.81-1.43h9.52c1.52 0 3.24.29 3.81 1.43zM12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8z"/>
            </svg>
          </span>
        );
      default:
        return null;
    }
  };

  if (!course) {
    return <div className="loading">Загрузка курса...</div>;
  }

  return (
    <div className="learning-page">
      <div className="learning-header">
        <button onClick={() => navigate("/profile")} className="back-btn">
          ← Назад к профилю
        </button>
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span className="meta-item">📅 {course.duration}</span>
            <span className="meta-item">📚 {course.totalLessons} уроков</span>
            <span className="meta-item">🏆 {course.modules.length} модуля</span>
          </div>
        </div>
        <div className="course-progress">
          <div className="progress-circle">
            <div className="circle" style={{
              background: `conic-gradient(
                var(--accent-primary) ${calculateProgress() * 3.6}deg,
                var(--bg-secondary) 0deg
              )`
            }}>
              <span>{calculateProgress()}%</span>
            </div>
          </div>
          <p>Прогресс курса</p>
          <div className="progress-stats">
            <span>{Object.keys(progress).filter(id => progress[id]?.completed).length}/{course.totalLessons} уроков</span>
          </div>
        </div>
      </div>

      <div className="modules-container">
        {course.modules.map((module) => {
          const moduleProgress = calculateModuleProgress(module);
          
          return (
            <div key={module.id} className="module-card">
              <div className="module-header">
                <h2 className="module-title">
                  {module.title}
                  <span className="lessons-count">{module.lessons.length} уроков</span>
                </h2>
                <div className="module-progress">
                  <div className="module-progress-bar">
                    <div 
                      className="module-progress-fill"
                      style={{ width: `${moduleProgress}%` }}
                    />
                  </div>
                  <span className="module-progress-percent">{moduleProgress}%</span>
                </div>
              </div>
              
              <div className="lessons-list">
                {module.lessons.map((lesson, index) => {
                  const isCompleted = progress[lesson.id]?.completed || false;
                  const isAvailable = isLessonAvailable(module.id, lesson.id, index);
                  const watchedTime = progress[lesson.id]?.watchedTime || 0;
                  
                  return (
                    <div 
                      key={lesson.id} 
                      className={`lesson-item ${!isAvailable ? 'locked' : ''} ${isCompleted ? 'completed' : ''}`}
                    >
                      <div 
                        className="lesson-info" 
                        onClick={() => isAvailable && openLesson(module.id, lesson)}
                        style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
                      >
                        <div className="lesson-number">
                          {index + 1}
                          {!isAvailable && <span className="lock-icon">🔒</span>}
                        </div>
                        <div className="lesson-content">
                          <div className="lesson-header">
                            <h3>
                              {lesson.title}
                              {getProviderIcon(lesson.provider)}
                            </h3>
                            <div className="lesson-meta">
                              <span className="lesson-duration">{lesson.duration}</span>
                              {watchedTime > 0 && (
                                <span className="watched-time">
                                  Просмотрено: {Math.round(watchedTime / 60)} мин
                                </span>
                              )}
                            </div>
                          </div>
                          
                          {isCompleted && (
                            <div className="completion-status">
                              <span className="completed-badge">✓ Завершено</span>
                              <span className="completion-date">
                                {new Date(progress[lesson.id].completedAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          
                          {!isAvailable && index > 0 && (
                            <div className="lock-message">
                              ⚠️ Сначала пройдите предыдущий урок
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="lesson-actions">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            disabled={!isAvailable}
                            onChange={() => {
                              if (!isCompleted && isAvailable) {
                                openLesson(module.id, lesson);
                              }
                            }}
                            className="lesson-checkbox"
                          />
                          <span className="checkmark"></span>
                        </label>
                        
                        <button 
                          onClick={() => isAvailable && openLesson(module.id, lesson)}
                          disabled={!isAvailable}
                          className={`watch-btn ${!isAvailable ? 'disabled' : ''}`}
                        >
                          {isCompleted ? 'Повторить' : 'Смотреть'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Модальное окно с видео */}
      {showVideoModal && selectedLesson && (
        <div className="video-modal-overlay">
          <div className="video-modal-content">
            <div className="modal-header">
              <div className="modal-title">
                {getProviderIcon(selectedLesson.lesson.provider)}
                <h3>{selectedLesson.lesson.title}</h3>
              </div>
              <button className="modal-close" onClick={() => setShowVideoModal(false)}>×</button>
            </div>
            
            <div className="video-player-container">
              <div className="video-wrapper">
                <iframe
                  ref={iframeRef}
                  src={getVideoUrl(selectedLesson.lesson, true)}
                  title={selectedLesson.lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-frame"
                />
              </div>
              
              <div className="video-info">
                <p>Длительность: {selectedLesson.lesson.duration}</p>
                <p>Провайдер: RuTube</p>
                {progress[selectedLesson.lesson.id]?.lastPosition > 0 && (
                  <p className="resume-info">
                    ↪️ Продолжить с {Math.round(progress[selectedLesson.lesson.id].lastPosition / 60)} мин
                  </p>
                )}
              </div>
              
              <div className="video-controls">
                <div className="progress-tracker">
                  <div className="progress-text">
                    Прогресс: {Math.round((currentVideoTime / (parseInt(selectedLesson.lesson.duration) * 60)) * 100) || 0}%
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button 
                    onClick={() => {
                      if (iframeRef.current) {
                        iframeRef.current.contentWindow.postMessage({ 
                          type: "rutube_player_control", 
                          action: videoCompleted ? "pause" : "play" 
                        }, "*");
                      }
                    }}
                    className="play-control-btn"
                  >
                    {videoCompleted ? '⏸️ Пауза' : '▶️ Воспроизвести'}
                  </button>
                  
                  <button 
                    onClick={() => setVideoCompleted(!videoCompleted)}
                    className={`complete-btn ${videoCompleted ? 'completed' : ''}`}
                  >
                    {videoCompleted ? '✓ Просмотрено' : 'Отметить как просмотренное'}
                  </button>
                  
                  <button 
                    onClick={() => markLessonAsCompleted(selectedLesson.moduleId, selectedLesson.lesson.id, currentVideoTime)}
                    className="next-lesson-btn"
                    disabled={!videoCompleted}
                  >
                    Следующий урок →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;