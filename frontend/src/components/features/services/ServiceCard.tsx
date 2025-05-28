import { Phone, MapPin, MessageCircle, User, Share2, Copy } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Service } from "@/types";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImageGallery } from "./ImageGallery";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isHovered, setIsHovered] = useState(false);

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
    <Card 
      className={cn(
        "group h-full flex flex-col bg-white transition-all duration-300",
        "hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1",
        "border-gray-200 hover:border-gray-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6 space-y-1.5 sm:space-y-2">
        <div className="relative">
          <div className="absolute -top-1 -right-1">
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-7 w-7 sm:h-8 sm:w-8 transition-transform duration-300",
                isHovered && "rotate-12"
              )}
              onClick={handleShare}
              title={t('services.card.share')}
            >
              <Share2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
          <div className="pr-8 sm:pr-10">
            <h3 className="font-semibold text-sm sm:text-base line-clamp-2 group-hover:text-blue-600 transition-colors">
              {service.name}
            </h3>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              <Badge 
                variant={service.available ? 'default' : 'secondary'} 
                className={cn(
                  "w-fit whitespace-nowrap transition-colors text-xs sm:text-sm py-0.5 sm:py-1",
                  service.available ? "bg-green-100 text-green-800 hover:bg-green-200" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
              >
                {service.available ? t('services.card.available') : t('services.card.unavailable')}
              </Badge>
              <Badge 
                variant="outline" 
                className="w-fit bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 text-xs sm:text-sm py-0.5 sm:py-1"
              >
                {t(`categories.${service.category}`)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 pb-2 sm:pb-3 px-4 sm:px-6 space-y-3 sm:space-y-4">
        <ImageGallery images={service.images} serviceName={service.name} />

        <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 leading-relaxed">
          {service.description}
        </p>

        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm group/location">
            <div className="p-1 sm:p-1.5 rounded-full bg-gray-50 group-hover/location:bg-blue-50 transition-colors">
              <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500 group-hover/location:text-blue-500 transition-colors" />
            </div>
            <span className="text-gray-700 group-hover/location:text-blue-600 transition-colors">
              {service.locationName}
              {service.districtName && `, ${service.districtName}`}
            </span>
          </div>

          <div className="bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl space-y-2 sm:space-y-3 group-hover:bg-gray-100/80 transition-colors">
            <h4 className="font-medium text-xs sm:text-sm text-gray-900">{t('services.card.contactInfo')}</h4>
            <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm group/owner">
              <div className="p-1 sm:p-1.5 rounded-full bg-white/80 group-hover/owner:bg-white transition-colors">
                <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
              </div>
              <span className="text-gray-700">{service.ownerName}</span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-1.5 sm:gap-2 group/phone">
                <div className="p-1 sm:p-1.5 rounded-full bg-white/80 group-hover/phone:bg-white transition-colors">
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-gray-500" />
                </div>
                <span className="text-gray-700">{service.contact}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 sm:h-7 sm:w-7 hover:bg-white transition-colors"
                onClick={handleCopyContact}
                title={t('services.card.copyContact')}
              >
                <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </Button>
            </div>
          </div>

          <div className="text-base sm:text-lg font-semibold text-blue-600 group-hover:text-blue-700 transition-colors">
            {service.price}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-2 sm:pt-3 px-4 sm:px-6 gap-1.5 sm:gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCallClick}
          className={cn(
            "flex-1 h-9 sm:h-10 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-xs sm:text-sm",
            "hover:text-blue-600 active:scale-[0.98]"
          )}
        >
          <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
          <span className="font-medium">{t('services.card.call')}</span>
        </Button>
        <Button
          size="sm"
          onClick={handleWhatsAppClick}
          className={cn(
            "flex-1 h-9 sm:h-10 bg-green-600 hover:bg-green-700 transition-colors text-xs sm:text-sm",
            "active:scale-[0.98]"
          )}
        >
          <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 sm:mr-1.5" />
          <span className="font-medium">{t('services.card.whatsapp')}</span>
        </Button>
      </CardFooter>
    </Card>
  );
} 