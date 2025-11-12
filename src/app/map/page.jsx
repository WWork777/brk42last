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
    title: `Бурение скважин на воду в ${currentSite.city} и ${currentSite.oblast} | Карта глубин`,
    description: `Карта глубин на бурение скважин по  ${currentSite.oblast}. Качественное бурение с гарантией от компании БРК.`,
    alternates: {
      canonical: `https://${currentSite.hostname}/map`,
    },
    openGraph: {
      title:
        "Бурение скважин на воду в ${currentSite.city} и ${currentSite.oblast} | Карта глубин",
      description:
        "Карта глубин на бурение скважин по  ${currentSite.oblast}. Качественное бурение с гарантией от компании БРК.",
      url: `https://${currentSite.hostname}/map`,
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/equipment-og-image.jpg",
        },
      ],
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
