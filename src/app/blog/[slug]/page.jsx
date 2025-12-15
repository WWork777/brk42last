// app/blog/[slug]/page.js
import articlesData from "../../data/articles.json";
import styles from "./page.module.scss";
import Link from "next/link";

export async function generateMetadata({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug);

  

  if (!article) {
    return {
      title: "Статья не найдена",
      description: "Запрашиваемая статья не существует.",
      openGraph: {
        title: "Статья не найдена",
        description: "Запрашиваемая статья не существует.",
        url: "https://brk42.ru/blog",
      },
      twitter: {
        card: "summary",
        title: "Статья не найдена",
        description: "Запрашиваемая статья не существует.",
      },
    };
  }

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `https://brk42.ru/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `https://brk42.ru/blog/${article.slug}`,
      type: "article",
      images: [
        {
          url: article.imageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      images: [
        {
          url: article.imageUrl,
        },
      ],
    },
  };
}

// Функция для расчета времени чтения
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

// Функция для форматирования даты
function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

  const formatTextWithLineBreaks = (text) => {
    return text.replace(/\n/g, '<br />');
  };

export default function ArticlePage({ params }) {
  const article = articlesData.find((a) => a.slug === params.slug);

  if (!article) {
    return (
      <section className={styles.articlePage}>
        <h1>Статья не найдена</h1>
        <p>К сожалению, запрашиваемая статья не существует.</p>
        <Link href="/blog" className={styles.backButton}>
          ← Назад к блогу
        </Link>
      </section>
    );
  }

  const readingTime = calculateReadingTime(article.text);

  return (
    <section className={styles.articlePage}>
      {/* Кнопка возврата */}
      <Link href="/blog" className={styles.backButton}>
        ← Назад к блогу
      </Link>

      {/* Заголовок */}
      <h1>{article.title}</h1>

      {/* Изображение */}
      <img
        src={article.imageUrl}
        alt={article.title}
        className={styles.articleImage}
      />

      {/* Контент статьи */}
      <div
        className={styles.articleContent}
        dangerouslySetInnerHTML={{ 
          __html: formatTextWithLineBreaks(article.text) 
        }}
      />

      {/* Дополнительная кнопка возврата в конце */}
      <Link href="/blog" className={styles.backButton}>
        ← Назад к блогу
      </Link>
    </section>
  );
}
