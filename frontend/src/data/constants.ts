import { Category, Region } from "@/types";
import { translations } from "@/i18n/translations";

export const CATEGORIES: Category[] = [
  { id: "all", name: "Бардык категориялар", icon: "🔧" },
  { id: "unloading", name: "Түшүрүү техникасы", icon: "📦" },
  { id: "tractors", name: "Тракторлор", icon: "🚜" },
  { id: "trucks", name: "КамАЗ жүк ташуучулар", icon: "🚛" },
  { id: "concrete", name: "Бетон аралаштыргычтар", icon: "🏗️" },
  { id: "water", name: "Суу ташыгычтар", icon: "💧" },
];

export const KYRGYZSTAN_REGIONS: Region[] = [
  {
    id: "all",
    name: "Бардык аймактар",
    emoji: "🇰🇬",
    districts: [],
  },
  {
    id: "bishkek",
    name: "Бишкек шаары",
    emoji: "🏙️",
    districts: [
      { id: "pervomayskiy", name: "Биринчи Май району", regionId: "bishkek" },
      { id: "oktyabrskiy", name: "Октябрь району", regionId: "bishkek" },
      { id: "sverdlovskiy", name: "Свердлов району", regionId: "bishkek" },
      { id: "leninskiy", name: "Ленин району", regionId: "bishkek" },
    ],
  },
  {
    id: "osh",
    name: "Ош шаары",
    emoji: "🏛️",
    districts: [
      { id: "osh-center", name: "Борбордук район", regionId: "osh" },
      { id: "osh-north", name: "Түндүк район", regionId: "osh" },
      { id: "osh-south", name: "Түштүк район", regionId: "osh" },
    ],
  },
  {
    id: "chui",
    name: "Чүй областы",
    emoji: "🏛️",
    districts: [
      { id: "alamudun", name: "Аламүдүн району", regionId: "chui" },
      { id: "chui-center", name: "Чүй району", regionId: "chui" },
      { id: "jayyl", name: "Жайыл району", regionId: "chui" },
      { id: "kemin", name: "Кемин району", regionId: "chui" },
      { id: "moskva", name: "Москва району", regionId: "chui" },
      { id: "panfilov", name: "Панфилов району", regionId: "chui" },
      { id: "sokuluk", name: "Сокулук району", regionId: "chui" },
      { id: "ysyk-ata", name: "Ысык-Ата району", regionId: "chui" },
    ],
  },
  {
    id: "issyk-kul",
    name: "Ысык-Көл областы",
    emoji: "🏛️",
    districts: [
      { id: "ak-suu", name: "Ак-Суу району", regionId: "issyk-kul" },
      {
        id: "issyk-kul-center",
        name: "Ысык-Көл району",
        regionId: "issyk-kul",
      },
      { id: "jeti-oguz", name: "Жети-Өгүз району", regionId: "issyk-kul" },
      { id: "ton", name: "Тон району", regionId: "issyk-kul" },
      { id: "tup", name: "Түп району", regionId: "issyk-kul" },
    ],
  },
  {
    id: "naryn",
    name: "Нарын областы",
    emoji: "🏛️",
    districts: [
      { id: "ak-talaa", name: "Ак-Талаа району", regionId: "naryn" },
      { id: "at-bashy", name: "Ат-Башы району", regionId: "naryn" },
      { id: "jumgal", name: "Жумгал району", regionId: "naryn" },
      { id: "kochkor", name: "Кочкор району", regionId: "naryn" },
      { id: "naryn-center", name: "Нарын району", regionId: "naryn" },
    ],
  },
  {
    id: "talas",
    name: "Талас областы",
    emoji: "🏛️",
    districts: [
      { id: "bakai-ata", name: "Бакай-Ата району", regionId: "talas" },
      { id: "kara-buura", name: "Кара-Буура району", regionId: "talas" },
      { id: "manas", name: "Манас району", regionId: "talas" },
      { id: "talas-center", name: "Талас району", regionId: "talas" },
    ],
  },
  {
    id: "jalal-abad",
    name: "Жалал-Абад областы",
    emoji: "🏛️",
    districts: [
      { id: "aksy", name: "Аксы району", regionId: "jalal-abad" },
      { id: "ala-buka", name: "Ала-Бука району", regionId: "jalal-abad" },
      {
        id: "bazar-korgon",
        name: "Базар-Коргон району",
        regionId: "jalal-abad",
      },
      { id: "chatkal", name: "Чаткал району", regionId: "jalal-abad" },
      {
        id: "jalal-abad-center",
        name: "Жалал-Абад району",
        regionId: "jalal-abad",
      },
      { id: "nooken", name: "Ноокен району", regionId: "jalal-abad" },
      { id: "suzak", name: "Сузак району", regionId: "jalal-abad" },
      { id: "toguz-toro", name: "Тогуз-Торо району", regionId: "jalal-abad" },
    ],
  },
  {
    id: "osh-region",
    name: "Ош областы",
    emoji: "🏛️",
    districts: [
      { id: "alai", name: "Алай району", regionId: "osh-region" },
      { id: "aravan", name: "Араван району", regionId: "osh-region" },
      { id: "chon-alai", name: "Чон-Алай району", regionId: "osh-region" },
      { id: "kara-kuldzha", name: "Кара-Кулжа району", regionId: "osh-region" },
      { id: "kara-suu", name: "Кара-Суу району", regionId: "osh-region" },
      { id: "nookat", name: "Ноокат району", regionId: "osh-region" },
      { id: "ozgon", name: "Өзгөн району", regionId: "osh-region" },
    ],
  },
  {
    id: "batken",
    name: "Баткен областы",
    emoji: "🏛️",
    districts: [
      { id: "batken-center", name: "Баткен району", regionId: "batken" },
      { id: "kadamjay", name: "Кадамжай району", regionId: "batken" },
      { id: "leilek", name: "Лейлек району", regionId: "batken" },
    ],
  },
];

export const getWhatsAppMessageTemplate = (serviceName: string, language: 'ky' | 'ru'): string => {
  return translations[language].services.whatsappMessage.replace('{serviceName}', serviceName);
};

// Моковые изображения для разных категорий
export const MOCK_IMAGES = {
  unloading: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
  ],
  tractors: [
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1574263867128-a3d5c1b1deae?w=400&h=300&fit=crop",
  ],
  trucks: [
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=300&fit=crop",
  ],
  concrete: [
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  ],
  water: [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1566473965997-3de9c817e938?w=400&h=300&fit=crop",
  ],
};
