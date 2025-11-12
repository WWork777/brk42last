import Contacts from "@/components/Contacts";
import MapFrame from "../../components/MapFrame";
import styles from "./styles.module.scss";
import { headers } from "next/headers";
import { getCurrentSiteConfig } from "@/constants/city";

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get("host") || "brk42.ru";
  const cleanHostname = hostname.split(":")[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);

  return {
    title: `Карта глубин бурения скважин в ${currentSite.city} и ${currentSite.oblast}`,
    description: `Интерактивная карта глубин бурения скважин в ${currentSite.city} и ${currentSite.oblast}. Узнайте среднюю глубину скважины на воду в вашем районе. Данные по гидрогеологии, статистика бурения, рекомендации специалистов.`,
    keywords: `карта глубин скважин, бурение скважин ${currentSite.city}, глубина воды ${currentSite.oblast}, скважина на воду карта, гидрогеология ${currentSite.city}, бурение скважин под воду`,

    alternates: {
      canonical: `https://${currentSite.hostname}/karta-glubin-skvazhin`,
    },

    openGraph: {
      title: `Карта глубин скважин на воду в ${currentSite.city} и ${currentSite.oblast} | Компания БРК`,
      description: `Актуальные данные по глубинам бурения скважин в ${currentSite.oblast}. Проверенная информация от лидера в области бурения - компании БРК.`,
      url: `https://${currentSite.hostname}/karta-glubin-skvazhin`,
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/map-depth-og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Карта глубин бурения скважин в ${currentSite.oblast}`,
        },
      ],
      siteName: "БРК - Бурение скважин на воду",
    },

    twitter: {
      card: "summary_large_image",
      title: `Глубины скважин в ${currentSite.city} | Карта бурения от БРК`,
      description: `Узнайте, на какую глубину бурят скважины в ${currentSite.oblast}. Данные по районам и типам грунтов.`,
      images: ["https://brk42.ru/static/map-depth-twitter-image.jpg"],
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default function MapPage() {
  return (
    <main className={styles.map}>
      <MapFrame />
      <Contacts />
    </main>
  );
}
