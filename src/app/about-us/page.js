import '@/styles/components/about-us.scss'
import Contacts from "@/components/Contacts";
import Advantages from "@/components/Advantages";
import About from './about';
import { headers } from 'next/headers';
import { getCurrentSiteConfig } from "@/constants/city";

export async function generateMetadata(){
  const headersList = headers();
    const hostname = headersList.get('host') || 'brk42.ru';
    const cleanHostname = hostname.split(':')[0];
    const currentSite = getCurrentSiteConfig(cleanHostname);
  return{
    title: `О компании БРК ${currentSite.clearCity}`,
    description: "Ремонт водяных скважин. Устранение засоров, замена оборудования, восстановление работы скважин. Гарантия качества от БРК.",
    alternates: {
      canonical:`https://${currentSite.hostname}/about-us`,
    },
    openGraph: {
      title: `Ремонт скважин в ${currentSite.clearCity} - БРК ${currentSite.clearCity}`,
      description: "Ремонт водяных скважин. Устранение засоров, замена оборудования, восстановление работы скважин. Гарантия качества от БРК.",
      url: "https://brk42.ru/repair",
      type: "website",
      images: [
        {
          url: "https://brk42.ru/static/repair-og-image.jpg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Ремонт скважин в ${currentSite.clearCity} - БРК ${currentSite.clearCity}`,
      description: "Ремонт водяных скважин. Устранение засоров, замена оборудования, восстановление работы скважин. Гарантия качества от БРК.",
      images: {
        url: "https://brk42.ru/static/repair-twitter-image.jpg",
      },
    },
  }
   
  };

const AboutUsPage = () => {
    return(
        <>
         <About/>   
         <Contacts/>
        </>
        
    )

}

export default AboutUsPage
