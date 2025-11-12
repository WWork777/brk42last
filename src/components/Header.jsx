"use client"; // Добавлено

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../styles/components/_header.scss";
import { getCurrentSiteConfig } from "@/constants/city";
import Image from "next/image";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className="container-fluid header-container">
        {/* Логотип */}
        <div className="logo">
          <Link href="/#">
            <Image
              src="/images/brklogo.svg"
              alt="Логотип БРК"
              width={100}
              height={100}
            />
            <p>{currentSite.name}</p>
          </Link>
        </div>

        {/* Десктопное меню */}
        <nav className="desktop-menu">
          <ul>
            <li>
              <Link href="/karta-glubin-skvazhin">Карта глубин</Link>
            </li>
            <li>
              <Link href="/prices">Прайс-лист</Link>
            </li>
            <li>
              <Link href="/blog">Блог</Link>
            </li>
            <li className="dropdown">
              <span className="dropdown-toggle">Услуги</span>
              <ul className="dropdown-menu">
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
            </li>
            <li>
              <Link href="/#reviews">Отзывы</Link>
            </li>
            <li>
              <Link href="/about-us">О нас</Link>
            </li>
            <li>
              <Link href="/#contacts">Контакты</Link>
            </li>
          </ul>
        </nav>

        <div className="call-to-action">
          <a href="tel:+79609250870" className="phone">
            {currentSite.phone}
            <br />
            <span>{currentSite.city}</span>
          </a>
          <Link href="/#contacts" className="btn-yellow">
            Заказать звонок
          </Link>
        </div>

        {/* Мобильное меню (гамбургер) */}
        <button className="hamburger" onClick={toggleMenu}>
          {menuOpen ? (
            <i className="bi bi-x-lg icon"></i>
          ) : (
            <i className="bi bi-list icon"></i>
          )}
        </button>
        <nav
          className={`mobile-menu ${menuOpen ? "open" : ""} ${
            isScrolled ? "scrolled" : ""
          }`}
        >
          <ul>
            <li>
              <Link href="/karta-glubin-skvazhin" onClick={closeMenu}>
                Карта глубин
              </Link>
            </li>
            <li>
              <Link href="/prices" onClick={closeMenu}>
                Прайс-лист
              </Link>
            </li>
            <li>
              <Link href="/blog">Блог</Link>
            </li>
            <li>
              <Link href="/repair" onClick={closeMenu}>
                Ремонт скважин
              </Link>
            </li>
            <li>
              <Link href="/video-logging" onClick={closeMenu}>
                Видеокаротаж скважин
              </Link>
            </li>
            <li>
              <Link href="/equipment" onClick={closeMenu}>
                Продажа оборудования
              </Link>
            </li>
            <li>
              <Link href="/#reviews" onClick={closeMenu}>
                Отзывы
              </Link>
            </li>
            <li>
              <Link href="/about-us">О нас</Link>
            </li>
            <li>
              <Link href="/#contacts" onClick={closeMenu}>
                Контакты
              </Link>
            </li>
          </ul>
          <div className="call-to-action">
            <a href="tel:+73832349988" className="phone">
              +7 (960) 925-08-70
            </a>
            <Link href="/#contacts" className="btn-yellow">
              Заказать звонок
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
