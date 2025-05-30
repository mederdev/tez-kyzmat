import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ServiceForm } from "@/components/features/services/ServiceForm";
import { ServiceFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { Menu, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/features/language/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const CreateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    
    try {
      // Здесь будет API вызов для создания сервиса
      console.log("Creating service:", data);
      
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Показываем успешное сообщение
      alert(t('services.success'));
      
      // Перенаправляем на главную страницу
      navigate("/");
    } catch (error) {
      console.error("Error creating service:", error);
      alert(t('services.error'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  const NavigationItems = () => (
    <>
      <LanguageSwitcher />
      <Link to="/">
        <Button variant="outline" size="sm" className="w-full md:w-auto">
          <Home className="h-4 w-4 mr-2" />
          {t('common.backToHome')}
        </Button>
      </Link>
    </>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Navigation */}
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900">
              🚜 {t('common.appName')}
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-3 items-center">
              <NavigationItems />
            </div>

            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] sm:w-[385px]">
                <div className="flex flex-col gap-4 py-4">
                  <NavigationItems />
                </div>
              </SheetContent>
            </Sheet>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
              {t('services.createNew')}
            </h1>
            <p className="text-base md:text-xl text-gray-600">
              {t('services.createDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ServiceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateService; 