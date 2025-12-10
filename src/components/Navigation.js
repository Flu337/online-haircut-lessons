import React, { useState, useEffect } from "react";

const Navigation = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    closeMenu();
  };

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { id: "hero-section", label: "Главная", icon: "🏠" },
    { id: "pricing-section", label: "Преимущества", icon: "⭐" },
    { id: "program-section", label: "Программа курсов", icon: "📚" },
    { id: "teachers-section", label: "Преподаватели", icon: "👨‍🏫" },
    { id: "formats-section", label: "Форматы обучения", icon: "🎓" },
    { id: "cost-section", label: "Стоимость", icon: "💰" },
    { id: "faq-section", label: "FAQ", icon: "❓" },
    { id: "reviews-section", label: "Отзывы", icon: "💬" },
    { id: "contacts-section", label: "Контакты", icon: "📞" },
  ];

  return (
    <>
      {/* Burger Button */}
      <button
        className={`burger-menu-btn ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label="Открыть меню навигации"
        aria-expanded={isOpen}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {/* Navigation Overlay */}
      <div
        className={`nav-overlay ${isOpen ? "open" : ""}`}
        onClick={closeMenu}
      >
        <nav
          className={`navigation-menu ${isOpen ? "open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="nav-header">
            <h3 className="nav-title">Навигация</h3>
            <button
              className="nav-close-btn"
              onClick={closeMenu}
              aria-label="Закрыть меню"
            >
              ✕
            </button>
          </div>

          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.id} className="nav-item">
                <button
                  className="nav-link"
                  onClick={() => scrollToSection(item.id)}
                  aria-label={`Перейти к разделу ${item.label}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                  <span className="nav-arrow">→</span>
                </button>
              </li>
            ))}

            {/* Theme Toggle in Burger Menu */}
            <li className="nav-item">
              <button
                className="nav-link"
                onClick={toggleTheme}
                aria-label={`Переключить на ${theme === "light" ? "темную" : "светлую"} тему`}
              >
                <span className="nav-icon">
                  {theme === "light" ? "🌙" : "☀️"}
                </span>
                <span className="nav-text">
                  {theme === "light" ? "Темная тема" : "Светлая тема"}
                </span>
                <span className="nav-arrow">→</span>
              </button>
            </li>
          </ul>

          <div className="nav-footer">
            <p className="nav-subtitle">Выберите раздел для перехода</p>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;
