import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import CreateService from "./pages/CreateService";
import NotFound from "./pages/NotFound";
import EditService from "./pages/EditService";
import Auth from "./pages/Auth";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/create-service" element={<CreateService />} />
      <Route path="/edit-service/:id" element={<EditService />} />
      <Route path="/auth/signin" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}; 