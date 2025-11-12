import React from "react";
import "../styles/components/_reviewSummary.scss"; // Подключаем стили

const getPlatformIcon = (platform) => {
  switch (platform) {
    case "Яндекс Карты":
      return (
        <img
          src="/icons/yandex-color-icon.svg"
          alt="Яндекс"
          className="platform-icon"
        />
      );
    case "2ГИС":
      return (
        <img
          src="/icons/double-gis-color-icon.svg"
          alt="2ГИС"
          className="platform-icon"
        />
      );
    case "Авито":
      return (
        <img src="/icons/avito.ru.svg" alt="Авито" className="platform-icon" />
      );
    default:
      return null;
  }
};

const ReviewSummary = ({
  title,
  platform,
  rating,
  reviews,
  scores,
  primaryAction,
  secondaryAction,
  link,
}) => {
  return (
    <div className="col-md-4 mb-4">
      <div className="review-summary card  shadow-sm">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div className="card-subtitle text-muted mb-3 d-flex align-items-center">
            {getPlatformIcon(platform)}
            <span className="ms-2">{platform}</span>
          </div>

          <div className="rating-summary d-flex align-items-center">
            <span className="rating-value display-4 fw-bold me-2">
              {rating}
            </span>
            <div>
              <div className="stars">
                {"★"
                  .repeat(Math.round(rating))
                  .split("")
                  .map((star, index) => (
                    <span key={index} className="text-warning">
                      {star}
                    </span>
                  ))}
              </div>
              <p className="reviews-count text-muted mb-3">
                <span className="fw-bold">{reviews} отзывов</span> • {scores}{" "}
                оценок
              </p>
            </div>
          </div>

          <div className="buttons d-flex gap-2">
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary shadow-sm"
            >
              {secondaryAction}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewsRow = () => {
  const reviewsData = [
    {
      title: "БРК Буровые Компании Кузбасса",
      platform: "Авито",
      rating: 5.0,
      reviews: 55,
      scores: 55,
      secondaryAction: "Оставить отзыв",
      link: "https://www.avito.ru/brands/i187049348?src=search_seller_info", // Ссылка для Авито, заменить на актуальную
    },
    {
      title: "Брк Бурениекемерово.РФ",
      platform: "2ГИС",
      rating: 5.0,
      reviews: 63,
      scores: 63,
      secondaryAction: "Оставить отзыв",
      link: "https://2gis.ru/kemerovo/firm/70000001044635771?m=86.158261%2C55.327671%2F16",
    },
    {
      title: "БРК Буровые Компании Кузбасса",
      platform: "Яндекс Карты",
      rating: 5.0,
      reviews: 25,
      scores: 28,
      secondaryAction: "Оставить отзыв",
      link: "https://yandex.ru/maps/org/brk_burovyye_kompanii_kuzbassa/208194127086/reviews/?ll=86.110046%2C55.389432&z=17.11",
    },
  ];

  return (
    <div className="container">
      <div className="row">
        {reviewsData.map((data, index) => (
          <ReviewSummary key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsRow;
