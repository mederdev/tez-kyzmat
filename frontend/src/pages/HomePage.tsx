import { Header } from '@/components/layout/Header';
import { ServiceGrid } from '@/components/features/services/ServiceGrid';
import { ContactSection } from '@/components/layout/ContactSection';
import { useState } from 'react';
import { ServiceCategory, LocationId, DistrictId } from '@/types';

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [selectedLocation, setSelectedLocation] = useState<LocationId>('all');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId>();

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as ServiceCategory);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        selectedLocation={selectedLocation}
        selectedDistrict={selectedDistrict}
        onLocationChange={setSelectedLocation}
        onDistrictChange={setSelectedDistrict}
      />
      <main className="container py-8">
        <ServiceGrid 
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          selectedDistrict={selectedDistrict}
        />
        <ContactSection />
      </main>
    </div>
  );
} 