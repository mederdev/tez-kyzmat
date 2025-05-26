import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { ServicesService } from '../services/services.service';

const MOCK_SERVICES = [
  {
    name: 'Жүк ташыгычтар',
    category: 'unloading',
    description: 'Товарларды түшүрүү үчүн кесипкөй жүк ташыгычтар',
    ownerName: 'Азамат Токтосунов',
    contact: '+996 (555) 123-456',
    whatsapp: '+996555123456',
    location: 'bishkek',
    locationName: 'Бишкек шаары',
    district: 'pervomayskiy',
    districtName: 'Биринчи Май району',
    price: '500 сомдон/саат',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    ],
  },
  {
    name: 'КамАЗ 65115 самосвал',
    category: 'trucks',
    description: 'Сыпкыч материалдар, кум, чакылташ ташуу',
    ownerName: 'Алмаз Исаков',
    contact: '+996 (220) 890-123',
    whatsapp: '+996220890123',
    location: 'osh-region',
    locationName: 'Ош областы',
    district: 'aravan',
    districtName: 'Араван району',
    price: '4000 сомдон/жол',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
    ],
  },
  {
    name: 'КПС-4 Культиватор',
    category: 'tractors',
    description: 'Топурак иштетүү, жумшартуу, эгүүгө даярдоо',
    ownerName: 'Талант Мамбетов',
    contact: '+996 (312) 456-789',
    whatsapp: '+996312456789',
    location: 'issyk-kul',
    locationName: 'Ысык-Көл областы',
    district: 'ak-suu',
    districtName: 'Ак-Суу району',
    price: '3000 сомдон/га',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1574091806716-8d8b8b1b1b1b?w=400&h=300&fit=crop',
    ],
  },
  {
    name: '7 м³ бетон аралаштыргыч',
    category: 'concrete',
    description: 'Даяр бетонду объектке жеткирүү',
    ownerName: 'Руслан Мамытов',
    contact: '+996 (312) 012-345',
    whatsapp: '+996312012345',
    location: 'bishkek',
    locationName: 'Бишкек шаары',
    district: 'oktyabrskiy',
    districtName: 'Октябрь району',
    price: '5500 сомдон/м³',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
    ],
  },
  {
    name: 'КамАЗ суу ташыгыч 10 м³',
    category: 'water',
    description: 'Ичүүгө жарактуу таза суу жеткирүү',
    ownerName: 'Бекболот Жолдошев',
    contact: '+996 (555) 234-567',
    whatsapp: '+996555234567',
    location: 'bishkek',
    locationName: 'Бишкек шаары',
    district: 'leninsky',
    districtName: 'Ленин району',
    price: '1000 сомдон/м³',
    available: true,
    images: [
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
    ],
  },
];

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const servicesService = app.get(ServicesService);

  console.log('🌱 Начинаю заполнение базы данных...');

  try {
    for (const serviceData of MOCK_SERVICES) {
      await servicesService.create(serviceData);
      console.log(`✅ Создан сервис: ${serviceData.name}`);
    }

    console.log('🎉 База данных успешно заполнена!');
  } catch (error) {
    console.error('❌ Ошибка при заполнении базы данных:', error);
  } finally {
    await app.close();
  }
}

seed();
