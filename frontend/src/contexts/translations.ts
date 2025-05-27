import { TranslationKey } from '@/types';

type TranslationKeys = {
  common: {
    appName: string;
    mainDescription: string;
    loading: string;
    addListing: string;
    admin: string;
    backToHome: string;
    search: string;
    searchPlaceholder: string;
    required: string;
    cancel: string;
    kyrgyz: string;
    russian: string;
    contact: {
      title: string;
      description: string;
      addButton: string;
      contactButton: string;
    };
  };
  filters: {
    category: string;
    location: string;
    district: string;
    selectCategory: string;
    selectRegion: string;
    selectDistrict: string;
    allRegions: string;
    allDistricts: string;
  };
  categories: {
    all: string;
    unloading: string;
    trucks: string;
    tractors: string;
    concrete: string;
    water: string;
  };
  locations: {
    all: string;
    bishkek: string;
    osh: string;
    chui: string;
    'issyk-kul': string;
    naryn: string;
    talas: string;
    'jalal-abad': string;
    'osh-region': string;
    batken: string;
    karakol: string;
    tokmok: string;
  };
  services: {
    createNew: string;
    createDescription: string;
    success: string;
    error: string;
    noResults: string;
    tryDifferentFilters: string;
    card: {
      available: string;
      unavailable: string;
      contact: string;
      whatsapp: string;
      whatsappMessage: string;
      moreImages: string;
      contactInfo: string;
      call: string;
      share: string;
      copyContact: string;
      linkCopied: string;
      contactCopied: string;
      clickToView: string;
    };
    form: {
      title: string;
      name: string;
      namePlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      category: string;
      price: string;
      pricePlaceholder: string;
      ownerName: string;
      ownerNamePlaceholder: string;
      contact: string;
      contactPlaceholder: string;
      whatsapp: string;
      whatsappPlaceholder: string;
      images: string;
      addImages: string;
      maxImages: string;
      submit: string;
      removeImage: string;
      imagesSelected: string;
      clearImages: string;
    };
  };
  admin: {
    title: string;
    statsError: string;
    servicesError: string;
    stats: {
      unavailable: string;
      totalServices: string;
      totalCategories: string;
      activeServices: string;
    };
    services: {
      title: string;
      deleteConfirm: string;
      noServices: string;
      total: string;
      editingService: string;
      columns: {
        name: string;
        owner: string;
        category: string;
        location: string;
        price: string;
        status: string;
        actions: string;
      };
      actions: {
        edit: string;
        delete: string;
        enable: string;
        disable: string;
      };
    };
  };
};

export const translations: Record<'ky' | 'ru', TranslationKeys> = {
  ky: {
    common: {
      appName: 'Тез Кызмат',
      mainDescription: 'Кызматтарды тез жана оңой табыңыз',
      loading: 'Жүктөлүүдө...',
      addListing: 'Кызмат кошуу',
      admin: 'Админ панель',
      backToHome: 'Башкы бетке кайтуу',
      search: 'Издөө',
      searchPlaceholder: 'Кызматтарды издөө...',
      required: 'Милдеттүү талаа',
      cancel: 'Жокко чыгаруу',
      kyrgyz: 'Кыргызча',
      russian: 'Орусча',
      contact: {
        title: 'Кызматыңызды кошуңуз',
        description: 'Кызматыңызды кошуп, көбүрөөк кардарларды тартыңыз',
        addButton: 'Кызмат кошуу',
        contactButton: 'Байланышуу'
      }
    },
    filters: {
      category: 'Категория',
      location: 'Аймак',
      district: 'Район',
      selectCategory: 'Категорияны тандаңыз',
      selectRegion: 'Аймакты тандаңыз',
      selectDistrict: 'Районду тандаңыз',
      allRegions: 'Бардык аймактар',
      allDistricts: 'Бардык райондор'
    },
    categories: {
      all: 'Бардык категориялар',
      unloading: 'Жүк түшүрүү',
      trucks: 'Жүк ташуу',
      tractors: 'Трактор кызматтары',
      concrete: 'Бетон ишмердүүлүгү',
      water: 'Суу ташуу'
    },
    locations: {
      all: 'Бардык аймактар',
      bishkek: 'Бишкек',
      osh: 'Ош',
      chui: 'Чүй',
      'issyk-kul': 'Ысык-Көл',
      naryn: 'Нарын',
      talas: 'Талас',
      'jalal-abad': 'Жалал-Абад',
      'osh-region': 'Ош облусу',
      batken: 'Баткен',
      karakol: 'Каракол',
      tokmok: 'Токмок'
    },
    services: {
      createNew: 'Жаңы кызмат кошуу',
      createDescription: 'Кызматыңыз жөнүндө маалыматты толтуруңуз',
      success: 'Кызмат ийгиликтүү кошулду',
      error: 'Ката кетти. Кайра аракет кылыңыз',
      noResults: 'Кызматтар табылган жок',
      tryDifferentFilters: 'Башка фильтрлерди колдонуп көрүңүз',
      card: {
        available: 'Жеткиликтүү',
        unavailable: 'Жеткиликсиз',
        contact: 'Байланышуу',
        whatsapp: 'WhatsApp',
        whatsappMessage: 'Саламатсызбы! Тез Кызмат аркылуу кызматыңыз менен кызыктым.',
        moreImages: 'сүрөт көбүрөөк',
        contactInfo: 'Байланыш маалыматы',
        call: 'Чалуу',
        share: 'Бөлүшүү',
        copyContact: 'Номерди көчүрүү',
        linkCopied: 'Шилтеме көчүрүлдү',
        contactCopied: 'Номер көчүрүлдү',
        clickToView: 'Сүрөттөрдү көрүү үчүн басыңыз'
      },
      form: {
        title: 'Кызмат кошуу',
        name: 'Аталышы',
        namePlaceholder: 'Кызматтын аталышын жазыңыз',
        description: 'Сүрөттөмө',
        descriptionPlaceholder: 'Кызмат жөнүндө кеңири маалымат',
        category: 'Категория',
        price: 'Баасы',
        pricePlaceholder: 'Мисалы: 1000 сом/саат',
        ownerName: 'Ээсинин аты',
        ownerNamePlaceholder: 'Толук атыңызды жазыңыз',
        contact: 'Байланыш номери',
        contactPlaceholder: 'Мисалы: 0700123456',
        whatsapp: 'WhatsApp номери',
        whatsappPlaceholder: 'Мисалы: 0700123456',
        images: 'Сүрөттөр',
        addImages: 'Сүрөттөрдү кошуу үчүн басыңыз же сүйрөп алып келиңиз',
        maxImages: 'Максимум 5 сүрөт',
        submit: 'Кошуу',
        removeImage: 'Сүрөттү өчүрүү',
        imagesSelected: 'сүрөт тандалды',
        clearImages: 'Бардык сүрөттөрдү өчүрүү'
      }
    },
    admin: {
      title: 'Админ панель',
      statsError: 'Статистика жүктөөдө ката',
      servicesError: 'Кызматтарды жүктөөдө ката',
      stats: {
        unavailable: 'Статистика жеткиликсиз',
        totalServices: 'Жалпы кызматтар',
        totalCategories: 'Категориялар',
        activeServices: 'Активдүү кызматтар'
      },
      services: {
        title: 'Кызматтарды башкаруу',
        deleteConfirm: 'Бул кызматты чынында эле өчүргүңүз келеби?',
        noServices: 'Кызматтар табылган жок',
        total: 'Жалпы',
        editingService: 'Кызматты өзгөртүү:',
        columns: {
          name: 'Аталышы',
          owner: 'Ээси',
          category: 'Категория',
          location: 'Жайгашкан жери',
          price: 'Баасы',
          status: 'Статус',
          actions: 'Аракеттер'
        },
        actions: {
          edit: 'Өзгөртүү',
          delete: 'Өчүрүү',
          enable: 'Активдештирүү',
          disable: 'Өчүрүү'
        }
      }
    }
  },
  ru: {
    common: {
      appName: 'Тез Кызмат',
      mainDescription: 'Быстрый поиск услуг',
      loading: 'Загрузка...',
      addListing: 'Добавить услугу',
      admin: 'Админ панель',
      backToHome: 'Вернуться на главную',
      search: 'Поиск',
      searchPlaceholder: 'Поиск услуг...',
      required: 'Обязательное поле',
      cancel: 'Отмена',
      kyrgyz: 'Кыргызча',
      russian: 'Русский',
      contact: {
        title: 'Добавьте свою услугу',
        description: 'Добавьте свою услугу и получите больше клиентов',
        addButton: 'Добавить услугу',
        contactButton: 'Связаться'
      }
    },
    filters: {
      category: 'Категория',
      location: 'Регион',
      district: 'Район',
      selectCategory: 'Выберите категорию',
      selectRegion: 'Выберите регион',
      selectDistrict: 'Выберите район',
      allRegions: 'Все регионы',
      allDistricts: 'Все районы'
    },
    categories: {
      all: 'Все категории',
      unloading: 'Разгрузка',
      trucks: 'Грузоперевозки',
      tractors: 'Услуги тракторов',
      concrete: 'Бетонные работы',
      water: 'Доставка воды'
    },
    locations: {
      all: 'Все регионы',
      bishkek: 'Бишкек',
      osh: 'Ош',
      chui: 'Чуй',
      'issyk-kul': 'Иссык-Куль',
      naryn: 'Нарын',
      talas: 'Талас',
      'jalal-abad': 'Джалал-Абад',
      'osh-region': 'Ошская область',
      batken: 'Баткен',
      karakol: 'Каракол',
      tokmok: 'Токмок'
    },
    services: {
      createNew: 'Добавить новую услугу',
      createDescription: 'Заполните информацию о вашей услуге',
      success: 'Услуга успешно добавлена',
      error: 'Произошла ошибка. Попробуйте еще раз',
      noResults: 'Услуги не найдены',
      tryDifferentFilters: 'Попробуйте другие фильтры',
      card: {
        available: 'Доступно',
        unavailable: 'Недоступно',
        contact: 'Связаться',
        whatsapp: 'WhatsApp',
        whatsappMessage: 'Здравствуйте! Я заинтересован в вашей услуге через Тез Кызмат.',
        moreImages: 'больше фото',
        contactInfo: 'Контактная информация',
        call: 'Позвонить',
        share: 'Поделиться',
        copyContact: 'Скопировать номер',
        linkCopied: 'Ссылка скопирована',
        contactCopied: 'Номер скопирован',
        clickToView: 'Нажмите, чтобы просмотреть фото'
      },
      form: {
        title: 'Добавить услугу',
        name: 'Название',
        namePlaceholder: 'Введите название услуги',
        description: 'Описание',
        descriptionPlaceholder: 'Подробное описание услуги',
        category: 'Категория',
        price: 'Цена',
        pricePlaceholder: 'Например: 1000 сом/час',
        ownerName: 'Имя владельца',
        ownerNamePlaceholder: 'Введите ваше полное имя',
        contact: 'Контактный номер',
        contactPlaceholder: 'Например: 0700123456',
        whatsapp: 'Номер WhatsApp',
        whatsappPlaceholder: 'Например: 0700123456',
        images: 'Фотографии',
        addImages: 'Нажмите или перетащите фотографии сюда',
        maxImages: 'Максимум 5 фотографий',
        submit: 'Добавить',
        removeImage: 'Удалить фото',
        imagesSelected: 'фото выбрано',
        clearImages: 'Удалить все фото'
      }
    },
    admin: {
      title: 'Админ панель',
      statsError: 'Ошибка при загрузке статистики',
      servicesError: 'Ошибка при загрузке сервисов',
      stats: {
        unavailable: 'Статистика недоступна',
        totalServices: 'Всего сервисов',
        totalCategories: 'Категории',
        activeServices: 'Активные сервисы'
      },
      services: {
        title: 'Управление сервисами',
        deleteConfirm: 'Вы действительно хотите удалить этот сервис?',
        noServices: 'Сервисы не найдены',
        total: 'Всего',
        editingService: 'Редактирование сервиса:',
        columns: {
          name: 'Название',
          owner: 'Владелец',
          category: 'Категория',
          location: 'Местоположение',
          price: 'Цена',
          status: 'Статус',
          actions: 'Действия'
        },
        actions: {
          edit: 'Редактировать',
          delete: 'Удалить',
          enable: 'Активировать',
          disable: 'Деактивировать'
        }
      }
    }
  }
}; 