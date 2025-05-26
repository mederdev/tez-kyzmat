import { MapPin } from "lucide-react";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { locations } from '@/data/locations';

interface LocationFilterProps {
  selectedLocation: string;
  selectedDistrict: string;
  onLocationChange: (location: string) => void;
  onDistrictChange: (district: string) => void;
}

export function LocationFilter({ 
  selectedLocation, 
  selectedDistrict, 
  onLocationChange, 
  onDistrictChange 
}: LocationFilterProps) {
  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location">Аймак</Label>
        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger>
            <SelectValue placeholder="Аймакты тандаңыз" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Бардык аймактар</SelectItem>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.id}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedLocationData && (
        <div>
          <Label htmlFor="district">Район</Label>
          <Select value={selectedDistrict} onValueChange={onDistrictChange}>
            <SelectTrigger>
              <SelectValue placeholder="Районду тандаңыз" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Бардык райондор</SelectItem>
              {selectedLocationData.districts.map((district) => (
                <SelectItem key={district.id} value={district.id}>
                  {district.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
} 