import React, { useState } from "react";
import { trackEvent } from "../utils/analytics";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState(""); // loading, success, error

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    // Mock API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay
      setStatus("success");
      // Mock analytics event
      console.log("Purchase event tracked");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        type="text"
        name="name"
        placeholder="Имя"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Телефон"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <button type="submit" className="btn" disabled={status === "loading"}>
        {status === "loading" ? "Отправка..." : "Купить"}
      </button>
      {status === "success" && <p className="success">Заявка отправлена!</p>}
      {status === "error" && <p className="error">Ошибка отправки.</p>}
    </form>
  );
};

export default Form;
