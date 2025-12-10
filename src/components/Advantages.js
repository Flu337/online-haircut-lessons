import React, { useEffect } from "react";

const Advantages = () => {
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

  const advantages = [
    {
      icon: "🎯",
      title: "Практика с первого дня",
      description:
        "Работа с реальными моделями, видеоразборы, домашние задания с проверкой",
    },
    {
      icon: "👨‍🏫",
      title: "Индивидуальный подход",
      description:
        "Персональный куратор, обратная связь от преподавателей, разбор ошибок",
    },
    {
      icon: "💼",
      title: "Трудоустройство",
      description:
        "Помощь в составлении портфолио, подготовка к собеседованию, вакансии от партнёров",
    },
    {
      icon: "🔄",
      title: "Пожизненный доступ",
      description:
        "Курс остаётся с вами навсегда, обновления материалов бесплатно",
    },
    {
      icon: "🎓",
      title: "Сертификат",
      description:
        "Официальный сертификат установленного образца после завершения курса",
    },
    {
      icon: "💬",
      title: "Сообщество",
      description:
        "Закрытый чат с одногруппниками и преподавателями, нетворкинг",
    },
  ];

  return (
    <section id="advantages" className="advantages-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Почему выбирают <span className="text-gradient">наши курсы</span>
          </h2>
          <p className="section-subtitle">
            Мы создали идеальные условия для вашего профессионального роста
          </p>
        </div>

        <div className="advantages-list">
          {advantages.map((advantage, index) => (
            <div key={index} className="advantage fade-in">
              <div className="advantage-icon">
                <span>{advantage.icon}</span>
              </div>
              <h3>{advantage.title}</h3>
              <p>{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
