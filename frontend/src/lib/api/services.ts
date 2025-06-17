import { apiClient } from './config';
import type {
  ApiResponse,
  Category,
  CreateServiceDto,
  Locations,
  Service,
  ServicesResponse,
  Stats,
  UpdateServiceDto,
} from '../../types/api';
import { ServiceFormData } from '@/types';

// Common API
export const getCategories = () =>
  apiClient.get<ApiResponse<Category[]>>('/api/common/categories');

export const getLocations = () =>
  apiClient.get<ApiResponse<Locations>>('/api/common/locations');

export const getDistricts = (location: string) =>
  apiClient.get<ApiResponse<{ [key: string]: string }>>(`/api/common/districts/${location}`);

// Auth API
export const sendCode = (data: { phone: string; method: 'phone' | 'whatsapp' }) =>
  apiClient.post<ApiResponse<{ message: string }>>('/api/auth/send-code', data);

export const verifyLogin = (data: { phone: string; code: string }) =>
  apiClient.post<ApiResponse<{ user: any; token: string }>>('/api/auth/verify-login', data);

export const verifyRegister = (data: { phone: string; code: string; name: string }) =>
  apiClient.post<ApiResponse<{ user: any; token: string }>>('/api/auth/verify-register', data);

// Services API
export interface GetServicesParams {
  searchTerm?: string;
  category?: string;
  location?: string;
  district?: string;
}

export const getServices = async (params?: GetServicesParams) => {
  const queryParams = new URLSearchParams();
  
  if (params?.searchTerm) {
    queryParams.append('search', params.searchTerm);
  }
  if (params?.category && params.category !== 'all') {
    queryParams.append('category', params.category);
  }
  if (params?.location && params.location !== 'all') {
    queryParams.append('location', params.location);
  }
  if (params?.district) {
    queryParams.append('district', params.district);
  }

  const response = await apiClient.get<ApiResponse<Service[]>>(`/api/services?${queryParams.toString()}`);
  return response.data;
};

export const getServiceById = async (id: string) => {
  const response = await apiClient.get<ApiResponse<Service>>(`/api/services/${id}`);
  return response.data;
};

export const createService = async (data: ServiceFormData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((file: File) => {
        formData.append('images', file);
      });
    } else {
      formData.append(key, value as string);
    }
  });

  const response = await apiClient.post<Service>('/api/services', formData);
  return response.data;
};

export const updateService = async (id: string, data: ServiceFormData) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'images') {
      value.forEach((file: File) => {
        formData.append('images', file);
      });
    } else {
      formData.append(key, value as string);
    }
  });

  const response = await apiClient.put<Service>(`/api/services/${id}`, formData);
  return response.data;
};

export const deleteService = async (id: string) => {
  await apiClient.delete(`/api/services/${id}`);
};

export const getMyServices = (params?: { page?: number; limit?: number }) =>
  apiClient.get<ApiResponse<ServicesResponse>>('/api/services/my', { params });

export const getStats = () =>
  apiClient.get<ApiResponse<Stats>>('/api/services/stats'); 