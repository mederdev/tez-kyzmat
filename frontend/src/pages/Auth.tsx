import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Home } from 'lucide-react';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { toast } = useToast();
  const { login } = useAuth();
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const redirectTo = searchParams.get('redirect') || '/';
  const serviceId = redirectTo.includes('claim-service/') 
    ? redirectTo.split('claim-service/')[1]
    : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would typically make an API call to authenticate
      // For now, we'll simulate it
      const user = {
        id: 'temp-id',
        name,
        email,
        role: 'user' as const,
        createdAt: new Date().toISOString(),
      };

      // Log the user in
      login(user);

      toast({
        title: 'Success',
        description: serviceId 
          ? t('services.auth.claimRequestSent')
          : t('services.auth.signInSuccess'),
      });

      // Redirect back
      navigate(redirectTo);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('common.error'),
        description: t('services.auth.error'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-xl md:text-2xl font-bold text-gray-900">
              🚜 {t('common.appName')}
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                {t('common.backToHome')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {serviceId ? t('services.auth.signInTitle') : t('common.signIn')}
            </h1>
            <p className="mt-2 text-gray-600">
              {serviceId ? t('services.auth.signInDescription') : t('common.signInDescription')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">
                {t('services.form.ownerName')}
              </Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">
                {t('common.email')}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? t('common.loading') : t('common.continue')}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth; 