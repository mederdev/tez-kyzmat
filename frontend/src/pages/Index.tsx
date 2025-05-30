import { Header } from "@/components/layout/Header";
import { ContactSection } from "@/components/layout/ContactSection";
import { ServiceGrid } from "@/components/features/services/ServiceGrid";
import { useServiceFilters } from "@/hooks/useServiceFilters";
import { SERVICES } from "@/data/services";
import { CATEGORIES } from "@/data/constants";

const Index = () => {
  const {
    filters,
    filteredServices,
    updateSearchTerm,
    updateCategory,
    updateLocation,
    updateDistrict,
    loading
  } = useServiceFilters({ services: SERVICES });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header
        searchTerm={filters.searchTerm}
        onSearchChange={updateSearchTerm}
        selectedLocation={filters.selectedLocation}
        selectedDistrict={filters.selectedDistrict}
        onLocationChange={updateLocation}
        onDistrictChange={updateDistrict}
        selectedCategory={filters.selectedCategory}
        onCategoryChange={updateCategory}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ServiceGrid services={filteredServices} loading={loading} />
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
