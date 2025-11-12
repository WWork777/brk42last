"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "../styles/components/_mainCarousel.scss";
import "swiper/css";
import "swiper/css/navigation";

const SwiperComponent = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      }}
      loop
      speed={500}
      slidesPerView={1}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <article className="carousel-slide">
            <div className="carousel-content row">
              <div className="carousel-text col-md-5">
                <h2>{slide.title}</h2>
                <p>{slide.description}</p>
                <Link className="btn btn-warning" href={slide.href}>
                  {slide.buttonText}
                </Link>
              </div>
              <div className="carousel-media col-md-7">
                {!slide.isVideo ? (
                  <div style={{ position: "relative", paddingTop: "56.25%" }}>
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
                    <Image
                    src={slide.thumbnail}
                    alt={`Превью для ${slide.title}`}
                    width={750}
                    height={500}
                    loading="lazy"
                    sizes="100vw"
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    layout="intrinsic"
                  />
                )}
              </div>
            </div>
          </article>
        </SwiperSlide>
      ))}
      <button className="swiper-button-prev carousel-nav prev" />
      <button className="swiper-button-next carousel-nav next" />
    </Swiper>
  );
};

export default SwiperComponent;
