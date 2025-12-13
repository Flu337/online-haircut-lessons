import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LearningPage.css";

const courseData = {
  1: {
    id: 1,
    title: "Парикмахерский курс 1",
    description: "Полный курс по основам парикмахерского искусства.",
    duration: "4 недели",
    totalLessons: 21,
    modules: [
      {
        id: 1,
        title: "Введение в профессию",
        lessons: [
          {
            id: 1,
            title: "История парикмахерского искусства",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Эволюция стилей",
              description: "Подберите 5 старинных причесок, сравните технику.",
              deadline: "2024-12-20",
              maxFileSize: 50,
              allowedFormats: [".pdf", ".jpg"]
            }
          },
          {
            id: 2,
            title: "Инструменты и их назначение",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Каталог инструментов",
              description: "Создайте короткий каталог с фото каждого инструмента.",
              deadline: "2024-12-21",
              maxFileSize: 4,
              allowedFormats: [".jpg", ".png", ".pdf"]
            }
          },
          {
            id: 3,
            title: "Техника безопасности",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Правила безопасности",
              description: "Напишите список правил и оформите в документе.",
              deadline: "2024-12-21",
              maxFileSize: 3,
              allowedFormats: [".docx", ".pdf"]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Инструменты и материалы",
        lessons: [
          {
            id: 4,
            title: "Ножницы и их виды",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Сравнение ножниц",
              description: "Сравните прямые, филировочные и текстурирующие ножницы.",
              deadline: "2024-12-22",
              maxFileSize: 8,
              allowedFormats: [".jpg", ".png", ".pdf"]
            }
          },
          {
            id: 5,
            title: "Расчески и щетки",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Обзор расчесок",
              description: "Сделайте фото 3 видов расчесок и опишите назначение.",
              deadline: "2024-12-22",
              maxFileSize: 6,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 6,
            title: "Стайлинговые средства",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Каталог средств",
              description: "Соберите 5 популярных средств и составьте таблицу.",
              deadline: "2024-12-23",
              maxFileSize: 10,
              allowedFormats: [".docx", ".jpg", ".png"]
            }
          },
          {
            id: 7,
            title: "Уход за инструментами",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Чистка инструментов",
              description: "Запишите пошаговый процесс ухода за инструментами.",
              deadline: "2024-12-23",
              maxFileSize: 4,
              allowedFormats: [".pdf", ".docx"]
            }
          }
        ]
      },
      {
        id: 3,
        title: "Базовые техники стрижек",
        lessons: [
          {
            id: 8,
            title: "Техника тушевки",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Тушевка на манекене",
              description: "Сделайте фото до/после тушевки.",
              deadline: "2024-12-24",
              maxFileSize: 15,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 9,
            title: "Техника градуировки",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Градуировка",
              description: "Снимите короткое видео выполнения градуировки.",
              deadline: "2024-12-25",
              maxFileSize: 20,
              allowedFormats: [".mp4"]
            }
          },
          {
            id: 10,
            title: "Техника каскада",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Каскадная схема",
              description: "Нарисуйте схему каскадной стрижки.",
              deadline: "2024-12-25",
              maxFileSize: 5,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 11,
            title: "Техника асимметрии",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Асимметричная стрижка",
              description: "Сделайте 3 фото результата с разных ракурсов.",
              deadline: "2024-12-26",
              maxFileSize: 20,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 12,
            title: "Работа с машинкой",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Смена насадок",
              description: "Снимите короткое видео демонстрации 3 насадок.",
              deadline: "2024-12-26",
              maxFileSize: 10,
              allowedFormats: [".mp4"]
            }
          },
          {
            id: 13,
            title: "Финализация стрижки",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Финишная обработка",
              description: "Покажите обработку контуров.",
              deadline: "2024-12-27",
              maxFileSize: 12,
              allowedFormats: [".jpg", ".png", ".mp4"]
            }
          }
        ]
      },
      {
        id: 4,
        title: "Укладки и стайлинг",
        lessons: [
          {
            id: 14,
            title: "Основные виды укладок",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Брашинг",
              description: "Сделайте видео процесса брашинга.",
              deadline: "2024-12-28",
              maxFileSize: 25,
              allowedFormats: [".mp4", ".jpg"]
            }
          },
          {
            id: 15,
            title: "Работа с феном",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Направления потока",
              description: "Снимите фото правильного угла подачи воздуха.",
              deadline: "2024-12-28",
              maxFileSize: 8,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 16,
            title: "Укладка на брашинг",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Работа с объемом",
              description: "Покажите приемы создания объема у корня.",
              deadline: "2024-12-29",
              maxFileSize: 10,
              allowedFormats: [".mp4", ".jpg"]
            }
          },
          {
            id: 17,
            title: "Вечерние прически",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Вечерний образ",
              description: "Сделайте фото прически в 4 ракурсах.",
              deadline: "2024-12-29",
              maxFileSize: 12,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 18,
            title: "Создание локонов",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Локоны",
              description: "Сделайте фото до/после накрутки.",
              deadline: "2024-12-30",
              maxFileSize: 15,
              allowedFormats: [".jpg"]
            }
          }
        ]
      },
      {
        id: 5,
        title: "Работа с клиентами",
        lessons: [
          {
            id: 19,
            title: "Консультация клиента",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Диалог",
              description: "Запишите короткий аудио-диалог консультации.",
              deadline: "2024-12-30",
              maxFileSize: 5,
              allowedFormats: [".mp3", ".pdf"]
            }
          },
          {
            id: 20,
            title: "Подбор стрижки по типу лица",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Таблица подборов",
              description: "Создайте таблицу: тип лица → подходящие стрижки.",
              deadline: "2024-12-30",
              maxFileSize: 6,
              allowedFormats: [".pdf", ".docx"]
            }
          },
          {
            id: 21,
            title: "Заключительный этап обслуживания",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Полный сервис",
              description: "Задокументируйте полный цикл работы с клиентом.",
              deadline: "2024-12-31",
              maxFileSize: 30,
              allowedFormats: [".jpg", ".mp4", ".pdf"]
            }
          }
        ]
      }
    ]
  },

  2: {
    id: 2,
    title: "Стрижки и укладки",
    description: "Продвинутый курс по техникам стрижек.",
    duration: "3 недели",
    totalLessons: 11,
    modules: [
      {
        id: 1,
        title: "Мужские стрижки",
        lessons: [
          {
            id: 1,
            title: "Классическая мужская стрижка",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Классика",
              description: "Фото до/после, описание техники.",
              deadline: "2024-12-27",
              maxFileSize: 15,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 2,
            title: "Модные тенденции 2024",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Тенденции",
              description: "Подборка 5 трендов в мужских стрижках.",
              deadline: "2024-12-28",
              maxFileSize: 8,
              allowedFormats: [".pdf"]
            }
          },
          {
            id: 3,
            title: "Стрижка канадка",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Канадка",
              description: "Видео выполнения стрижки.",
              deadline: "2024-12-28",
              maxFileSize: 20,
              allowedFormats: [".mp4"]
            }
          },
          {
            id: 4,
            title: "Фейд и текстурирование",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Фейд",
              description: "Фото с разных ракурсов.",
              deadline: "2024-12-29",
              maxFileSize: 18,
              allowedFormats: [".jpg", ".png"]
            }
          },
          {
            id: 5,
            title: "Борода и усы",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Моделирование бороды",
              description: "Покажите линию окантовки.",
              deadline: "2024-12-29",
              maxFileSize: 10,
              allowedFormats: [".jpg"]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Женские стрижки",
        lessons: [
          {
            id: 6,
            title: "Короткие женские стрижки",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Короткая стрижка",
              description: "Документируйте этапы выполнения.",
              deadline: "2024-12-30",
              maxFileSize: 20,
              allowedFormats: [".jpg", ".mp4"]
            }
          },
          {
            id: 7,
            title: "Стрижки на средние волосы",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Средняя длина",
              description: "Фото схемы срезов.",
              deadline: "2024-12-30",
              maxFileSize: 6,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 8,
            title: "Длинные волосы: техники",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Работа с длиной",
              description: "Покажите градуировку на длинных волосах.",
              deadline: "2024-12-31",
              maxFileSize: 14,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 9,
            title: "Челки и их виды",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Челки",
              description: "Фото 3 видов челок на манекене.",
              deadline: "2024-12-31",
              maxFileSize: 10,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 10,
            title: "Асимметричные стрижки",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Асимметрия длинных волос",
              description: "Сделайте фото до/после.",
              deadline: "2024-12-31",
              maxFileSize: 22,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 11,
            title: "Многослойные стрижки",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Слои",
              description: "Нарисуйте схему уровней срезов.",
              deadline: "2024-12-31",
              maxFileSize: 5,
              allowedFormats: [".jpg", ".png"]
            }
          }
        ]
      }
    ]
  },

  3: {
    id: 3,
    title: "Колористика",
    description: "Курс по современным техникам окрашивания.",
    duration: "2 недели",
    totalLessons: 8,
    modules: [
      {
        id: 1,
        title: "Основы цветоведения",
        lessons: [
          {
            id: 1,
            title: "Цветовой круг",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Цветовой круг",
              description: "Нарисуйте цветовой круг вручную.",
              deadline: "2024-12-22",
              maxFileSize: 10,
              allowedFormats: [".jpg", ".pdf"]
            }
          },
          {
            id: 2,
            title: "Теплые и холодные тона",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Тональность",
              description: "Сравните 6 оттенков по теплоте.",
              deadline: "2024-12-22",
              maxFileSize: 6,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 3,
            title: "Нюансы и полутона",
            videoId: "761d5f177b954eb2c72302e8c79f604c",
            homework: {
              title: "Полутона",
              description: "Создайте таблицу градаций оттенков.",
              deadline: "2024-12-23",
              maxFileSize: 8,
              allowedFormats: [".pdf"]
            }
          },
          {
            id: 4,
            title: "Сочетаемость цветов",
            videoId: "22a315582fceb6b9d8b090ff114e2c0e",
            homework: {
              title: "Цветовые пары",
              description: "Подберите 5 гармоничных комбинаций.",
              deadline: "2024-12-23",
              maxFileSize: 8,
              allowedFormats: [".pdf", ".jpg"]
            }
          }
        ]
      },
      {
        id: 2,
        title: "Техники окрашивания",
        lessons: [
          {
            id: 5,
            title: "Однотонное окрашивание",
            videoId: "b5fa54f8ebf91ebcb1f2bf9142965f21",
            homework: {
              title: "Однотон",
              description: "Фото до/после окрашивания.",
              deadline: "2024-12-24",
              maxFileSize: 25,
              allowedFormats: [".jpg", ".mp4"]
            }
          },
          {
            id: 6,
            title: "Мелирование",
            videoId: "7fdee7a0c7015795c78c5156c72d0f13",
            homework: {
              title: "Мелирование",
              description: "Покажите 3 зоны мелирования.",
              deadline: "2024-12-24",
              maxFileSize: 10,
              allowedFormats: [".jpg"]
            }
          },
          {
            id: 7,
            title: "Омбре и балаяж",
            videoId: "5e4df2c486930ff8a635f9162ec42a16",
            homework: {
              title: "Омбре",
              description: "Документируйте процесс окрашивания.",
              deadline: "2024-12-25",
              maxFileSize: 30,
              allowedFormats: [".mp4", ".jpg"]
            }
          },
          {
            id: 8,
            title: "Шатуш и сомбре",
            videoId: "dd498f64455d419be5d75fae2b42f345",
            homework: {
              title: "Шатуш",
              description: "Сделайте фото результата.",
              deadline: "2024-12-25",
              maxFileSize: 18,
              allowedFormats: [".jpg"]
            }
          }
        ]
      }
    ]
  }
};

const LearningPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState({});
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isLessonCompleted, setIsLessonCompleted] = useState(false);

  const [showHomework, setShowHomework] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [comment, setComment] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [homeworkStatus, setHomeworkStatus] = useState("not_started");
  const [uploadedHomework, setUploadedHomework] = useState(null);

  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  
  const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

  const getProtectedVideoUrl = async (courseId, lessonId) => {
    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user'));
      
      if (!token || !user) {
        throw new Error('Требуется авторизация');
      }
      
      const response = await axios.get(
        `${API_BASE_URL}/video/${courseId}/${lessonId}/video-token`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          timeout: 10000
        }
      );

      if (response.data.success && response.data.videoUrl) {
        return response.data.videoUrl;
      } else {
        throw new Error('Не удалось получить защищенное видео');
      }
    } catch (error) {
      console.error('❌ Ошибка получения защищенного видео:', error);
      
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Используем fallback URL для разработки');
        const lesson = courseData[courseId]?.modules
          .flatMap(m => m.lessons)
          .find(l => l.id === parseInt(lessonId));
        
        if (lesson?.videoId) {
          return `https://rutube.ru/play/embed/${lesson.videoId}`;
        }
      }
      
      throw error;
    }
  };

  useEffect(() => {
    const checkCourseAccess = async () => {
      try {
        const savedCourses = JSON.parse(localStorage.getItem('userCourses')) || [];
        const currentCourse = savedCourses.find(c => c.id === parseInt(courseId));
        
        if (!currentCourse || !currentCourse.paid) {
          alert('Сначала оплатите курс!');
          navigate("/profile");
          return false;
        }
        
        const token = localStorage.getItem('authToken');
        if (token) {
          const response = await axios.get(
            `${API_BASE_URL}/courses/${courseId}/access`,
            {
              headers: {
                Authorization: `Bearer ${token}`
              },
              timeout: 5000
            }
          );
          
          if (!response.data?.hasAccess) {
            alert('Доступ к курсу запрещен или истек!');
            navigate("/profile");
            return false;
          }
        }
        
        return true;
      } catch (error) {
        console.error('Ошибка проверки доступа:', error);
        const savedCourses = JSON.parse(localStorage.getItem('userCourses')) || [];
        const currentCourse = savedCourses.find(c => c.id === parseInt(courseId));
        return !(!currentCourse || !currentCourse.paid);
      }
    };

    const course = courseData[courseId];
    if (!course) {
      alert('Курс не найден!');
      navigate("/profile");
      return;
    }

    const init = async () => {
      const hasAccess = await checkCourseAccess();
      if (!hasAccess) return;
      
      setCourse(course);
      await loadProgressFromServer();
      
      const savedProgress = JSON.parse(localStorage.getItem(`course_progress_${courseId}`)) || {};
      setProgress(savedProgress);
    };

    init();
  }, [courseId, navigate]);

  const loadProgressFromServer = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/courses/${courseId}/progress`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 5000
      });
      
      if (response.data.success) {
        setProgress(response.data.progress);
        localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(response.data.progress));
      }
    } catch (error) {
      console.error('Ошибка при загрузке прогресса:', error);
    }
  };

  const loadHomeworkFromServer = async (lessonId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/homework/${courseId}/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        timeout: 5000
      });
      
      if (response.data.success && response.data.homework) {
        setUploadedHomework(response.data.homework);
        setHomeworkStatus(response.data.homework.status || "uploaded");
      } else {
        setUploadedHomework(null);
        setHomeworkStatus("not_started");
      }
    } catch (error) {
      console.error('Ошибка при загрузке домашнего задания:', error);
      const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
      if (savedHomework[lessonId]) {
        setUploadedHomework(savedHomework[lessonId]);
        setHomeworkStatus("uploaded");
      } else {
        setUploadedHomework(null);
        setHomeworkStatus("not_started");
      }
    }
  };

  useEffect(() => {
    if (selectedLesson && selectedLesson.lesson) {
      loadHomeworkFromServer(selectedLesson.lesson.id);
    }
  }, [selectedLesson, courseId]);

  const isLessonAvailable = (moduleId, lessonId, lessonIndex) => {
    if (progress[lessonId]?.completed) {
      return true;
    }
    
    const module = course.modules.find(m => m.id === moduleId);
    if (!module) return false;
    
    if (lessonIndex === 0) {
      return true;
    }
    
    const previousLesson = module.lessons[lessonIndex - 1];
    return progress[previousLesson.id]?.completed === true;
  };

  const markLessonAsCompleted = async (moduleId, lessonId) => {
    const newProgress = {
      ...progress,
      [lessonId]: {
        completed: true,
        completedAt: new Date().toISOString(),
        watchedTime: 0
      }
    };
    
    setProgress(newProgress);
    localStorage.setItem(`course_progress_${courseId}`, JSON.stringify(newProgress));
    setIsLessonCompleted(true);

    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user'));
      
      await axios.post(
        `${API_BASE_URL}/courses/progress`,
        {
          courseId,
          lessonId,
          completed: true,
          completedAt: new Date().toISOString(),
          userId: user?.id || 'unknown'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
    } catch (error) {
      console.error('Ошибка при сохранении прогресса на сервер:', error);
    }
  };

  const openLesson = async (moduleId, lesson) => {
    const module = course.modules.find(m => m.id === moduleId);
    const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
    
    if (!isLessonAvailable(moduleId, lesson.id, lessonIndex)) {
      alert('Сначала завершите предыдущий урок!');
      return;
    }

    setSelectedLesson({ moduleId, lesson });
    setShowVideoModal(true);
    setIsLessonCompleted(progress[lesson.id]?.completed || false);
    setShowHomework(false);
    setFile(null);
    setFileName("");
    setComment("");
    setUploadProgress(0);
    setIsUploading(false);
    setVideoError(false);
    setCurrentVideoUrl(null);

    try {
      setVideoLoading(true);
      const protectedUrl = await getProtectedVideoUrl(courseId, lesson.id);
      setCurrentVideoUrl(protectedUrl);
    } catch (error) {
      console.error('Ошибка загрузки видео:', error);
      setVideoError(true);
      alert('Не удалось загрузить видео. Проверьте доступ к курсу и подключение к интернету.');
    } finally {
      setVideoLoading(false);
    }

    loadHomeworkFromServer(lesson.id);
  };

  const getNextLesson = () => {
    if (!selectedLesson || !course) return null;
    
    const currentModuleIndex = course.modules.findIndex(m => m.id === selectedLesson.moduleId);
    const currentModule = course.modules[currentModuleIndex];
    const currentLessonIndex = currentModule.lessons.findIndex(l => l.id === selectedLesson.lesson.id);
    
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      const nextLesson = currentModule.lessons[currentLessonIndex + 1];
      if (isLessonAvailable(selectedLesson.moduleId, nextLesson.id, currentLessonIndex + 1)) {
        return { lesson: nextLesson, moduleId: selectedLesson.moduleId };
      }
    } else if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      if (nextModule.lessons.length > 0) {
        const nextLesson = nextModule.lessons[0];
        return { lesson: nextLesson, moduleId: nextModule.id };
      }
    }
    
    return null;
  };

  const goToNextLesson = async () => {
    if (!isLessonCompleted) {
      alert('Сначала отметьте этот урок как просмотренный!');
      return;
    }
    
    const nextLesson = getNextLesson();
    
    if (nextLesson) {
      setSelectedLesson({ moduleId: nextLesson.moduleId, lesson: nextLesson.lesson });
      setIsLessonCompleted(progress[nextLesson.lesson.id]?.completed || false);
      setShowHomework(false);
      setFile(null);
      setFileName("");
      setComment("");
      setUploadProgress(0);
      setIsUploading(false);
      setVideoError(false);
      setCurrentVideoUrl(null);

      try {
        setVideoLoading(true);
        const protectedUrl = await getProtectedVideoUrl(courseId, nextLesson.lesson.id);
        setCurrentVideoUrl(protectedUrl);
      } catch (error) {
        console.error('Ошибка загрузки видео:', error);
        setVideoError(true);
        alert('Не удалось загрузить видео для следующего урока.');
      } finally {
        setVideoLoading(false);
      }

      loadHomeworkFromServer(nextLesson.lesson.id);
    } else {
      setShowVideoModal(false);
      alert('🎉 Поздравляем! Вы завершили курс!');
    }
  };

  const calculateProgress = () => {
    if (!course) return 0;
    const completedLessons = Object.keys(progress).filter(id => progress[id]?.completed).length;
    return course.totalLessons > 0 ? Math.round((completedLessons / course.totalLessons) * 100) : 0;
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    const maxSize = selectedLesson?.lesson?.homework?.maxFileSize || 10;
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`Файл слишком большой. Максимальный размер: ${maxSize}MB`);
      return;
    }
    

    const allowedFormats = selectedLesson?.lesson?.homework?.allowedFormats || [".jpg", ".jpeg", ".png", ".pdf"];
    const fileExtension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedFormats.includes(fileExtension)) {
      alert(`Неподдерживаемый формат. Разрешенные форматы: ${allowedFormats.join(', ')}`);
      return;
    }
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const uploadHomework = async () => {
    if (!file) {
      alert("Пожалуйста, выберите файл для загрузки");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const token = localStorage.getItem('authToken');
      const user = JSON.parse(localStorage.getItem('user'));
      
      const formData = new FormData();
      formData.append('homeworkFile', file);
      formData.append('lessonId', selectedLesson.lesson.id);
      formData.append('courseId', courseId);
      formData.append('comment', comment);
      formData.append('userId', user?.id || 'unknown');
      formData.append('homeworkTitle', selectedLesson.lesson.homework.title);
      formData.append('deadline', selectedLesson.lesson.homework.deadline);

      const response = await axios.post(
        `${API_BASE_URL}/homework/upload`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 100)
            );
            setUploadProgress(percentCompleted);
          }
        }
      );

      if (response.data.success) {
        const homeworkData = {
          id: response.data.homeworkId || Date.now(),
          lessonId: selectedLesson.lesson.id,
          fileName: file.name,
          fileSize: (file.size / (1024 * 1024)).toFixed(2),
          comment: comment,
          uploadedAt: new Date().toISOString(),
          status: "pending_review",
          serverId: response.data.fileId,
          fileUrl: response.data.fileUrl
        };

        const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
        savedHomework[selectedLesson.lesson.id] = homeworkData;
        localStorage.setItem(`homework_${courseId}`, JSON.stringify(savedHomework));

        setUploadedHomework(homeworkData);
        setHomeworkStatus("pending_review");
        setFile(null);
        setFileName("");
        setComment("");
        setUploadProgress(100);

        setTimeout(() => {
          setUploadProgress(0);
          setIsUploading(false);
        }, 1000);

        alert("✅ Домашнее задание успешно загружено!");
      } else {
        throw new Error(response.data.message || "Ошибка при загрузке");
      }

    } catch (error) {
      setIsUploading(false);
      console.error('Upload error:', error);
      
      if (error.response) {
        switch (error.response.status) {
          case 401:
            alert("❌ Ошибка авторизации. Пожалуйста, войдите снова.");
            break;
          case 413:
            alert("❌ Файл слишком большой. Уменьшите размер файла.");
            break;
          case 415:
            alert("❌ Неподдерживаемый формат файла.");
            break;
          default:
            alert(`❌ Ошибка при загрузке файла: ${error.response.data.message || 'Попробуйте еще раз.'}`);
        }
      } else if (error.request) {
        alert("❌ Не удалось соединиться с сервером. Проверьте подключение к интернету.");
      } else {
        alert("❌ Ошибка при загрузке файла. Попробуйте еще раз.");
      }
    }
  };

  const deleteHomework = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить загруженное домашнее задание?")) {
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      
      await axios.delete(
        `${API_BASE_URL}/homework/${courseId}/${selectedLesson.lesson.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
      delete savedHomework[selectedLesson.lesson.id];
      localStorage.setItem(`homework_${courseId}`, JSON.stringify(savedHomework));
      
      setUploadedHomework(null);
      setHomeworkStatus("not_started");
      setFile(null);
      setFileName("");
      setComment("");
      
      alert("✅ Домашнее задание удалено!");
    } catch (error) {
      console.error('Delete error:', error);
      
      const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
      delete savedHomework[selectedLesson.lesson.id];
      localStorage.setItem(`homework_${courseId}`, JSON.stringify(savedHomework));
      
      setUploadedHomework(null);
      setHomeworkStatus("not_started");
      setFile(null);
      setFileName("");
      setComment("");
      
      alert("✅ Домашнее задание удалено локально. При повторной загрузке оно будет отправлено на сервер.");
    }
  };

  const viewHomeworkFile = () => {
    if (uploadedHomework?.fileUrl) {
      window.open(uploadedHomework.fileUrl, '_blank');
    } else {
      alert("⚠️ Ссылка на файл недоступна");
    }
  };

  if (!course) {
    return <div className="loading">Загрузка курса...</div>;
  }

  return (
    <div className="learning-page">
      {/* Заголовок и прогресс */}
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
        </div>
      </div>

      {/* Список модулей и уроков */}
      <div className="modules-container">
        {course.modules.map((module) => (
          <div key={module.id} className="module-card">
            <h2 className="module-title">{module.title}</h2>
            
            <div className="lessons-list">
              {module.lessons.map((lesson, index) => {
                const isCompleted = progress[lesson.id]?.completed || false;
                const isAvailable = isLessonAvailable(module.id, lesson.id, index);
                
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
                        <h3>{lesson.title}</h3>
                        
                        {isCompleted && (
                          <div className="completion-status">
                            <span className="completed-badge">✓ Завершено</span>
                          </div>
                        )}
                        
                        {lesson.homework && (
                          <div className="homework-indicator">
                            <span className="homework-icon">📝</span>
                            <span className="homework-text">Есть домашнее задание</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="lesson-actions">
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
        ))}
      </div>

      {/* Модальное окно с видео и домашним заданием */}
      {showVideoModal && selectedLesson && (
        <div className="video-modal-overlay" onClick={() => setShowVideoModal(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedLesson.lesson.title}</h3>
              <button className="modal-close" onClick={() => setShowVideoModal(false)}>×</button>
            </div>
            
            <div className="video-player-container">
              {/* Видеоплеер с защищенным URL */}
              <div className="video-wrapper">
                {videoLoading ? (
                  <div className="video-loading">
                    <div className="spinner"></div>
                    <p>Загрузка защищенного видео...</p>
                  </div>
                ) : videoError ? (
                  <div className="video-error">
                    <p>⚠️ Видео недоступно</p>
                    <p className="error-description">Не удалось загрузить защищенное видео</p>
                    <button 
                      onClick={() => openLesson(selectedLesson.moduleId, selectedLesson.lesson)}
                      className="retry-btn"
                    >
                      Попробовать снова
                    </button>
                  </div>
                ) : currentVideoUrl ? (
                  <iframe
                    src={currentVideoUrl}
                    title={selectedLesson.lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-frame"
                    frameBorder="0"
                    key={currentVideoUrl} 
                  />
                ) : (
                  <div className="video-error">
                    <p>⚠️ Видео не загружено</p>
                    <button 
                      onClick={() => openLesson(selectedLesson.moduleId, selectedLesson.lesson)}
                      className="retry-btn"
                    >
                      Загрузить видео
                    </button>
                  </div>
                )}
              </div>
              
              {/* Контролы видео */}
              <div className="video-controls">
                <div className="action-buttons">
                  <button 
                    onClick={() => markLessonAsCompleted(selectedLesson.moduleId, selectedLesson.lesson.id)}
                    disabled={isLessonCompleted}
                    className={`complete-btn ${isLessonCompleted ? 'completed' : ''}`}
                  >
                    {isLessonCompleted ? '✅ Просмотрено' : '📌 Отметить как просмотренное'}
                  </button>
                  
                  {getNextLesson() && (
                    <button 
                      onClick={goToNextLesson}
                      disabled={!isLessonCompleted}
                      className={`next-lesson-btn ${!isLessonCompleted ? 'disabled' : ''}`}
                    >
                      Следующий урок →
                    </button>
                  )}
                </div>
              </div>
              
              {/* Кнопка для домашнего задания */}
              {selectedLesson.lesson.homework && (
                <div className="homework-section">
                  <button 
                    onClick={() => setShowHomework(!showHomework)}
                    className="homework-toggle-btn"
                  >
                    {showHomework ? '📕 Скрыть домашнее задание' : '📘 Показать домашнее задание'}
                  </button>
                  
                  {showHomework && (
                    <div className="homework-container">
                      <div className="homework-info">
                        <h4>📝 {selectedLesson.lesson.homework.title}</h4>
                        <p className="homework-description">{selectedLesson.lesson.homework.description}</p>
                        
                        <div className="homework-details">
                          <div className="detail-item">
                            <span className="detail-label">Срок сдачи:</span>
                            <span className="detail-value">
                              {new Date(selectedLesson.lesson.homework.deadline).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Макс. размер:</span>
                            <span className="detail-value">
                              {selectedLesson.lesson.homework.maxFileSize} MB
                            </span>
                          </div>
                          <div className="detail-item">
                            <span className="detail-label">Форматы:</span>
                            <span className="detail-value">
                              {selectedLesson.lesson.homework.allowedFormats.join(', ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Форма загрузки домашнего задания */}
                      {homeworkStatus === "not_started" || homeworkStatus === "rejected" ? (
                        <div className="homework-upload-form">
                          <div className="file-upload-area">
                            <input
                              type="file"
                              id="homework-file"
                              onChange={handleFileSelect}
                              className="file-input"
                              accept={selectedLesson.lesson.homework.allowedFormats.join(',')}
                            />
                            <label htmlFor="homework-file" className="file-upload-label">
                              <div className="upload-icon">📎</div>
                              <div className="upload-text">
                                <div>Нажмите для выбора файла</div>
                                <div className="upload-hint">
                                  или перетащите файл сюда
                                </div>
                              </div>
                            </label>
                            
                            {fileName && (
                              <div className="file-preview">
                                <span className="file-name">{fileName}</span>
                                <button 
                                  onClick={() => {
                                    setFile(null);
                                    setFileName("");
                                  }}
                                  className="remove-file-btn"
                                >
                                  ✕
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <div className="comment-section">
                            <label htmlFor="homework-comment" className="comment-label">
                              Комментарий к работе (опционально):
                            </label>
                            <textarea
                              id="homework-comment"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                              placeholder="Опишите вашу работу, задайте вопросы преподавателю..."
                              rows="4"
                              className="comment-textarea"
                            />
                          </div>
                          
                          {isUploading && (
                            <div className="upload-progress">
                              <div 
                                className="progress-bar"
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                              <span className="progress-text">{uploadProgress}%</span>
                            </div>
                          )}
                          
                          <button 
                            onClick={uploadHomework}
                            disabled={!file || isUploading}
                            className="upload-homework-btn"
                          >
                            {isUploading ? '📤 Загрузка...' : '📤 Загрузить домашнее задание'}
                          </button>
                        </div>
                      ) : (
                        
                        <div className="uploaded-homework">
                          <div className="uploaded-header">
                            <h5>
                              {homeworkStatus === "approved" ? '✅ Задание проверено' : 
                               homeworkStatus === "rejected" ? '❌ Требуется доработка' : 
                               '⏳ Ожидает проверки'}
                            </h5>
                            <span className="upload-date">
                              {new Date(uploadedHomework.uploadedAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="uploaded-details">
                            <div className="detail-item">
                              <span className="detail-label">Файл:</span>
                              <span className="detail-value">{uploadedHomework.fileName}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Размер:</span>
                              <span className="detail-value">{uploadedHomework.fileSize} MB</span>
                            </div>
                            {uploadedHomework.comment && (
                              <div className="detail-item">
                                <span className="detail-label">Комментарий:</span>
                                <span className="detail-value">{uploadedHomework.comment}</span>
                              </div>
                            )}
                            <div className="detail-item">
                              <span className="detail-label">Статус:</span>
                              <span className={`detail-value status-${uploadedHomework.status || 'uploaded'}`}>
                                {uploadedHomework.status === "approved" ? "Принято" : 
                                 uploadedHomework.status === "rejected" ? "Требует доработки" : 
                                 "Ожидает проверки"}
                              </span>
                            </div>
                            {uploadedHomework.feedback && (
                              <div className="detail-item">
                                <span className="detail-label">Обратная связь:</span>
                                <span className="detail-value feedback">{uploadedHomework.feedback}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="uploaded-actions">
                            {uploadedHomework.fileUrl && (
                              <button onClick={viewHomeworkFile} className="view-homework-btn">
                                📄 Просмотреть файл
                              </button>
                            )}
                            <button 
                              onClick={deleteHomework}
                              className="delete-homework-btn"
                            >
                              🗑️ Удалить
                            </button>
                            {homeworkStatus === "rejected" && (
                              <button 
                                onClick={() => {
                                  setHomeworkStatus("not_started");
                                  setUploadedHomework(null);
                                }}
                                className="reupload-homework-btn"
                              >
                                📤 Загрузить исправленную версию
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningPage;