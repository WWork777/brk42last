import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Contacts from "@/components/Contacts";
import EquipmentPackagePage from "@/components/EquipmentPackagePage";
import { headers } from 'next/headers';
import { getCurrentSiteConfig } from "@/constants/city";

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get('host') || 'brk42.ru';
  const cleanHostname = hostname.split(':')[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);
  return{
    title: "Оборудование для скважин - БРК",
    description: "Комплекты оборудования для водяных скважин. Полное обустройство, установка насосов, гидроаккумуляторов и других систем.",
    alternates: {
      canonical: `https://${currentSite.hostname}/equipment`,
    },
    openGraph: {
      title: "Оборудование для скважин - БРК",
      description: "Комплекты оборудования для водяных скважин. Полное обустройство, установка насосов, гидроаккумуляторов и других систем.",
      url: "https://brk42.ru/equipment",
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/equipment-og-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Оборудование для скважин - БРК",
      description: "Комплекты оборудования для водяных скважин. Полное обустройство, установка насосов, гидроаккумуляторов и других систем.",
      images: {
        url: "https://brk42.ru/static/equipment-twitter-image.jpg",
      },
    },
  }
 
};

const RepairPage = () => {
  return (
    <div>
      <main>
        <EquipmentPackagePage />
      </main>
      <footer>
        <Contacts />
      </footer>
    </div>
  );
};

export default RepairPage;