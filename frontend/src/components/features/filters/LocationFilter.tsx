import { MapPin } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LocationId, DistrictId } from "@/types";
import { locations } from '@/data/locations';
import { useLanguage } from "@/contexts/LanguageContext";

interface LocationFilterProps {
  selectedLocation: LocationId;
  selectedDistrict?: DistrictId;
  onLocationChange: (location: LocationId) => void;
  onDistrictChange: (district?: DistrictId) => void;
}

export function LocationFilter({ 
  selectedLocation, 
  selectedDistrict, 
  onLocationChange, 
  onDistrictChange 
}: LocationFilterProps) {
  const { t } = useLanguage();
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location" className="block mb-2 text-sm sm:text-base font-medium">
          {t('filters.location')}
        </Label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger className="w-full h-10 sm:h-11">
            <SelectValue placeholder={t('filters.selectRegion')} />
          </SelectTrigger>
          <SelectContent className="max-h-[300px]">
            <SelectItem value="all" className="py-2.5 sm:py-3">
              {t('filters.allRegions')}
            </SelectItem>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id} className="py-2.5 sm:py-3">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm sm:text-base">{t(`locations.${location.id}`)}</span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedLocationData && (
        <div>
          <Label htmlFor="district" className="block mb-2 text-sm sm:text-base font-medium">
            {t('filters.district')}
          </Label>
          <Select value={selectedDistrict} onValueChange={onDistrictChange}>
            <SelectTrigger className="w-full h-10 sm:h-11">
              <SelectValue placeholder={t('filters.selectDistrict')} />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              <SelectItem value="all" className="py-2.5 sm:py-3">
                {t('filters.allDistricts')}
              </SelectItem>
              {selectedLocationData.districts.map((district) => (
                <SelectItem key={district.id} value={district.id} className="py-2.5 sm:py-3">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm sm:text-base">{district.name}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
} 