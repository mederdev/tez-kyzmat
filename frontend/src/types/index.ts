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
  district?: string;
  districtName?: string;
  price: string;
  available: boolean;
  images: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: ServiceCategory;
  name: string;
  icon: string;
}

export interface Region {
  id: LocationId;
  name: string;
  emoji: string;
  districts: District[];
}

export interface District {
  id: string;
  name: string;
}

export type ServiceCategory =
  | "all"
  | "unloading"
  | "tractors"
  | "trucks"
  | "concrete"
  | "water";

export type LocationId =
  | "all"
  | "bishkek"
  | "osh"
  | "chui"
  | "issyk-kul"
  | "naryn"
  | "talas"
  | "jalal-abad"
  | "osh-region"
  | "batken";

export type DistrictId = string;

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: ServiceCategory;
  selectedLocation: LocationId;
  selectedDistrict?: DistrictId;
}

export interface ServiceFormData {
  name: string;
  category: string;
  description: string;
  ownerName: string;
  contact: string;
  whatsapp: string;
  location: string;
  locationName: string;
  district?: string;
  districtName?: string;
  price: string;
  available: boolean;
  images: File[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
}

export interface AdminStats {
  totalUsers: number;
  totalServices: number;
  totalCategories: number;
  servicesByCategory: Record<string, number>;
}

export interface FilterState {
  category: string;
  location: string;
  district: string;
  search: string;
}

export interface Location {
  id: string;
  name: string;
  districts: District[];
}
