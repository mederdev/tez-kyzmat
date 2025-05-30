import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const ContactSection = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-16 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        {t('common.contact.title')}
      </h2>
      <p className="text-gray-600 text-center mb-6">
        {t('common.contact.description')}
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/create-service">
          <Button size="lg" className="px-8">
            <Plus className="h-5 w-5 mr-2" />
            {t('common.contact.addButton')}
          </Button>
        </Link>
        <Button 
          size="lg" 
          variant="outline" 
          className="px-8"
          onClick={() => window.open('https://wa.me/996555123456', '_blank')}
        >
          {t('common.contact.contactButton')}
        </Button>
      </div>
    </div>
  );
}; 