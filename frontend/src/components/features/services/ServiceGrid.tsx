import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Service } from '@/types';
import { ServiceCard } from './ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceGridProps } from './types';
import { SERVICES } from '@/data/services';

export function ServiceGrid({ 
  searchTerm,
  selectedCategory,
  selectedLocation,
  selectedDistrict,
}: ServiceGridProps) {
  const { t } = useLanguage();
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['services', searchTerm, selectedCategory, selectedLocation, selectedDistrict],
    queryFn: async () => {
      // During development, use mock data
      if (import.meta.env.DEV) {
        let filteredServices = [...SERVICES];

        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase();
          filteredServices = filteredServices.filter(service => 
            service.name.toLowerCase().includes(searchLower) ||
            service.description.toLowerCase().includes(searchLower)
          );
        }

        if (selectedCategory && selectedCategory !== 'all') {
          filteredServices = filteredServices.filter(service => 
            service.category === selectedCategory
          );
        }

        if (selectedLocation && selectedLocation !== 'all') {
          filteredServices = filteredServices.filter(service => 
            service.location === selectedLocation
          );
        }

        if (selectedDistrict) {
          filteredServices = filteredServices.filter(service => 
            service.district === selectedDistrict
          );
        }

        return filteredServices;
      }

      // In production, use the real API
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      if (selectedLocation && selectedLocation !== 'all') params.append('location', selectedLocation);
      if (selectedDistrict) params.append('district', selectedDistrict);

      const response = await axios.get(`/api/services?${params.toString()}`);
      return response.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  if (!services?.length) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {t('services.noResults')}
        </h3>
        <p className="text-gray-500">
          {t('services.tryDifferentFilters')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
} 