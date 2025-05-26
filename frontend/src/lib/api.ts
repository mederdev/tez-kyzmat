import axios from "axios";
import { Service, ServiceFormData, AdminStats } from "@/types";

const API_BASE_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Интерфейс для ответа API
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export const servicesApi = {
  // Получить все сервисы с фильтрацией
  getAll: async (params?: {
    category?: string;
    location?: string;
    district?: string;
    available?: boolean;
    search?: string;
  }): Promise<Service[]> => {
    const response = await api.get<ApiResponse<Service[]>>("/services", {
      params,
    });
    return response.data.data;
  },

  // Получить сервис по ID
  getById: async (id: string): Promise<Service> => {
    const response = await api.get<ApiResponse<Service>>(`/services/${id}`);
    return response.data.data;
  },

  // Создать новый сервис с файлами
  create: async (serviceData: ServiceFormData): Promise<Service> => {
    const formData = new FormData();

    // Добавляем текстовые поля
    Object.entries(serviceData).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Добавляем файлы изображений
    if (serviceData.images && serviceData.images.length > 0) {
      serviceData.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await api.post<ApiResponse<Service>>(
      "/services",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },

  // Обновить сервис
  update: async (
    id: string,
    serviceData: Partial<ServiceFormData>
  ): Promise<Service> => {
    const formData = new FormData();

    // Добавляем текстовые поля
    Object.entries(serviceData).forEach(([key, value]) => {
      if (key !== "images" && value !== undefined && value !== null) {
        formData.append(key, value.toString());
      }
    });

    // Добавляем файлы изображений, если есть
    if (serviceData.images && serviceData.images.length > 0) {
      serviceData.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    const response = await api.patch<ApiResponse<Service>>(
      `/services/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data.data;
  },

  // Удалить сервис
  delete: async (id: string): Promise<void> => {
    await api.delete(`/services/${id}`);
  },

  // Получить статистику
  getStats: async (): Promise<AdminStats> => {
    const response = await api.get<ApiResponse<AdminStats>>("/services/stats");
    return response.data.data;
  },

  // Переключить статус доступности
  toggleAvailability: async (id: string): Promise<Service> => {
    // Сначала получаем текущий сервис
    const currentService = await servicesApi.getById(id);

    // Обновляем статус
    return servicesApi.update(id, {
      available: !currentService.available,
    });
  },
};

export default api;
