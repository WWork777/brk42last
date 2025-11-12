import Contacts from "@/components/Contacts";
import HeroRepair from "@/components/HeroRepair";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RepairSection from "@/components/RepairSection";
import ReasonsSection from "@/components/ReasonsRepair";
import AccordionSection from "@/components/AccordionRepair";
import Advantages from "@/components/Advantages";
import { headers } from "next/headers";
import { getCurrentSiteConfig } from "@/constants/city";

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get("host") || "brk42.ru";
  const cleanHostname = hostname.split(":")[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);

  return {
    title: `Ремонт скважин в ${currentSite.city} - БРК`,
    description: `Ремонт водяных скважин в ${currentSite.city} и ${currentSite.oblast}. Устранение засоров, замена оборудования, восстановление работы скважин. Гарантия качества от БРК.`,
    alternates: {
      canonical: `https://${cleanHostname}/repair`,
    },
    openGraph: {
      title: `Ремонт скважин в ${currentSite.city} - БРК`,
      description: `Ремонт водяных скважин в ${currentSite.city} и ${currentSite.oblast}. Устранение засоров, замена оборудования, восстановление работы скважин. Гарантия качества от БРК.`,
      url: `https://${cleanHostname}/repair`,
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/repair-og-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Ремонт скважин в ${currentSite.city} - БРК`,
      description: `Ремонт водяных скважин в ${currentSite.city} и ${currentSite.oblast}. Устранение засоров, замена оборудования, восстановление работы скважин. Гарантия качества от БРК.`,
      images: {
        url: "https://brk42.ru/static/repair-twitter-image.jpg",
      },
    },
  };
}

const RepairPage = () => {
  return (
    <div>
      <main>
        <HeroRepair />
        <RepairSection />
        <ReasonsSection />
        <AccordionSection />
        <Advantages />
      </main>
      <footer>
        <Contacts />
      </footer>
    </div>
  );
};

export default RepairPage;
