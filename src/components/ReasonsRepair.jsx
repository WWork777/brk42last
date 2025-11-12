import React from "react";
import "../styles/components/_reasonsSection.scss";

const ReasonsSection = () => {
  const reasons = [
    {
      title: "Попадание песка, ила в систему",
      description:
        "Попадание песка и ила в систему может привести к засорению труб и фильтров.",
      image: "/images/sand.png",
    },
    {
      title: "Коррозия металла – обрушение скважины",
      description:
        "Со временем металлические элементы скважины подвергаются коррозии, что вызывает их разрушение.",
      image: "/images/corrosion.png",
    },
    {
      title: "Обрушение открытого ствола скважины",
      description:
        "Обрушение ствола скважины может привести к заклиниванию насоса и полной потере доступа к воде.",
      image: "/images/collapse.png",
    },
    {
      title: "Поломка оборудования",
      description:
        "Неисправное оборудование снижает давление и подачу воды, что может повлиять на её качество.",
      image: "/images/equipment.png",
    },
    {
      title: "Обрыв насоса и его потеря",
      description:
        "Обрыв насоса может потребовать сложных и дорогостоящих работ по его восстановлению.",
      image: "/images/pump.png",
    },
  ];

  return (
    <section className="reasons-section">
      <div className="container">
        <h2 className=" mb-5">
          Причины, приводящие к засорению или поломке скважины
        </h2>
        <div className="row">
          {reasons.slice(0, 3).map((reason, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="reason-card">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          {reasons.slice(3).map((reason, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="reason-card">
                <h3>{reason.title}</h3>
                <p>{reason.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReasonsSection;
