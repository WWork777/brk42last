// app/blog/page.js

import styles from "./blog.module.scss";
import articlesData from "../data/articles.json";
import { headers } from "next/headers";
import { getCurrentSiteConfig } from "@/constants/city";
import Paggination from "./paggination";

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get("host") || "brk42.ru";
  const cleanHostname = hostname.split(":")[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);

  return {
    title: "Блог о бурении скважин - БРК",
    description:
      "Читайте статьи о бурении скважин на воду, оборудование, технологии и советы специалистов. Узнайте, как выбрать и обустроить скважину в Кемерово, Новосибирске и Томске.",
    alternates: {
      canonical: `https://${currentSite.hostname}/blog`,
    },
    openGraph: {
      title: "Блог о бурении скважин - БРК",
      description:
        "Читайте статьи о бурении скважин на воду, оборудование, технологии и советы специалистов. Узнайте, как выбрать и обустроить скважину в Кемерово, Новосибирске и Томске.",
      url: `https://${currentSite.hostname}/blog`,
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/blog-og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Блог о бурении скважин",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Блог о бурении скважин - БРК",
      description:
        "Читайте статьи о бурении скважин на воду, оборудование, технологии и советы специалистов. Узнайте, как выбрать и обустроить скважину в Кемерово, Новосибирске и Томске.",
      images: [
        {
          url: "https://brk42.ru/static/blog-twitter-image.jpg",
        },
      ],
    },
  };
}

export default function BlogPage({ searchParams }) {
  const PER_PAGE = 12;
  const currentPage = parseInt(searchParams.page) || 1;

  const totalPages = Math.ceil(articlesData.length / PER_PAGE);
  const startIndex = (currentPage - 1) * PER_PAGE;
  const endIndex = startIndex + PER_PAGE;
  const currentArticles = articlesData.slice(startIndex, endIndex);

  return (
    <section className={styles.blogSection}>
      <h1>Блог о бурении скважин</h1>

      <div className={styles.articles}>
        {currentArticles.map((article) => (
          <div key={article.id} className={styles.articleCard}>
            <img src={article.imageUrl} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={`/blog/${article.slug}`}>Читать далее</a>
          </div>
        ))}
      </div>

      <Paggination currentPage={currentPage} totalPages={totalPages} />
    </section>
  );
}
