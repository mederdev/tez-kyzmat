import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const ContactSection = () => {
  return (
    <div className="mt-16 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        Өз кызматтарыңызды кошкуңуз келеби?
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Техника же кызматтар жөнүндө маалымат жайгаштыруу үчүн биз менен байланышыңыз
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/create-service">
          <Button size="lg" className="px-8">
            <Plus className="h-5 w-5 mr-2" />
            Жарыя кошуу
          </Button>
        </Link>
        <Button 
          size="lg" 
          variant="outline" 
          className="px-8"
          onClick={() => window.open('https://wa.me/996555123456', '_blank')}
        >
          Биз менен байланышуу
        </Button>
      </div>
    </div>
  );
}; 