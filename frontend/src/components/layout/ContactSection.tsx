import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-8 sm:mt-16 bg-white rounded-lg shadow-md p-6 sm:p-8">
      <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
          {t('common.contact.title')}
        </h2>
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          {t('common.contact.description')}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 pt-2">
          <Link to="/create-service" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8">
              <Plus className="h-5 w-5 mr-2" />
              <span className="text-sm sm:text-base">{t('common.contact.addButton')}</span>
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8"
            onClick={() => window.open('https://wa.me/996555123456', '_blank')}
          >
            <MessageCircle className="h-5 w-5 mr-2" />
            <span className="text-sm sm:text-base">{t('common.contact.contactButton')}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};