"use client";

import Slider from "react-slick";
import React, { useState, useEffect } from "react";
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

  const validateForm = () => {
    const newErrors = { name: "", phone: "", location: "" };
    let valid = true;

    if (!contactForm.name.trim()) {
      newErrors.name = "Имя обязательно.";
      valid = false;
    }

    if (!contactForm.phone.trim()) {
      newErrors.phone = "Телефон обязателен.";
      valid = false;
    }

    if (contactForm.location.trim().length < 6) {
      newErrors.location = "Место бурения должно быть не менее 6 символов.";
      valid = false;
    }

    if (!/^89\d{9}$/.test(contactForm.phone)) {
      newErrors.phone = "Телефон должен начинаться с 89 и содержать 11 цифр.";
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
            name: contactForm.name,
            phone: contactForm.phone,
            location: contactForm.location,
            selectedPipe,
            depth,
            includeEquipment,
            selectedSetup,
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

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2, // Показываем 3 слайда

    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Для мобильных
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024, // Для планшетов
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
      note: "Гарантия 5 лет, срок эксплуатации 50 лет.",
      img: "/images/труба_пластик.webp",
    },
    {
      id: 2,
      title: "Пластик НПВХ ГОСТ d 125 мм и d 90 мм",
      description:
        "Бурение артезианской скважины с двумя обсадными колоннами. (гарантия 10 лет, срок эксплуатации 50 лет)",
      diameter: "125 мм и 90 мм",
      price: currentSite.priceBurenie2,
      note: "Гарантия 10 лет, срок эксплуатации 50 лет.",
      img: "/images/труба_пластикпластик.webp",
    },
    {
      id: 3,
      title: "Сталь d 127-133 мм",
      description:
        "Бурение артезианской скважины с одной обсадной колонной. (гарантия до 3 лет, срок эксплуатации 10 лет)",
      diameter: "127-133 мм",
      price: currentSite.priceBurenie,
      note: "Гарантия до 3 лет, срок эксплуатации 10 лет.",
      img: "/images/труба_железо_1слой.webp",
    },
    {
      id: 4,
      title: "Сталь d 127-133 мм и НПВХ d 90 мм",
      description:
        "Бурение артезианской скважины с двумя обсадными колоннами. (гарантия до 3 лет, срок эксплуатации 10 лет)",
      diameter: "127-133 мм и 90 мм",
      price: currentSite.priceBurenie2,
      note: "Гарантия до 3 лет, срок эксплуатации до 10 лет.",
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
      description:
        "Идеально подходит для летнего использования. Система автоматики обеспечивает стабильную работу.",
      price: 40000,
      img: "/images/summer_version.webp",
    },
    {
      id: 3,
      title: "Круглогодичный вариант через адаптер (Рекомендуем)",
      description:
        "Оптимальный выбор для зимнего использования. Установка через адаптер с утеплением труб.",
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
        { name: "Насос Беламос 65/3", quantity: 1, price: 23700 },
        { name: "Обратный клапан", quantity: 1, price: 1 },
        { name: "Муфта латунная", quantity: 1, price: 1 },
        { name: "Зажимы нерж", quantity: 4, price: 1 },
        { name: "Трос нерж", quantity: 22, price: 1 },
        { name: "Труба ПНД", quantity: 22, price: 1 },
        { name: "Кабель", quantity: 10, price: 1 },
        { name: "Изолента", quantity: 1, price: 1 },
        { name: "Оголовок", quantity: 1, price: 1 },
        { name: "Вилка", quantity: 1, price: 1 },
        { name: "Сливной клапан", quantity: 1, price: 1 },
      ],
    },
    60: {
      total: 29300,
      items: [
        { name: "Насос Беламос 90/3", quantity: 1, price: 0 },
        { name: "Обратный клапан", quantity: 1, price: 0 },
        { name: "Муфта латунная", quantity: 1, price: 0 },
        { name: "Зажимы нерж", quantity: 4, price: 0 },
        { name: "Трос нерж", quantity: 32, price: 0 },
        { name: "Труба ПНД", quantity: 32, price: 0 },
        { name: "Изолента", quantity: 1, price: 0 },
        { name: "Оголовок", quantity: 1, price: 0 },
        { name: "Вилка", quantity: 1, price: 0 },
        { name: "Сливной клапан", quantity: 1, price: 0 },
      ],
    },
    70: {
      total: 32000,
      items: [
        { name: "Насос Беламос 90/3", quantity: 1, price: 18500 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 42, price: 3570 },
        { name: "Труба ПНД", quantity: 42, price: 2730 },
        { name: "Изолента", quantity: 1, price: 100 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
    80: {
      total: 34000,
      items: [
        { name: "Насос Беламос 115/3", quantity: 1, price: 18500 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 52, price: 4420 },
        { name: "Труба ПНД", quantity: 52, price: 3380 },
        { name: "Кабель", quantity: 10, price: 600 },
        { name: "Изолента", quantity: 2, price: 200 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
    90: {
      total: 35800,
      items: [
        { name: "Насос Беламос 115/3", quantity: 1, price: 22500 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 62, price: 5270 },
        { name: "Труба ПНД", quantity: 62, price: 4030 },
        { name: "Кабель", quantity: 10, price: 600 },
        { name: "Изолента", quantity: 3, price: 300 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
    100: {
      total: 42400,
      items: [
        { name: "Насос Беламос 140/3", quantity: 1, price: 22500 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 72, price: 6120 },
        { name: "Труба ПНД", quantity: 72, price: 4680 },
        { name: "Кабель", quantity: 20, price: 1200 },
        { name: "Изолента", quantity: 3, price: 300 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
    115: {
      total: 45600,
      items: [
        { name: "Насос Беламос 140/3", quantity: 1, price: 26000 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 92, price: 7820 },
        { name: "Труба ПНД", quantity: 92, price: 5980 },
        { name: "Кабель", quantity: 30, price: 1800 },
        { name: "Изолента", quantity: 3, price: 300 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
    130: {
      total: 57000,
      items: [
        { name: "Насос Беламос 160/3", quantity: 1, price: 26000 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 92, price: 7820 },
        { name: "Труба ПНД", quantity: 92, price: 5980 },
        { name: "Кабель", quantity: 30, price: 1800 },
        { name: "Изолента", quantity: 3, price: 300 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
    200: {
      total: 80000,
      items: [
        { name: "Насос Беламос 160/3", quantity: 1, price: 26000 },
        { name: "Обратный клапан", quantity: 1, price: 1000 },
        { name: "Муфта латунная", quantity: 1, price: 800 },
        { name: "Зажимы нерж", quantity: 4, price: 600 },
        { name: "Трос нерж", quantity: 92, price: 7820 },
        { name: "Труба ПНД", quantity: 92, price: 5980 },
        { name: "Кабель", quantity: 30, price: 1800 },
        { name: "Изолента", quantity: 3, price: 300 },
        { name: "Оголовок", quantity: 1, price: 2500 },
        { name: "Вилка", quantity: 1, price: 300 },
        { name: "Сливной клапан", quantity: 1, price: 1000 },
      ],
    },
  };

  const calculateCost = () => {
    if (!selectedPipe) return 0; // Если труба не выбрана, стоимость равна 0.

    // Расчёт стоимости трубы
    const pipeCost = selectedPipe.price * depth;

    // Учитываем комплект оборудования только если он включён
    const equipmentCost = includeEquipment
      ? calculateEquipmentCost(depth).total
      : 0;

    // Расчёт стоимости обустройства
    const setupCost = selectedSetup ? selectedSetup.price : 0;

    // Итоговая стоимость
    return pipeCost + equipmentCost + setupCost;
  };

  const calculateCostDepth = () => {
    if (!selectedPipe) return 0; // Если труба не выбрана, стоимость равна 0.

    // Расчёт стоимости трубы
    const pipeCost = selectedPipe.price * depth;

    // Итоговая стоимость
    return pipeCost;
  };

  const toggleSetupSelection = (setup) => {
    setSelectedSetup((prev) => (prev?.id === setup.id ? null : setup));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Разрешаем ввод только цифр и начинаем с 89
      if (!/^\d*$/.test(value)) {
        return; // Игнорируем ввод, если это не цифра
      }

      // Ограничиваем длину до 11 символов
      if (value.length > 11) {
        return;
      }
    }

    setContactForm((prev) => ({ ...prev, [name]: value }));
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
            Скважина на песок является негарантийной и не по ГОСТу. Скважину на
            песок не бурим!
          </p>
        </div>

        {/* Шаг 1 */}
        <div className="calculator container py-5">
          <div className="">
            <h3 className=" step-title mb-3">
              Шаг 1. Выберите конструкцию скважины
            </h3>
            <Slider {...carouselSettings}>
              {pipes.map((pipe) => (
                <div key={pipe.id}>
                  <div
                    onClick={() => setSelectedPipe(pipe)}
                    className={`pipe-card ${
                      selectedPipe?.id === pipe.id ? "selected" : ""
                    }`}
                  >
                    <div className="pipe-content d-flex align-items-center">
                      {/* Картинка слева */}
                      <div>
                        <div className="pipe-image me-3">
                          <img
                            src={pipe.img}
                            alt={pipe.title}
                            className="img-fluid"
                          />
                        </div>
                      </div>

                      {/* Текст справа */}
                      <div className="pipe-text">
                        <h4>{pipe.title}</h4>
                        <p>{pipe.description}</p>
                        <div className="price">{pipe.price} ₽</div>
                        <small>{pipe.warranty}</small>

                        <button className="btn-select btn btn-warning">
                          {selectedPipe?.id === pipe.id ? "Выбрано" : "Выбрать"}
                          {selectedPipe?.id === pipe.id && (
                            <i className="bi bi-check-lg m-2"></i>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Шаг 2 */}
        <div className="mb-5 container">
          <h3 className="step-title  ">Шаг 2. Выберите глубину скважины</h3>
          <div className="depth-selector ">
            {/* Ползунок */}
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

            {/* Значения глубины */}
          </div>
        </div>

        <div className="container total-cost mt-4">
          <h3>
            Предварительная стоимость бурения скважины:
            {selectedPipe ? (
              <span>{calculateCostDepth()} ₽</span>
            ) : (
              <span style={{ color: "red" }}>
                Конструкция скважины не выбрана (Шаг 1)
              </span>
            )}
          </h3>
        </div>

        {/* Шаг 3 */}
        <div className="container mb-5 equipment-container">
          <h3>Шаг 3. Комплект насосного оборудования для скважины</h3>
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
                    <th scope="col">Название</th>
                    <th scope="col">Количество</th>
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
                Стоимость комплекта оборудования:{" "}
                {calculateEquipmentCost(depth).total} ₽
              </h4>
            </>
          )}
        </div>

        {/* Шаг 4 */}
        <div className="calculator container py-5">
          <div className="">
            <h3 className=" step-title mb-3">
              Шаг 4. Выберите способ обустройства скважины ( необязательно )
            </h3>
            <Slider {...carouselSettings}>
              {setups.map((setup) => (
                <div key={setup.id}>
                  <div
                    onClick={() => toggleSetupSelection(setup)}
                    className={`setup-card d-flex align-items-center ${
                      selectedSetup?.id === setup.id ? "selected" : ""
                    }`}
                  >
                    {/* Картинка слева */}
                    <div>
                      <div className="setup-image">
                        <img
                          src={setup.img}
                          alt={setup.title}
                          className="img-fluid"
                        />
                      </div>
                    </div>

                    {/* Текст справа */}
                    <div className="setup-text">
                      <h4>{setup.title}</h4>
                      <p>{setup.description}</p>
                      <div className="price">{setup.price} ₽</div>
                      <button className="btn-select btn btn-warning ">
                        {` ${
                          selectedSetup?.id === setup.id ? "Убрать" : "Выбрать"
                        }`}
                        {selectedSetup?.id === setup.id && (
                          <i className="bi bi-x-lg m-2"></i>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>

        {/* Итоговая стоимость */}
        <div className="container total-cost mt-4">
          <h3>
            Предварительная стоимость скважины под ключ (без учета земельных
            работ):
            <span>{calculateCost()} ₽</span>
          </h3>
        </div>

        {/* Форма */}
        <div className="container contact-form mt-5">
          <div className="row">
            {/* Текст слева */}
            <div className="col-md-6">
              <h4>
                Свяжитесь с нами, чтобы получить подробную консультацию инженера
                и выезд на объект бесплатно
              </h4>
            </div>

            {/* Форма справа */}
            <div className="col-md-6">
              <form onSubmit={handleFormSubmit} className="row" noValidate>
                {/* Поле для имени */}
                {/* <div className="col-12 mb-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ваше имя"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    className={`form-control ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    required
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div> */}

                {/* Поле для телефона */}
                {/* <div className="col-12 mb-3">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Ваш телефон"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    pattern="89\d{9}"
                    maxLength="11"
                    className={`form-control ${
                      errors.phone ? "is-invalid" : ""
                    }`}
                    required
                  />
                  {errors.phone && (
                    <div className="invalid-feedback">{errors.phone}</div>
                  )}
                </div> */}

                {/* Поле для места бурения */}
                {/* <div className="col-12 mb-3">
                  <input
                    type="text"
                    name="location"
                    placeholder="Место бурения"
                    value={contactForm.location}
                    onChange={handleContactChange}
                    className={`form-control ${
                      errors.location ? "is-invalid" : ""
                    }`}
                    required
                  />
                  {errors.location && (
                    <div className="invalid-feedback">{errors.location}</div>
                  )}
                </div> */}

                {/* Кнопка отправки */}
                <div className="col-12 text-center">
                  <Link
                    href="tel:+7 (960) 925-08-70"
                    className="btn btn-warning"
                  >
                    Позвонить нам
                  </Link>
                </div>
                <div className="col-12 text-center">
                  <Link
                    href="https://wa.me/79609250870"
                    className="btn btn-warning"
                  >
                    Написать в WhatsApp
                  </Link>
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
