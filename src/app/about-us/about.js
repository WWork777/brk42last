'use client'
import '@/styles/components/about-us.scss'
import { getCurrentSiteConfig } from "@/constants/city";
import { useState, useEffect } from "react";

const About = () => {
    const [currentSite, setCurrentSite] = useState('');
        
          useEffect(() => {
            const hostname = window.location.hostname;
            setCurrentSite(getCurrentSiteConfig(hostname));
            
            const handlePopState = () => {
              setCurrentSite(getCurrentSiteConfig(window.location.hostname));
            };
            
            window.addEventListener('popstate', handlePopState);
            return () => window.removeEventListener('popstate', handlePopState);
          }, []);
    return(
        <div className="about-section">
            <div className='about-container'>
                <h1 className='about-title'>
                О компании BRK
                </h1>
                <p className='about-text'>
                Компания {currentSite.name}, динамично развивающаяся компания в сфере бурения скважин на воду, промышленных скважин и других буровых работ. Более 10 лет накопленного опыта, современные буровые установки и использование последних технологий в бурении, позволяют нам решать любые задачи.  При бурении скважин на воду мы используем современную НПВХ обсадную трубу . На нашем сайте Вы всегда можете получить исчерпывающую информацию о стоимости, конструкции и глубине скважины
                </p>    
            </div>
        
        </div>
    )
    
};

export default About