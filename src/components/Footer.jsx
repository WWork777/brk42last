"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/components/_footer.scss";
import { getCurrentSiteConfig } from "@/constants/city";

// Добавлено поле `goal` для Яндекс.Метрики
const socialLinks = [
  {
    href: "https://max.ru/u/f9LHodD0cOLYp11qSjGn6aGeOrHVYNXvPYGcBgeqEKrhiq-H5M3ARCkgbhI",
    icon: "/icons/max.svg",
    label: "Max",
    goal: "max",
  },
  {
    href: "mailto:bureniekemerovo@mail.ru",
    icon: "/icons/mail.svg",
    label: "Mail",
    goal: "email",
  },
  {
    href: "https://vk.com/bureniekem",
    icon: "/icons/vk.svg",
    label: "VK",
    goal: "vk",
  },
];

const Footer = () => {
  const [currentSite, setCurrentSite] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    setCurrentSite(getCurrentSiteConfig(hostname));

    const handlePopState = () => {
      setCurrentSite(getCurrentSiteConfig(window.location.hostname));
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Универсальная функция для отправки целей
  const handleGoal = (goalName) => {
    if (typeof ym !== "undefined") {
      ym(99461611, "reachGoal", goalName);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Колонка "Общее" */}
          <div className="col-md-3 col-sm-6">
            <p className="navTop">Общее</p>
            <ul>
              <li>
                <Link href="/karta-glubin-skvazhin">Карта глубин</Link>
              </li>
              <li>
                <Link href="/#calculator">Калькулятор</Link>
              </li>
              <li>
                <Link href="/#reviews">Отзывы</Link>
              </li>
              <li>
                <Link href="/#contacts">Контакты</Link>
              </li>
            </ul>
          </div>

          {/* Колонка "Продукция" */}
          <div className="col-md-3 col-sm-6">
            <p className="navTop">Общее</p>
            <ul>
              <li>
                <Link href="/repair">Ремонт скважин</Link>
              </li>
              <li>
                <Link href="/video-logging">Видеокаротаж скважин</Link>
              </li>
              <li>
                <Link href="/equipment">Продажа оборудования</Link>
              </li>
            </ul>
          </div>

          {/* Колонка "Коллекции" */}
          <div className="col-md-3 col-sm-6">
            <p className="navTop">Общее</p>
            <ul>
              <li>ОГРН: 319420500029031</li>
              <li>ИНН: 420541299945 </li>
              <li>ИП: Судаков Михаил Сергеевич</li>
              <li style={{ marginTop: "30px" }}>
                <Link href="/docs/confidencialnost.pdf">
                  Политика конфиденциальности
                </Link>
              </li>
              <li>
                <Link href="/docs/obrabotka-pers-dannih.pdf">
                  Политика обработки файлов cookie
                </Link>
              </li>
              <li>
                <Link href="/docs/polzovatelskoe-soglashenie.pdf">
                  Пользовательское соглашение
                </Link>
              </li>
            </ul>
          </div>

          {/* Колонка "Контакты" */}
          <div className="col-md-3 col-sm-6">
            <p className="navTop">Общее</p>
            <ul>
              <li>
                <i
                  className="bi bi-geo-alt"
                  style={{ marginRight: ".5rem" }}
                ></i>{" "}
                {currentSite.adres}
              </li>
              <li>
                <i
                  className="bi bi-telephone"
                  style={{ marginRight: ".5rem" }}
                ></i>
                {/* Цель на клик по телефону */}
                <a
                  href="tel:+79609250870"
                  aria-label="Позвонить по номеру +7 (960) 925-08-70"
                  onClick={() => handleGoal("phone")}
                >
                  {currentSite.phone}
                </a>
              </li>
              <li>
                <i
                  className="icon bi bi-envelope"
                  style={{ marginRight: ".5rem" }}
                ></i>
                {/* Цель на клик по email */}
                <a
                  href="mailto:bureniekemerovo@mail.ru"
                  aria-label="Отправить письмо на bureniekemerovo@mail.ru"
                  onClick={() => handleGoal("email")}
                >
                  bureniekemerovo@mail.ru
                </a>
              </li>
            </ul>
            <div className="social-icons">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Перейти в ${link.label}`}
                  onClick={() => handleGoal(link.goal)} // Цель на клик по иконкам соцсетей
                >
                  <img
                    src={link.icon}
                    alt={`Иконка ${link.label}`}
                    loading="lazy"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Блок о разработчике - увеличенная версия */}
        <div className="developer-block">
          <div className="developer-content">
            <span className="developer-label">Разработка сайта</span>
            <a
              href="https://virlab42.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="developer-link"
              aria-label="Сайт разработчика"
            >
              <div className="developer-logo-wrapper">
                <img
                  src="/site.png"
                  alt="Логотип разработчика"
                  className="developer-logo"
                />
              </div>
              <div className="developer-info">
                <span className="developer-name">Вирлаб</span>
                <span className="developer-description">
                  Создание и продвижение сайтов
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
