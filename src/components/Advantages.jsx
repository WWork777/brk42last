"use client";

import "../styles/components/_advantages.scss";
import Image from "next/image";
const Advantages = () => {
  const advantages = [
    {
      id: 1,
      icon: "/icons/raceta.png",
      title: "МБГУ установки",
      description:
        "Наши установки проезжают в узкие ворота, между деревьев и не портят ваш участок",
    },
    {
      id: 2,
      icon: "/icons/garantia.png",
      title: "Гарантия",
      description: "Предоставим гарантию до 10 лет на скважину",
    },
    {
      id: 3,
      icon: "/icons/medal.png",
      title: "Скидка",
      description:
        "Предоставляем скидки пенсионерам, многодетным семьям, участникам СВО",
    },
  ];

  return (
    <section
      className="advantages-section container"
      aria-labelledby="advantages-title"
    >
      <div className=" row">
        <h2 id="advantages-title" className="advantages-title col-md-3">
          Наши преимущества
        </h2>
        <div className="row col-md-9">
          {advantages.map((advantage) => (
            <div className="col-md-4" key={advantage.id}>
              <article className="advantage-item">
                <Image
                  src={advantage.icon}
                  alt={`Иконка ${advantage.title}`}
                  loading="lazy"
                  width={50}
                  height={50}
                />
                <div>
                  <h3>{advantage.title}</h3>
                  <p>{advantage.description}</p>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
