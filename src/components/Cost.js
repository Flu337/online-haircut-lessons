import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const Pricing = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();
  

  const courseDetails = {
    "Базовый": {
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
      duration: "4 недели",
      price: "1999 ₽/месяц"
    },
    "Профессионал": {
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
      duration: "5 недель",
      price: "2999 ₽/месяц"
    },
    "Премиум": {
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
      duration: "4 недели",
      price: "4999 ₽/месяц"
    }
  };

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

  const pricingPlans = [
    {
      title: "Базовый",
      price: "1999",
      period: "месяц",
      features: [
        "Доступ ко всем видеоурокам",
        "Практические задания",
        "Проверка домашних работ",
        "Доступ к материалам 6 месяцев",
        "Сертификат об окончании",
      ],
      buttonText: "Выбрать план",
      popular: false,
    },
    {
      title: "Профессионал",
      price: "2999",
      period: "месяц",
      features: [
        "Всё из тарифа Базовый",
        "Индивидуальные консультации",
        "Разбор вашего портфолио",
        "Пожизненный доступ к курсу",
        "Гарантия трудоустройства",
        "Участие в воркшопах",
      ],
      buttonText: "Выбрать лучший",
      popular: true,
    },
    {
      title: "Премиум",
      price: "4999",
      period: "месяц",
      features: [
        "Всё из тарифа Профессионал",
        "Персональный ментор на 3 месяца",
        "Стажировка в салоне-партнёре",
        "Брендированные инструменты",
        "Сертификат международного образца",
        "Помощь в открытии своего салона",
      ],
      buttonText: "Максимум возможностей",
      popular: false,
    },
  ];

  const handlePlanClick = (planTitle) => {
    setSelectedPlan(planTitle);
    setModalOpen(true);
  };


  const closeModal = () => {
    setModalOpen(false);
    setSelectedPlan(null);
  };


const startLearning = () => {
  const courseIdMap = {
    "Базовый": 1,
    "Профессионал": 2,
    "Премиум": 3
  };
  
  const courseId = courseIdMap[selectedPlan];
  if (courseId) {
    navigate(`/learning/${courseId}`);
    closeModal();
  }
};
  return (
    <section id="pricing" className="pricing-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Выберите свой <span className="text-gradient">тариф</span>
          </h2>
          <p className="section-subtitle">
            Инвестируйте в своё будущее с выгодой до 40%
          </p>
        </div>

        <div className="pricing">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`price-card fade-in ${plan.popular ? "premium" : ""}`}
            >
              {plan.popular && <div className="popular-badge">ПОПУЛЯРНЫЙ</div>}

              <h3>{plan.title}</h3>

              <div className="price-tag">
                <span className="currency">₽</span>
                <span className="price">{plan.price}</span>
                <span className="period">/{plan.period}</span>
              </div>

              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>

              <button
                className="submit-btn"
                onClick={() => handlePlanClick(plan.title)}
              >
                {plan.buttonText}
              </button>

              {plan.popular && (
                <div className="price-savings">
                  <span className="savings-badge">Экономия 40%</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="pricing-footer">
          <p className="guarantee-text">
            🔒 <strong>Гарантия возврата:</strong> Если в течение 14 дней курс
            не подойдёт — вернём деньги
          </p>
          <p className="installment-text">
            💳 <strong>Рассрочка 0%:</strong> До 12 месяцев без переплат
          </p>
        </div>
      </div>

      {/* Модальное окно курса */}
      {modalOpen && selectedPlan && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            
            <h2>{courseDetails[selectedPlan]?.title}</h2>
            <p className="course-description">
              {courseDetails[selectedPlan]?.description}
            </p>
            
            <div className="course-stats">
              <div className="stat-item">
                <span className="stat-label">Тариф:</span>
                <span className="stat-value">{selectedPlan}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Стоимость:</span>
                <span className="stat-value">{courseDetails[selectedPlan]?.price}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Длительность:</span>
                <span className="stat-value">{courseDetails[selectedPlan]?.duration}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Уроков:</span>
                <span className="stat-value">{courseDetails[selectedPlan]?.totalLessons}</span>
              </div>
            </div>
            
            <div className="modules-section">
              <h3>Структура курса</h3>
              <ul className="modules-list">
                {courseDetails[selectedPlan]?.modules.map((module, index) => (
                  <li key={index} className="module-item">
                    <span className="module-name">{module.name}</span>
                    <span className="module-lessons">{module.lessons} уроков</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="modal-actions">
              <button className="purchase-btn" onClick={startLearning}>
                Начать обучение
              </button>
              <button className="cancel-btn" onClick={closeModal}>
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;