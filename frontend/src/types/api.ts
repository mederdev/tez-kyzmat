// Common response type
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  statusCode?: number;
  pagination?: PaginationInfo;
}

// Auth types
export interface SendCodeDto {
  phone: string;
  method: 'phone' | 'whatsapp';
}

export interface VerifyCodeDto {
  phone: string;
  code: string;
  name?: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Service types
export interface Service {
  _id: string;
  name: string;
  category: string;
  description: string;
  ownerName: string;
  contact: string;
  whatsapp: string;
  location: string;
  locationName: string;
  district: string | null;
  districtName: string | null;
  price: string;
  available: boolean;
  images: string[];
  createdAt: string;
  updatedAt: string;
  ownerId: string | null;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface CreateServiceDto {
  name: string;
  category: string;
  description: string;
  ownerName: string;
  contact: string;
  whatsapp: string;
  location: string;
  district?: string;
  price: string;
  available: boolean;
  images: File[];
}

export interface UpdateServiceDto {
  name?: string;
  category?: string;
  description?: string;
  ownerName?: string;
  contact?: string;
  whatsapp?: string;
  location?: string;
  district?: string;
  price?: string;
  available?: boolean;
  images?: File[];
}

export interface ServicesResponse {
  services: Service[];
  pagination: PaginationInfo;
}

// Common types
export interface Category {
  key: string;
  name: string;
}

export interface District {
  [key: string]: string;
}

export interface Location {
  name: string;
  districts: District;
}

export interface Locations {
  [key: string]: Location;
}

export interface Stats {
  totalServices: number;
  totalCategories: number;
  activeServices: number;
  servicesByCategory: Record<string, number>;
} 