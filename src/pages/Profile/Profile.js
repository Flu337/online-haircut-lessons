import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../../styles/ProfileComponents.css";

// Импортируем компоненты
import ProfileHeader from "../../components/Profile/ProfileHeader";
import CoursesList from "../../components/Profile/CoursesList";
import CertificatesList from "../../components/Profile/CertificatesList";
import CourseModal from "../../components/Profile/CourseModal";

// Константы
const initialCourses = [
  { id: 1, title: "Парикмахерский курс 1", paid: false },
  { id: 2, title: "Стрижки и укладки", paid: false },
  { id: 3, title: "Колористика", paid: false },
];

const courseDetails = {
  1: {
    title: "Парикмахерский курс 1",
    description: "Полный курс по основам парикмахерского искусства.",
    modules: [
      { name: "Введение в профессию", lessons: 3 },
      { name: "Инструменты и материалы", lessons: 4 },
      { name: "Базовые техники стрижек", lessons: 6 },
    ],
    totalLessons: 13,
    duration: "4 недели"
  },
  2: {
    title: "Стрижки и укладки",
    description: "Продвинутый курс по современным техникам стрижек и укладок.",
    modules: [
      { name: "Мужские стрижки", lessons: 5 },
      { name: "Женские стрижки", lessons: 6 },
    ],
    totalLessons: 11,
    duration: "3 недели"
  },
  3: {
    title: "Колористика",
    description: "Курс по современной колористике.",
    modules: [
      { name: "Основы цветоведения", lessons: 4 },
      { name: "Техники окрашивания", lessons: 4 },
    ],
    totalLessons: 8,
    duration: "2 недели"
  }
};

// Основной компонент
export default function ProfilePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [error, setError] = useState("");
  
  const navigate = useNavigate();

  // Проверка авторизации при загрузке
  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    const savedUser = localStorage.getItem('userData');
    
    if (savedAuth === 'true' && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setIsAuthenticated(true);
        setUserData(user);
        
        // Загружаем курсы пользователя
        const userCoursesKey = `courses_${user.username}`;
        const userCourses = localStorage.getItem(userCoursesKey);
        
        if (userCourses) {
          const parsedCourses = JSON.parse(userCourses);
          
          // Обновляем прогресс для каждого курса
          const updatedCourses = parsedCourses.map(course => {
            const progress = getCourseProgress(course.id);
            return {
              ...course,
              progress: progress,
              completed: progress === 100
            };
          });
          
          setCourses(updatedCourses);
        } else {
          setCourses(initialCourses);
        }
        
        // Загружаем сертификаты
        loadCertificates(user.username);
      } catch (error) {
        console.log('Ошибка загрузки пользователя:', error);
        handleLogout();
      }
    }
    
    // Создаем тестового пользователя при первом запуске
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify([{ username: 'admin', password: 'admin' }]));
      localStorage.setItem(`courses_admin`, JSON.stringify(initialCourses));
    }
  }, []);

  // Функция для получения прогресса курса
  const getCourseProgress = (courseId) => {
    if (!userData) return 0;
    
    try {
      // Получаем прогресс из localStorage
      const progressKey = `course_progress_${userData.username}_${courseId}`;
      const savedProgress = JSON.parse(localStorage.getItem(progressKey)) || {};
      
      // Подсчитываем завершенные уроки
      const completedLessons = Object.values(savedProgress).filter(lesson => lesson.completed).length;
      
      // Определяем общее количество уроков для курса
      let totalLessons = 0;
      if (courseId == 1) totalLessons = 21;
      else if (courseId == 2) totalLessons = 11;
      else if (courseId == 3) totalLessons = 8;
      
      const progress = Math.round((completedLessons / totalLessons) * 100);
      return isNaN(progress) ? 0 : progress;
    } catch (error) {
      console.log('Ошибка получения прогресса:', error);
      return 0;
    }
  };

  // Функция проверки завершения курса
  const checkCourseCompletion = (courseId) => {
    const progress = getCourseProgress(courseId);
    return progress === 100;
  };

  // Функция для загрузки сертификатов
  const loadCertificates = (username = null) => {
    const user = username || userData?.username;
    if (!user) return;
    
    const certificatesKey = `certificates_${user}`;
    const savedCertificates = JSON.parse(localStorage.getItem(certificatesKey)) || [];
    
    // Если нет сертификатов, проверяем завершенные курсы
    if (savedCertificates.length === 0) {
      const completedCertificates = [];
      
      courses.forEach(course => {
        if (course.paid) {
          const progress = getCourseProgress(course.id);
          const isCompleted = progress === 100;
          
          if (isCompleted) {
            const certificate = {
              id: Date.now(),
              name: `Сертификат по курсу "${course.title}"`,
              courseId: course.id,
              courseTitle: course.title,
              issueDate: new Date().toISOString(),
              userName: user,
              progress: 100
            };
            completedCertificates.push(certificate);
          }
        }
      });
      
      setCertificates(completedCertificates);
      localStorage.setItem(certificatesKey, JSON.stringify(completedCertificates));
    } else {
      setCertificates(savedCertificates);
    }
  };

  // Загружаем сертификаты при изменении курсов
  useEffect(() => {
    if (userData && courses.length > 0) {
      loadCertificates();
    }
  }, [courses, userData]);

  // Вход
  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Простая проверка
    if (!username || !password) {
      setError("Заполните все поля");
      return;
    }
    
    // Получаем пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Проверяем вход
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      const userData = { username: user.username };
      
      // Сохраняем данные
      setIsAuthenticated(true);
      setUserData(userData);
      
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('userData', JSON.stringify(userData));
      
      // Загружаем курсы
      const userCoursesKey = `courses_${user.username}`;
      const userCourses = localStorage.getItem(userCoursesKey);
      
      if (userCourses) {
        const parsedCourses = JSON.parse(userCourses);
        
        // Обновляем прогресс
        const updatedCourses = parsedCourses.map(course => {
          const progress = getCourseProgress(course.id);
          return {
            ...course,
            progress: progress,
            completed: progress === 100
          };
        });
        
        setCourses(updatedCourses);
      } else {
        setCourses(initialCourses);
      }
      
      // Загружаем сертификаты
      loadCertificates(user.username);
      
      // Очищаем форму
      e.target.reset();
    } else {
      setError("Неверный логин или пароль");
    }
  };

  // Регистрация
  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    if (!username || !password) {
      setError("Заполните все поля");
      return;
    }
    
    // Получаем пользователей
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Проверяем, есть ли уже такой пользователь
    if (users.some(user => user.username === username)) {
      setError("Пользователь с таким логином уже существует");
      return;
    }
    
    // Добавляем нового пользователя
    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Создаем курсы для нового пользователя
    localStorage.setItem(`courses_${username}`, JSON.stringify(initialCourses));
    
    // Показываем успех
    setError("");
    setAuthMode('login');
    e.target.reset();
    alert("Регистрация успешна! Теперь войдите.");
  };

  // Выход
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserData(null);
    setCourses([]);
    setCertificates([]);
    
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    
    navigate("/");
  };

  // Обработчики для курсов
  const openCourseModal = (courseId) => {
    setSelectedCourse(courseId);
    setModalOpen(true);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedCourse(null);
  };

  const purchaseCourse = () => {
    if (!userData) {
      alert('Войдите в систему');
      return;
    }
    
    try {
      const updatedCourses = courses.map(course => 
        course.id === selectedCourse ? { ...course, paid: true } : course
      );
      
      setCourses(updatedCourses);
      localStorage.setItem(`courses_${userData.username}`, JSON.stringify(updatedCourses));
      
      closeModal();
      alert('Курс оплачен!');
    } catch (error) {
      alert('Ошибка');
    }
  };

  const startLearning = (courseId) => {
    if (!userData) {
      alert('Войдите в систему');
      return;
    }
    
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
  };

  const downloadCertificate = (courseId, courseTitle) => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        alert('Пожалуйста, войдите в систему');
        return;
      }


      const imageUrl = '/img/image.png'; 
      

      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `Сертификат_${courseTitle}_${userData.username}.png`;

      document.body.appendChild(link);
      link.click();
      
      document.body.removeChild(link);
      
      alert(`Сертификат по курсу "${courseTitle}" скачан!`);
    } catch (error) {
      console.error('Ошибка при скачивании сертификата:', error);
      alert('Не удалось скачать сертификат. Пожалуйста, попробуйте еще раз.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="login-page">
        <div className="login-box">
          <h2>{authMode === 'login' ? 'Вход' : 'Регистрация'}</h2>
          
          <div className="auth-tabs">
            <button 
              className={authMode === 'login' ? 'active' : ''}
              onClick={() => {
                setAuthMode('login');
                setError('');
              }}
            >
              Вход
            </button>
            <button 
              className={authMode === 'register' ? 'active' : ''}
              onClick={() => {
                setAuthMode('register');
                setError('');
              }}
            >
              Регистрация
            </button>
          </div>
          
          {error && <div className="error">{error}</div>}
          
          {authMode === 'login' ? (
            <form onSubmit={handleLogin}>
              <input 
                type="text" 
                name="username" 
                placeholder="Логин" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Пароль" 
                required 
              />
              <button type="submit">Войти</button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <input 
                type="text" 
                name="username" 
                placeholder="Придумайте логин" 
                required 
              />
              <input 
                type="password" 
                name="password" 
                placeholder="Придумайте пароль" 
                required 
              />
              <button type="submit">Зарегистрироваться</button>
            </form>
          )}
          
          <div className="test-user">
            <p><strong>Тестовый пользователь:</strong></p>
            <p>Логин: <strong>admin</strong></p>
            <p>Пароль: <strong>admin</strong></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <ProfileHeader userName={userData?.username} />
      
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
        <button className="logout-btn" onClick={handleLogout}>
          Выйти ({userData?.username})
        </button>
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