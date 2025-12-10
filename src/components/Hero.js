import React, { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 },
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Плавающие элементы */}
      <div className="floating-element floating-1">✂️</div>
      <div className="floating-element floating-2">💇</div>
      <div className="floating-element floating-3">🎓</div>

      <div className="hero-content">
        <h1>
          Стань{" "}
          <span className="text-gradient">профессиональным парикмахером</span>
        </h1>

        <p>
          Онлайн-курсы от ведущих мастеров индустрии.
          <br />
          Практика с первого дня, трудоустройство и поддержка после обучения.
        </p>

        <div className="hero-cta">
          <button
            className="submit-btn"
            onClick={() => handleScrollTo("pricing")}
          >
            Начать обучение
          </button>

          <button
            className="submit-btn btn-secondary"
            onClick={() => handleScrollTo("program")}
          >
            Смотреть программу
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Выпускников</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Трудоустройство</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Преподавателей</span>
          </div>
        </div>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
          alt="Парикмахерское искусство"
        />
      </div>
    </section>
  );
};

export default Hero;
