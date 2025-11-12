import styles from "./styles.module.scss";
import { headers } from "next/headers";
import { getCurrentSiteConfig } from "@/constants/city";
import Contacts from "@/components/Contacts";
export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get("host") || "brk42.ru";
  const cleanHostname = hostname.split(":")[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);
  return {
    title: `Бурение скважин на воду в ${currentSite.city} и ${currentSite.oblast} | Прайс-лист`,
    description: `Актуальный прайс-лист на бурение скважин по  ${currentSite.oblast}. Сравните цены для вашего района. Качественное бурение с гарантией от компании БРК.`,
    alternates: {
      canonical: `https://${currentSite.hostname}/prices`,
    },
    openGraph: {
      title: `Бурение скважин на воду в ${currentSite.city} и ${currentSite.oblast} | Прайс-лист`,
      description: `Актуальный прайс-лист на бурение скважин по  ${currentSite.oblast}. Сравните цены для вашего района. Качественное бурение с гарантией от компании БРК.`,
      url: `https://${currentSite.hostname}/prices`,
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/equipment-og-image.jpg",
        },
      ],
    },
  };
}

export default function PricePage() {
  const pricingData = [
    { city: "г. Кемерово-Кемеровский район", price: "от 4000р" },
    { city: "г. Юрга-Юргинский район", price: "от 6000р" },
    { city: "г. Березовский", price: "от 6000р" },
    { city: "г. Белово-Беловский район", price: "от 6000р" },
    { city: "г. Гурьевск-Гурьевский район", price: "от 6000р" },
    { city: "пгт Крапивоино-Крапивоинский район", price: "от 6000р" },
    {
      city: "г. Ленинск-Кузнецк-Ленинск-Кузнецкий район",
      price: "от 6000р",
    },
    { city: "г. Таштагол-Таштагольский район", price: "от 6000р" },
    { city: "Тисульский район, Тяжинский район", price: "от 6000р" },
    { city: "г. Топки-Топкинский район", price: "от 6000р" },
    { city: "пгт Яшкино-Яшкинский район", price: "от 6000р" },
    { city: "г. Киселевск", price: "от 6000р" },
  ];

  return (
    <>
      <main className={styles.container}>
        <div className={styles.header}>
          <h1>Прайс-лист на бурение скважин</h1>
          <p>Актуальные цены на {new Date().toLocaleDateString("ru-RU")}</p>
        </div>

        <table className={styles.priceTable}>
          <thead>
            <tr>
              <th>Наименование муниципального образования</th>
              <th>Цена</th>
            </tr>
          </thead>
          <tbody>
            {pricingData.map((row, index) => (
              <tr key={index}>
                <td>{row.city}</td>
                <td
                  className={
                    row.price.includes("4000") ? styles.priceHighlight : ""
                  }
                >
                  {row.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <Contacts />
    </>
  );
}
