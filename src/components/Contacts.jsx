"use client";

import React, { useState, useEffect } from "react";
import "../styles/components/_contacts.scss";
import { getCurrentSiteConfig } from "@/constants/city";
import Image from "next/image";
import Link from "next/link";

const ContactInfo = () => {
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
    <ul className="contact-info">
      <li>
        <i className="icon bi-geo-alt"></i>
        {currentSite.adres}
      </li>
      <li>
        <i className="icon bi bi-clock"></i>
        Ежедневно с 09:00 до 18:00
      </li>
      <li>
        <i className="icon bi bi-telephone"></i>
        {currentSite.phone}
      </li>
      <li>
        <i className="icon bi bi-envelope"></i>
        bureniekemerovo@mail.ru
      </li>
    </ul>
  );
};

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    comments: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    comments: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: "", phone: "", comments: "" };

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно.";
      valid = false;
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон обязателен.";
      valid = false;
    }
    if (formData.comments.trim().length < 10) {
      newErrors.comments = "Комментарий должен быть не менее 10 символов.";
      valid = false;
    }

    if (!/^89\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Телефон должен начинаться с 89 и содержать 11 цифр.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("/api/sendRequest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.name,
            phone: formData.phone,
            comments: formData.comments,
          }),
        });

        if (response.ok) {
          setSuccessMessage("Заявка успешно отправлена!");
          setTimeout(() => setSuccessMessage(""), 5000);
          setFormData({ name: "", phone: "", comments: "" });
          setErrors({ name: "", phone: "", comments: "" });
        } else {
          alert("Ошибка при отправке заявки");
        }
      } catch (error) {
        alert("Ошибка подключения к серверу");
      }
    }
  };
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
    <div className="contacts-section" id="contacts">
      <div className="container">
        <h2 className="section-title">Остались вопросы?</h2>
        <div className="row">
          <div className="col-md-3">
            <h3>Свяжитесь с нами</h3>
            <form
              onSubmit={handleSubmit}
              className="contact-form"
              aria-label="Форма обратной связи"
            >
              {/* <div className="form-group">
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван"
                  aria-label="Ваше имя"
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="8 123 456 78 90"
                  pattern="^89\d{9}$"
                  title="Введите телефон в формате 89XXXXXXXXX"
                  aria-label="Ваш номер телефона"
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>
              <div className="form-group">
                <textarea
                  id="comments"
                  name="comments"
                  className={`form-control ${
                    errors.comments ? "is-invalid" : ""
                  }`}
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Комментарий"
                  rows="3"
                  aria-label="Ваш комментарий"
                />
                {errors.comments && (
                  <div className="invalid-feedback">{errors.comments}</div>
                )}
              </div> */}
              <Link
                href="tel:+7 (960) 925-08-70"
                className="btn btn-yellow"
                aria-label="Отправить заявку"
              >
                Позвонить нам
              </Link>
              <Link
                href="https://wa.me/79609250870"
                className="btn btn-yellow"
                aria-label="Отправить заявку"
              >
                Написать в WhatsApp
              </Link>
              {/* {successMessage && (
                <p className="success-message">{successMessage}</p>
              )} */}
            </form>
            <h4>Контакты ООО «{currentSite.name}</h4>
            <ContactInfo />
          </div>
          <div className="col-md-9">
            <Image
              src={currentSite.mapContacts}
              alt="Контакты"
              width={1920}
              height={1080}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
