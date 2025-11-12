"use client";
import { useState, useEffect } from "react";
import "../styles/components/_mapFrame.scss";
import { getCurrentSiteConfig } from "@/constants/city";
import Image from "next/image";
const MapFrame = () => {
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

  return (
    <section className="map-section" id="depth-map">
      <div className="container">
        <header className="text-with-icon">
          <i className="bi bi-geo-alt-fill icon"></i>
          <div className="text-content">
            <h2 className="map-title">Карта глубин скважин</h2>
            <p className="map-description">
              Ознакомьтесь с картой глубин скважин для бурения в {currentSite.city} и {' '}
              {currentSite.oblast}. Эта информация поможет вам выбрать
              оптимальную глубину скважины.
            </p>
          </div>
        </header>

        <div className="map-container">
          <iframe
            src={currentSite.mapUrl}
            title="Карта глубин для бурения в Кемеровской области"
            aria-label="Карта глубин для бурения"
            id="map"
            loading="lazy"
          ></iframe>
          {/* <Image src={currentSite.mapUrl} alt="Карта глубин для бурения" width={1920} height={1080} style={{ width: "100%", height: "800px"}} /> */}
        </div>
      </div>
    </section>
  );
};

export default MapFrame;
