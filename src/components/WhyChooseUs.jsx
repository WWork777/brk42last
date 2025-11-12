"use client";

import React from "react";
import "../styles/components/_whyChooseUs.scss";

const WhyChooseUs = () => {
  const items = [
    {
      icon: "bi-person-fill",
      title: "Собственный штат",
      description:
        "У нас нет сезонных рабочих. В нашем штате буровые мастера с большим опытом работы.",
    },
    {
      icon: "bi-gear-fill",
      title: "Оборудование",
      description: "Мы используем собственную и современную технику.",
    },
    {
      icon: "bi-award-fill",
      title: "Большой опыт",
      description:
        "Наши специалисты обладают большим опытом и занимаются любимым делом не первый год.",
    },
    {
      icon: "bi-clock-fill",
      title: "Бурим без очереди",
      description:
        "Бурение скважин на воду без очереди. Компания располагает собственным автопарком и бригадами.",
    },
  ];

  return (
    <div className="why-choose-us-section container">
      <div className="">
        <h2 className="section-title">Почему с нами стоит сотрудничать?</h2>
        <div className="row">
          {items.map((item, index) => (
            <div className="col-md-3 col-sm-6" key={index}>
              <div className="info-box">
                <i className={`icon ${item.icon}`}></i>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
