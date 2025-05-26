import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/features/search/HeroSection';
import { FilterSection } from '@/components/features/filters/FilterSection';
import { ServiceGrid } from '@/components/features/services/ServiceGrid';
import { ContactSection } from '@/components/layout/ContactSection';
import { useServices } from '@/hooks/useServices';
import { FilterState } from '@/types';

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    category: '',
    location: '',
    district: '',
    search: '',
  });

  const { services, loading, error } = useServices(filters);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <HeroSection onSearch={handleSearch} />
      <FilterSection filters={filters} onFilterChange={handleFilterChange} />
      
      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Ошибка загрузки сервисов: {error}
          </div>
        )}
        
        <ServiceGrid services={services} loading={loading} />
      </main>
      
      <ContactSection />
    </div>
  );
} 