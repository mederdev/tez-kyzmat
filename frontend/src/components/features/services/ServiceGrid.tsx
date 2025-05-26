import { Service } from '@/types';
import { ServiceCard } from './ServiceCard';
import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ServiceGridProps {
  services: Service[];
  loading: boolean;
}

export function ServiceGrid({ services, loading }: ServiceGridProps) {
  const { t } = useLanguage();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] py-8 sm:py-12">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-gray-600 text-sm sm:text-base">{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center min-h-[300px] py-8 sm:py-12">
        <div className="space-y-2">
          <div className="text-gray-500 text-lg sm:text-xl font-medium">
            {t('services.noResults')}
          </div>
          <p className="text-gray-400 text-sm sm:text-base">
            {t('services.tryDifferentFilters')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
} 