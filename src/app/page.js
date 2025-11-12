import MainCarousel from "../components/MainCarousel";
import Advantages from "../components/Advantages";
import MapFrame from "../components/MapFrame";
import DrillingTypes2 from "@/components/DrillingTypes2";
import VkLink from "@/components/VkLink";
import SetupWells2 from "@/components/SetupWells2";
import Calculator from "@/components/Calculator";
import Reviews from "@/components/Reviews";
import VKPosts from "@/components/VKPosts";
import WorkSteps from "@/components/WorkSteps";
import VideoGallery from "@/components/VideoGallery";
import Contacts from "@/components/Contacts";
import { SITES, getCurrentSiteConfig } from "@/constants/city";
import { headers } from "next/headers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export async function generateMetadata() {
  const headersList = headers();
  const hostname = headersList.get("host") || "brk42.ru";
  const cleanHostname = hostname.split(":")[0];
  const currentSite = getCurrentSiteConfig(cleanHostname);
  return {
    title: `Бурение скважин на воду ${currentSite.city} цена под ключ`,
    description: `Компания БРК - Буровые компании! Предоставляем комплексное решение по бурению скважин на воду в ${currentSite.city} и ${currentSite.oblast}.`,
    alternates: {
      canonical: `https://${currentSite.hostname}`,
    },
    openGraph: {
      title: `Бурение скважин на воду ${currentSite.city} цена под ключ`,
      description: `Компания БРК - Буровые компании! Предоставляем комплексное решение по бурению скважин на воду в ${currentSite.city} и ${currentSite.oblast}.`,
      url: `https://${currentSite.hostname}`,
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/og-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Бурение скважин на воду ${currentSite.city} цена под ключ`,
      description: `Компания БРК - Буровые компании! Предоставляем комплексное решение по бурению скважин на воду в ${currentSite.city} и ${currentSite.oblast}.`,
      images: {
        url: "https://brk42.ru/static/twitter-image.jpg",
      },
    },
  };
}

export default function HomePage() {
  return (
    <>
      <div>
        <MainCarousel />
        <Advantages />
        <MapFrame />
        <DrillingTypes2 />
        <VkLink />
        <SetupWells2 />
        <Calculator />
        <Reviews />
        <VKPosts />
        <WorkSteps />
        <VideoGallery />
        <Contacts />
      </div>
    </>
  );
}
