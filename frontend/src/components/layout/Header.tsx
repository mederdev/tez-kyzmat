import { SearchBar } from "@/components/features/search/SearchBar";
import { LocationFilter } from "@/components/features/filters/LocationFilter";
import { Button } from "@/components/ui/button";
import { LocationId, DistrictId } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { Settings, Plus, Menu } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/features/language/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  selectedLocation?: LocationId;
  selectedDistrict?: DistrictId;
  onLocationChange?: (location: LocationId) => void;
  onDistrictChange?: (district?: DistrictId) => void;
  hideSearch?: boolean;
}

export const Header = ({
  searchTerm = '',
  onSearchChange = () => {},
  selectedLocation = 'all',
  selectedDistrict,
  onLocationChange = () => {},
  onDistrictChange = () => {},
  hideSearch = false
}: HeaderProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const isAdminPage = location.pathname === '/admin';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavigationItems = () => (
    <>
      <LanguageSwitcher />
      {!isAdminPage && (
        <>
          <Link to="/create-service">
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              {t('common.addListing')}
            </Button>
          </Link>
          <Link to="/admin">
            <Button variant="outline" size="sm" className="w-full md:w-auto">
              <Settings className="h-4 w-4 mr-2" />
              {t('common.admin')}
            </Button>
          </Link>
        </>
      )}
      {isAdminPage && (
        <Link to="/">
          <Button variant="outline" size="sm" className="w-full md:w-auto">
            {t('common.backToHome')}
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900">
            🚜 {t('common.appName')}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3 items-center">
            <NavigationItems />
          </div>

          {/* Mobile Menu Button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col gap-4 py-4">
                <NavigationItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {!hideSearch && !isAdminPage && (
          <>
            <div className="text-center mb-6">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-2">
                🚜 {t('common.appName')}
              </h1>
              <p className="text-base md:text-xl text-gray-600">
                {t('common.mainDescription')}
              </p>
            </div>

            {/* Search and Filters */}
            <div className="max-w-4xl mx-auto space-y-4">
              <SearchBar 
                value={searchTerm}
                onChange={onSearchChange}
              />
              
              <LocationFilter
                selectedLocation={selectedLocation}
                selectedDistrict={selectedDistrict}
                onLocationChange={onLocationChange}
                onDistrictChange={onDistrictChange}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 