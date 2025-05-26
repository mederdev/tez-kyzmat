import { Service } from '@/types';
import { ServiceCard } from './ServiceCard';
import { Loader2 } from 'lucide-react';

interface ServiceGridProps {
  services: Service[];
  loading: boolean;
}

export function ServiceGrid({ services, loading }: ServiceGridProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-600">Жүктөлүүдө...</span>
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">
          Кызматтар табылган жок
        </div>
        <p className="text-gray-400 mt-2">
          Башка фильтрлерди колдонуп көрүңүз
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