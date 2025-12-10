import React, { useState, useEffect } from "react";
import Hero from "./components/Hero";
import Advantages from "./components/Advantages";
import Program from "./components/Program";
import Teachers from "./components/Teachers";
import Formats from "./components/Formats";
import Cost from "./components/Cost";
import FAQ from "./components/FAQ";
import Reviews from "./components/Reviews";
import Contacts from "./components/Contacts";
import Navigation from "./components/Navigation";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/App.css"; // Основные стили
import "./styles/components.css"; // Стили компонентов

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.body.setAttribute("data-theme", initialTheme);

    // Добавляем класс для плавного перехода
    document.body.classList.add("theme-transition");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Добавляем анимацию переключения
    document.body.classList.add("theme-changing");
    setTimeout(() => {
      document.body.classList.remove("theme-changing");
    }, 300);
  };

  return (
    <div className="App">
      {/* Навигационное меню */}
      <Navigation theme={theme} toggleTheme={toggleTheme} />

      {/* Основные секции */}
      <section id="hero-section" className="hero-section">
        <Hero />
      </section>

      <section id="pricing-section" className="pricing-section">
        <Advantages />
      </section>

      <section id="program-section" className="program-section">
        <Program />
      </section>

      <section id="teachers-section" className="teachers-section">
        <Teachers />
      </section>

      <section id="formats-section" className="formats-section">
        <Formats />
      </section>

      <section id="cost-section" className="cost-section">
        <Cost />
      </section>

      <section id="faq-section" className="faq-section">
        <FAQ />
      </section>

      <section id="reviews-section" className="reviews-section">
        <Reviews />
      </section>

      <section id="contacts-section" className="contacts-section">
        <Contacts />
      </section>

      {/* Плавающая кнопка для быстрого переключения темы */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}

export default App;
