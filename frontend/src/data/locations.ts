import { Location } from "@/types";

export const locations: Location[] = [
  {
    id: "bishkek",
    name: "Бишкек",
    districts: [
      { id: "pervomaysky", name: "Первомайский район" },
      { id: "sverdlovsky", name: "Свердловский район" },
      { id: "leninsky", name: "Ленинский район" },
      { id: "oktyabrsky", name: "Октябрьский район" },
    ],
  },
  {
    id: "osh",
    name: "Ош",
    districts: [
      { id: "osh-center", name: "Центр" },
      { id: "osh-north", name: "Түндүк район" },
      { id: "osh-south", name: "Түштүк район" },
    ],
  },
  {
    id: "jalal-abad",
    name: "Жалал-Абад",
    districts: [
      { id: "jalal-abad-center", name: "Центр" },
      { id: "jalal-abad-east", name: "Чыгыш район" },
    ],
  },
  {
    id: "karakol",
    name: "Каракол",
    districts: [
      { id: "karakol-center", name: "Центр" },
      { id: "karakol-suburbs", name: "Четтер" },
    ],
  },
  {
    id: "tokmok",
    name: "Токмок",
    districts: [
      { id: "tokmok-center", name: "Центр" },
      { id: "tokmok-industrial", name: "Өнөр жай району" },
    ],
  },
];
