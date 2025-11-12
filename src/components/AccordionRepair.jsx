"use client";

import React, { useState } from "react";
import "../styles/components/_accordionSection.scss";

const AccordionSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const accordionData = [
    {
      title: "Почему могло ухудшиться качество воды из скважины?",
      content:
        "Качество воды может ухудшаться из-за плохо загерметизированных скважинных стенок. Этот вариант характерен для труб из металла, подвергающихся коррозии со временем. Прохудившиеся места могут пропускать сточные воды с песком, глиной и прочим мусором. Единственное возможное решение – это герметизация прогнивших мест с помощью новой обсадки – лучше использовать НПВХ.",
    },
    {
      title: "Проблемы артезианских скважин",
      content:
        "Артезианские скважины добывают воду с известковых горизонтов. Поэтому для них не существует проблемы с появлением песка. Чаще всего ухудшаются характеристики добываемой воды. Связано это с тем, что в результате долгой эксплуатации нарушается герметичность колонны обсадных труб. Вода из других пластов начинает поступать в водоносный слой и загрязняет продукцию. Утечки выявляют на основании данных каротажа или по результатам видеообследования состояния труб.",
    },
    {
      title: "Глубокие артскважины и ремонт",
      content:
        "В связи с тем, что артскважины более глубокие, то диаметр обсадных труб, как правило, позволяет смонтировать внутри неё новую колонну. Считается, что затраты на такой ремонт составляют 50-100% от стоимости строительства новой скважины. Восстановленные таким методом артскважины могут эксплуатироваться ещё длительное время. Известны случаи, когда после капитального ремонта артезианские скважины проработали больше 20 лет.",
    },
    {
      title: "Капитальный ремонт водозаборных скважин",
      content:
        "Капитальный ремонт водозаборных скважин – дело очень сложное и ответственное. Обычно решение о проведении ремонта принимается на техническом совещании с участием нескольких опытных специалистов, в том числе буровиков, технологов и геологов.",
    },
  ];

  return (
    <section className="accordion-section">
      <div className="container">
        <h2 className="mb-5">Почему могло ухудшиться качество воды?</h2>
        <div className="accordion">
          {accordionData.map((item, index) => (
            <div
              key={index}
              className={`accordion-item ${
                activeIndex === index ? "active" : ""
              }`}
            >
              <button
                className="accordion-title d-flex justify-content-between align-items-center"
                onClick={() => toggleAccordion(index)}
              >
                <span>{item.title}</span>
                <i
                  className={`bi ${
                    activeIndex === index ? "bi-dash-circle" : "bi-plus-circle"
                  } accordion-icon`}
                ></i>
              </button>
              <div
                className="accordion-content"
                style={{
                  maxHeight: activeIndex === index ? "300px" : "0",
                  transition: "max-height 0.3s ease",
                }}
              >
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AccordionSection;
