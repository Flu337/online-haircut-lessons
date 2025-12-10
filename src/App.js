import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/Profile/Profile"; 
import LearningPage from "./pages/LearningPage/LearningPage";
import "./styles/App.css";
import "./styles/components.css";

function App() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.body.setAttribute("data-theme", initialTheme);
    document.body.classList.add("theme-transition");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    document.body.classList.add("theme-changing");
    setTimeout(() => {
      document.body.classList.remove("theme-changing");
    }, 300);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage theme={theme} toggleTheme={toggleTheme} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/learning/:courseId" element={<LearningPage />} />
    </Routes>
  );
}

export default App;
