"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "../styles/components/_drillingTypes.scss";
import models from "../constants/models";
import Model3DModal from "./Model3DModal";

const DrillingTypes2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionStates, setAccordionStates] = useState({}); // Состояние аккордеонов для каждого слайда
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0); // Текущий индекс слайда
  const [currentModel, setCurrentModel] = useState(models.lime);

  // Выбираем только нужные модели для отображения
  const availableModels = [
    models.lime,
    models.limeType1,
    models.limeType2,
    models.sand,
  ];

  // Определяем, мобильное ли устройство
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const CustomArrow = ({ direction, onClick }) => (
    <button
      className={`custom-arrow custom-${direction}`}
      onClick={onClick}
      aria-label={direction === "next" ? "Следующий слайд" : "Предыдущий слайд"}
      style={{ [direction === "next" ? "right" : "left"]: "-20px" }}
    >
      <i
        className={`bi bi-chevron-${direction === "next" ? "right" : "left"}`}
      ></i>
    </button>
  );

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 1500,
    slidesToShow: 1,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => {
      // Закрываем аккордеон на предыдущем слайде перед переходом
      if (oldIndex !== newIndex) {
        setAccordionStates((prev) => ({
          ...prev,
          [oldIndex]: false,
        }));
      }
      setActiveSlideIndex(newIndex);
      setCurrentModel(availableModels[newIndex]);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Переключение аккордеона для конкретного слайда (по индексу)
  const toggleAccordion = (index) => {
    setAccordionStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Проверка, открыт ли аккордеон для конкретного слайда (по индексу)
  const isAccordionOpen = (index) => {
    return !!accordionStates[index];
  };

  // Аккордеон для мобильных
  const renderMobileAccordion = (model, index) => (
    <>
      <h3 className="slide-title">{model.title}</h3>
      <div className="accordion">
        <button
          type="button"
          className={isAccordionOpen(index) ? "expanded" : ""}
          onClick={() => toggleAccordion(index)}
          aria-expanded={isAccordionOpen(index)}
        >
          <span>Подробнее о скважине</span>
          <i className="bi bi-chevron-down"></i>
        </button>
        {isAccordionOpen(index) && (
          <div className="accordion-content">
            <p className="slide-description">{model.description}</p>

            {model.specs && (
              <div className="slide-specs">
                <div className="row">
                  {model.specs.map((spec, idx) => (
                    <div key={idx} className="col-md-4 spec-item">
                      <i className={`bi ${spec.icon}`}></i>
                      <span className="spec-label">{spec.label}</span>
                      <span className="spec-value">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {model.filterDetails && (
              <div className="filter-details mt-3">
                <p>
                  <strong>Обсадная труба:</strong> {model.filterDetails}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );

  // Полный вывод для десктопа
  const renderDesktopContent = (model) => (
    <>
      <h3 className="slide-title">{model.title}</h3>
      <p className="slide-description">{model.description}</p>

      {model.specs && (
        <div className="slide-specs">
          <div className="row">
            {model.specs.map((spec, index) => (
              <div key={index} className="col-md-4 spec-item">
                <i className={`bi ${spec.icon}`}></i>
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {model.filterDetails && (
        <div className="filter-details mt-3">
          <p>
            <strong>Обсадная труба:</strong> {model.filterDetails}
          </p>
        </div>
      )}
    </>
  );

  // Проверка, есть ли 3D модель у скважины
  const has3DModel = (model) => {
    return model.embed?.src || model.url;
  };

  return (
    <section className="drilling-types-section" aria-labelledby="section-title">
      <div className="container">
        <h2 id="section-title" className="section-title">
          Типы скважин для Вашего участка
        </h2>
        <Slider {...carouselSettings}>
          {availableModels.map((model, index) => (
            <div
              key={`${model.category}-${index}`}
              role="region"
              aria-label={`Слайд: ${model.title}`}
            >
              <div className="row align-items-center drilling-slide">
                {/* Левая колонка — изображение и кнопка 3D */}
                <div className="col-md-4 canvas-container">
                  <div className="image-container">
                    <Image
                      src={model.imageUrl}
                      alt={`3D модель: ${model.title}`}
                      className="model-image"
                      width={400}
                      height={300}
                      quality={80}
                      style={{ width: "100%", height: "auto" }}
                      priority
                    />
                    {/* Кнопка "Смотреть в 3D" только если есть 3D модель */}
                    {has3DModel(model) && (
                      <button
                        type="button"
                        className="btn-3d-view"
                        onClick={() => setIsModalOpen(true)}
                        aria-label={`Открыть 3D-модель: ${model.title}`}
                      >
                        <i
                          className="bi bi-play-circle"
                          style={{ marginRight: ".5rem" }}
                        ></i>
                        <span>Смотреть в 3D</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Правая колонка — слайдер с информацией */}
                <div className="col-md-8">
                  <div className="text-container">
                    {isMobile
                      ? renderMobileAccordion(model, index)
                      : renderDesktopContent(model)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Модальное окно 3D */}
      <Model3DModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        model={currentModel}
      />
    </section>
  );
};

export default DrillingTypes2;
