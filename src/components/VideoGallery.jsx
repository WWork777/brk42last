"use client";

import React, { useState } from "react";
import Slider from "react-slick";
import "../styles/components/_videoGallery.scss";

// Мемоизированные стрелки
const CustomArrow = React.memo(({ direction, onClick }) => (
  <button
    className={`custom-arrow custom-${direction}`}
    onClick={onClick}
    aria-label={direction === "next" ? "Следующий слайд" : "Предыдущий слайд"}
    style={{ [direction === "next" ? "right" : "left"]: "14%", scale: 1.5 }}
  >
    <i className={`bi bi-chevron-${direction === "next" ? "right" : "left"}`}></i>
  </button>
));

const VideoGallery = () => {
  const [activeVideoId, setActiveVideoId] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePlayClick = (id) => {
    setActiveVideoId((prevId) => (prevId === id ? null : id));
  };

  const settings = {
    dots: true,
    speed: 1500,
    arrows: true,
    nextArrow: <CustomArrow direction="next" />,
    prevArrow: <CustomArrow direction="prev" />,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: "15%",
    slidesToScroll: 1,
    beforeChange: (_oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
      setActiveVideoId(null); // выключаем видео при смене слайда
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerPadding: "5%",
        },
      },
      {
        breakpoint: 1024,
        settings: {
          centerPadding: "10%",
        },
      },
    ],
  };

  const channelUrl = "https://rutube.ru/channel/39727863/";

  const videos = [
    {
      id: 1,
      title: "Установка преобразователя частоты для скважины",
      description: "Процесс установки преобразователя и ошибки при монтаже трассы.",
      thumbnail: "https://pic.rutube.ru/video/2024-12-21/d1/18/d118d4f0cf3f99bddcdadf93f56f5356.jpg",
      videoUrl: "https://rutube.ru/play/embed/2461c6c63921ab714b06c4c7f89014d7/",
    },
    {
      id: 2,
      title: "Спасли скважину и заказчика от пожара!",
      description: "Как не надо делать скважину — и как мы спасли ситуацию.",
      thumbnail: "https://pic.rutube.ru/video/2024-11-19/f1/21/f121fe78fda38f37a43892477c3872e9.jpg",
      videoUrl: "https://rutube.ru/play/embed/64787bc8868e2ced8fdef619ab8fcfc2/",
    },
    {
      id: 3,
      title: "Бурение скважин Кемерово. Ягодный",
      description: "Демонстрация процесса бурения в районе Ягодный.",
      thumbnail: "https://pic.rutube.ru/video/2024-10-15/2a/71/2a71513886c4ed02e7ba9c68f6ba794c.jpg",
      videoUrl: "https://rutube.ru/play/embed/b995a019d774c67605832ee5342a2d8d/",
    },
    {
      id: 4,
      title: "Бурение Кемерово. Силино 70м",
      description: "Бурение на глубину 70 метров в Силино.",
      thumbnail: "https://pic.rutube.ru/video/2024-09-29/b5/39/b539269622267b8db0de535506f80d53.jpg",
      videoUrl: "https://rutube.ru/play/embed/ea67e886c7049648d3ac9f985ab39df4/",
    },
    {
      id: 5,
      title: "Бурение Кемерово. Силино 50м",
      description: "Бурение скважины в Силино, глубиной 50 метров.",
      thumbnail: "https://pic.rutube.ru/video/a2/e5/a2e57672e54fc5ca5df0a5b807d2a795.jpg",
      videoUrl: "https://rutube.ru/play/embed/ba5f8bf91ce2254678045ae2594c3493/",
    },
  ];

  return (
    <div className="video-gallery-section">
      <div className="container-fluid">
        <h2 className="section-title">Наши видео</h2>
        <Slider {...settings}>
          {videos.map((video, index) => (
            <div key={video.id}>
              <div className="video-slide">
                <div className="video-container">
                  {index === currentSlide && activeVideoId === video.id ? (
                    <iframe
                      src={video.videoUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                      className="video-iframe"
                    ></iframe>
                  ) : (
                    <div className="button-play-section">
                      <img
                        src={video.thumbnail}
                        alt={`Превью видео: ${video.title}`}
                        loading="lazy"
                        className="video-thumbnail"
                      />
                      <button
                        onClick={() => handlePlayClick(video.id)}
                        aria-label={`Воспроизвести видео: ${video.title}`}
                      >
                        <i className="bi bi-play-fill" style={{ fontSize: "2rem" }}></i>
                      </button>
                    </div>
                  )}
                </div>
                <div className="video-details">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                  <a
                    href={channelUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-yellow"
                  >
                    Перейти на канал
                  </a>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default VideoGallery;
