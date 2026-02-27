// app/faq/FAQAccordion.jsx
"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

export default function FAQAccordion({ faqData }) {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (index) => {
    setOpenItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  return (
    <div className={styles.faqGrid}>
      {faqData.map((item, index) => (
        <div
          key={index}
          className={`${styles.faqItem} ${openItems.includes(index) ? styles.open : ""}`}
        >
          <button
            className={styles.faqQuestion}
            onClick={() => toggleItem(index)}
            aria-expanded={openItems.includes(index)}
          >
            <span className={styles.questionMark}>?</span>
            <h3>{item.question}</h3>
            <span className={styles.toggleIcon}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={openItems.includes(index) ? styles.rotated : ""}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="#D4A853"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          <div
            className={`${styles.faqAnswer} ${openItems.includes(index) ? styles.visible : ""}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
