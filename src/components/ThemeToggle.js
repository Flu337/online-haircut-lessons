import React from "react";

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      className="floating-theme-btn"
      onClick={toggleTheme}
      aria-label="Переключить тему"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;
