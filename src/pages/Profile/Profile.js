import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/ProfileComponents.css"; // Импортируем ОДИН CSS файл

// Импортируем компоненты
import ProfileHeader from "../../components/Profile/ProfileHeader";
import CoursesList from "../../components/Profile/CoursesList";
import CertificatesList from "../../components/Profile/CertificatesList";
import CourseModal from "../../components/Profile/CourseModal";

// Константы выносим отдельно
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

  // Логические функции
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

  // Эффекты
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

  // Обработчики событий
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

  const downloadCertificate = (courseId, courseTitle) => {
    try {
      const templateUrl = certificateTemplates[courseId] || "/img/image.png";
      const link = document.createElement('a');
      link.href = templateUrl;
      link.download = `Сертификат_${courseId}.png`;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      alert(`Сертификат по курсу "${courseTitle}" скачан!`);
      
    } catch (error) {
      console.error('Ошибка при скачивании:', error);
      alert('Не удалось скачать сертификат');
    }
  };

  return (
    <div className="profile-page">
      <ProfileHeader />
      
      <CoursesList
        courses={courses}
        getCourseProgress={getCourseProgress}
        checkCourseCompletion={checkCourseCompletion}
        onStartLearning={startLearning}
        onDownloadCertificate={downloadCertificate}
        onOpenModal={openCourseModal}
      />
      
      <CertificatesList
        certificates={certificates}
        onDownloadCertificate={downloadCertificate}
      />
      
      <div className="logout-section">
        <button className="btn btn-logout" onClick={handleLogout}>
          <span className="logout-icon">🚪</span>
          Выйти на главную
        </button>
        <p className="logout-hint">Вернуться на главную страницу сайта</p>
      </div>

      {modalOpen && (
        <CourseModal
          selectedCourse={selectedCourse}
          courseDetails={courseDetails}
          onClose={closeModal}
          onPurchase={purchaseCourse}
        />
      )}
    </div>
  );
}