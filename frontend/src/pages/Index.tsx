import { Header } from "@/components/layout/Header";
import { ContactSection } from "@/components/layout/ContactSection";
import { CategoryFilter } from "@/components/features/filters/CategoryFilter";
import { ServiceGrid } from "@/components/features/services/ServiceGrid";
import { useServiceFilters } from "@/hooks/useServiceFilters";
import { SERVICES } from "@/data/services";
import { CATEGORIES, KYRGYZSTAN_REGIONS } from "@/data/constants";

const Index = () => {
  const {
    filters,
    filteredServices,
    updateSearchTerm,
    updateCategory,
    updateLocation,
    updateDistrict
  } = useServiceFilters({ services: SERVICES });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header
        searchTerm={filters.searchTerm}
        onSearchChange={updateSearchTerm}
        regions={KYRGYZSTAN_REGIONS}
        selectedLocation={filters.selectedLocation}
        selectedDistrict={filters.selectedDistrict}
        onLocationChange={updateLocation}
        onDistrictChange={updateDistrict}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CategoryFilter
          categories={CATEGORIES}
          selectedCategory={filters.selectedCategory}
          onCategoryChange={updateCategory}
        />

        <ServiceGrid services={filteredServices} />

        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
