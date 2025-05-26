import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Category } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col w-full">
      <Label htmlFor="category" className="mb-2 text-sm sm:text-base font-medium">
        {t('filters.category')}
      </Label>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full min-w-[200px] h-10 sm:h-11">
          <SelectValue placeholder={t('filters.selectCategory')} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          <SelectItem value="all" className="py-2.5 sm:py-3">
            {t('categories.all')}
          </SelectItem>
          {categories.filter(cat => cat.id !== 'all').map((category) => (
            <SelectItem key={category.id} value={category.id} className="py-2.5 sm:py-3">
              <span className="flex items-center gap-2">
                <span className="text-lg">{category.icon}</span>
                <span className="text-sm sm:text-base">{t(`categories.${category.id}`)}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 