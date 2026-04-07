// DrillingTypes2.jsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "../styles/components/_drillingTypes.scss";
import models from "../constants/models";
import Model3DModal from "./Model3DModal";

const DrillingTypes2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [accordionStates, setAccordionStates] = useState({});
  const [isMobile, setIsMobile] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [currentModel, setCurrentModel] = useState(models.lime);
  const sliderRef = useRef(null);

  const availableModels = [
    models.lime,
    models.limeType1,
    models.limeType2,
    models.sand,
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Кастомные стрелки с адаптивными стилями
  const CustomArrow = ({ direction, onClick, currentSlide, slideCount }) => {
    // Показываем стрелки всегда, но дизейблим на границах
    const isDisabled =
      (direction === "prev" && currentSlide === 0) ||
      (direction === "next" && currentSlide === slideCount - 1);

    return (
      <button
        className={`custom-arrow custom-${direction} ${isDisabled ? "disabled" : ""}`}
        onClick={onClick}
        disabled={isDisabled}
        aria-label={
          direction === "next" ? "Следующий слайд" : "Предыдущий слайд"
        }
      >
        <i
          className={`bi bi-chevron-${direction === "next" ? "right" : "left"}`}
        ></i>
      </button>
    );
  };

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    loop: true,
    autoplay: false,
    arrows: true, // Включаем стрелки для всех устройств
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    beforeChange: (oldIndex, newIndex) => {
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
          arrows: true, // Включаем стрелки на мобильных
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
    ],
  };

  const toggleAccordion = (index) => {
    setAccordionStates((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const isAccordionOpen = (index) => {
    return !!accordionStates[index];
  };

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
                    <div key={idx} className="col-12 spec-item">
                      <i className={`bi ${spec.icon}`}></i>
                      <span className="spec-label">{spec.label}:</span>
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

  const has3DModel = (model) => {
    return model.embed?.src || model.url;
  };

  return (
    <section className="drilling-types-section" aria-labelledby="section-title">
      <div className="container">
        <h2 id="section-title" className="section-title">
          Типы скважин для Вашего участка
        </h2>
        <div className="slider-wrapper">
          <Slider ref={sliderRef} {...carouselSettings}>
            {availableModels.map((model, index) => (
              <div
                key={`${model.category}-${index}`}
                role="region"
                aria-label={`Слайд: ${model.title}`}
              >
                <div className="row align-items-center drilling-slide">
                  <div className="col-md-4 canvas-container">
                    <div className="image-container">
                      <Image
                        src={model.imageUrl}
                        alt={`3D модель: ${model.title}`}
                        className="model-image"
                        fill // Заполняет весь родительский div
                        sizes="(max-width: 768px) 100vw, 400px"
                        priority
                        quality={90}
                      />
                      {/* Кнопка 3D остается внутри, она будет позиционироваться поверх */}
                      {has3DModel(model) && (
                        <button
                          type="button"
                          className="btn-3d-view"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <i className="bi bi-play-circle"></i>
                          <span>Смотреть в 3D</span>
                        </button>
                      )}
                    </div>
                  </div>

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
      </div>

      <Model3DModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        model={currentModel}
      />
    </section>
  );
};

export default DrillingTypes2;
