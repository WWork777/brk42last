"use client";

import React from "react";
import "../styles/components/_heroSection.scss";

const HeroSection = () => {
  const scrollToContacts = () => {
    const contactSection = document.getElementById("contacts");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="container hero-section">
      <div className="container">
        <div className="hero-content">
          <h1>
            Вы заметили, что качество воды из артезианской скважины ухудшается?{" "}
            <br></br>
            Она мутнеет, её стало меньше?
          </h1>
          <h2>
            Это верные признаки того, что требуется ремонт скважины на воду.
          </h2>
          <p>
            Обратитесь к профессионалам, чтобы восстановить стабильный доступ к
            чистой воде.
          </p>
          <button className="btn btn-primary" onClick={scrollToContacts}>
            Заказать ремонт
          </button>
        </div>
      </div>
    </section>
  );
};

export default React.memo(HeroSection);
