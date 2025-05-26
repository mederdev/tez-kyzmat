import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: '', name: 'Бардык категориялар' },
  { id: 'unloading', name: 'Жүк түшүрүү' },
  { id: 'trucks', name: 'Жүк ташуу' },
  { id: 'tractors', name: 'Трактор кызматтары' },
  { id: 'concrete', name: 'Бетон ишмердүүлүгү' },
  { id: 'water', name: 'Суу ташуу' },
];

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div>
      <Label htmlFor="category">Категория</Label>
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Категорияны тандаңыз" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectItem key={category.id} value={category.id}>
              {category.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
} 