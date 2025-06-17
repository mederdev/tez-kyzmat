import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { KYRGYZSTAN_REGIONS, CATEGORIES } from "@/data/constants";
import { GetServicesParams } from "@/lib/api/services";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceFiltersProps {
  onFilterChange: (filters: GetServicesParams) => void;
}

export const ServiceFilters = ({ onFilterChange }: ServiceFiltersProps) => {
  const { t } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<string>("all");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setSelectedDistrict("all");
    onFilterChange({
      location: value === "all" ? "" : value,
      district: "",
      category: selectedCategory === "all" ? "" : selectedCategory,
    });
  };

  const handleDistrictChange = (value: string) => {
    setSelectedDistrict(value);
    onFilterChange({
      location: selectedLocation === "all" ? "" : selectedLocation,
      district: value === "all" ? "" : value,
      category: selectedCategory === "all" ? "" : selectedCategory,
    });
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onFilterChange({
      location: selectedLocation === "all" ? "" : selectedLocation,
      district: selectedDistrict === "all" ? "" : selectedDistrict,
      category: value === "all" ? "" : value,
    });
  };

  const selectedRegion = KYRGYZSTAN_REGIONS.find(
    (region) => region.id === selectedLocation
  );
  const districts = selectedRegion?.districts || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Select
        value={selectedCategory}
        onValueChange={handleCategoryChange}
        onOpenChange={setIsCategoryOpen}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-11 rounded-lg border-gray-200",
            "transition-all duration-300",
            "hover:border-gray-300 hover:bg-white",
            "focus:ring-2 focus:ring-blue-100 focus:border-blue-200",
            isCategoryOpen ? "bg-white shadow-inner" : "bg-gray-50",
            "[&>span]:flex [&>span]:items-center [&>span]:gap-2",
            "[&>svg]:hidden"
          )}
        >
          <SelectValue>
            {selectedCategory === "all" ? (
              t('filters.selectCategory')
            ) : (
              <span className="flex items-center gap-2">
                <span>{CATEGORIES.find(c => c.id === selectedCategory)?.icon}</span>
                <span>{CATEGORIES.find(c => c.id === selectedCategory)?.name}</span>
              </span>
            )}
          </SelectValue>
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            isCategoryOpen && "rotate-180"
          )} />
        </SelectTrigger>
        <SelectContent 
          className={cn(
            "max-h-[300px] p-2",
            "border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "custom-scrollbar"
          )}
          position="popper"
          sideOffset={8}
        >
          <SelectItem 
            value="all" 
            className={cn(
              "py-2.5 rounded-lg transition-colors duration-200",
              "hover:bg-gray-50 focus:bg-gray-50",
              "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
            )}
          >
            {t('filters.allCategories')}
          </SelectItem>
          {CATEGORIES.filter(category => category.id !== 'all').map((category) => (
            <SelectItem 
              key={category.id} 
              value={category.id}
              className={cn(
                "py-2.5 rounded-lg transition-colors duration-200",
                "hover:bg-gray-50 focus:bg-gray-50",
                "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={selectedLocation} 
        onValueChange={handleLocationChange}
        onOpenChange={setIsLocationOpen}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-11 rounded-lg border-gray-200",
            "transition-all duration-300",
            "hover:border-gray-300 hover:bg-white",
            "focus:ring-2 focus:ring-blue-100 focus:border-blue-200",
            isLocationOpen ? "bg-white shadow-inner" : "bg-gray-50",
            "[&>span]:flex [&>span]:items-center [&>span]:gap-2",
            "[&>svg]:hidden"
          )}
        >
          <SelectValue>
            {selectedLocation === "all" ? (
              t('filters.selectRegion')
            ) : (
              <span className="flex items-center gap-2">
                <span>{selectedRegion?.emoji}</span>
                <span>{t(`locations.${selectedLocation}`)}</span>
              </span>
            )}
          </SelectValue>
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            isLocationOpen && "rotate-180"
          )} />
        </SelectTrigger>
        <SelectContent 
          className={cn(
            "max-h-[300px] p-2",
            "border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "custom-scrollbar"
          )}
          position="popper"
          sideOffset={8}
        >
          <SelectItem 
            value="all" 
            className={cn(
              "py-2.5 rounded-lg transition-colors duration-200",
              "hover:bg-gray-50 focus:bg-gray-50",
              "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
            )}
          >
            {t('filters.allRegions')}
          </SelectItem>
          {KYRGYZSTAN_REGIONS.filter(region => region.id !== 'all').map((region) => (
            <SelectItem 
              key={region.id} 
              value={region.id} 
              className={cn(
                "py-2.5 rounded-lg transition-colors duration-200",
                "hover:bg-gray-50 focus:bg-gray-50",
                "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
              )}
            >
              <span className="flex items-center gap-2">
                <span>{region.emoji}</span>
                <span>{t(`locations.${region.id}`)}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        value={selectedDistrict}
        onValueChange={handleDistrictChange}
        onOpenChange={setIsDistrictOpen}
        disabled={!selectedLocation || selectedLocation === "all"}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-11 rounded-lg border-gray-200",
            "transition-all duration-300",
            "hover:border-gray-300 hover:bg-white",
            "focus:ring-2 focus:ring-blue-100 focus:border-blue-200",
            isDistrictOpen ? "bg-white shadow-inner" : "bg-gray-50",
            "[&>span]:flex [&>span]:items-center [&>span]:gap-2",
            "[&>svg]:hidden",
            (!selectedLocation || selectedLocation === "all") && "opacity-50 cursor-not-allowed"
          )}
        >
          <SelectValue placeholder={t('filters.selectDistrict')} />
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-300",
            isDistrictOpen && "rotate-180"
          )} />
        </SelectTrigger>
        <SelectContent 
          className={cn(
            "max-h-[300px] p-2",
            "border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80",
            "animate-in fade-in-0 zoom-in-95 duration-200",
            "custom-scrollbar"
          )}
          position="popper"
          sideOffset={8}
        >
          <SelectItem 
            value="all" 
            className={cn(
              "py-2.5 rounded-lg transition-colors duration-200",
              "hover:bg-gray-50 focus:bg-gray-50",
              "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
            )}
          >
            {t('filters.allDistricts')}
          </SelectItem>
          {districts.map((district) => (
            <SelectItem 
              key={district.id} 
              value={district.id} 
              className={cn(
                "py-2.5 rounded-lg transition-colors duration-200",
                "hover:bg-gray-50 focus:bg-gray-50",
                "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
              )}
            >
              {district.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 