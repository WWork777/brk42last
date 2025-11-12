import React from "react";

const PopupHint = ({ onClose }) => {
  return (
    <div className="popup-hint">
      <div className="popup-content">
        <p>Для просмотра 3D-модели нажмите дважды на изображение.</p>
        <button className="btn btn-warning" onClick={onClose}>
          Понятно
        </button>
      </div>
    </div>
  );
};

export default PopupHint;
