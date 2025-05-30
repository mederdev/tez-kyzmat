import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { AdminPage } from '@/pages/AdminPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CreateServicePage } from '@/pages/CreateServicePage';
import { EditServicePage } from '@/pages/EditServicePage';
import { MyServicesPage } from '@/pages/MyServicesPage';
import { SignupPage } from '@/pages/SignupPage';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <LanguageProvider>
            <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute requireAdmin>
                      <AdminPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/create-service" 
                  element={<CreateServicePage />} 
                />
                <Route 
                  path="/edit-service/:id" 
                  element={
                    <ProtectedRoute>
                      <EditServicePage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/my-services" 
                  element={
                    <ProtectedRoute>
                      <MyServicesPage />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
