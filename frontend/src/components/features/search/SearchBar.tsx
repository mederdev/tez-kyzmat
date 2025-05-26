import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ 
  value, 
  onChange, 
  placeholder 
}: SearchBarProps) => {
  const { t } = useLanguage();
  
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
      <Input
        type="text"
        placeholder={placeholder || t('common.searchPlaceholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 sm:pl-12 h-10 sm:h-12 text-base sm:text-lg rounded-lg"
      />
    </div>
  );
}; 