import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import VideoLoggingPage from "@/components/VideoLoggingPage";
import Contacts from "@/components/Contacts";
import { headers } from 'next/headers';
import { getCurrentSiteConfig } from "@/constants/city";

export async function generateMetadata() {
  const headersList = headers();
    const hostname = headersList.get('host') || 'brk42.ru';
    const cleanHostname = hostname.split(':')[0];
    const currentSite = getCurrentSiteConfig(cleanHostname);
  return{
    title: "Видеокаротаж скважин - БРК",
    description: "Услуга видеокаротажа для анализа состояния скважин. Оценка качества воды, выявление проблем и планирование ремонта.",
    alternates: {
      canonical: `https://${currentSite.hostname}/video-logging`,
    },
    openGraph: {
      title: "Видеокаротаж скважин - БРК",
      description: "Услуга видеокаротажа для анализа состояния скважин. Оценка качества воды, выявление проблем и планирование ремонта.",
      url: "https://brk42.ru/video-logging",
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/video-logging-og-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Видеокаротаж скважин - БРК",
      description: "Услуга видеокаротажа для анализа состояния скважин. Оценка качества воды, выявление проблем и планирование ремонта.",
      images: {
        url: "https://brk42.ru/static/video-logging-twitter-image.jpg",
      },
    },
  }
 
};

const VideoLoggingPageComponent = () => {
  
  return (
    <div>
      <main>
        <VideoLoggingPage />
      </main>
      <footer>
        <Contacts />
      </footer>
    </div>
  );
};

export default VideoLoggingPageComponent;