import { DataSource } from "typeorm";
import { Service, ServiceCategory } from "../services/entities/service.entity";

const sampleServices = [
  {
    name: "Трактор МТЗ-80",
    category: ServiceCategory.TRACTORS,
    description: "Трактор МТЗ-80 в отличном состоянии, готов к работе в поле. Опытный механизатор в комплекте. Все документы в порядке.",
    ownerName: "Азамат Токтосунов",
    contact: "+996700123456",
    whatsapp: "+996700123456",
    location: "bishkek",
    locationName: "г. Бишкек",
    district: "leninsky",
    districtName: "Ленинский район",
    price: "1500 сом/день",
    available: true,
    images: ["/uploads/services/tractor1.jpg"]
  },
  {
    name: "Грузовик КАМАЗ",
    category: ServiceCategory.TRUCKS,
    description: "КАМАЗ 5320, 10 тонн. Для перевозки строительных материалов, песка, щебня. Водитель в комплекте.",
    ownerName: "Бакыт Абдыкадыров",
    contact: "+996555987654",
    whatsapp: "+996555987654",
    location: "osh",
    locationName: "г. Ош",
    district: "leninsky",
    districtName: "Ленинский район",
    price: "2000 сом/день",
    available: true,
    images: ["/uploads/services/truck1.jpg"]
  },
  {
    name: "Бетономешалка 500л",
    category: ServiceCategory.CONCRETE,
    description: "Бетономешалка 500 литров, электрическая. В отличном состоянии, доставка по городу.",
    ownerName: "Эрлан Сатыбалдиев",
    contact: "+996700456789",
    whatsapp: "+996700456789",
    location: "bishkek",
    locationName: "г. Бишкек",
    district: "oktyabrsky",
    districtName: "Октябрьский район",
    price: "800 сом/день",
    available: true,
    images: ["/uploads/services/concrete1.jpg"]
  },
  {
    name: "Разгрузка фур",
    category: ServiceCategory.UNLOADING,
    description: "Разгрузка фур, контейнеров. Работаем 24/7. Быстро, качественно, с гарантией.",
    ownerName: "Марат Усенов",
    contact: "+996555123456",
    whatsapp: "+996555123456",
    location: "bishkek",
    locationName: "г. Бишкек",
    district: "sverdlovsky",
    districtName: "Свердловский район",
    price: "5000 сом/фура",
    available: true,
    images: ["/uploads/services/unloading1.jpg"]
  },
  {
    name: "Водовоз 5000л",
    category: ServiceCategory.WATER,
    description: "Водовоз 5000 литров. Доставка воды для строительства, полива. Работаем по всему городу.",
    ownerName: "Айбек Абдыкадыров",
    contact: "+996700789012",
    whatsapp: "+996700789012",
    location: "bishkek",
    locationName: "г. Бишкек",
    district: "pervomaysky",
    districtName: "Первомайский район",
    price: "1000 сом/рейс",
    available: true,
    images: ["/uploads/services/water1.jpg"]
  }
];

export async function seedServices(dataSource: DataSource) {
  const serviceRepository = dataSource.getRepository(Service);

  // Delete all existing services
  await serviceRepository.clear();

  // Create new services
  for (const serviceData of sampleServices) {
    const service = serviceRepository.create(serviceData);
    await serviceRepository.save(service);
  }

  console.log("Services seeded successfully!");
} 