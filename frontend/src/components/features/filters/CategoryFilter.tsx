import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  hideLabel?: boolean;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
  hideLabel = false
}: CategoryFilterProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col w-full">
      {!hideLabel && (
        <Label 
          htmlFor="category" 
          className={cn(
            "mb-2 text-sm font-medium",
            "text-gray-700 transition-colors duration-300",
            isOpen && "text-blue-600"
          )}
        >
          {t('filters.category')}
        </Label>
      )}
      <Select 
        value={selectedCategory} 
        onValueChange={onCategoryChange}
        onOpenChange={setIsOpen}
      >
        <SelectTrigger 
          className={cn(
            "w-full h-11 rounded-lg border-gray-200",
            "transition-all duration-300",
            "hover:border-blue-200 hover:bg-white hover:shadow-sm",
            "focus:ring-2 focus:ring-blue-100 focus:border-blue-200",
            isOpen ? "bg-white shadow-inner text-blue-600" : "bg-gray-50 text-gray-600",
            "[&>span]:flex [&>span]:items-center [&>span]:gap-2",
            "[&>svg]:hidden" // Hide the default chevron
          )}
        >
          <SelectValue placeholder={t('filters.selectCategory')} />
          <ChevronDown className={cn(
            "h-4 w-4 shrink-0 transition-all duration-300",
            isOpen ? "rotate-180 text-blue-600" : "text-gray-400",
            "group-hover:text-blue-500"
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
              "py-2.5 rounded-lg transition-all duration-200",
              "hover:bg-blue-50/50 focus:bg-blue-50/50",
              "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
            )}
          >
            {t('categories.all')}
          </SelectItem>
          {categories.filter(cat => cat.id !== 'all').map((category) => (
            <SelectItem 
              key={category.id} 
              value={category.id} 
              className={cn(
                "py-2.5 rounded-lg transition-all duration-200",
                "hover:bg-blue-50/50 focus:bg-blue-50/50",
                "data-[state=checked]:bg-blue-50 data-[state=checked]:text-blue-600"
              )}
            >
              <span className="flex items-center gap-2">
                <span className="text-lg transition-transform duration-300 group-hover:scale-110">{category.icon}</span>
                <span className="text-sm">{t(`categories.${category.id}`)}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 