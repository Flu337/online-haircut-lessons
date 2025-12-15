import React, { useEffect, useRef } from "react";
import floatingImage from "../styles/img/image copy.png";
import floatingImage2 from "../styles/img/image.png";
import floatingImage3 from "../styles/img/image copy 2.png";
import heroImage from "../styles/img/image copy 3.png";

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
      <div className="floating-element floating-1">
        <img src={floatingImage} alt="floating image" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px' }} />
      </div>
      <div className="floating-element floating-2">
        <img src={floatingImage2} alt="floating image 2" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px' }} />
      </div>
      <div className="floating-element floating-3">
        <img src={floatingImage3} alt="floating image 3" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '30px' }} />
      </div>

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
        <img src={heroImage}
          alt="Парикмахерское искусство"
        />
      </div>
    </section>
  );
};

export default Hero;
