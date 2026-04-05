"use client";
import styles from "./socialButton.module.scss";
import Link from "next/link";
import { useState } from "react";

export default function SocialButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.social_wrapper}>
      <div className={styles.social_button} onClick={() => setIsOpen(!isOpen)}>
        <p
          className="titlebtn"
          style={{ fontSize: "1.25rem", margin: "0", color: "black" }}
        >
          Свяжитесь с нами
        </p>
      </div>
      <div className={`${styles.social_icons} ${isOpen ? styles.open : ""}`}>
        <Link href="https://max.ru/u/f9LHodD0cOLYp11qSjGn6aGeOrHVYNXvPYGcBgeqEKrhiq-H5M3ARCkgbhI">
          <img src="/svg/max.svg" className={styles.social_button_img} />
        </Link>
        <Link href="https://vk.com/bureniekem">
          <img src="/svg/vk.svg" className={styles.social_button_img} />
        </Link>
        <Link href="tel:+7 (960) 925-08-70">
          <img src="/svg/phone.png" className={styles.social_button_img} />
        </Link>
        <Link href="https://t.me/Brk_42">
          <img src="/svg/tg.svg" className={styles.social_button_img} />
        </Link>
      </div>
    </div>
  );
}
