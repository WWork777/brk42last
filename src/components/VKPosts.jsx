"use client";

import React, { useEffect, useState } from "react";
import "../styles/components/_vkPosts.scss";

const VKPosts = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [mainPost, setMainPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/vkPosts?count=20", {
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
        });
        const data = await response.json();

        // Сортируем посты по дате (от новых к старым)
        const sortedPosts = data.sort((a, b) => b.date - a.date);

        // Выбираем главный пост (последняя новость с фото или просто последняя новость)
        const main =
          sortedPosts.find(
            (post) => post.attachments && post.attachments[0]?.photo
          ) || sortedPosts[0];

        setMainPost(main || null);
        setPosts(sortedPosts.filter((post) => post !== main));
      } catch (error) {
        setError(error.message);
      }
    };

    fetchPosts();
  }, []);

  const truncateText = (text, maxLength) =>
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;

  const getVKPostUrl = (ownerId, postId) =>
    `https://vk.com/wall${ownerId}_${postId}`;

  if (error) return <p className="error">Ошибка загрузки новостей: {error}</p>;
  if (!mainPost || posts.length === 0)
    return (
      <p className="loading container text-center text-light">
        Новости загружаются, пожалуйста, подождите...
      </p>
    );

  const getPhotoUrl = (attachments) => {
    if (!attachments) return null;
    const photoAttachment = attachments.find(
      (attachment) => attachment.type === "photo"
    );
    if (photoAttachment?.photo?.sizes?.length > 0) {
      return photoAttachment.photo.sizes.slice(-1)[0].url;
    }
    return null;
  };

  const imageUrl = mainPost?.attachments
    ? getPhotoUrl(mainPost.attachments)
    : null;

  return (
    <div className="vk-posts-section container">
      <h2 className="section-title">
        Следите за актуальными новостями в группе ВК!
      </h2>
      <div className="row posts-container container" style={{ marginRight: "auto", marginLeft: "auto" }}>
        {mainPost && imageUrl && (
          <div className="col-12 col-md-8 mb-4">
            <a
              href={getVKPostUrl(mainPost.owner_id, mainPost.id)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Основной пост ВКонтакте: ${truncateText(
                mainPost.text,
                50
              )}`}
            >
              <div
                className="p-3 text-white main-news"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                }}
                role="img"
                aria-label={`Новость: ${truncateText(mainPost.text, 150)}`}
              >
                <h3>{truncateText(mainPost.text, 150)}</h3>
              </div>
            </a>
          </div>
        )}

        <div className="col-12 col-md-4">
          <div className="other-news">
            {posts.slice(0, 4).map((post) => (
              <a
                key={post.id}
                href={getVKPostUrl(post.owner_id, post.id)}
                target="_blank"
                rel="noopener noreferrer"
                className="news-item d-block p-3 mb-3 border rounded"
                aria-label={`Пост ВКонтакте: ${truncateText(post.text, 50)}`}
              >
                <h4 className="m-0">{truncateText(post.text, 80)}</h4>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VKPosts;
