import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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


const apiService = {
 
  async getCourseProgress(username, courseId) {
    console.log(`📡 API: Получение прогресса для курса ${courseId} пользователя ${username}`);
    
 
    await new Promise(resolve => setTimeout(resolve, 100));
    

    const progressKey = `course_progress_${username}_${courseId}`;
    const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
    

    
    return savedProgress;
  },

  async saveLessonProgress(username, courseId, lessonId, progressData) {
    console.log(` API: Сохранение прогресса урока ${lessonId}`);
    

    await new Promise(resolve => setTimeout(resolve, 300));

    const progressKey = `course_progress_${username}_${courseId}`;
    const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
    savedProgress[lessonId] = progressData;
    localStorage.setItem(progressKey, JSON.stringify(savedProgress));
    

    
    return { success: true, message: "Прогресс сохранен" };
  },

  async uploadHomework(username, courseId, lessonId, homeworkData) {
    console.log(`📡 API: Загрузка домашнего задания для урока ${lessonId}`);

    await new Promise(resolve => setTimeout(resolve, 500));

    const homeworkKey = `homework_${username}_${courseId}_${lessonId}`;
    localStorage.setItem(homeworkKey, JSON.stringify(homeworkData));
    

    
    return { 
      success: true, 
      message: "Домашнее задание загружено", 
      homeworkId: Date.now(),
      fileUrl: "https://api.example.com/files/" + homeworkData.fileName 
    };
  },

  async getHomework(username, courseId, lessonId) {
    console.log(`📡 API: Получение домашнего задания урока ${lessonId}`);
    

    await new Promise(resolve => setTimeout(resolve, 100));

    const homeworkKey = `homework_${username}_${courseId}_${lessonId}`;
    const savedHomework = JSON.parse(localStorage.getItem(homeworkKey));
    

    
    return savedHomework;
  },

  async deleteHomework(username, courseId, lessonId) {
    console.log(`📡 API: Удаление домашнего задания урока ${lessonId}`);
    

    await new Promise(resolve => setTimeout(resolve, 300));
    

    const homeworkKey = `homework_${username}_${courseId}_${lessonId}`;
    localStorage.removeItem(homeworkKey);
    

    
    return { success: true, message: "Домашнее задание удалено" };
  },


  async getCourse(courseId) {
    console.log(`📡 API: Получение информации о курсе ${courseId}`);
    
    await new Promise(resolve => setTimeout(resolve, 200));
    

    const course = courseData[courseId];
    

    
    return course;
  },
  async updateUserCourseProgress(username, courseId, progress, isCompleted) {
    console.log(`📡 API: Обновление прогресса курса ${courseId}`);

    await new Promise(resolve => setTimeout(resolve, 200));
    
    const userCoursesKey = `courses_${username}`;
    const savedCourses = JSON.parse(localStorage.getItem(userCoursesKey)) || [];
    
    const updatedCourses = savedCourses.map(c => {
      if (c.id == courseId) {
        return {
          ...c,
          progress,
          completed: isCompleted
        };
      }
      return c;
    });
    
    localStorage.setItem(userCoursesKey, JSON.stringify(updatedCourses));

    
    return { success: true };
  },

  async createCertificate(username, certificateData) {
    console.log(`📡 API: Создание сертификата для курса ${certificateData.courseId}`);
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const certificatesKey = `certificates_${username}`;
    const savedCertificates = JSON.parse(localStorage.getItem(certificatesKey)) || [];

    if (!savedCertificates.some(c => c.courseId == certificateData.courseId)) {
      savedCertificates.push(certificateData);
      localStorage.setItem(certificatesKey, JSON.stringify(savedCertificates));
    }

    
    return { 
      success: true, 
      certificateId: certificateData.id,
      downloadUrl: `https://api.example.com/certificates/${certificateData.id}`
    };
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
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const [currentVideoUrl, setCurrentVideoUrl] = useState(null);
  
  useEffect(() => {
    const loadCourse = async () => {
      setIsLoading(true);
      setApiError(null);
      
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
          alert('Войдите в систему!');
          navigate("/");
          return;
        }

        const userCoursesKey = `courses_${userData.username}`;
        const savedCourses = JSON.parse(localStorage.getItem(userCoursesKey)) || [];
        const currentCourse = savedCourses.find(c => c.id === parseInt(courseId));
        
        if (!currentCourse || !currentCourse.paid) {
          alert('Сначала оплатите курс!');
          navigate("/profile");
          return;
        }


        const courseData = await apiService.getCourse(courseId);
        if (!courseData) {
          alert('Курс не найден!');
          navigate("/profile");
          return;
        }
        
        setCourse(courseData);
        

        const savedProgress = await apiService.getCourseProgress(userData.username, courseId);
        setProgress(savedProgress);
        
        console.log(' Курс загружен:', courseData.title);
        console.log(' Прогресс загружен:', savedProgress);
      } catch (error) {
        console.error(' Ошибка загрузки курса:', error);
        setApiError('Ошибка загрузки данных курса. Попробуйте позже.');
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCourse();
  }, [courseId, navigate]);

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
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    
    setIsLoading(true);
    setApiError(null);
    
    try {
      const progressData = {
        completed: true,
        completedAt: new Date().toISOString(),
        watchedTime: 0
      };
      
      const result = await apiService.saveLessonProgress(
        userData.username, 
        courseId, 
        lessonId, 
        progressData
      );
      
      if (result.success) {
        const newProgress = {
          ...progress,
          [lessonId]: progressData
        };
        
        setProgress(newProgress);
        setIsLessonCompleted(true);
        
        const completedLessons = Object.values(newProgress).filter(lesson => lesson.completed).length;
        const totalLessons = course.totalLessons;
        const courseProgress = Math.round((completedLessons / totalLessons) * 100);
        const isCourseCompleted = courseProgress === 100;
        
        await apiService.updateUserCourseProgress(
          userData.username, 
          courseId, 
          courseProgress, 
          isCourseCompleted
        );
        
        if (isCourseCompleted) {
          const certificate = {
            id: Date.now(),
            courseId: courseId,
            courseTitle: course.title,
            userName: userData.username,
            issueDate: new Date().toISOString(),
            progress: 100
          };
          
          await apiService.createCertificate(userData.username, certificate);
          
          if (getNextLesson() === null) {
            setTimeout(() => {
              alert('🎉 Поздравляем! Вы успешно завершили курс! Сертификат добавлен в ваш профиль.');
            }, 500);
          }
        }
        
        console.log(' Урок отмечен как завершенный:', lessonId);
      } else {
        throw new Error('Ошибка сохранения прогресса');
      }
    } catch (error) {
      console.error('❌ Ошибка сохранения прогресса:', error);
      setApiError('Ошибка сохранения прогресса. Попробуйте снова.');
    } finally {
      setIsLoading(false);
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
    setApiError(null);
    
    if (lesson.videoId) {
      setCurrentVideoUrl(`https://rutube.ru/play/embed/${lesson.videoId}`);
    } else {
      setCurrentVideoUrl(null);
    }
    
    await loadHomework(lesson.id);
  };

  const loadHomework = async (lessonId) => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) return;
    
    try {

      const savedHomework = await apiService.getHomework(
        userData.username, 
        courseId, 
        lessonId
      );
      
      if (savedHomework) {
        setUploadedHomework(savedHomework);
        setHomeworkStatus(savedHomework.status || "uploaded");
      } else {
        setUploadedHomework(null);
        setHomeworkStatus("not_started");
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки домашнего задания:', error);
    }
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

  const goToNextLesson = () => {
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
      setApiError(null);
      
      if (nextLesson.lesson.videoId) {
        setCurrentVideoUrl(`https://rutube.ru/play/embed/${nextLesson.lesson.videoId}`);
      } else {
        setCurrentVideoUrl(null);
      }
      
      loadHomework(nextLesson.lesson.id);
    } else {
      setShowVideoModal(false);
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
    setApiError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) throw new Error('Пользователь не найден');

      const homeworkData = {
        id: Date.now(),
        lessonId: selectedLesson.lesson.id,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2),
        comment: comment,
        uploadedAt: new Date().toISOString(),
        status: "pending_review"
      };


      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(interval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);


      const result = await apiService.uploadHomework(
        userData.username,
        courseId,
        selectedLesson.lesson.id,
        homeworkData
      );

      clearInterval();
      setUploadProgress(100);

      if (result.success) {
        setUploadedHomework({ ...homeworkData, ...result });
        setHomeworkStatus("pending_review");
        setFile(null);
        setFileName("");
        setComment("");
        
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
          alert("✅ Домашнее задание успешно загружено!");
        }, 500);
      } else {
        throw new Error('Ошибка загрузки домашнего задания');
      }
    } catch (error) {
      console.error('❌ Ошибка загрузки домашнего задания:', error);
      setApiError('Ошибка загрузки файла. Попробуйте снова.');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const deleteHomework = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить загруженное домашнее задание?")) {
      return;
    }

    setIsLoading(true);
    setApiError(null);

    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) throw new Error('Пользователь не найден');

      const result = await apiService.deleteHomework(
        userData.username,
        courseId,
        selectedLesson.lesson.id
      );

      if (result.success) {
        setUploadedHomework(null);
        setHomeworkStatus("not_started");
        setFile(null);
        setFileName("");
        setComment("");
        
        alert("✅ Домашнее задание удалено!");
      } else {
        throw new Error('Ошибка удаления домашнего задания');
      }
    } catch (error) {
      console.error('❌ Ошибка удаления домашнего задания:', error);
      setApiError('Ошибка удаления файла. Попробуйте снова.');
    } finally {
      setIsLoading(false);
    }
  };

  const viewHomeworkFile = () => {
    if (uploadedHomework?.fileName) {
      alert(`📄 Файл: ${uploadedHomework.fileName}\n📏 Размер: ${uploadedHomework.fileSize} MB\n📅 Дата загрузки: ${new Date(uploadedHomework.uploadedAt).toLocaleDateString()}`);
    } else {
      alert("Файл не найден");
    }
  };

  if (isLoading && !course) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка курса...</p>
      </div>
    );
  }

  if (!course) {
    return <div className="loading">Курс не найден</div>;
  }

  return (
    <div className="learning-page">
      {/* Отображение ошибок API */}
      {apiError && (
        <div className="api-error">
          ⚠️ {apiError}
          <button onClick={() => setApiError(null)} className="close-error">×</button>
        </div>
      )}

      {/* Заголовок и прогресс */}
      <div className="learning-header">
        <button onClick={() => navigate("/profile")} className="back-btn">
          ← Назад к профилю
        </button>
        <div className="course-info">
          <h1>{course.title}</h1>
          <p className="course-description">{course.description}</p>
          <div className="course-meta">
            <span className="meta-item">{course.duration}</span>
            <span className="meta-item"> {course.totalLessons} уроков</span>
          </div>
        </div>
        <div className="course-progress">
          <div className="progress-circle">
            <div className="circle" style={{
              background: `conic-gradient(
                #4cc9f0 ${calculateProgress() * 3.6}deg,
                #16213e 0deg
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
                            <span className="homework-icon"></span>
                            <span className="homework-text">Есть домашнее задание</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="lesson-actions">
                      <button 
                        onClick={() => isAvailable && openLesson(module.id, lesson)}
                        disabled={!isAvailable || isLoading}
                        className={`watch-btn ${!isAvailable ? 'disabled' : ''}`}
                      >
                        {isLoading ? 'Загрузка...' : (isCompleted ? 'Повторить' : 'Смотреть')}
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
              {/* Видеоплеер с Rutube */}
              <div className="video-wrapper">
                {currentVideoUrl ? (
                  <iframe
                    src={currentVideoUrl}
                    title={selectedLesson.lesson.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="video-frame"
                    frameBorder="0"
                  />
                ) : (
                  <div className="video-placeholder">
                    <div className="video-icon">🎬</div>
                    <p>Видео не доступно</p>
                    <p className="video-hint">Видео материал временно отсутствует</p>
                  </div>
                )}
              </div>
              
              {/* Контролы видео */}
              <div className="video-controls">
                <div className="action-buttons">
                  <button 
                    onClick={() => markLessonAsCompleted(selectedLesson.moduleId, selectedLesson.lesson.id)}
                    disabled={isLessonCompleted || isLoading}
                    className={`complete-btn ${isLessonCompleted ? 'completed' : ''}`}
                  >
                    {isLoading ? '⏳ Сохранение...' : (isLessonCompleted ? ' Просмотрено' : ' Отметить как просмотренное')}
                  </button>
                  
                  {getNextLesson() && (
                    <button 
                      onClick={goToNextLesson}
                      disabled={!isLessonCompleted || isLoading}
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
                    disabled={isLoading}
                    className="homework-toggle-btn"
                  >
                    {showHomework ? ' Скрыть домашнее задание' : ' Показать домашнее задание'}
                  </button>
                  
                  {showHomework && (
                    <div className="homework-container">
                      <div className="homework-info">
                        <h4> {selectedLesson.lesson.homework.title}</h4>
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
                              disabled={isUploading}
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
                                  disabled={isUploading}
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
                              disabled={isUploading}
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
                            disabled={!file || isUploading || isLoading}
                            className="upload-homework-btn"
                          >
                            {isUploading ? ' Загрузка на сервер...' : 'Загрузить домашнее задание'}
                          </button>
                        </div>
                      ) : (
                        
                        <div className="uploaded-homework">
                          <div className="uploaded-header">
                            <h5>
                              {homeworkStatus === "approved" ? ' Задание проверено' : 
                               homeworkStatus === "rejected" ? ' Требуется доработка' : 
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
                                {uploadedHomework.status === "approved" ? " Принято" : 
                                 uploadedHomework.status === "rejected" ? " Требует доработки" : 
                                 "⏳ Ожидает проверки"}
                              </span>
                            </div>
                            {uploadedHomework.fileUrl && (
                              <div className="detail-item">
                                <span className="detail-label">Ссылка:</span>
                                <span className="detail-value">
                                  <a href={uploadedHomework.fileUrl} target="_blank" rel="noopener noreferrer">
                                    Скачать файл
                                  </a>
                                </span>
                              </div>
                            )}
                          </div>
                          
                          <div className="uploaded-actions">
                            <button 
                              onClick={viewHomeworkFile} 
                              className="view-homework-btn"
                              disabled={isLoading}
                            >
                                Просмотреть файл
                            </button>
                            <button 
                              onClick={deleteHomework}
                              disabled={isLoading}
                              className="delete-homework-btn"
                            >
                                Удалить
                            </button>
                            {homeworkStatus === "rejected" && (
                              <button 
                                onClick={() => {
                                  setHomeworkStatus("not_started");
                                  setUploadedHomework(null);
                                }}
                                className="reupload-homework-btn"
                              >
                                  Загрузить исправленную версию
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