import { useState } from 'react';
import { useNavigate, useSearchParams, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare } from 'lucide-react';

export function LoginPage() {
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const returnTo = searchParams.get('returnTo') || '/';
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'phone' | 'code'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
  });

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would call your API to send verification code
      // await sendVerificationCode(formData.phone);
      setVerificationStep('code');
      toast({
        description: t('auth.codeSent'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('auth.invalidPhone'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCodeVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(formData.phone, formData.code, 'phone');
      toast({
        description: t('auth.loginSuccess'),
      });
      handleLoginSuccess();
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('auth.invalidCode'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppLogin = async () => {
    setIsLoading(true);
    try {
      // Here you would implement WhatsApp authentication
      // This could open WhatsApp in a new window or redirect to WhatsApp
      window.open(`https://wa.me/your-whatsapp-number?text=${encodeURIComponent(t('auth.whatsappLoginMessage'))}`, '_blank');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('auth.loginError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSuccess = () => {
    navigate(returnTo);
  };

  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.loginTitle')}</CardTitle>
          <CardDescription>
            {returnTo !== '/' 
              ? t('auth.loginToAccess')
              : t('auth.loginDescription')
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="phone" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="phone">{t('auth.phone')}</TabsTrigger>
              <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            </TabsList>
            <TabsContent value="phone">
              {verificationStep === 'phone' ? (
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t('auth.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder={t('auth.phonePlaceholder')}
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? t('common.loading') : t('auth.sendCode')}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleCodeVerification} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">{t('auth.verificationCode')}</Label>
                    <Input
                      id="code"
                      name="code"
                      type="text"
                      placeholder={t('auth.verificationCodePlaceholder')}
                      value={formData.code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isLoading}
                  >
                    {isLoading ? t('common.loading') : t('auth.verifyCode')}
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="w-full"
                    onClick={() => setVerificationStep('phone')}
                  >
                    {t('auth.resendCode')}
                  </Button>
                </form>
              )}
            </TabsContent>
            <TabsContent value="whatsapp">
              <div className="space-y-4">
                <Button 
                  onClick={handleWhatsAppLogin}
                  className="w-full"
                  disabled={isLoading}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t('auth.whatsappLogin')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              {t('auth.noAccount')}{' '}
              <Link 
                to={`/signup${returnTo !== '/' ? `?returnTo=${returnTo}` : ''}`} 
                className="text-primary hover:underline"
              >
                {t('auth.register')}
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 