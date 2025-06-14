export interface Location {
  id: string;
  name: string;
}

export interface District {
  id: string;
  name: string;
}

// Категории техники
export const SERVICE_CATEGORIES = [
  { key: "unloading", name: "Разгрузочная техника" },
  { key: "tractors", name: "Тракторы" },
  { key: "trucks", name: "КамАЗы и грузовики" },
  { key: "concrete", name: "Бетономешалки" },
  { key: "water", name: "Водовозы" },
];

// Регионы с районами в новом формате
export const LOCATIONS: Record<
  string,
  { name: string; districts: Record<string, string> }
> = {
  bishkek: {
    name: "г. Бишкек",
    districts: {
      leninsky: "Ленинский район",
      pervomaysky: "Первомайский район",
      sverdlovsky: "Свердловский район",
      oktyabrsky: "Октябрьский район",
    },
  },
  osh: {
    name: "г. Ош",
    districts: {
      city: "Центр города",
    },
  },
  chui: {
    name: "Чуйская область",
    districts: {
      alamudun: "Аламудунский район",
      chui: "Чуйский район",
      jayyl: "Жайылский район",
      kemin: "Кеминский район",
      moskva: "Московский район",
      panfilov: "Панфиловский район",
      sokuluk: "Сокулукский район",
      ysyk_ata: "Ысык-Атинский район",
    },
  },
  "issyk-kul": {
    name: "Иссык-Кульская область",
    districts: {
      balykchy: "Балыкчинский район",
      issyk_kul: "Иссык-Кульский район",
      jeti_oguz: "Джети-Огузский район",
      ak_suu: "Ак-Сууйский район",
      ton: "Тонский район",
    },
  },
  naryn: {
    name: "Нарынская область",
    districts: {
      naryn: "Нарынский район",
      at_bashi: "Ат-Башинский район",
      jumgal: "Джумгальский район",
      kochkor: "Кочкорский район",
    },
  },
  talas: {
    name: "Таласская область",
    districts: {
      talas: "Таласский район",
      bakai_ata: "Бакай-Атинский район",
      kara_buura: "Кара-Бууринский район",
      manas: "Манасский район",
    },
  },
  "jalal-abad": {
    name: "Джалал-Абадская область",
    districts: {
      jalal_abad: "Джалал-Абадский район",
      ala_buka: "Ала-Букинский район",
      aksy: "Аксыйский район",
      bazar_korgon: "Базар-Коргонский район",
      chatkal: "Чаткальский район",
      nooken: "Ноокенский район",
      suzak: "Сузакский район",
      toktogul: "Токтогульский район",
    },
  },
  "osh-region": {
    name: "Ошская область",
    districts: {
      aravan: "Араванский район",
      kara_suu: "Кара-Сууйский район",
      nookat: "Ноокатский район",
      ozgon: "Узгенский район",
      kara_kulja: "Кара-Кулджинский район",
      alai: "Алайский район",
      chong_alai: "Чон-Алайский район",
    },
  },
  batken: {
    name: "Баткенская область",
    districts: {
      batken: "Баткенский район",
      kadamjay: "Кадамжайский район",
      leilek: "Лейлекский район",
    },
  },
};

// Старая структура районов для обратной совместимости
export const DISTRICTS: Record<string, District[]> = {
  bishkek: [
    { id: "pervomayskiy", name: "Биринчи Май району" },
    { id: "oktyabrskiy", name: "Октябрь району" },
    { id: "sverdlovskiy", name: "Свердлов району" },
    { id: "leninskiy", name: "Ленин району" },
  ],
  chui: [
    { id: "alamudun", name: "Аламүдүн району" },
    { id: "chui-center", name: "Чүй району" },
    { id: "sokuluk", name: "Сокулук району" },
    { id: "jayyl", name: "Жайыл району" },
    { id: "kemin", name: "Кемин району" },
    { id: "moskva", name: "Москва району" },
    { id: "panfilov", name: "Панфилов району" },
    { id: "tokmok", name: "Токмок району" },
  ],
  "issyk-kul": [
    { id: "balykchy", name: "Балыкчы району" },
    { id: "issyk-kul-center", name: "Ысык-Көл району" },
    { id: "jeti-oguz", name: "Жети-Өгүз району" },
    { id: "ak-suu", name: "Ак-Суу району" },
    { id: "ton", name: "Тон району" },
  ],
  naryn: [
    { id: "naryn-center", name: "Нарын району" },
    { id: "at-bashi", name: "Ат-Башы району" },
    { id: "jumgal", name: "Жумгал району" },
    { id: "kochkor", name: "Кочкор району" },
  ],
  talas: [
    { id: "talas-center", name: "Талас району" },
    { id: "bakai-ata", name: "Бакай-Ата району" },
    { id: "kara-buura", name: "Кара-Буура району" },
    { id: "manas", name: "Манас району" },
  ],
  "jalal-abad": [
    { id: "jalal-abad-center", name: "Жалал-Абад району" },
    { id: "ala-buka", name: "Ала-Бука району" },
    { id: "aksy", name: "Аксы району" },
    { id: "bazar-korgon", name: "Базар-Коргон району" },
    { id: "chatkal", name: "Чаткал району" },
    { id: "nooken", name: "Ноокен району" },
    { id: "suzak", name: "Сузак району" },
    { id: "toktogul", name: "Токтогул району" },
  ],
  "osh-region": [
    { id: "aravan", name: "Араван району" },
    { id: "kara-suu", name: "Кара-Суу району" },
    { id: "nookat", name: "Ноокат району" },
    { id: "ozgon", name: "Өзгөн району" },
    { id: "kara-kulja", name: "Кара-Кулжа району" },
    { id: "alai", name: "Алай району" },
    { id: "chong-alai", name: "Чоң-Алай району" },
  ],
  batken: [
    { id: "batken-center", name: "Баткен району" },
    { id: "kadamjay", name: "Кадамжай району" },
    { id: "leilek", name: "Лейлек району" },
  ],
};
