import React, { useState, useEffect } from "react";
import HomePage from "./pages/HomePage/HomePage";
import "./styles/App.css"; // Основные стили
import "./styles/components.css"; // Стили компонентов

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Проверяем сохраненную тему или системные настройки
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
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

  return <HomePage theme={theme} toggleTheme={toggleTheme} />;
}

export default App;