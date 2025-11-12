export const SITES = {
    DEFAULT: {
      name: 'БРК - Буровые компании Кузбасса',
      hostname: 'brk42.ru',
      // hostname: 'localhost',
      phone: '+7 (960) 925-08-70',
      clearCity: 'Кемерово',
      city: 'г. Кемерово',
      oblast: 'Кемеровской области', 
      adres:'г. Кемерово, ул. Терешковой, 52',
      mapUrl:'https://yandex.ru/map-widget/v1/?um=constructor%3Ab8029bf25abc2836f66d1c732a3575318fe791bb0b8c92cd22e7fd40b3a3750b&amp;source=constructor', 
      // mapUrl:'/images/kem.webp', 
      // mapContacts:'https://yandex.ru/map-widget/v1/?um=constructor%3A20fdc5324914d4bcf25838cbb457f863ba52791f0cf9dce14d61ff872b256ed5&amp;source=constructor',
      mapContacts:'/images/mapkem.webp',
      priceBurenie:'4000',
      priceBurenie2:'4900',
      metrikaId: 99461611
    },
    NOVOKUZNETSK: {
      hostname: 'novokuznetsk.brk42.ru', // 'localhost:3000',
      // hostname: 'novokuznetsk.localhost',
      name: 'БРК - Буровые компании Кузбасса',
      phone: '+7 (960) 915-92-70',
      clearCity: 'Новокузнецк',
      city: 'г. Новокузнецк',
      oblast: 'Кемеровской области', 
      adres:'г. Новокузнецк, Кондомское шоссе 6а/8',
       mapUrl:'https://yandex.ru/map-widget/v1/?um=constructor%3A089c5bea664781c594d8458fc3766a7bca1fda0a074a8429884a9cec4a2d62a6&amp;source=constructor',
      //  mapUrl:'/images/nkz.webp',
      //  mapContacts:'https://yandex.ru/map-widget/v1/?um=constructor%3A724fb58c1d3b01bd7af563e28eec2393daa21f8956a7a5facedcbc0c5ed1a70d&amp;source=constructor',
       mapContacts:'/images/mapkuz.webp',
       priceBurenie:'4200',
       priceBurenie2:'5100',
       metrikaId: 101092925
    },
    NOVOSIBIRSK: {
      hostname: 'novosibirsk.brk42.ru',
      // hostname: 'novosibirsk.localhost',
      name: 'БРК - Буровые компании Новосибирска',
      phone: '+7 (951) 228-12-83',
      clearCity: 'Новосибирск',
      city: 'г. Новосибирск',
      oblast: 'Новосибирской области', 
      adres:'г. Новосибирск, ул. Грузинская 1-я, 28/1',
      mapUrl:'https://yandex.ru/map-widget/v1/?um=constructor%3Adba388812b9f8e46a145af3601848a76874036ce3bf51760c8c8f7a2715b0ece&amp;source=constructor',
      // mapUrl:'/images/sib.webp',
      // mapContacts:'https://yandex.ru/map-widget/v1/?um=constructor%3Ac1100bfac885d46ded781a752207acfe5d726ef1f4265975e823efc7f73e05a6&amp;source=constructor',
      mapContacts:'/images/mapsib.webp',
      priceBurenie:'3500',
      priceBurenie2:'4400',
      metrikaId: 101092921
    }
    
  };
  
  export const getCurrentSiteConfig = (hostname) => {
    return (
      Object.values(SITES).find(site => site.hostname === hostname) || SITES.DEFAULT
    );
  };