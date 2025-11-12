"use client";

import React, { useMemo, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Slider from "react-slick";
import models from "../constants/models";
import "../styles/components/_setupWells.scss";
import Image from "next/image";

// Модалка подгрузится только при первом открытии
const Model3DModal = dynamic(() => import("../components/Model3DModal"), {
  ssr: false,
});

const CustomArrow = ({ direction, onClick }) => (
  <button
    className={`custom-arrow custom-${direction}`}
    onClick={onClick}
    aria-label={direction === "next" ? "Следующий слайд" : "Предыдущий слайд"}
    style={{
      top: "50%",
      [direction === "next" ? "right" : "left"]: "-10px",
      backgroundColor: "black",
      color: "yellow",
      scale: 1.5,
    }}
  >
    <i className={`bi bi-chevron-${direction === "next" ? "right" : "left"}`} />
  </button>
);

export default function SetupWells() {
  const slides = useMemo(
    () =>
      Object.keys(models)
        .filter((key) => models[key].category === "setup")
        .map((key) => ({
          id: key,
          title: models[key].title,
          description: models[key].description,
          imageUrl: models[key].imageUrl,
          modelUrl: models[key].url,
          cost: models[key].cost,
          advantages: models[key].advantages,
          embed: models[key].embed,
          animated: models[key].animated,
        })),
    []
  );

  const [activeSlide, setActiveSlide] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalModel, setModalModel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isDescOpen, setIsDescOpen] = useState(false);
  const [isAdvOpen, setIsAdvOpen] = useState(false);

  // Определение мобильного устройства
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const carouselSettings = {
    dots: true,
    infinite: false,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    swipe: false,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    beforeChange: (_old, next) => {
      setActiveSlide(next);
      // Закрываем аккордеоны при смене слайда
      setIsDescOpen(false);
      setIsAdvOpen(false);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          swipe: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const openModal = (slide) => {
    setModalModel({
      title: slide.title,
      description: slide.description,
      url: slide.modelUrl,
      embed: slide.embed,
      animated: slide.animated,
    });
    setModalOpen(true);
  };

  return (
    <section
      className="setup-wells-section"
      aria-labelledby="setup-wells-title"
    >
      <div className="container">
        <h2 id="setup-wells-title" className="section-title">
          Обустройство скважин на воду
        </h2>

        <Slider {...carouselSettings}>
          {slides.map((slide) => (
            <div
              key={slide.id}
              role="region"
              aria-labelledby={`slide-${slide.id}`}
            >
              <div className="row slide-setup">
                {/* Левая часть: изображение и текст */}
                <div className="col-md-9 left-slide">
                  <div className="canvas-container">
                    <div className="image-container">
                      <Image
                        src={slide.imageUrl}
                        alt={`3D модель: ${slide.title}`}
                        className="model-image"
                        width={800}
                        height={600}
                        priority={false}
                      />
                      <button
                        type="button"
                        className="btn-3d-view"
                        onClick={() => openModal(slide)}
                        aria-haspopup="dialog"
                        aria-controls="modal-3d"
                      >
                        <i
                          className="bi bi-play-circle"
                          style={{ marginRight: ".5rem" }}
                        />
                        <span>Смотреть в 3D</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-left-slide">
                    <h3 id={`slide-${slide.id}`}>{slide.title}</h3>

                    {/* Аккордеон для описания на мобильных */}
                    {isMobile ? (
                      <div className="accordion">
                        <button
                          type="button"
                          className={isDescOpen ? "expanded" : ""}
                          onClick={() => setIsDescOpen(!isDescOpen)}
                          aria-expanded={isDescOpen}
                        >
                          <span>Описание</span>
                          <i className="bi bi-chevron-down"></i>
                        </button>
                        {isDescOpen && (
                          <div className="accordion-content">
                            <p className="description">{slide.description}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="textalot">{slide.description}</p>
                    )}

                    <p className="cost">{slide.cost}</p>
                  </div>
                </div>

                {/* Правая часть: преимущества */}
                <div className="col-md-3 advantages-box">
                  <div className="advantage-items">
                    {slide.advantages?.map((advantage, i) => (
                      <div key={i} className="advantage-item">
                        <i className="bi bi-check-circle" />
                        <span>{advantage}</span>
                      </div>
                    ))}
                  </div>
                  <a href="#calculator" className="btn btn-dark mt-3">
                    Рассчитать стоимость
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Модалка 3D */}
      <Model3DModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        model={modalModel}
      />
    </section>
  );
}
