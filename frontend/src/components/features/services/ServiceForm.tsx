import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { ServiceFormData, Category } from "@/types";
import { CATEGORIES, KYRGYZSTAN_REGIONS } from "@/data/constants";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: ServiceFormData;
}

export const ServiceForm = ({ onSubmit, onCancel, isLoading = false, initialData }: ServiceFormProps) => {
  const { t } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm<ServiceFormData>({
    defaultValues: initialData
  });

  // Watch location changes to update districts
  const location = watch('location');

  // Reset form when initialData changes
  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setSelectedLocation(initialData.location);
    }
  }, [initialData, reset]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedImages.length > 5) {
      alert(t('services.form.maxImages'));
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {initialData ? t('services.form.editTitle') : t('services.form.title')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Info */}
          <div>
            <Label htmlFor="name">
              {t('services.form.name')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              {...register("name", { required: t('common.required') })}
              placeholder={t('services.form.namePlaceholder')}
              className="mt-1"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">
              {t('services.form.description')} <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              {...register("description", { required: t('common.required') })}
              placeholder={t('services.form.descriptionPlaceholder')}
              className="mt-1"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">
              {t('services.form.category')} <span className="text-red-500">*</span>
            </Label>
            <Controller
              name="category"
              control={control}
              rules={{ required: t('common.required') }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('filters.selectCategory')} />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.filter(cat => cat.id !== 'all').map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{t(`categories.${category.id}`)}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">
                {t('filters.location')} <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="location"
                control={control}
                rules={{ required: t('common.required') }}
                render={({ field }) => (
                  <Select 
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedLocation(value);
                    }} 
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('filters.selectRegion')} />
                    </SelectTrigger>
                    <SelectContent>
                      {KYRGYZSTAN_REGIONS.filter(loc => loc.id !== 'all').map((location) => (
                        <SelectItem key={location.id} value={location.id}>
                          <span className="flex items-center gap-2">
                            <span>{location.emoji}</span>
                            <span>{t(`locations.${location.id}`)}</span>
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="district">
                {t('filters.district')}
              </Label>
              <Controller
                name="district"
                control={control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                    disabled={!selectedLocation}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('filters.selectDistrict')} />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedLocation && KYRGYZSTAN_REGIONS.find(loc => loc.id === selectedLocation)?.districts.map((district) => (
                        <SelectItem key={district.id} value={district.id}>
                          {district.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">
              {t('services.form.price')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="price"
              {...register("price", { required: t('common.required') })}
              placeholder={t('services.form.pricePlaceholder')}
              className="mt-1"
            />
            {errors.price && (
              <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
            )}
          </div>

          {/* Contact Info */}
          <div>
            <Label htmlFor="ownerName">
              {t('services.form.ownerName')} <span className="text-red-500">*</span>
            </Label>
            <Input
              id="ownerName"
              {...register("ownerName", { required: t('common.required') })}
              placeholder={t('services.form.ownerNamePlaceholder')}
              className="mt-1"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-sm mt-1">{errors.ownerName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact">
                {t('services.form.contact')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contact"
                {...register("contact", { required: t('common.required') })}
                placeholder={t('services.form.contactPlaceholder')}
                className="mt-1"
              />
              {errors.contact && (
                <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="whatsapp">
                {t('services.form.whatsapp')} <span className="text-red-500">*</span>
              </Label>
              <Input
                id="whatsapp"
                {...register("whatsapp", { required: t('common.required') })}
                placeholder={t('services.form.whatsappPlaceholder')}
                className="mt-1"
              />
              {errors.whatsapp && (
                <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
              )}
            </div>
          </div>

          {/* Images */}
          <div>
            <Label htmlFor="images">
              {t('services.form.images')} <span className="text-red-500">*</span>
            </Label>
            <div className="mt-1">
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="image-upload"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-gray-500" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">{t('services.form.dragAndDrop')}</span>
                    </p>
                    <p className="text-xs text-gray-500">{t('services.form.fileTypes')}</p>
                  </div>
                  <input
                    id="image-upload"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {selectedImages.length > 0 && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {selectedImages.map((file, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {t('services.form.submit')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}; 