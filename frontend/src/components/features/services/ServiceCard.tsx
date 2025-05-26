import { Phone, MapPin, MessageCircle, ChevronLeft, ChevronRight, User, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types";
import { openWhatsAppChat } from "@/utils/whatsapp";
import { useState } from "react";

interface ServiceCardProps {
  service: Service;
}

const categoryNames: Record<string, string> = {
  unloading: 'Жүк түшүрүү',
  trucks: 'Жүк ташуу',
  tractors: 'Трактор кызматтары',
  concrete: 'Бетон ишмердүүлүгү',
  water: 'Суу ташуу',
};

export function ServiceCard({ service }: ServiceCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleWhatsAppClick = () => {
    const phoneNumber = service.whatsapp || service.contact;
    const message = `Салам! ${service.name} кызматы боюнча маалымат алгым келет.`;
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.open(`tel:${service.contact}`, '_self');
  };

  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    return `http://localhost:3001${imagePath}`;
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === service.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? service.images.length - 1 : prev - 1
    );
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-2">{service.name}</h3>
          <Badge variant={service.available ? 'default' : 'secondary'}>
            {service.available ? 'Жеткиликтүү' : 'Жеткиликсиз'}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {categoryNames[service.category] || service.category}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        {/* Изображения */}
        {service.images && service.images.length > 0 ? (
          <div className="mb-4">
            <img
              src={getImageUrl(service.images[0])}
              alt={service.name}
              className="w-full h-48 object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            {service.images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {service.images.slice(1, 4).map((image, index) => (
                  <img
                    key={index}
                    src={getImageUrl(image)}
                    alt={`${service.name} ${index + 2}`}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ))}
                {service.images.length > 4 && (
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
                    +{service.images.length - 4}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="mb-4 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{service.description}</p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-gray-700">
              {service.locationName}
              {service.districtName && `, ${service.districtName}`}
            </span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-2">Байланыш маалыматы:</h4>
            <div className="flex items-center gap-2 text-sm mb-1">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{service.ownerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-gray-700">{service.contact}</span>
            </div>
          </div>

          <div className="text-lg font-semibold text-blue-600">{service.price}</div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCallClick}
          className="flex-1"
        >
          <Phone className="h-4 w-4 mr-1" />
          Чалуу
        </Button>
        <Button
          size="sm"
          onClick={handleWhatsAppClick}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          WhatsApp
        </Button>
      </CardFooter>
    </Card>
  );
} 