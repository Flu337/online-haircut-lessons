import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./LearningPage.css";

// Данные курсов с домашними заданиями
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
            videoId: "18bb3eecf44ef16ac42697c24934111",
            homework: {
              title: "Эволюция стилей",
              description: "Подберите 5 старинных причесок, сравните технику.",
              deadline: "2024-12-20",
              maxFileSize: 5,
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
            videoId: "18bb3eecf44ef16ac42697c24934111",
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
            videoId: "18bb3eecf44ef16ac42697c24934111",
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
            videoId: "18bb3eecf44ef16ac42697c24934111",
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

  /* ─────────────────────────────
     КУРС 2 и КУРС 3 
     (тоже полностью пересобранные)
     ───────────────────────────── */

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
            videoId: "18bb3eecf44ef16ac42697c24934111",
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
            videoId: "18bb3eecf44ef16ac42697c24934111",
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
            videoId: "18bb3eecf44ef16ac42697c24934111",
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
  
  // Состояния для домашнего задания
  const [showHomework, setShowHomework] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [comment, setComment] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [homeworkStatus, setHomeworkStatus] = useState("not_started"); // not_started, uploaded, graded
  const [uploadedHomework, setUploadedHomework] = useState(null);

  // Загрузка курса и прогресса
  useEffect(() => {
    const course = courseData[courseId];
    if (!course) {
      navigate("/profile");
      return;
    }
    
    setCourse(course);
    
    // Загружаем прогресс из localStorage
    const savedProgress = JSON.parse(localStorage.getItem(`course_progress_${courseId}`)) || {};
    setProgress(savedProgress);
    
    // Загружаем домашние задания из localStorage
    const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
    if (selectedLesson && savedHomework[selectedLesson.lesson.id]) {
      setUploadedHomework(savedHomework[selectedLesson.lesson.id]);
      setHomeworkStatus("uploaded");
    }
  }, [courseId, navigate, selectedLesson]);

  // Проверка, доступен ли урок
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

  // Отметить урок как пройденный
  const markLessonAsCompleted = (moduleId, lessonId) => {
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
  };

  // Открыть урок для просмотра
  const openLesson = (moduleId, lesson) => {
    const module = course.modules.find(m => m.id === moduleId);
    const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
    
    if (!isLessonAvailable(moduleId, lesson.id, lessonIndex)) {
      return;
    }
    
    setSelectedLesson({ moduleId, lesson });
    setShowVideoModal(true);
    setIsLessonCompleted(progress[lesson.id]?.completed || false);
    setShowHomework(false);
    
    // Сброс состояния домашнего задания
    setFile(null);
    setFileName("");
    setComment("");
    setUploadProgress(0);
    
    // Загружаем домашнее задание для этого урока
    const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
    if (savedHomework[lesson.id]) {
      setUploadedHomework(savedHomework[lesson.id]);
      setHomeworkStatus("uploaded");
    } else {
      setUploadedHomework(null);
      setHomeworkStatus("not_started");
    }
  };

  // Получить следующий урок
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

  // Перейти к следующему уроку
  const goToNextLesson = () => {
    if (!isLessonCompleted) {
      return;
    }
    
    const nextLesson = getNextLesson();
    
    if (nextLesson) {
      setSelectedLesson({ moduleId: nextLesson.moduleId, lesson: nextLesson.lesson });
      setIsLessonCompleted(progress[nextLesson.lesson.id]?.completed || false);
      setShowHomework(false);
      
      // Сброс состояния домашнего задания для нового урока
      const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
      if (savedHomework[nextLesson.lesson.id]) {
        setUploadedHomework(savedHomework[nextLesson.lesson.id]);
        setHomeworkStatus("uploaded");
      } else {
        setUploadedHomework(null);
        setHomeworkStatus("not_started");
      }
    } else {
      setShowVideoModal(false);
    }
  };

  // Получить URL для RuTube видео
  const getRuTubeEmbedUrl = (videoId) => {
    if (videoId.startsWith('http')) {
      return videoId;
    }
    return `https://rutube.ru/play/embed/${videoId}`;
  };

  // Рассчитать общий прогресс
  const calculateProgress = () => {
    if (!course) return 0;
    const completedLessons = Object.keys(progress).filter(id => progress[id]?.completed).length;
    return course.totalLessons > 0 ? Math.round((completedLessons / course.totalLessons) * 100) : 0;
  };

  // Обработка выбора файла
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Проверка размера файла
    const maxSize = selectedLesson?.lesson?.homework?.maxFileSize || 10;
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`Файл слишком большой. Максимальный размер: ${maxSize}MB`);
      return;
    }
    
    // Проверка формата файла
    const allowedFormats = selectedLesson?.lesson?.homework?.allowedFormats || [".jpg", ".jpeg", ".png", ".pdf"];
    const fileExtension = selectedFile.name.slice(selectedFile.name.lastIndexOf('.')).toLowerCase();
    
    if (!allowedFormats.includes(fileExtension)) {
      alert(`Неподдерживаемый формат. Разрешенные форматы: ${allowedFormats.join(', ')}`);
      return;
    }
    
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  // Загрузка домашнего задания
  const uploadHomework = async () => {
    if (!file) {
      alert("Пожалуйста, выберите файл для загрузки");
      return;
    }
    
    setIsUploading(true);
    setUploadProgress(0);
    
    // Имитация загрузки (в реальном приложении здесь будет запрос к backend)
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 100);
    
    try {
      // В реальном приложении здесь будет:
      // const formData = new FormData();
      // formData.append('file', file);
      // formData.append('lessonId', selectedLesson.lesson.id);
      // formData.append('comment', comment);
      // const response = await fetch('/api/homework/upload', { method: 'POST', body: formData });
      
      // Имитация успешной загрузки
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      // Сохраняем в localStorage
      const homeworkData = {
        id: Date.now(),
        lessonId: selectedLesson.lesson.id,
        fileName: file.name,
        fileSize: (file.size / (1024 * 1024)).toFixed(2),
        comment: comment,
        uploadedAt: new Date().toISOString(),
        status: "uploaded"
      };
      
      const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
      savedHomework[selectedLesson.lesson.id] = homeworkData;
      localStorage.setItem(`homework_${courseId}`, JSON.stringify(savedHomework));
      
      setUploadedHomework(homeworkData);
      setHomeworkStatus("uploaded");
      setFile(null);
      setFileName("");
      setComment("");
      
      setTimeout(() => {
        setUploadProgress(0);
        setIsUploading(false);
      }, 1000);
      
    } catch (error) {
      clearInterval(interval);
      setIsUploading(false);
      alert("Ошибка при загрузке файла. Попробуйте еще раз.");
    }
  };

  // Удалить загруженное домашнее задание
  const deleteHomework = () => {
    if (window.confirm("Удалить загруженное домашнее задание?")) {
      const savedHomework = JSON.parse(localStorage.getItem(`homework_${courseId}`)) || {};
      delete savedHomework[selectedLesson.lesson.id];
      localStorage.setItem(`homework_${courseId}`, JSON.stringify(savedHomework));
      
      setUploadedHomework(null);
      setHomeworkStatus("not_started");
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
              {/* Видеоплеер */}
              <div className="video-wrapper">
                <iframe
                  src={getRuTubeEmbedUrl(selectedLesson.lesson.videoId)}
                  title={selectedLesson.lesson.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="video-frame"
                  frameBorder="0"
                />
              </div>
              
              {/* Контролы видео */}
              <div className="video-controls">
                <div className="action-buttons">
                  <button 
                    onClick={() => markLessonAsCompleted(selectedLesson.moduleId, selectedLesson.lesson.id)}
                    disabled={isLessonCompleted}
                    className={`complete-btn ${isLessonCompleted ? 'completed' : ''}`}
                  >
                    {isLessonCompleted ? '✓ Просмотрено' : 'Отметить как просмотренное'}
                  </button>
                  
                  <button 
                    onClick={goToNextLesson}
                    disabled={!isLessonCompleted}
                    className={`next-lesson-btn ${!isLessonCompleted ? 'disabled' : ''}`}
                  >
                    Следующий урок →
                  </button>
                </div>
              </div>
              
              {/* Кнопка для домашнего задания */}
              {selectedLesson.lesson.homework && (
                <div className="homework-section">
                  <button 
                    onClick={() => setShowHomework(!showHomework)}
                    className="homework-toggle-btn"
                  >
                    {showHomework ? 'Скрыть домашнее задание' : 'Перейти к домашнему заданию'}
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
                      {homeworkStatus === "not_started" ? (
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
                            {isUploading ? 'Загрузка...' : 'Прикрепить задание'}
                          </button>
                        </div>
                      ) : (
                        /* Просмотр загруженного задания */
                        <div className="uploaded-homework">
                          <div className="uploaded-header">
                            <h5>✅ Задание загружено</h5>
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
                              <span className="detail-value status-uploaded">Ожидает проверки</span>
                            </div>
                          </div>
                          
                          <div className="uploaded-actions">
                            <button className="view-homework-btn">
                              📄 Просмотреть файл
                            </button>
                            <button 
                              onClick={deleteHomework}
                              className="delete-homework-btn"
                            >
                              🗑️ Удалить
                            </button>
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