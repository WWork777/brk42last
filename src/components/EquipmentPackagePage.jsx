import React from "react";
import "../styles/components/_equipmentPackage.scss";

const PricingTable = () => (
  <table
    className="table table-bordered"
    aria-label="Цены на комплект оборудования в зависимости от глубины погружения насоса"
  >
    <thead>
      <tr>
        <th>Глубина погружения насоса</th>
        <th>Модель насоса</th>
        <th>Цена комплекта, руб</th>
      </tr>
    </thead>
    <tbody>
      {[
        { depth: "До 30 м", model: "Беламос 65/3", price: "22 000" },
        { depth: "20-30 м", model: "Беламос 65/3", price: "29 600" },
        { depth: "30-40 м", model: "Беламос 90/3", price: "31 100" },
        { depth: "40-50 м", model: "Беламос 90/3", price: "33 300" },
        { depth: "50-60 м", model: "Беламос 115/3", price: "38 900" },
        { depth: "60-70 м", model: "Беламос 115/3", price: "41 000" },
        { depth: "70-90 м", model: "Беламос 150/3", price: "48 100" },
        { depth: "более 90", model: "Беламос 150/3", price: "От 60 000" },
      ].map((row, index) => (
        <tr key={index}>
          <td>{row.depth}</td>
          <td>{row.model}</td>
          <td>{row.price}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

const EquipmentPackagePage = () => {
  return (
    <div className="equipment-package-page">
      <div className="container">
        {/* Заголовок */}
        <header className="page-header text-center mb-5">
          <h1>Готовый комплект для установки в скважину</h1>
          <p>
            Мы предлагаем полный комплект оборудования для подачи воды из
            скважины. Вам не нужно ездить и покупать всё по отдельности!
          </p>
        </header>

        {/* Комплектация */}
        <section
          className="package-details mb-5"
          aria-labelledby="package-title"
        >
          <h2 id="package-title">Что входит в комплект?</h2>
          <ul>
            <li>
              Насос скважинный Беламос 3 м³/час с высотой подъёма 65/90/115 м —
              1 шт.
            </li>
            <li>Обратный клапан — по необходимости.</li>
            <li>Муфта латунная 1*32 для ПНД — 1 шт.</li>
            <li>Трос нержавеющий 3 мм.</li>
            <li>Зажимы нержавеющие — 4 шт.</li>
            <li>Кабель 2*1,5 или 3*1,5.</li>
            <li>Труба ПНД 32 — по необходимости.</li>
            <li>Оголовок скважинный — 1 шт.</li>
            <li>Муфты термоусадочные — 2 шт.</li>
            <li>Гильзы обжимные — 3 шт.</li>
            <li>Сливной клапан — по необходимости.</li>
            <li>Фитинги — по необходимости.</li>
          </ul>
        </section>

        {/* Таблица цен */}
        <section
          className="pricing-section mb-5"
          aria-labelledby="pricing-title"
        >
          <h2 id="pricing-title">Стоимость комплекта</h2>
          <p>
            Цена зависит от глубины погружения насоса. Все необходимые
            компоненты для монтажа включены.
          </p>
          <PricingTable />
        </section>
      </div>
    </div>
  );
};

export default EquipmentPackagePage;
