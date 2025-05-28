import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

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
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={cn(
      "relative w-full group transition-all duration-300",
      "focus-within:ring-2 focus-within:ring-blue-100 rounded-lg",
      "hover:shadow-sm",
      isFocused && "shadow-md"
    )}>
      <Search className={cn(
        "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4",
        "transition-all duration-300",
        isFocused ? "text-blue-600 scale-110" : "text-gray-400",
        "group-hover:text-blue-500"
      )} />
      <Input
        type="text"
        placeholder={placeholder || t('common.searchPlaceholder')}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "pl-10 h-11 text-base",
          "rounded-lg border-gray-200",
          "transition-all duration-300",
          "placeholder:text-gray-400",
          "focus:border-blue-200 focus:ring-0",
          "hover:border-blue-200",
          isFocused ? "bg-white shadow-inner" : "bg-gray-50",
          "group-hover:bg-white"
        )}
      />
    </div>
  );
}; 