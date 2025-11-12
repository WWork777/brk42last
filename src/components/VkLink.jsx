"use client";

import "../styles/components/_vkLink.scss";

const VkLink = () => {
  const groupName = "Бурениекемерово.рф";

  return (
    <div className="container vk-link-container d-flex align-items-center">
      <figure className="vk-image me-3">
        <div
          className="image-container"
          style={{ backgroundImage: `url('/images/logo.png')` }}
          aria-label="Логотип группы VK"
        ></div>
      </figure>
      <div className="vk-info">
        <h2 className="vk-title">Подпишись на группу ВК и получи скидку</h2>
        <p className="vk-subtitle">{groupName}</p>
        <div className="vk-rating">
          <span className="vk-stars" aria-label="Рейтинг группы 5 из 5">
            ⭐⭐⭐⭐⭐
          </span>
          <span className="vk-reviews">268 подписчиков</span>
        </div>
        <a
          href="https://vk.com/bureniekem"
          target="_blank"
          rel="noopener noreferrer"
          className="btn vk-button"
          aria-label={`Перейти в группу VK ${groupName}`}
        >
          Перейти в группу VK
        </a>
      </div>
    </div>
  );
};

export default VkLink;
