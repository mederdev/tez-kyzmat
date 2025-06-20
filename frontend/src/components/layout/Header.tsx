import { SearchBar } from "@/components/features/search/SearchBar";
import { LocationFilter } from "@/components/features/filters/LocationFilter";
import { CategoryFilter } from "@/components/features/filters/CategoryFilter";
import { Button } from "@/components/ui/button";
import { LocationId, DistrictId } from "@/types";
import { Link, useLocation } from "react-router-dom";
import { Settings, Plus, Menu, Tractor, Filter, ChevronDown, LogOut, Edit } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuthContext } from "@/contexts/AuthContext";
import { LanguageSwitcher } from "@/components/features/language/LanguageSwitcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CATEGORIES } from "@/data/constants";
import { ServiceFilters } from "@/components/features/services/ServiceFilters";

interface HeaderProps {
  searchTerm?: string;
  onSearchChange?: (term: string) => void;
  selectedLocation?: LocationId;
  selectedDistrict?: DistrictId;
  onLocationChange?: (location: LocationId) => void;
  onDistrictChange?: (district?: DistrictId) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  onFilterChange?: (filters: any) => void;
  hideSearch?: boolean;
}

export const Header = ({
  searchTerm = '',
  onSearchChange = () => {},
  selectedLocation = 'all',
  selectedDistrict,
  onLocationChange = () => {},
  onDistrictChange = () => {},
  selectedCategory = 'all',
  onCategoryChange = () => {},
  onFilterChange = () => {},
  hideSearch = false
}: HeaderProps) => {
  const { t } = useLanguage();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthContext();
  const isAdminPage = location.pathname === '/admin';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const handleServiceAction = (e: React.MouseEvent, path: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      window.location.href = `/login?redirect=${path}`;
    }
  };

  const NavigationItems = () => (
    <>
      <LanguageSwitcher />
      {isAuthenticated && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={logout}
          className={cn(
            "w-full md:w-auto transition-all duration-300",
            "hover:border-red-400 hover:text-red-600 hover:bg-red-50/50",
            "active:scale-[0.98]"
          )}
        >
          <LogOut className="h-4 w-4 mr-2" />
          {t('common.logout')}
        </Button>
      )}
      {!isAdminPage && (
        <>
          <Link to="/create-service">
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "w-full md:w-auto transition-all duration-300",
                "hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50",
                "active:scale-[0.98]"
              )}
            >
              <Plus className="h-4 w-4 mr-2" />
              {t('common.addListing')}
            </Button>
          </Link>
          <Link to={isAuthenticated ? "/my-services" : "/login?returnTo=/my-services"}>
            <Button 
              variant="outline" 
              size="sm" 
              className={cn(
                "w-full md:w-auto transition-all duration-300",
                "hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50",
                "active:scale-[0.98]",
              )}
            >
              <Edit className="h-4 w-4 mr-2" />
              {t('common.editServices')}
            </Button>
          </Link>
          {user?.isAdmin && (
            <Link to="/admin">
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "w-full md:w-auto transition-all duration-300",
                  "hover:border-gray-400 hover:text-gray-700 hover:bg-gray-50/50",
                  "active:scale-[0.98]"
                )}
              >
                <Settings className="h-4 w-4 mr-2" />
                {t('common.admin')}
              </Button>
            </Link>
          )}
        </>
      )}
      {isAdminPage && (
        <Link to="/">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn(
              "w-full md:w-auto transition-all duration-300",
              "hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/50",
              "active:scale-[0.98]"
            )}
          >
            {t('common.backToHome')}
          </Button>
        </Link>
      )}
    </>
  );

  return (
    <div className="bg-white shadow-sm border-b sticky top-0 z-50 transition-all duration-300 hover:shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        {/* Navigation */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2 flex-col md:flex-row">
            <Link to="/" className="text-xl font-bold text-gray-900 flex items-center gap-2 transition-colors duration-300 hover:text-blue-600">
              🚜 {t('common.appName')}
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-3 items-center">
            <NavigationItems />
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={cn(
                  "md:hidden transition-all duration-300",
                  isMobileMenuOpen && "rotate-90 text-blue-600 bg-blue-50"
                )}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-[80%] sm:w-[385px] p-6"
            >
              <div className="flex flex-col gap-4 py-4">
                <NavigationItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {!hideSearch && !isAdminPage && (
          <div className="py-3 space-y-3">
            <div className="flex gap-3">
              <div className="flex-[3]">
                <SearchBar 
                  value={searchTerm}
                  onChange={onSearchChange}
                />
              </div>
              <Button
                variant="outline"
                size="default"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 h-11",
                  "transition-all duration-300",
                  "hover:border-blue-300 hover:bg-blue-50/50",
                  isFiltersOpen && "bg-blue-50 text-blue-600 border-blue-200 shadow-sm"
                )}
              >
                <Filter className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  isFiltersOpen ? "text-blue-600" : "text-gray-500"
                )} />
                {t('filters.filters')}
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform duration-300",
                  isFiltersOpen ? "rotate-180 text-blue-600" : "text-gray-500"
                )} />
              </Button>
            </div>

            {isFiltersOpen && (
              <div className="animate-in slide-in-from-top-2 duration-200">
                <ServiceFilters onFilterChange={onFilterChange} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}; 