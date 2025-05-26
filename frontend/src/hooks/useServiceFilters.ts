import { useState, useMemo } from "react";
import {
  Service,
  SearchFilters,
  ServiceCategory,
  LocationId,
  DistrictId,
} from "@/types";

interface UseServiceFiltersProps {
  services: Service[];
}

export const useServiceFilters = ({ services }: UseServiceFiltersProps) => {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    selectedCategory: "all",
    selectedLocation: "all",
    selectedDistrict: undefined,
  });

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        service.description
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase());

      const matchesCategory =
        filters.selectedCategory === "all" ||
        service.category === filters.selectedCategory;

      const matchesLocation =
        filters.selectedLocation === "all" ||
        service.location === filters.selectedLocation;

      const matchesDistrict =
        !filters.selectedDistrict ||
        service.district === filters.selectedDistrict;

      return (
        matchesSearch && matchesCategory && matchesLocation && matchesDistrict
      );
    });
  }, [services, filters]);

  const updateSearchTerm = (searchTerm: string) => {
    setFilters((prev) => ({ ...prev, searchTerm }));
  };

  const updateCategory = (selectedCategory: ServiceCategory) => {
    setFilters((prev) => ({ ...prev, selectedCategory }));
  };

  const updateLocation = (selectedLocation: LocationId) => {
    setFilters((prev) => ({
      ...prev,
      selectedLocation,
      selectedDistrict: undefined, // Сбрасываем район при смене региона
    }));
  };

  const updateDistrict = (selectedDistrict?: DistrictId) => {
    setFilters((prev) => ({ ...prev, selectedDistrict }));
  };

  return {
    filters,
    filteredServices,
    updateSearchTerm,
    updateCategory,
    updateLocation,
    updateDistrict,
  };
};
