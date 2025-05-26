import { Phone, MapPin, MessageCircle, User, Image as ImageIcon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useLanguage();

  const handleCallClick = () => {
    window.location.href = `tel:${service.contact}`;
  };

  const handleWhatsAppClick = () => {
    const message = t('services.card.whatsappMessage')
      .replace('{serviceName}', service.name)
      .replace('{ownerName}', service.ownerName);
    const whatsappUrl = `https://wa.me/${service.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <h3 className="font-semibold text-base sm:text-lg line-clamp-2 flex-1">{service.name}</h3>
          <Badge variant={service.available ? 'default' : 'secondary'} className="w-fit whitespace-nowrap">
            {service.available ? t('services.card.available') : t('services.card.unavailable')}
          </Badge>
        </div>
        <Badge variant="outline" className="w-fit">
          {t(`categories.${service.category}`)}
        </Badge>
      </CardHeader>

      <CardContent className="flex-1 pb-3 space-y-4">
        {/* Images */}
        {service.images && service.images.length > 0 ? (
          <div className="space-y-2">
            <div className="relative aspect-video">
              <img
                src={service.images[0]}
                alt={service.name}
                className="w-full h-full object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            {service.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {service.images.slice(1, 4).map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={image}
                      alt={`${service.name} ${index + 2}`}
                      className="w-full h-full object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  </div>
                ))}
                {service.images.length > 4 && (
                  <div className="aspect-square bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600">
                    +{service.images.length - 4} {t('services.card.moreImages')}
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
            <ImageIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <p className="text-gray-600 text-sm sm:text-base line-clamp-3">{service.description}</p>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
            <span className="text-gray-700">
              {service.locationName}
              {service.districtName && `, ${service.districtName}`}
            </span>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg space-y-2">
            <h4 className="font-medium text-sm">{t('services.card.contactInfo')}</h4>
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-gray-500 flex-shrink-0" />
              <span className="text-gray-700">{service.ownerName}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
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
          className="flex-1 h-10"
        >
          <Phone className="h-4 w-4 mr-1.5" />
          <span className="text-sm">{t('services.card.call')}</span>
        </Button>
        <Button
          size="sm"
          onClick={handleWhatsAppClick}
          className="flex-1 h-10 bg-green-600 hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4 mr-1.5" />
          <span className="text-sm">{t('services.card.whatsapp')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
} 