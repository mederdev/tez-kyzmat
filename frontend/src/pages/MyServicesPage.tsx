import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Service } from '@/types';
import { ServiceCard } from '@/components/features/services/ServiceCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function MyServicesPage() {
  const { t } = useLanguage();
  const { data: services, isLoading } = useQuery<Service[]>({
    queryKey: ['my-services'],
    queryFn: async () => {
      const response = await axios.get('/api/services/user/my-services');
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch />
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{t('services.myServices')}</h1>
          <Link to="/create-service">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t('services.createNew')}
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div>{t('common.loading')}</div>
        ) : !services?.length ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">{t('services.noServices')}</p>
            <Link to="/create-service">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {t('services.createFirst')}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard 
                key={service._id} 
                service={service}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
} 