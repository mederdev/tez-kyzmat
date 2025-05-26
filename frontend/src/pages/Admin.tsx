import { AdminStats } from '@/components/features/admin/AdminStats';
import { ServiceManagement } from '@/components/features/admin/ServiceManagement';
import { Header } from '@/components/layout/Header';
import { useAdminStats, useServices } from '@/hooks/useServices';

export default function Admin() {
  const { stats, loading: statsLoading, error: statsError } = useAdminStats();
  const { services, loading: servicesLoading, error: servicesError, refetch } = useServices();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Админ панель</h1>
        
        {statsError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Ошибка загрузки статистики: {statsError}
          </div>
        )}
        
        {servicesError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            Ошибка загрузки сервисов: {servicesError}
          </div>
        )}
        
        <AdminStats stats={stats} loading={statsLoading} />
        <ServiceManagement services={services} loading={servicesLoading} onUpdate={refetch} />
      </div>
    </div>
  );
} 