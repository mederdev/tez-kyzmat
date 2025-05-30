import { Service } from '@/types';

export interface ServiceFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  contact: string;
  whatsapp?: string;
  location: string;
  locationName: string;
  district?: string;
  districtName?: string;
  ownerName: string;
  available: boolean;
  images: File[];
}

export interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  initialData?: Partial<ServiceFormData>;
  onCancel?: () => void;
}

export interface ServiceCardProps {
  service: Service;
  showEditButton?: boolean;
}

export interface ServiceGridProps {
  searchTerm?: string;
  selectedCategory?: string;
  selectedLocation?: string;
  selectedDistrict?: string;
} 