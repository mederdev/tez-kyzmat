import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Home, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ServiceForm } from "@/components/features/services";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUpdateService } from "@/hooks/useServices";
import { servicesApi } from "@/lib/api";
import { ServiceFormData } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { LanguageSwitcher } from "@/components/features/language/LanguageSwitcher";

const EditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { updateService, loading: isUpdating } = useUpdateService();
  const [service, setService] = useState<ServiceFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        if (!id) return;
        const fetchedService = await servicesApi.getById(id);
        // Convert the service data to form data format
        const formData: ServiceFormData = {
          name: fetchedService.name,
          category: fetchedService.category,
          description: fetchedService.description,
          ownerName: fetchedService.ownerName,
          contact: fetchedService.contact,
          whatsapp: fetchedService.whatsapp,
          location: fetchedService.location,
          locationName: fetchedService.locationName,
          district: fetchedService.district,
          districtName: fetchedService.districtName,
          price: fetchedService.price,
          available: fetchedService.available,
          images: [] // We don't load existing images as Files, they'll be handled separately
        };
        setService(formData);
      } catch (error) {
        toast({
          variant: "destructive",
          title: t('common.error'),
          description: t('services.errors.loadFailed'),
        });
        navigate('/');
      } finally {
        setIsLoading(false);
      }
    };

    fetchService();
  }, [id, navigate, t, toast]);
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

  const handleSubmit = async (data: ServiceFormData) => {
    if (!id) return;
    
    const result = await updateService(id, data);
    if (result) {
      toast({
        title: t('services.success.updated'),
        description: t('services.success.updatedDescription'),
      });
      navigate('/');
    } else {
      toast({
        variant: "destructive",
        title: t('common.error'),
        description: t('services.errors.updateFailed'),
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">{t('common.loading')}</p>
        </div>
      </div>
    );
  }

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
              {t('services.editTitle')}
            </h1>
            <p className="text-base md:text-xl text-gray-600">
              {t('services.editDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {service && (
          <ServiceForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isUpdating}
            initialData={service}
          />
        )}
      </div>
    </div>
  );
};

export default EditService; 