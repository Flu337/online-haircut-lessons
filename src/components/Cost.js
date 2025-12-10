import React, { useEffect } from "react";

const Pricing = () => {
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

  const handleBuyClick = (plan) => {
    console.log("Выбран план:", plan);
    document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
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
                onClick={() => handleBuyClick(plan.title)}
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
    </section>
  );
};

export default Pricing;
