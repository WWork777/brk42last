import EquipmentLayout from "@/components/EquipmentLayout";
import Contacts from "@/components/Contacts";
import { headers } from "next/headers";
import { getCurrentSiteConfig } from "@/constants/city";

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get("host") || "brk42.ru";
  const cleanHostname = hostname.split(":")[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);
  return {
    title: "Все модели скважин - БРК",
    description:
      "Просмотрите все доступные модели скважин, включая адаптеры, кессоны и летние варианты. Узнайте подробности и выберите подходящий вариант.",
    alternates: {
      canonical: `https://${currentSite.hostname}/models`,
    },
    openGraph: {
      title: "Все модели скважин - БРК",
      description:
        "Просмотрите все доступные модели скважин, включая адаптеры, кессоны и летние варианты. Узнайте подробности и выберите подходящий вариант.",
      url: "https://brk42.ru/models",
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/equipment-og-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Все модели скважин - БРК",
      description:
        "Просмотрите все доступные модели скважин, включая адаптеры, кессоны и летние варианты. Узнайте подробности и выберите подходящий вариант.",
      images: {
        url: "https://brk42.ru/static/equipment-twitter-image.jpg",
      },
    },
  };
}

const EquipmentPage = () => {
  return (
    <main>
      <EquipmentLayout />
      <Contacts />
    </main>
  );
};

export default EquipmentPage;
