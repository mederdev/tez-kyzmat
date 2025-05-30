import { Header } from '@/components/layout/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { ServiceForm } from '@/components/features/services/ServiceForm';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { ServiceFormData } from '@/components/features/services/types';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';

export function CreateServicePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, user } = useAuth();

  const handleSubmit = async (data: ServiceFormData) => {
    try {
      // If user is not authenticated, redirect to login
      if (!isAuthenticated) {
        // Store the form data in session storage
        sessionStorage.setItem('pendingService', JSON.stringify(data));
        // Redirect to login with return URL
        navigate('/login?returnTo=/create-service');
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

      // If user is authenticated, add their info
      if (user) {
        formData.append('ownerId', user.id);
        formData.append('ownerName', user.name || data.ownerName);
      }

      await axios.post('/api/services', formData);
      toast({
        description: t('services.success'),
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('services.error'),
      });
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  // Check for pending service data if user just logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      const pendingService = sessionStorage.getItem('pendingService');
      if (pendingService) {
        // Clear the pending service data
        sessionStorage.removeItem('pendingService');
        // Submit the pending service
        handleSubmit(JSON.parse(pendingService));
      }
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header hideSearch />
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">{t('services.createNew')}</h1>
        <p className="text-gray-600 mb-8">{t('services.createDescription')}</p>
        <ServiceForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </main>
    </div>
  );
} 