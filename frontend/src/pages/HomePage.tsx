import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Service } from "@/types/api";
import { getServices, GetServicesParams } from "@/lib/api/services";
import { ServiceCard } from "@/components/features/services/ServiceCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { debounce } from "@/lib/utils";

export const HomePage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<GetServicesParams>({});
  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = async (params: GetServicesParams = {}) => {
    try {
      setIsLoading(true);
      const response = await getServices(params);
      if (response.success) {
        setServices(response.data);
      } else {
        toast.error(t('common.error'));
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error(t('common.error'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchServices(filters);
  }, [filters]);

  const handleFilterChange = (newFilters: GetServicesParams) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Create a debounced version of the search handler
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      setFilters(prev => ({ ...prev, searchTerm: term }));
    }, 500),
    []
  );

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
    debouncedSearch(term);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />
      <div className="container mx-auto px-4 py-4">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 h-48 rounded-t-lg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">{t('services.noServices')}</p>
          </div>
        )}
      </div>
    </div>
  );
}; 