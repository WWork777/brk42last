// app/blog/paggination.js
import Link from "next/link";
import styles from "./blog.module.scss";

export default function Pagination({ currentPage, totalPages }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Для мобильных показываем только соседние страницы
  const getVisiblePages = () => {
    if (totalPages <= 7) return pageNumbers;

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    let pages = [];
    if (start > 1) pages.push(1, "...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages) pages.push("...", totalPages);

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={styles.pagination}>
      {currentPage > 1 && (
        <Link href={`/blog?page=${currentPage - 1}`} scroll={false}>
          <button>Назад</button>
        </Link>
      )}

      {visiblePages.map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <Link key={page} href={`/blog?page=${page}`} scroll={false}>
            <button className={currentPage === page ? styles.active : ""}>
              {page}
            </button>
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link href={`/blog?page=${currentPage + 1}`} scroll={false}>
          <button>Вперед</button>
        </Link>
      )}
    </div>
  );
}
