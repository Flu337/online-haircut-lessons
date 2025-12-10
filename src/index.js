import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";   // ← Добавить
import "./styles/components.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>      {/* ← ОБЯЗАТЕЛЬНО */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
