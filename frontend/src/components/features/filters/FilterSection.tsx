import { Card, CardContent } from '@/components/ui/card';
import { CategoryFilter } from './CategoryFilter';
import { LocationFilter } from './LocationFilter';
import { FilterState, LocationId } from '@/types';
import { CATEGORIES } from '@/data/constants';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <Card className="overflow-hidden">
          <CardContent className="p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <CategoryFilter
                categories={CATEGORIES}
                selectedCategory={filters.category}
                onCategoryChange={(category) => onFilterChange({ category })}
              />
              <LocationFilter
                selectedLocation={filters.location as LocationId}
                selectedDistrict={filters.district}
                onLocationChange={(location) => onFilterChange({ location, district: undefined })}
                onDistrictChange={(district) => onFilterChange({ district })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 