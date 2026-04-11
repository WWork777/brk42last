"use client";

import Slider from "react-slick";
import React, { useState, useEffect, useRef } from "react";
import "../styles/components/_calculator.scss";
import { getCurrentSiteConfig } from "@/constants/city";
import Link from "next/link";

const Calculator = () => {
  const [selectedPipe, setSelectedPipe] = useState(null);
  const [depth, setDepth] = useState(30);
  const [selectedSetup, setSelectedSetup] = useState(null);
  const [includeEquipment, setIncludeEquipment] = useState(true);
  const [contactForm, setContactForm] = useState({
    phone: "",
    name: "",
    location: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const formatPhoneNumber = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, ""); // Оставляем только цифры
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 2) return `+7 (`;
    if (phoneNumberLength < 5) {
      return `+7 (${phoneNumber.slice(1)}`;
    }
    if (phoneNumberLength < 8) {
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4)}`;
    }
    if (phoneNumberLength < 10) {
      return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7)}`;
    }
    return `+7 (${phoneNumber.slice(1, 4)}) ${phoneNumber.slice(4, 7)}-${phoneNumber.slice(7, 9)}-${phoneNumber.slice(9, 11)}`;
  };

  // Refs для слайдеров
  const pipeSliderRef = useRef(null);
  const setupSliderRef = useRef(null);

  const validateForm = () => {
    const newErrors = { name: "", phone: "", location: "" };
    let valid = true;

    if (!contactForm.name.trim()) {
      newErrors.name = "Имя обязательно.";
      valid = false;
    }

    // Проверка длины маскированного телефона (всегда 18 символов с учетом +7...)
    if (contactForm.phone.length < 18) {
      newErrors.phone = "Введите полный номер телефона.";
      valid = false;
    }

    if (contactForm.location.trim().length < 6) {
      newErrors.location = "Место бурения должно быть не менее 6 символов.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("/api/sendRequest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: currentSite.city || "Кемерово",
            name: contactForm.name,
            phone: contactForm.phone,
            location: contactForm.location,
            selectedPipe: selectedPipe?.title || "Не выбрана",
            depth: depth,
            includeEquipment: includeEquipment ? "Включён" : "Выключен",
            selectedSetup: selectedSetup?.title || "Не выбран",
            totalPrice: calculateCost(),
          }),
        });

        if (response.ok) {
          alert("Заявка успешно отправлена!");
          setContactForm({ name: "", phone: "", location: "" });
          setSelectedPipe(null);
          setDepth(30);
          setIncludeEquipment(true);
          setSelectedSetup(null);
        } else {
          alert("Ошибка при отправке заявки");
        }
      } catch (error) {
        alert("Ошибка подключения к серверу");
      }
    }
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="custom-arrow custom-next"
        onClick={onClick}
        aria-label="Next Slide"
      >
        <i className="bi bi-chevron-right"></i>
      </button>
    );
  };

  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        className="custom-arrow custom-prev"
        onClick={onClick}
        aria-label="Previous Slide"
      >
        <i className="bi bi-chevron-left"></i>
      </button>
    );
  };

  const pipeSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots) => (
      <div className="pagination-wrapper">
        <ul className="custom-dots-list">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button className="custom-dot" aria-label={`Перейти к слайду ${i + 1}`}>
        <span></span>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const setupSliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    dotsClass: "slick-dots custom-dots",
    appendDots: (dots) => (
      <div className="pagination-wrapper">
        <ul className="custom-dots-list">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button className="custom-dot" aria-label={`Перейти к слайду ${i + 1}`}>
        <span></span>
      </button>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  const [currentSite, setCurrentSite] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    setCurrentSite(getCurrentSiteConfig(hostname));

    const handlePopState = () => {
      setCurrentSite(getCurrentSiteConfig(window.location.hostname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const pipes = [
    {
      id: 1,
      title: "Пластик НПВХ ГОСТ d 125 мм ",
      description:
        "Бурение артезианской скважины с одной обсадной колонной. (гарантия 5 лет, срок эксплуатации 50 лет)",
      diameter: "125 мм",
      price: currentSite.priceBurenie,
      img: "/images/труба_пластик.webp",
    },
    {
      id: 2,
      title: "Пластик НПВХ ГОСТ d 125 мм и d 90 мм",
      description:
        "Бурение артезианской скважины с двумя обсадными колоннами. (гарантия 10 лет, срок эксплуатации 50 лет)",
      diameter: "125 мм и 90 мм",
      price: currentSite.priceBurenie2,
      img: "/images/труба_пластикпластик.webp",
    },
    {
      id: 3,
      title: "Сталь d 127-133 мм",
      description:
        "Бурение артезианской скважины с одной обсадной колонной. (гарантия до 3 лет, срок эксплуатации 10 лет)",
      diameter: "127-133 мм",
      price: currentSite.priceBurenie,
      img: "/images/труба_железо_1слой.webp",
    },
    {
      id: 4,
      title: "Сталь d 127-133 мм и НПВХ d 90 мм",
      description:
        "Бурение артезианской скважины с двумя обсадными колоннами. (гарантия до 3 лет, срок эксплуатации 10 лет)",
      diameter: "127-133 мм и 90 мм",
      price: currentSite.priceBurenie2,
      img: "/images/труба_железо_2слоя.webp",
    },
  ];

  const setups = [
    {
      id: 1,
      title: "Круглогодичный вариант подземный павильон",
      description: "Лучший вариант и выбор для зимнего использования.",
      price: 80000,
      img: "/images/paviloyn.png",
    },
    {
      id: 2,
      title: "Летний вариант с системой автоматики",
      description: "Идеально подходит для летнего использования.",
      price: 40000,
      img: "/images/summer_version.webp",
    },
    {
      id: 3,
      title: "Круглогодичный вариант через адаптер (Рекомендуем)",
      description: "Оптимальный выбор для зимнего использования.",
      price: 80000,
      img: "/images/adapter_version.webp",
    },
    {
      id: 4,
      title: "Круглогодичный вариант Кессон (Не рекомендуем)",
      description:
        "Классический вариант с копкой колодца и установкой кессона.",
      price: 140000,
      img: "/images/caisson_version.webp",
    },
  ];

  const equipmentData = {
    45: {
      total: 23700,
      items: [
        { name: "Насос Беламос 65/3", quantity: 1 },
        { name: "Трос нерж", quantity: 22 },
        { name: "Труба ПНД", quantity: 22 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    60: {
      total: 29300,
      items: [
        { name: "Насос Беламос 90/3", quantity: 1 },
        { name: "Трос нерж", quantity: 32 },
        { name: "Труба ПНД", quantity: 32 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    70: {
      total: 32000,
      items: [
        { name: "Насос Беламос 90/3", quantity: 1 },
        { name: "Трос нерж", quantity: 42 },
        { name: "Труба ПНД", quantity: 42 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    80: {
      total: 34000,
      items: [
        { name: "Насос Беламос 115/3", quantity: 1 },
        { name: "Трос нерж", quantity: 52 },
        { name: "Труба ПНД", quantity: 52 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    90: {
      total: 35800,
      items: [
        { name: "Насос Беламос 115/3", quantity: 1 },
        { name: "Трос нерж", quantity: 62 },
        { name: "Труба ПНД", quantity: 62 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    100: {
      total: 42400,
      items: [
        { name: "Насос Беламос 140/3", quantity: 1 },
        { name: "Трос нерж", quantity: 72 },
        { name: "Труба ПНД", quantity: 72 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    130: {
      total: 57000,
      items: [
        { name: "Насос Беламос 160/3", quantity: 1 },
        { name: "Трос нерж", quantity: 92 },
        { name: "Труба ПНД", quantity: 92 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
    200: {
      total: 80000,
      items: [
        { name: "Насос Беламос 160/3", quantity: 1 },
        { name: "Трос нерж", quantity: 120 },
        { name: "Труба ПНД", quantity: 120 },
        { name: "Оголовок", quantity: 1 },
      ],
    },
  };

  const calculateCost = () => {
    if (!selectedPipe) return 0;
    const pipeCost = selectedPipe.price * depth;
    const equipmentCost = includeEquipment
      ? calculateEquipmentCost(depth).total
      : 0;
    const setupCost = selectedSetup ? selectedSetup.price : 0;
    return pipeCost + equipmentCost + setupCost;
  };

  const calculateCostDepth = () =>
    selectedPipe ? selectedPipe.price * depth : 0;

  const toggleSetupSelection = (setup) => {
    setSelectedSetup((prev) => (prev?.id === setup.id ? null : setup));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Применяем маску при вводе
      const formattedValue = formatPhoneNumber(value);
      setContactForm((prev) => ({ ...prev, phone: formattedValue }));
    } else {
      setContactForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateEquipmentCost = (depth) => {
    if (depth <= 45) return equipmentData[45];
    if (depth <= 60) return equipmentData[60];
    if (depth <= 70) return equipmentData[70];
    if (depth <= 80) return equipmentData[80];
    if (depth <= 90) return equipmentData[90];
    if (depth <= 100) return equipmentData[100];
    if (depth <= 130) return equipmentData[130];
    return equipmentData[200];
  };

  return (
    <div className="calculator py-5" id="calculator">
      <div className="container-fluid">
        <div className="container">
          <h2 className="section-title">Калькулятор</h2>
          <p className="calculator-description">
            Рассчитайте стоимость вашей скважины, кроме скважины на песок.
            Скважину на песок не бурим!
          </p>
        </div>

        {/* Шаг 1 */}
        <div className="calculator container py-5">
          <div className="slider-section">
            <h3 className="step-title mb-3">
              Шаг 1. Выберите конструкцию скважины
            </h3>
            <div className="slider-container">
              <Slider ref={pipeSliderRef} {...pipeSliderSettings}>
                {pipes.map((pipe) => (
                  <div key={pipe.id}>
                    <div
                      onClick={() => setSelectedPipe(pipe)}
                      className={`pipe-card ${selectedPipe?.id === pipe.id ? "selected" : ""}`}
                    >
                      <div className="pipe-content d-flex align-items-center">
                        <div className="pipe-image me-3">
                          <img
                            src={pipe.img}
                            alt={pipe.title}
                            className="img-fluid"
                          />
                        </div>
                        <div className="pipe-text">
                          <h4>{pipe.title}</h4>
                          <p>{pipe.description}</p>
                          <div className="price">{pipe.price} ₽</div>
                          <button className="btn-select btn btn-warning">
                            {selectedPipe?.id === pipe.id
                              ? "Выбрано"
                              : "Выбрать"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* Шаг 2 */}
        <div className="mb-5 container">
          <h3 className="step-title">Шаг 2. Выберите глубину скважины</h3>
          <div className="depth-selector">
            <div className="depth-values d-flex justify-content-between mb-5">
              <span className="depth-label">30 м</span>
              <span className="depth-value">{depth} м</span>
              <span className="depth-label">200 м</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              value={depth}
              onChange={(e) => setDepth(Number(e.target.value))}
              className="form-range depth-range"
            />
          </div>
        </div>

        <div className="container total-cost mt-4">
          <h3>
            Предварительная стоимость бурения скважины:{" "}
            {selectedPipe ? (
              <span>{calculateCostDepth()} ₽</span>
            ) : (
              <span style={{ color: "red" }}>Конструкция не выбрана</span>
            )}
          </h3>
        </div>

        {/* Шаг 3 */}
        <div className="container mb-5 equipment-container">
          <h3>Шаг 3. Комплект насосного оборудования</h3>
          <div className="form-check">
            <input
              type="checkbox"
              id="includeEquipment"
              checked={includeEquipment}
              onChange={(e) => setIncludeEquipment(e.target.checked)}
              className="form-check-input"
            />
            <label htmlFor="includeEquipment" className="form-check-label">
              Включить комплект оборудования
            </label>
          </div>
          {includeEquipment && (
            <>
              <h4>Состав комплекта:</h4>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Название</th>
                    <th>Количество</th>
                  </tr>
                </thead>
                <tbody>
                  {calculateEquipmentCost(depth).items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.quantity} шт.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h4 className="total-cost">
                Стоимость комплекта: {calculateEquipmentCost(depth).total} ₽
              </h4>
            </>
          )}
        </div>

        {/* Шаг 4 */}
        <div className="calculator container py-5">
          <div className="slider-section">
            <h3 className="step-title mb-3">
              Шаг 4. Обустройство (необязательно)
            </h3>
            <div className="slider-container">
              <Slider ref={setupSliderRef} {...setupSliderSettings}>
                {setups.map((setup) => (
                  <div key={setup.id}>
                    <div
                      onClick={() => toggleSetupSelection(setup)}
                      className={`setup-card d-flex align-items-center ${selectedSetup?.id === setup.id ? "selected" : ""}`}
                    >
                      <div className="setup-image me-3">
                        <img
                          src={setup.img}
                          alt={setup.title}
                          className="img-fluid"
                        />
                      </div>
                      <div className="setup-text">
                        <h4>{setup.title}</h4>
                        <div className="price">{setup.price} ₽</div>
                        <button className="btn-select btn btn-warning">
                          {selectedSetup?.id === setup.id
                            ? "Убрать"
                            : "Выбрать"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>

        {/* Итоговая стоимость */}
        <div className="container total-cost mt-4">
          <h3>
            Предварительная стоимость под ключ: <span>{calculateCost()} ₽</span>
          </h3>
        </div>

        {/* Форма обратной связи */}
        <div className="container contact-form mt-5">
          <div className="row">
            <div className="col-md-5">
              <h4>
                Свяжитесь с нами для консультации инженера и бесплатного выезда
              </h4>
            </div>
            <div className="col-md-7">
              <form onSubmit={handleFormSubmit} className="row g-3" noValidate>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Ваше имя"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    onFocus={(e) => {
                      if (!e.target.value)
                        setContactForm((prev) => ({ ...prev, phone: "+7 (" }));
                    }}
                    className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>
                <div className="col-12 mt-3">
                  <input
                    type="text"
                    name="location"
                    value={contactForm.location}
                    onChange={handleContactChange}
                    className={`form-control ${errors.location ? "is-invalid" : ""}`}
                    placeholder="Место бурения (напр. деревня Солонечная)"
                  />
                </div>
                <div className="col-12 mt-4">
                  <button
                    type="submit"
                    className="btn btn-warning w-100 fw-bold"
                  >
                    ОТПРАВИТЬ ЗАЯВКУ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
