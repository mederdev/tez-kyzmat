import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AdminStats } from '@/types';

export function AdminPage() {
  const { t } = useLanguage();
  const { data: stats, isLoading, error } = useQuery<AdminStats>({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const response = await axios.get('/api/services/admin/stats');
      return response.data;
    },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{t('admin.title')}</h1>
        
        {error ? (
          <div className="text-red-500">{t('admin.statsError')}</div>
        ) : isLoading ? (
          <div>{t('common.loading')}</div>
        ) : !stats ? (
          <div>{t('admin.stats.unavailable')}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.stats.totalServices')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalServices}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.stats.totalCategories')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.totalCategories}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('admin.stats.activeServices')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stats.activeServices}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
} 