import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { AdminPage } from '@/pages/AdminPage';
import { LoginPage } from '@/pages/LoginPage';
import { RegisterPage } from '@/pages/RegisterPage';
import { CreateServicePage } from '@/pages/CreateServicePage';
import { EditServicePage } from '@/pages/EditServicePage';
import { MyServicesPage } from '@/pages/MyServicesPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
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
        element={
          <ProtectedRoute>
            <CreateServicePage />
          </ProtectedRoute>
        } 
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
  );
} 