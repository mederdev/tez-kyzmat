
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
    { id: "all", name: "Бардык категориялар", icon: "🔧" },
    { id: "unloading", name: "Түшүрүү техникасы", icon: "📦" },
    { id: "tractors", name: "Тракторлор", icon: "🚜" },
    { id: "trucks", name: "КамАЗ жүк ташуучулар", icon: "🚛" },
    { id: "concrete", name: "Бетон аралаштыргычтар", icon: "🏗️" },
    { id: "water", name: "Суу ташыгычтар", icon: "💧" }
  ];

  const services = [
    // Unloading Equipment
    {
      id: 1,
      name: "Жүк ташыгычтар",
      category: "unloading",
      description: "Товарларды түшүрүү үчүн кесипкөй жүк ташыгычтар",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "Борбордук айыл",
      price: "500 сомдон/саат",
      available: true
    },
    {
      id: 2,
      name: "Конвейер системасы",
      category: "unloading",
      description: "Сыпкыч материалдарды автоматтык түшүрүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "Борбордук айыл",
      price: "2000 сомдон/саат",
      available: true
    },
    {
      id: 3,
      name: "Вилкалуу жүк көтөргүч",
      category: "unloading",
      description: "Паллеттерди жана оор жүктөрдү түшүрүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "Түндүк айыл",
      price: "1500 сомдон/саат",
      available: false
    },
    
    // Tractors
    {
      id: 4,
      name: "КПС-4 Культиватор",
      category: "tractors",
      description: "Топурак иштетүү, жумшартуу, эгүүгө даярдоо",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'Ниваа' фермер чарбасы",
      price: "3000 сомдон/га",
      available: true
    },
    {
      id: 5,
      name: "Пресс-түндүргүч",
      category: "tractors",
      description: "Чөптү топтоп, түйүндөргө ороо",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'АгроТех' ЖЧК",
      price: "800 сомдон/га",
      available: true
    },
    {
      id: 6,
      name: "Айлануучу жер жыргагыч",
      category: "tractors",
      description: "Эгүү үчүн жерди жыргоо",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "Иванов И.И. фермери",
      price: "2500 сомдон/га",
      available: true
    },
    {
      id: 7,
      name: "Дан эгүүчү",
      category: "tractors",
      description: "Дан өсүмдүктөрүн эгүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'Түшүм' КФЧ",
      price: "1200 сомдон/га",
      available: false
    },

    // Trucks
    {
      id: 8,
      name: "КамАЗ 65115 самосвал",
      category: "trucks",
      description: "Сыпкыч материалдар, кум, чакылташ ташуу",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "Петров ЖИ",
      price: "4000 сомдон/жол",
      available: true
    },
    {
      id: 9,
      name: "КамАЗ 4308 бортовой",
      category: "trucks",
      description: "Курулуш материалдары, жабдуулар ташуу",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'СтройТранс' ЖЧК",
      price: "3500 сомдон/жол",
      available: true
    },

    // Concrete
    {
      id: 10,
      name: "7 м³ бетон аралаштыргыч",
      category: "concrete",
      description: "Даяр бетонду объектке жеткирүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'Монолит' бетон заводу",
      price: "5500 сомдон/м³",
      available: true
    },
    {
      id: 11,
      name: "9 м³ авто-бетон аралаштыргыч",
      category: "concrete",
      description: "Бетон даярдоо жана жеткирүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'БетонСтрой' ЖЧК",
      price: "6000 сомдон/м³",
      available: true
    },

    // Water
    {
      id: 12,
      name: "КамАЗ суу ташыгыч 10 м³",
      category: "water",
      description: "Үй жана участка ичүүчү суу жеткирүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "Сидоров ЖИ",
      price: "2500 сомдон/жол",
      available: true
    },
    {
      id: 13,
      name: "КамАЗ суу ташыгыч 15 м³",
      category: "water",
      description: "Чоң көлөмдөгү суу жеткирүү",
      contact: "+996 (xxx) xxx-xx-xx",
      location: "'Булак' суу камсыздоо",
      price: "3500 сомдон/жол",
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
              🚜 Айыл үчүн Техника жана Кызматтар
            </h1>
            <p className="text-xl text-gray-600">
              Өз районуңуздан керектүү техника жана кызматтарды табыңыз
            </p>
          </div>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Техника жана кызматтарды издөө..."
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
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Категориялар</h2>
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
                    {service.available ? "Жеткиликтүү" : "Бош эмес"}
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
                      Байланышуу
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
              Эч нерсе табылган жок
            </h3>
            <p className="text-gray-500">
              Издөө критерийлерин өзгөртүп көрүңүз же башка категорияны тандаңыз
            </p>
          </div>
        )}

        {/* Contact Info */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            Өз кызматтарыңызды кошкуңуз келеби?
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Техника же кызматтар жөнүндө маалымат жайгаштыруу үчүн биз менен байланышыңыз
          </p>
          <div className="flex justify-center">
            <Button size="lg" className="px-8">
              Биз менен байланышуу
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
