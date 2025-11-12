'use client';

import { useEffect, useState } from 'react';
import { getCurrentSiteConfig } from "@/constants/city";

export function useCurrentSite() {
  const [currentSite, setCurrentSite] = useState(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    setCurrentSite(getCurrentSiteConfig(hostname));
  }, []);

  return currentSite;
}