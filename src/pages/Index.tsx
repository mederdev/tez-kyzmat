
import { useState } from "react";
import { Search, Phone, MapPin, Truck, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");

  const categories = [
    { id: "all", name: "Бардык категориялар", icon: "🔧" },
    { id: "unloading", name: "Түшүрүү техникасы", icon: "📦" },
    { id: "tractors", name: "Тракторлор", icon: "🚜" },
    { id: "trucks", name: "КамАЗ жүк ташуучулар", icon: "🚛" },
    { id: "concrete", name: "Бетон аралаштыргычтар", icon: "🏗️" },
    { id: "water", name: "Суу ташыгычтар", icon: "💧" }
  ];

  // Области Кыргызстана
  const kyrgyzstanRegions = [
    { id: "all", name: "Бардык аймактар", emoji: "🇰🇬" },
    { id: "bishkek", name: "Бишкек шаары", emoji: "🏙️" },
    { id: "osh", name: "Ош шаары", emoji: "🏛️" },
    { id: "chui", name: "Чүй областы", emoji: "🌾" },
    { id: "issyk-kul", name: "Ысык-Көл областы", emoji: "🏔️" },
    { id: "naryn", name: "Нарын областы", emoji: "⛰️" },
    { id: "talas", name: "Талас областы", emoji: "🌿" },
    { id: "jalal-abad", name: "Жалал-Абад областы", emoji: "🌸" },
    { id: "osh-region", name: "Ош областы", emoji: "🍇" },
    { id: "batken", name: "Баткен областы", emoji: "🌵" }
  ];

  const services = [
    // Unloading Equipment
    {
      id: 1,
      name: "Жүк ташыгычтар",
      category: "unloading",
      description: "Товарларды түшүрүү үчүн кесипкөй жүк ташыгычтар",
      contact: "+996 (555) 123-456",
      whatsapp: "+996555123456",
      location: "bishkek",
      locationName: "Бишкек шаары",
      price: "500 сомдон/саат",
      available: true
    },
    {
      id: 2,
      name: "Конвейер системасы",
      category: "unloading",
      description: "Сыпкыч материалдарды автоматтык түшүрүү",
      contact: "+996 (777) 234-567",
      whatsapp: "+996777234567",
      location: "chui",
      locationName: "Чүй областы",
      price: "2000 сомдон/саат",
      available: true
    },
    {
      id: 3,
      name: "Вилкалуу жүк көтөргүч",
      category: "unloading",
      description: "Паллеттерди жана оор жүктөрдү түшүрүү",
      contact: "+996 (502) 345-678",
      whatsapp: "+996502345678",
      location: "osh",
      locationName: "Ош шаары",
      price: "1500 сомдон/саат",
      available: false
    },
    
    // Tractors
    {
      id: 4,
      name: "КПС-4 Культиватор",
      category: "tractors",
      description: "Топурак иштетүү, жумшартуу, эгүүгө даярдоо",
      contact: "+996 (312) 456-789",
      whatsapp: "+996312456789",
      location: "issyk-kul",
      locationName: "Ысык-Көл областы",
      price: "3000 сомдон/га",
      available: true
    },
    {
      id: 5,
      name: "Пресс-түндүргүч",
      category: "tractors",
      description: "Чөптү топтоп, түйүндөргө ороо",
      contact: "+996 (550) 567-890",
      whatsapp: "+996550567890",
      location: "naryn",
      locationName: "Нарын областы",
      price: "800 сомдон/га",
      available: true
    },
    {
      id: 6,
      name: "Айлануучу жер жыргагыч",
      category: "tractors",
      description: "Эгүү үчүн жерди жыргоо",
      contact: "+996 (703) 678-901",
      whatsapp: "+996703678901",
      location: "talas",
      locationName: "Талас областы",
      price: "2500 сомдон/га",
      available: true
    },
    {
      id: 7,
      name: "Дан эгүүчү",
      category: "tractors",
      description: "Дан өсүмдүктөрүн эгүү",
      contact: "+996 (755) 789-012",
      whatsapp: "+996755789012",
      location: "jalal-abad",
      locationName: "Жалал-Абад областы",
      price: "1200 сомдон/га",
      available: false
    },

    // Trucks
    {
      id: 8,
      name: "КамАЗ 65115 самосвал",
      category: "trucks",
      description: "Сыпкыч материалдар, кум, чакылташ ташуу",
      contact: "+996 (220) 890-123",
      whatsapp: "+996220890123",
      location: "osh-region",
      locationName: "Ош областы",
      price: "4000 сомдон/жол",
      available: true
    },
    {
      id: 9,
      name: "КамАЗ 4308 бортовой",
      category: "trucks",
      description: "Курулуш материалдары, жабдуулар ташуу",
      contact: "+996 (990) 901-234",
      whatsapp: "+996990901234",
      location: "batken",
      locationName: "Баткен областы",
      price: "3500 сомдон/жол",
      available: true
    },

    // Concrete
    {
      id: 10,
      name: "7 м³ бетон аралаштыргыч",
      category: "concrete",
      description: "Даяр бетонду объектке жеткирүү",
      contact: "+996 (312) 012-345",
      whatsapp: "+996312012345",
      location: "bishkek",
      locationName: "Бишкек шаары",
      price: "5500 сомдон/м³",
      available: true
    },
    {
      id: 11,
      name: "9 м³ авто-бетон аралаштыргыч",
      category: "concrete",
      description: "Бетон даярдоо жана жеткирүү",
      contact: "+996 (777) 123-456",
      whatsapp: "+996777123456",
      location: "chui",
      locationName: "Чүй областы",
      price: "6000 сомдон/м³",
      available: true
    },

    // Water
    {
      id: 12,
      name: "КамАЗ суу ташыгыч 10 м³",
      category: "water",
      description: "Үй жана участка ичүүчү суу жеткирүү",
      contact: "+996 (705) 234-567",
      whatsapp: "+996705234567",
      location: "issyk-kul",
      locationName: "Ысык-Көл областы",
      price: "2500 сомдон/жол",
      available: true
    },
    {
      id: 13,
      name: "КамАЗ суу ташыгыч 15 м³",
      category: "water",
      description: "Чоң көлөмдөгү суу жеткирүү",
      contact: "+996 (550) 345-678",
      whatsapp: "+996550345678",
      location: "osh",
      locationName: "Ош шаары",
      price: "3500 сомдон/жол",
      available: true
    }
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || service.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || service.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleWhatsAppClick = (whatsappNumber: string, serviceName: string) => {
    const message = encodeURIComponent(`Салам! Мен "${serviceName}" кызматы боюнча кызыккам. Кошумча маалымат бере аласызбы?`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

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
              Кыргызстандын бардык аймактарынан керектүү техника жана кызматтарды табыңыз
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Техника жана кызматтарды издөө..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
            
            {/* Location Filter */}
            <div className="bg-white p-4 rounded-lg border shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-800">Аймак боюнча издөө</h3>
              </div>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-full h-12 text-base">
                  <SelectValue placeholder="Аймакты тандаңыз" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {kyrgyzstanRegions.map((region) => (
                    <SelectItem key={region.id} value={region.id} className="text-base py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{region.emoji}</span>
                        <span>{region.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                    {service.locationName}
                  </div>
                  
                  <div className="text-lg font-semibold text-green-600">
                    {service.price}
                  </div>

                  {/* Contact Buttons */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 flex items-center gap-2"
                      disabled={!service.available}
                    >
                      <Phone className="h-4 w-4" />
                      Чалуу
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 flex items-center gap-2 bg-green-600 hover:bg-green-700"
                      disabled={!service.available}
                      onClick={() => handleWhatsAppClick(service.whatsapp, service.name)}
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
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
