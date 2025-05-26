import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X, Plus } from "lucide-react";
import { ServiceFormData, ServiceCategory, LocationId, DistrictId } from "@/types";
import { CATEGORIES, KYRGYZSTAN_REGIONS } from "@/data/constants";
import { useNavigate } from 'react-router-dom';
import { useCreateService } from '@/hooks/useServices';
import { locations } from '@/data/locations';

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ServiceForm = ({ onSubmit, onCancel, isLoading = false }: ServiceFormProps) => {
  const navigate = useNavigate();
  const { createService, loading, error } = useCreateService();
  
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationId>("bishkek");
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictId | undefined>();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ServiceFormData>();

  const watchedCategory = watch("category");
  const watchedLocation = watch("location");

  const selectedRegion = KYRGYZSTAN_REGIONS.find(region => region.id === selectedLocation);
  const availableDistricts = selectedRegion?.districts || [];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedImages.length > 5) {
      alert("Максимум 5 сүрөт жүктөө мүмкүн");
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleLocationChange = (location: LocationId) => {
    setSelectedLocation(location);
    setSelectedDistrict(undefined);
    setValue("location", location);
    setValue("district", undefined);
  };

  const handleDistrictChange = (district: DistrictId) => {
    setSelectedDistrict(district);
    setValue("district", district);
  };

  const onFormSubmit = async (data: ServiceFormData) => {
    const result = await createService(data);
    
    if (result) {
      alert('Сервис успешно создан!');
      navigate('/');
    }
  };

  const selectedLocationData = locations.find(loc => loc.id === selectedLocation);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">
          Жаңы жарыя кошуу
        </CardTitle>
        <CardDescription>
          Техника же кызматыңыз жөнүндө маалымат толтуруңуз
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Service Name */}
          <div>
            <Label htmlFor="name">Кызматтын аталышы *</Label>
            <Input
              id="name"
              {...register("name", { required: "Аталышты киргизиңиз" })}
              placeholder="Мисалы: КамАЗ жүк ташыгыч"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Категория *</Label>
            <Select onValueChange={(value: ServiceCategory) => setValue("category", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Категорияны тандаңыз" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.filter(cat => cat.id !== "all").map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">Категорияны тандаңыз</p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Сүрөттөмө *</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Сүрөттөмөнү киргизиңиз" })}
              placeholder="Кызматыңыз жөнүндө кененирээк маалымат бериңиз"
              className="mt-1 min-h-[100px]"
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Owner Name */}
          <div>
            <Label htmlFor="ownerName">Ээсинин аты *</Label>
            <Input
              id="ownerName"
              {...register("ownerName", { required: "Атыңызды киргизиңиз" })}
              placeholder="Мисалы: Азамат Токтосунов"
              className="mt-1"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-1">{errors.ownerName.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Аймак/Шаар *</Label>
              <Select value={selectedLocation} onValueChange={handleLocationChange}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Аймакты тандаңыз" />
                </SelectTrigger>
                <SelectContent>
                  {locations.filter(region => region.id !== "all").map((region) => (
                    <SelectItem key={region.id} value={region.id}>
                      <div className="flex items-center gap-2">
                        <span>{region.emoji}</span>
                        <span>{region.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {availableDistricts.length > 0 && (
              <div>
                <Label htmlFor="district">Район</Label>
                <Select value={selectedDistrict || "all"} onValueChange={handleDistrictChange}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Районду тандаңыз" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableDistricts.map((district) => (
                      <SelectItem key={district.id} value={district.id}>
                        {district.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">Телефон номери *</Label>
              <Input
                id="contact"
                {...register("contact", { required: "Телефон номерин киргизиңиз" })}
                placeholder="+996 (555) 123-456"
                className="mt-1"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="whatsapp">WhatsApp номери *</Label>
              <Input
                id="whatsapp"
                {...register("whatsapp", { required: "WhatsApp номерин киргизиңиз" })}
                placeholder="+996555123456"
                className="mt-1"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Баасы *</Label>
            <Input
              id="price"
              {...register("price", { required: "Баасын киргизиңиз" })}
              placeholder="Мисалы: 1000 сомдон/саат"
              className="mt-1"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <Label>Сүрөттөр (максимум 5)</Label>
            <div className="mt-2 space-y-4">
              {/* Upload Button */}
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Сүрөт жүктөө үчүн басыңыз</span>
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG (MAX. 5MB)</p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={selectedImages.length >= 5}
                  />
                </label>
              </div>

              {/* Selected Images */}
              {selectedImages.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
              disabled={loading}
            >
              Жокко чыгаруу
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={loading}
            >
              {loading ? "Сакталууда..." : "Жарыя кошуу"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 