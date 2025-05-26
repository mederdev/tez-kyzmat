import { Card, CardContent } from '@/components/ui/card';
import { CategoryFilter } from './CategoryFilter';
import { LocationFilter } from './LocationFilter';
import { FilterState } from '@/types';

interface FilterSectionProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
}

export function FilterSection({ filters, onFilterChange }: FilterSectionProps) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategoryFilter
                selectedCategory={filters.category}
                onCategoryChange={(category) => onFilterChange({ category })}
              />
              <LocationFilter
                selectedLocation={filters.location}
                selectedDistrict={filters.district}
                onLocationChange={(location) => onFilterChange({ location, district: '' })}
                onDistrictChange={(district) => onFilterChange({ district })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 