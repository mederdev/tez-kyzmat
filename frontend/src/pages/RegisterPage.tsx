import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare } from 'lucide-react';

export function RegisterPage() {
  const { t } = useLanguage();
  const { register, sendCode } = useAuthContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'phone' | 'code'>('phone');
  const [formData, setFormData] = useState({
    phone: '',
    code: '',
    name: '',
  });

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendCode(formData.phone, 'phone');
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
      await register(formData.phone, formData.code, formData.name);
      toast({
        description: t('auth.registerSuccess'),
      });
      navigate('/');
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('auth.invalidCode'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWhatsAppSignup = async () => {
    setIsLoading(true);
    try {
      await sendCode(formData.phone, 'whatsapp');
      toast({
        description: t('auth.whatsappCodeSent'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        description: t('auth.registerError'),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>{t('auth.registerTitle')}</CardTitle>
          <CardDescription>{t('auth.registerDescription')}</CardDescription>
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
                    <Label htmlFor="name">{t('auth.name')}</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder={t('auth.namePlaceholder')}
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
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
                  onClick={handleWhatsAppSignup}
                  className="w-full"
                  disabled={isLoading}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t('auth.whatsappSignup')}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-500">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-primary hover:underline">
                {t('auth.login')}
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 