import React, { useEffect } from "react";

const Reviews = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    const elements = document.querySelectorAll(".fade-in");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const reviews = [
    {
      text: "Отличный курс! Научился многому новому. Преподаватели объясняют всё доступно, много практики и реальных примеров.",
      author: "Алексей",
      role: "студент",
      rating: 5,
    },
    {
      text: "Преподаватели - настоящие профессионалы. Курс полностью оправдал ожидания, получил все необходимые навыки для работы.",
      author: "Мария",
      role: "выпускница",
      rating: 4,
    },
    {
      text: "Очень довольна обучением! Индивидуальный подход, своевременная обратная связь и поддержка на всех этапах.",
      author: "Елена",
      role: "студентка",
      rating: 5,
    },
    {
      text: "Рекомендую всем! Курс дал мне уверенность в своих силах и помог найти работу в этой сфере.",
      author: "Дмитрий",
      role: "выпускник",
      rating: 4,
    },
  ];

  const renderStars = (rating) => {
    return "⭐".repeat(rating);
  };

  return (
    <section id="reviews" className="reviews-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Отзывы <span className="text-gradient">наших студентов</span>
          </h2>
          <p className="section-subtitle">
            Узнайте, что говорят о нас те, кто уже прошел обучение
          </p>
        </div>

        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-card fade-in">
              <div className="review-rating">{renderStars(review.rating)}</div>
              <div className="review-content">
                <p className="review-text">"{review.text}"</p>
                <div className="review-author">
                  <cite className="author-name">{review.author}</cite>
                  <span className="author-role">{review.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
