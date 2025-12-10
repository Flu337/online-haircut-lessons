import React, { useState, useEffect } from "react";

const Teachers = () => {
  const [activeTeacher, setActiveTeacher] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const teachers = [
    {
      id: 1,
      name: "Анна Иванова",
      role: "Мастер-парикмахер",
      experience: "10 лет опыта",
      bio: "Эксперт в современных техниках стрижки и укладки. Работала с мировыми брендами в Париже и Милане. Автор уникальных методик обучения, которые позволяют освоить профессию с нуля.",
      image:
        "https://img.freepik.com/premium-photo/young-blonde-woman-over-isolated-wall-with-hairdresser-or-barber-dress-and-pointing-side_1368-55259.jpg",
      achievements: [
        "Top Hair Stylist 2023",
        "Best Color Technique Award",
        "International Hairdressing Champion",
      ],
      specialties: [
        "Стрижки",
        "Укладки",
        "Вечерние причёски",
        "Мужские стрижки",
      ],
      socials: {
        instagram: "@anna_hair",
        youtube: "Anna Hair Masterclass",
        telegram: "@anna_hair_pro",
      },
      rating: 4.9,
      students: 250,
      courses: ["Базовый курс", "Продвинутый курс", "Мастер-классы"],
    },
    {
      id: 2,
      name: "Мария Петрова",
      role: "Специалист по окрашиванию",
      experience: "8 лет опыта",
      bio: "Создатель уникальных техник окрашивания. Эксперт по уходу и восстановлению волос после процедур. Работает с премиальными брендами профессиональной косметики.",
      image:
        "https://th.bing.com/th/id/R.d6e3153d0bb9cf0687fb425808281c6b?rik=02kWs8tqeC%2fqUg&riu=http%3a%2f%2fwww.szproperty.com%2fupload%2f2018-10-26%2fthumb_3721ad37ce0fca902694ceb3cd517b08.jpg&ehk=kLpVgQjcKfkWEdXI0MomtAW0mAkT9wjGYM18f7VWw8E%3d&risl=&pid=ImgRaw&r=0",
      achievements: [
        "Color Master 2022",
        "Innovation in Hair Care",
        "Best Colorist Award",
      ],
      specialties: [
        "Балаяж",
        "Мелирование",
        "Тонирование",
        "Омбре",
        "Колористика",
      ],
      socials: {
        instagram: "@maria_color",
        tiktok: "MariaColorMagic",
        youtube: "Maria Color Studio",
      },
      rating: 4.8,
      students: 180,
      courses: ["Колористика", "Сложное окрашивание", "Уход за волосами"],
    },
    {
      id: 3,
      name: "Елена Смирнова",
      role: "Визажист-стилист",
      experience: "12 лет опыта",
      bio: "Работала на Неделях моды в Милане и Париже. Специалист по свадебному и вечернему макияжу. Обладатель международных сертификатов по визажу и стилю.",
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      achievements: [
        "Makeup Artist of the Year",
        "Bridal Style Expert",
        "International Beauty Award",
      ],
      specialties: [
        "Свадебный макияж",
        "Smoky eyes",
        "Контурная пластика",
        "Дневной макияж",
      ],
      socials: {
        instagram: "@elena_glam",
        youtube: "Elena Beauty Lab",
        pinterest: "Elena Style",
      },
      rating: 5.0,
      students: 320,
      courses: ["Базовый визаж", "Свадебный макияж", "Профессиональный курс"],
    },
  ];

  const handleTeacherClick = (teacher) => {
    setActiveTeacher(teacher);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Блокируем скролл при открытом модальном окне
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setTimeout(() => setActiveTeacher(null), 300); // Ждем завершения анимации
    document.body.style.overflow = "auto"; // Восстанавливаем скролл
  };

  // Закрытие модального окна по клику на overlay
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("teacher-modal-overlay")) {
      handleModalClose();
    }
  };

  // Закрытие модального окна по клавише Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleModalClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isModalOpen]);

  return (
    <>
      <section id="teachers" className="teachers-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              Наши <span className="text-gradient">преподаватели</span>
            </h2>
            <p className="section-subtitle">
              Профессионалы с многолетним опытом, готовые поделиться своими
              знаниями
            </p>
          </div>

          <div className="teachers-grid">
            {teachers.map((teacher) => (
              <div
                key={teacher.id}
                className="teacher-card fade-in"
                onClick={() => handleTeacherClick(teacher)}
              >
                <div className="teacher-card-inner">
                  <div className="teacher-image-wrapper">
                    <div className="teacher-image-frame">
                      <img
                        src={teacher.image}
                        alt={teacher.name}
                        className="teacher-image"
                      />
                      <div className="teacher-image-overlay">
                        <span className="view-details-btn">Подробнее</span>
                      </div>
                    </div>

                    <div className="teacher-badge">
                      <span className="teacher-rating">
                        ⭐ {teacher.rating}
                      </span>
                      <span className="teacher-experience-badge">
                        {teacher.experience}
                      </span>
                    </div>
                  </div>

                  <div className="teacher-info">
                    <h3 className="teacher-name">{teacher.name}</h3>
                    <p className="teacher-role">{teacher.role}</p>

                    <div className="teacher-specialties">
                      {teacher.specialties.slice(0, 3).map((spec, idx) => (
                        <span key={idx} className="specialty-tag">
                          {spec}
                        </span>
                      ))}
                      {teacher.specialties.length > 3 && (
                        <span className="specialty-tag">
                          +{teacher.specialties.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="teacher-stats">
                      <div className="stat-item">
                        <span className="stat-icon">👨‍🎓</span>
                        <span className="stat-value">
                          {teacher.students}+ учеников
                        </span>
                      </div>
                    </div>

                    <button
                      className="teacher-contact-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTeacherClick(teacher);
                      }}
                    >
                      <span>Подробнее о преподавателе</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="teachers-cta">
            <p className="cta-text">
              Все преподаватели являются действующими специалистами и регулярно
              повышают квалификацию
            </p>
            <button
              className="cta-btn"
              onClick={() =>
                document
                  .getElementById("form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Записаться на пробный урок
            </button>
          </div>
        </div>
      </section>

      {/* Модальное окно преподавателя */}
      {isModalOpen && activeTeacher && (
        <div className="teacher-modal-overlay" onClick={handleOverlayClick}>
          <div className="teacher-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleModalClose}>
              ✕
            </button>

            <div className="modal-content">
              <div className="modal-teacher-header">
                <div className="modal-image-wrapper">
                  <img
                    src={activeTeacher.image}
                    alt={activeTeacher.name}
                    className="modal-teacher-image"
                  />
                </div>
                <div className="modal-teacher-info">
                  <h3 className="modal-teacher-name">{activeTeacher.name}</h3>
                  <p className="modal-teacher-role">{activeTeacher.role}</p>
                  <div className="modal-teacher-meta">
                    <span className="modal-rating">
                      ⭐ {activeTeacher.rating}/5
                    </span>
                    <span className="modal-experience">
                      {activeTeacher.experience}
                    </span>
                    <span className="modal-students">
                      {activeTeacher.students} учеников
                    </span>
                  </div>
                </div>
              </div>

              <div className="modal-teacher-details">
                <div className="modal-section">
                  <h4>О преподавателе</h4>
                  <p>{activeTeacher.bio}</p>
                </div>

                <div className="modal-section">
                  <h4>Направления и специализации</h4>
                  <div className="modal-specialties">
                    {activeTeacher.specialties.map((spec, idx) => (
                      <span key={idx} className="modal-specialty-tag">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Достижения и награды</h4>
                  <ul className="modal-achievements">
                    {activeTeacher.achievements.map((ach, idx) => (
                      <li key={idx} className="modal-achievement-item">
                        🏆 {ach}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section">
                  <h4>Курсы преподавателя</h4>
                  <div className="modal-specialties">
                    {activeTeacher.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="modal-specialty-tag"
                        style={{
                          background:
                            "linear-gradient(135deg, #667eea, #764ba2)",
                        }}
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h4>Социальные сети</h4>
                  <div className="modal-socials">
                    {Object.entries(activeTeacher.socials).map(
                      ([platform, handle]) => (
                        <a
                          key={platform}
                          href="#"
                          className="modal-social-link"
                          onClick={(e) => e.preventDefault()}
                        >
                          <span className={`social-icon social-${platform}`}>
                            {platform === "instagram"
                              ? "📷"
                              : platform === "youtube"
                                ? "🎬"
                                : platform === "tiktok"
                                  ? "🎵"
                                  : platform === "telegram"
                                    ? "✈️"
                                    : platform === "pinterest"
                                      ? "📌"
                                      : "💬"}
                          </span>
                          <span className="social-handle">{handle}</span>
                        </a>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  className="modal-action-btn btn-primary"
                  onClick={() => {
                    handleModalClose();
                    document
                      .getElementById("form")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Записаться на курс
                </button>
                <button
                  className="modal-action-btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Вернуться к списку
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Teachers;
