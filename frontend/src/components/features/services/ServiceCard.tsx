import { Phone, MapPin, MessageCircle, User, Share2, Copy } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageGallery } from "./ImageGallery";
import { useToast } from "@/components/ui/use-toast";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();

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

  const handleShare = async () => {
    const shareData = {
      title: service.name,
      text: `${service.name} - ${service.description}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          description: t('services.card.linkCopied'),
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCopyContact = async () => {
    try {
      await navigator.clipboard.writeText(service.contact);
      toast({
        description: t('services.card.contactCopied'),
      });
    } catch (error) {
      console.error('Error copying contact:', error);
    }
  };

  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3 space-y-2">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base sm:text-lg line-clamp-2">{service.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={service.available ? 'default' : 'secondary'} className="w-fit whitespace-nowrap">
                {service.available ? t('services.card.available') : t('services.card.unavailable')}
              </Badge>
              <Badge variant="outline" className="w-fit">
                {t(`categories.${service.category}`)}
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleShare}
            title={t('services.card.share')}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-3 space-y-4">
        <ImageGallery images={service.images} serviceName={service.name} />

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
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-700">{service.contact}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={handleCopyContact}
                title={t('services.card.copyContact')}
              >
                <Copy className="h-3 w-3" />
              </Button>
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