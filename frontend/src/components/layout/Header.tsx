import { SearchBar } from "@/components/features/search/SearchBar";
import { LocationFilter } from "@/components/features/filters/LocationFilter";
import { Button } from "@/components/ui/button";
import { Region, LocationId, DistrictId } from "@/types";
import { Link } from "react-router-dom";
import { Settings, Plus } from "lucide-react";

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  regions: Region[];
  selectedLocation: LocationId;
  selectedDistrict?: DistrictId;
  onLocationChange: (location: LocationId) => void;
  onDistrictChange: (district?: DistrictId) => void;
}

export const Header = ({
  searchTerm,
  onSearchChange,
  regions,
  selectedLocation,
  selectedDistrict,
  onLocationChange,
  onDistrictChange
}: HeaderProps) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-2xl font-bold text-gray-900">
            🚜 Rural Rig Finder
          </Link>
          <div className="flex gap-3">
            <Link to="/create-service">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Жарыя кошуу
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Админка
              </Button>
            </Link>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🚜 Айыл үчүн Техника жана Кызматтар
          </h1>
          <p className="text-xl text-gray-600">
            Кыргызстандын бардык аймактарынан керектүү техника жана кызматтарды табыңыз
          </p>
        </div>

        {/* Search and Filters */}
        <div className="max-w-4xl mx-auto space-y-4">
          <SearchBar 
            value={searchTerm}
            onChange={onSearchChange}
          />
          
          <LocationFilter
            regions={regions}
            selectedLocation={selectedLocation}
            selectedDistrict={selectedDistrict}
            onLocationChange={onLocationChange}
            onDistrictChange={onDistrictChange}
          />
        </div>
      </div>
    </div>
  );
}; 