import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceForm } from "@/components/features/services/ServiceForm";
import { ServiceFormData } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const CreateService = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: ServiceFormData) => {
    setIsLoading(true);
    
    try {
      // Здесь будет API вызов для создания сервиса
      console.log("Creating service:", data);
      
      // Симуляция API вызова
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Показываем успешное сообщение
      alert("Жарыя ийгиликтүү кошулду!");
      
      // Перенаправляем на главную страницу
      navigate("/");
    } catch (error) {
      console.error("Error creating service:", error);
      alert("Жарыя кошууда ката кетти. Кайра аракет кылыңыз.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Башкы бетке кайтуу
          </Button>
          
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Жаңы жарыя кошуу
            </h1>
            <p className="text-lg text-gray-600">
              Техника же кызматыңызды жарыялаңыз
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ServiceForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default CreateService; 