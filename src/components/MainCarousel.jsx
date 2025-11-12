"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "../styles/components/_mainCarousel.scss";
import Image from "next/image";
import Link from "next/link";

const MainCarousel = () => {
  const slides = [
    {
      id: 1,
      title: "Бурение артезианских скважин",
      description: "С использованием НПВХ ГОСТ обсадки, срок службы 50 лет!",
      buttonText: "Рассчитать стоимость",
      href: "#calculator",
      media: "https://rutube.ru/play/embed/ba5f8bf91ce2254678045ae2594c3493/",
      thumbnail: "/images/maincarusel.webp",
      isVideo: true,
    },
    {
      id: 2,
      title: "Обустройство скважин через адаптер",
      description: "Современный вид обустройства, без копки колодца",
      buttonText: "Рассчитать стоимость",
      href: "#calculator",
      media: "https://rutube.ru/play/embed/dd3fafffa7c976804aa6957c2953360c/",
      thumbnail:
        "https://pic.rutube.ru/video/c7/a3/c7a3ab617763ed64764bc3655716b58a.jpg",
      isVideo: true,
    },
    {
      id: 3,
      title: "Обустройство скважин через кессон",
      description: "Устаревший вид обустройства, с копкой колодца",
      buttonText: "Рассчитать стоимость",
      href: "#calculator",
      media: "https://rutube.ru/play/embed/ce2e117aafb621ecadd93c248fcef5be/",
      thumbnail:
        "https://pic.rutube.ru/video/19/12/19123baedc28493da74c8ffbd13f9fc2.jpg",
      isVideo: true,
    },
    {
      id: 4,
      title: "Ремонт скважин и диагностика",
      description:
        "Проведем диагностику и примем решение о возможности ремонта",
      buttonText: "Узнать стоимость диагностики",
      href: "repair",
      media:
        "https://avatars.mds.yandex.net/get-ydo/9712213/2a0000018a11a2ccb89a16c04ff7b90ec9e1/diploma",
      thumbnail:
        "https://avatars.mds.yandex.net/get-ydo/9712213/2a0000018a11a2ccb89a16c04ff7b90ec9e1/diploma",
      isVideo: false,
    },
  ];

  const [activeVideoId, setActiveVideoId] = useState(null);

  const handlePlayClick = (id) => {
    setActiveVideoId((prevId) => (prevId !== id ? id : null));
  };

  return (
    <section className="custom-carousel">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        loop
        speed={500}
        slidesPerView={1}
        breakpoints={{
          300: {
            centeredSlides: false,
            slidesPerView: 1,
          },
          1300: {
            centeredSlides: true,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <article className="carousel-slide">
              <div className="carousel-content row">
                <div className="carousel-text col-md-5">
                  <h1>{slide.title}</h1>
                  <p>{slide.description}</p>
                  <Link className="btn btn-warning" href={slide.href}>
                    {slide.buttonText}
                  </Link>
                </div>
                <div
                  className="carousel-media col-md-7 "
                  style={{ position: "relative", minHeight: "200px" }}
                >
                  {activeVideoId === slide.id && slide.isVideo ? (
                    <div
                      style={{
                        position: "relative",
                        paddingTop: "56.25%",
                        width: "100%",
                      }}
                    >
                      <iframe
                        src={`${slide.media}?autoplay=1`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={slide.title}
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                        }}
                      ></iframe>
                    </div>
                  ) : (
                    <div
                      className="button-play-section"
                      style={{
                        position: "relative",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <Image
                        className="videoimg"
                        src={slide.thumbnail}
                        alt={`Превью для ${slide.title}`}
                        quality={50}
                        width={slide.id === 1 ? 320 : 400}
                        height={slide.id === 1 ? 240 : 300}
                        loading={slide.id === 1 ? "eager" : "lazy"}
                        priority={slide.id === 1}
                        fetchPriority={slide.id === 1 ? "high" : "auto"}
                        sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw"
                      />
                      {slide.isVideo && (
                        <button
                          onClick={() => handlePlayClick(slide.id)}
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "rgba(0, 0, 0, 0.5)",
                            border: "none",
                            borderRadius: "50%",
                            padding: "10px",
                            color: "#fff",
                          }}
                        >
                          <i
                            className="bi bi-play-fill"
                            style={{ fontSize: "2rem" }}
                          ></i>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
        <button className="swiper-button-prev carousel-nav prev"></button>
        <button className="swiper-button-next carousel-nav next"></button>
      </Swiper>

      {/* Стрелки */}
    </section>
  );
};

export default MainCarousel;
