import { useState, useEffect } from "react";
import { servicesApi } from "@/lib/api";
import { Service, ServiceFormData, AdminStats, FilterState } from "@/types";

// Хук для получения всех сервисов
export const useServices = (filters?: Partial<FilterState>) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await servicesApi.getAll(filters);
      setServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка загрузки сервисов");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [JSON.stringify(filters)]);

  return { services, loading, error, refetch: fetchServices };
};

// Хук для создания сервиса
export const useCreateService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createService = async (
    serviceData: ServiceFormData
  ): Promise<Service | null> => {
    try {
      setLoading(true);
      setError(null);
      const newService = await servicesApi.create(serviceData);
      return newService;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка создания сервиса");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { createService, loading, error };
};

// Хук для обновления сервиса
export const useUpdateService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateService = async (
    id: string,
    serviceData: Partial<ServiceFormData>
  ): Promise<Service | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedService = await servicesApi.update(id, serviceData);
      return updatedService;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка обновления сервиса"
      );
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateService, loading, error };
};

// Хук для удаления сервиса
export const useDeleteService = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteService = async (id: string): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      await servicesApi.delete(id);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка удаления сервиса");
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteService, loading, error };
};

// Хук для получения статистики
export const useAdminStats = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await servicesApi.getStats();
      setStats(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка загрузки статистики"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return { stats, loading, error, refetch: fetchStats };
};

// Хук для переключения доступности сервиса
export const useToggleAvailability = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAvailability = async (id: string): Promise<Service | null> => {
    try {
      setLoading(true);
      setError(null);
      const updatedService = await servicesApi.toggleAvailability(id);
      return updatedService;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка изменения статуса");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { toggleAvailability, loading, error };
};
