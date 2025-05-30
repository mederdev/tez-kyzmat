import { MapPin, ChevronDown } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationId, DistrictId } from "@/types";
import { locations } from '@/data/locations';
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface LocationFilterProps {
  selectedLocation: LocationId;
  selectedDistrict?: DistrictId;
  onLocationChange: (location: LocationId) => void;
  onDistrictChange: (district?: DistrictId) => void;
  hideLabel?: boolean;
}

export function LocationFilter({ 
  selectedLocation, 
  selectedDistrict, 
  onLocationChange, 
  onDistrictChange,
  hideLabel = false
}: LocationFilterProps) {
  const { t } = useLanguage();
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
      <div className="w-full">
        {!hideLabel && (
          <Label 
            htmlFor="location" 
            className={cn(
              "block mb-2 text-sm font-medium",
              "text-gray-700 transition-colors duration-300",
              isLocationOpen && "text-blue-600"
            )}
          >
            {t('filters.location')}
          </Label>
        )}
        <Select 
          value={selectedLocation} 
          onValueChange={onLocationChange}
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
            <SelectValue placeholder={t('filters.selectRegion')} />
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
            {locations.map((location) => (
              <SelectItem 
                key={location.id} 
                value={location.id} 
                className={cn(
                  "py-2.5 rounded-lg transition-colors duration-200",
                  "hover:bg-gray-50 focus:bg-gray-50",
                  "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
                )}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{t(`locations.${location.id}`)}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(
        "w-full",
        selectedLocationData ? "opacity-100" : "opacity-50 pointer-events-none",
        "transition-opacity duration-300"
      )}>
        {!hideLabel && (
          <Label 
            htmlFor="district" 
            className={cn(
              "block mb-2 text-sm font-medium",
              "text-gray-700 transition-colors duration-300",
              isDistrictOpen && "text-blue-600"
            )}
          >
            {t('filters.district')}
          </Label>
        )}
        <Select 
          value={selectedDistrict} 
          onValueChange={onDistrictChange}
          onOpenChange={setIsDistrictOpen}
          disabled={!selectedLocationData}
        >
          <SelectTrigger 
            className={cn(
              "w-full h-11 rounded-lg border-gray-200",
              "transition-all duration-300",
              "hover:border-gray-300 hover:bg-white",
              "focus:ring-2 focus:ring-blue-100 focus:border-blue-200",
              isDistrictOpen ? "bg-white shadow-inner" : "bg-gray-50",
              "[&>span]:flex [&>span]:items-center [&>span]:gap-2",
              "[&>svg]:hidden"
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
            {selectedLocationData?.districts.map((district) => (
              <SelectItem 
                key={district.id} 
                value={district.id} 
                className={cn(
                  "py-2.5 rounded-lg transition-colors duration-200",
                  "hover:bg-gray-50 focus:bg-gray-50",
                  "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
                )}
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{district.name}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
} 