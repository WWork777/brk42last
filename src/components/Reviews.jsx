"use client";

import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/components/_reviews.scss";
import ReviewSummary from "./ReviewSummary";

const ReviewsCarousel = () => {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [activeFilter, setActiveFilter] = useState("Авито");

  // Загрузка JSON-данных
  useEffect(() => {
    fetch("/reviews.json")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data);
        setFilteredReviews(
          data.filter((review) => review.platform === "Авито")
        );
      })
      .catch((error) => console.error("Ошибка загрузки JSON:", error));
  }, []);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,
    initialSlide: 0,
    centerPadding: "60px",
    lazyLoad: "ondemand", // Ленивая загрузка слайдов
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerPadding: "40px",
          initialSlide: 0,
        },
      },
      {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "20px",
          initialSlide: 0,
        },
      },
    ],
  };

  // Функция фильтрации
  const handleFilter = (platform) => {
    setActiveFilter(platform);
    if (platform === "all") {
      setFilteredReviews(reviews);
    } else {
      setFilteredReviews(
        reviews.filter((review) => review.platform === platform)
      );
    }
  };

  // Отображение иконки платформы
  const getPlatformIcon = (platform) => {
    if (platform === "Яндекс") {
      return (
        <img
          src="/icons/yandex-color-icon.svg"
          alt="Яндекс"
          style={{ width: "50px", height: "50px" }}
        />
      );
    } else if (platform === "2Gis") {
      return (
        <img
          src="/icons/double-gis-color-icon.svg"
          alt="2GIS"
          style={{ width: "50px", height: "50px" }}
        />
      );
    } else if (platform === "Авито") {
      return (
        <img
          src="/icons/avito.ru.svg"
          alt="2GIS"
          style={{ width: "50px", height: "50px", borderRadius: "50%" }}
        />
      );
    }

    return null;
  };

  const TruncatedText = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleToggle = () => setIsExpanded(!isExpanded);

    if (text.length <= maxLength) {
      return <p>{text}</p>;
    }

    return (
      <p>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
        <button
          className="btn btn-link"
          onClick={handleToggle}
          style={{
            textDecoration: "none",
            fontSize: "14px",
            paddingBlock: "0",
          }}
        >
          {isExpanded ? "свернуть" : "читать полностью"}
        </button>
      </p>
    );
  };

  return (
    <div className="reviews-carousel container-fluid my-5" id="reviews">
      <h2 className="section-title container">Самый высокий рейтинг</h2>
      <p className="container text-under-title">
        Отличная репутация на всех площадках Яндекс, Avito, 2GIS
      </p>
      <ReviewSummary />
      <div className="header-section d-flex justify-content-between align-items-center mb-3">
        <div className="container filter-buttons d-flex align-items-center">
          {/* Кнопка для Авито */}
          <button
            className={`btn btn-sm me-2 ${
              activeFilter === "Авито" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleFilter("Авито")}
          >
            Авито: 5.0
          </button>

          {/* Кнопка для 2GIS */}
          <button
            className={`btn btn-sm me-2 ${
              activeFilter === "2Gis" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleFilter("2Gis")}
          >
            2GIS: 5.0
          </button>

          {/* Кнопка для Яндекса */}
          <button
            className={`btn btn-sm ${
              activeFilter === "Яндекс" ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => handleFilter("Яндекс")}
          >
            Яндекс: 5.0
          </button>
        </div>
      </div>

      <Slider {...settings}>
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <div key={index}>
              <div className="review-card">
                <div className="review-header d-flex align-items-center mb-2">
                  {getPlatformIcon(review.platform)}
                  <div className="ms-2">
                    <h5 className="mb-0">{review.user}</h5>
                    <small>
                      {review.date} на {review.platform}
                    </small>
                  </div>
                </div>
                <div className="rating text-warning">
                  {"★".repeat(review.rating)}
                </div>
                <TruncatedText text={review.review} maxLength={200} />
              </div>
            </div>
          ))
        ) : (
          <div>Загрузка отзывов...</div>
        )}
      </Slider>
    </div>
  );
};

export default ReviewsCarousel;
