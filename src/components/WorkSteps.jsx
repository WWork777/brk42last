"use client";

import React from "react";
import "../styles/components/_workSteps.scss";

const WorkSteps = () => {
  const steps = [
    {
      id: 1,
      title: "Получение заявки",
      description:
        "Обработаем ваше обращение через формы на сайте или по телефону",
    },
    {
      id: 2,
      title: "Составление сметы",
      description: "Составим полную смету стоимости работ и материалов",
    },
    {
      id: 3,
      title: "Выезд специалиста",
      description: "Специалсит бесплатно выезжает на осмотр вашего участка",
    },
    {
      id: 4,
      title: "Проведение буровых работ",
      description: "Выезд бригады с техникой и бурение скважины",
    },
    {
      id: 5,
      title: "Установка оборудования",
      description:
        "Установка необходимого оборудования и обустройство скважины",
    },
    {
      id: 6,
      title: "Приемка работ",
      description:
        "Подписание акта выполненых работ, выдача паспорта на скважину, проведение денежных расчётов",
    },
  ];

  return (
    <div className="work-steps-section">
      <div className="container">
        <h2 className="section-title">Этапы работ</h2>
        <p className="section-description">
          Кратко и доступно о наших услугах по бурению скважин — от анализа
          участка до установки оборудования. Гарантия наличия воды и долговечной
          работы.
        </p>
        <div className="row">
          {steps.map((step) => (
            <div key={step.id} className="col-md-4 col-sm-6">
              <div className="work-step-card">
                <div className="step-number">
                  {step.id < 10 ? `0${step.id}` : step.id}
                </div>
                <div className="step-container">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkSteps;
