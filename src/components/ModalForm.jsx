import React, { useState } from "react";
import Modal from "react-modal";
import "../styles/components/_modalForm.scss";

const ModalForm = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Передаем данные родителю
    setFormData({ name: "", phone: "", message: "" }); // Сбрасываем форму
    onClose(); // Закрываем модальное окно
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Модальное окно"
      className="modal"
      overlayClassName="modal-overlay"
    >
      <h2>Заказать звонок</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Имя:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Телефон:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Сообщение:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="btn btn-dark">
          Отправить
        </button>
      </form>
      <button onClick={onClose} className="btn btn-secondary mt-3">
        Закрыть
      </button>
    </Modal>
  );
};

export default ModalForm;
