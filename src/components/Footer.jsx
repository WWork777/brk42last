"use client";

import React from "react";
import Link from "next/link";
import "../styles/components/_footer.scss";
import { useState, useEffect } from "react";

import { getCurrentSiteConfig } from "@/constants/city";

const socialLinks = [
  {
    href: "https://wa.me/79609250870",
    icon: "/icons/whatsapp.svg",
    label: "WhatsApp",
  },
  {
    href: "mailto:bureniekemerovo@mail.ru",
    icon: "/icons/mail.svg",
    label: "Mail",
  },
  { href: "https://vk.com/bureniekem", icon: "/icons/vk.svg", label: "VK" },
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
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Колонка "Общее" */}
          <div className="col-md-3 col-sm-6">
            <h4>Общее</h4>
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
              <li>
                <Link href="/privacy-policy">Политика конфиденциальности</Link>
              </li>
            </ul>
          </div>

          {/* Колонка "Продукция" */}
          <div className="col-md-3 col-sm-6">
            <h4>Продукция</h4>
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
            <h4>Коллекции</h4>
            <ul>
              <li>ОГРН: 319420500029031</li>
              <li>ИНН: 420541299945 </li>
            </ul>
          </div>

          {/* Колонка "Контакты" */}
          <div className="col-md-3 col-sm-6">
            <h4>Контакты</h4>
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
                <a
                  href="tel:+79609250870"
                  aria-label="Позвонить по номеру +7 (960) 925-08-70"
                >
                  {currentSite.phone}
                </a>
              </li>
              <li>
                <i
                  className="icon bi bi-envelope"
                  style={{ marginRight: ".5rem" }}
                ></i>
                <a
                  href="mailto:bureniekemerovo@mail.ru"
                  aria-label="Отправить письмо на bureniekemerovo@mail.ru"
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
      </div>
    </footer>
  );
};

export default Footer;
