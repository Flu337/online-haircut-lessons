import React from "react";

const Program = () => {
  return (
    <section id="program">
      <h2>Программа курсов</h2>
      <div className="program-list">
        <div className="program-item">
          <h3>Модуль 1: Основы парикмахерского искусства</h3>
          <p>Изучение базовых техник стрижки и укладки.</p>
        </div>
        <div className="program-item">
          <h3>Модуль 2: Окрашивание волос</h3>
          <p>Теория и практика цветового дизайна.</p>
        </div>
        <div className="program-item">
          <h3>Модуль 3: Уход за волосами</h3>
          <p>Современные методы ухода и восстановления.</p>
        </div>
      </div>
    </section>
  );
};

export default Program;
