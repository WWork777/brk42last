"use client";

import React, { useEffect } from "react";
import "../styles/components/_notification.scss"; // Добавьте стили

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Уведомление исчезает через 3 секунды
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
