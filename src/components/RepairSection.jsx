import React from "react";
import "../styles/components/_repairSection.scss";

const RepairSection = () => {
  return (
    <section className="repair-section">
      <div className="container">
        <div className="row content ">
          {/* Левая часть: текст */}
          <div className="col-md-6">
            <h2>Как понять, что необходим ремонт скважины?</h2>
            <p>
              Если из скважины стало поступать гораздо меньшее количество воды
              либо оно прекратилось вовсе, то вызывайте мастера по обслуживанию
              систем такого рода. Ещё одной причиной, когда требуется ремонт
              скважин на воду, может быть ухудшение качества воды.
            </p>
          </div>

          {/* Правая часть: изображение */}
          <div className="col-md-6 text-md-end">
            <img
              src="/images/repair-image.webp"
              alt="Обслуживание скважины"
              className="img-fluid rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default RepairSection;
