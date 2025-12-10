import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "loading", message: "Отправка заявки..." });

    // Имитация отправки данных
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus({
        type: "success",
        message:
          "Заявка успешно отправлена! Мы свяжемся с вами в течение часа.",
      });

      // Очистка формы
      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
      });

      // Скрываем сообщение об успехе через 5 секунд
      setTimeout(() => {
        setStatus({ type: "", message: "" });
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="form-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Оставьте <span className="text-gradient">заявку</span>
          </h2>
          <p className="section-subtitle">
            Получите консультацию по подбору курса и пробный урок бесплатно
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="name" className="form-label">
              Ваше имя
            </label>
          </div>

          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="email" className="form-label">
              Email
            </label>
          </div>

          <div className="form-group">
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input"
              placeholder=" "
              required
            />
            <label htmlFor="phone" className="form-label">
              Телефон
            </label>
          </div>

          <div className="form-group">
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Выберите курс</option>
              <option value="basic">Парикмахерское искусство (Базовый)</option>
              <option value="pro">
                Парикмахерское искусство (Профессионал)
              </option>
              <option value="premium">
                Парикмахерское искусство (Премиум)
              </option>
            </select>
          </div>

          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Отправка..." : "Получить консультацию"}
          </button>

          {status.type === "success" && (
            <div className="success">
              <span>✓</span>
              {status.message}
            </div>
          )}

          {status.type === "error" && (
            <div className="error">{status.message}</div>
          )}

          <p
            style={{
              fontSize: "0.9rem",
              color: "#718096",
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
