
import { useState } from "react";
import { Search, Phone, MapPin, Truck, Tractor } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "Все категории", icon: "🔧" },
    { id: "unloading", name: "Разгрузочная техника", icon: "📦" },
    { id: "tractors", name: "Тракторы", icon: "🚜" },
    { id: "trucks", name: "Грузовики КамАЗ", icon: "🚛" },
    { id: "concrete", name: "Бетономешалки", icon: "🏗️" },
    { id: "water", name: "Водовозы", icon: "💧" }
  ];

  const services = [
    // Unloading Equipment
    {
      id: 1,
      name: "Грузчики-носильщики",
      category: "unloading",
      description: "Профессиональные грузчики для разгрузки товаров",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Село Центральное",
      price: "от 500₽/час",
      available: true
    },
    {
      id: 2,
      name: "Конвейерная система",
      category: "unloading",
      description: "Автоматизированная разгрузка сыпучих материалов",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Село Центральное",
      price: "от 2000₽/час",
      available: true
    },
    {
      id: 3,
      name: "Погрузчик вилочный",
      category: "unloading",
      description: "Разгрузка паллет и тяжелых грузов",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Село Северное",
      price: "от 1500₽/час",
      available: false
    },
    
    // Tractors
    {
      id: 4,
      name: "Культиватор КПС-4",
      category: "tractors",
      description: "Обработка почвы, рыхление, подготовка к посеву",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Фермерское хозяйство 'Нива'",
      price: "от 3000₽/га",
      available: true
    },
    {
      id: 5,
      name: "Пресс-подборщик",
      category: "tractors",
      description: "Сбор и упаковка сена в тюки",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "ООО 'АгроТех'",
      price: "от 800₽/га",
      available: true
    },
    {
      id: 6,
      name: "Плуг оборотный",
      category: "tractors",
      description: "Вспашка земли под посев",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Фермер Иванов И.И.",
      price: "от 2500₽/га",
      available: true
    },
    {
      id: 7,
      name: "Сеялка зерновая",
      category: "tractors",
      description: "Посев зерновых культур",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "КФХ 'Урожай'",
      price: "от 1200₽/га",
      available: false
    },

    // Trucks
    {
      id: 8,
      name: "КамАЗ 65115 самосвал",
      category: "trucks",
      description: "Перевозка сыпучих материалов, песка, щебня",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "ИП Петров",
      price: "от 4000₽/рейс",
      available: true
    },
    {
      id: 9,
      name: "КамАЗ 4308 бортовой",
      category: "trucks",
      description: "Перевозка стройматериалов, оборудования",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "ООО 'СтройТранс'",
      price: "от 3500₽/рейс",
      available: true
    },

    // Concrete
    {
      id: 10,
      name: "Бетономешалка 7 м³",
      category: "concrete",
      description: "Доставка готового бетона на объект",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Бетонный завод 'Монолит'",
      price: "от 5500₽/м³",
      available: true
    },
    {
      id: 11,
      name: "Автобетоносмеситель 9 м³",
      category: "concrete",
      description: "Приготовление и доставка бетона",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "ООО 'БетонСтрой'",
      price: "от 6000₽/м³",
      available: true
    },

    // Water
    {
      id: 12,
      name: "КамАЗ водовоз 10 м³",
      category: "water",
      description: "Доставка питьевой воды для дома и участка",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "ИП Сидоров",
      price: "от 2500₽/рейс",
      available: true
    },
    {
      id: 13,
      name: "КамАЗ водовоз 15 м³",
      category: "water",
      description: "Доставка воды для больших объемов",
      contact: "+7 (xxx) xxx-xx-xx",
      location: "Водоснабжение 'Родник'",
      price: "от 3500₽/рейс",
      available: true
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🚜 Техника и Услуги для Село
            </h1>
            <p className="text-xl text-gray-600">
              Найдите нужную технику и услуги в вашем районе
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Поиск техники и услуг..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Категории</h2>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="h-12 px-6 text-sm font-medium"
              >
                <span className="mr-2">{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <Card key={service.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {service.name}
                  </CardTitle>
                  <Badge variant={service.available ? "default" : "secondary"}>
                    {service.available ? "Доступно" : "Занято"}
                  </Badge>
                </div>
                <CardDescription className="text-gray-600">
                  {service.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    {service.location}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-green-600">
                      {service.price}
                    </span>
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      disabled={!service.available}
                    >
                      <Phone className="h-4 w-4" />
                      Связаться
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                    📞 {service.contact}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Truck className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">
              Ничего не найдено
            </h3>
            <p className="text-gray-500">
              Попробуйте изменить критерии поиска или выберите другую категорию
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Хотите добавить свои услуги?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Свяжитесь с нами, чтобы разместить информацию о вашей технике или услугах
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="px-8">
              Связаться с нами
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
