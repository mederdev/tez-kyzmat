import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceForm } from '@/components/features/services/ServiceForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Service, ServiceFormData } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

export function EditServicePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  const { data: service, isLoading, error } = useQuery<Service>({
    queryKey: ['service', id],
    queryFn: async () => {
      try {
        const response = await axios.get(`/api/services/${id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: 'destructive',
        description: t('services.notFound'),
      });
      navigate('/');
    }
  }, [error, navigate, t, toast]);

  useEffect(() => {
    if (service && isAuthenticated && user && service.ownerId !== user.id) {
      toast({
        variant: 'destructive',
        description: t('services.unauthorized'),
      });
      navigate('/');
    }
  }, [service, isAuthenticated, user, navigate, t, toast]);

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      // Double check authorization
      if (!isAuthenticated || !user || service?.ownerId !== user.id) {
        toast({
          variant: 'destructive',
          description: t('services.unauthorized'),
        });
        navigate('/');
        return;
      }

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

      await axios.put(`/api/services/${id}`, formData);
      toast({
        description: t('services.updateSuccess'),
      });
      navigate('/my-services');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('services.updateError'),
      });
    }
  };

  const handleCancel = () => {
    navigate('/my-services');
  };

  if (isLoading) {
    return <div>{t('common.loading')}</div>;
  }

  if (!service) {
    return <div>{t('services.notFound')}</div>;
  }

  const initialData: ServiceFormData = {
    name: service.name,
    description: service.description,
    category: service.category,
    price: service.price,
    contact: service.contact,
    whatsapp: service.whatsapp || '',
    location: service.location,
    locationName: service.locationName,
    district: service.district || '',
    districtName: service.districtName || '',
    ownerName: service.ownerName,
    available: service.available,
    images: [], // We can't convert URLs back to Files
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{t('services.editTitle')}</h1>
        <ServiceForm 
          onSubmit={handleSubmit} 
          onCancel={handleCancel}
          initialData={initialData} 
        />
      </main>
    </div>
  );
} 