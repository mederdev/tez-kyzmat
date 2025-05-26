import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { ServiceFormData, Category } from "@/types";
import { CATEGORIES } from "@/data/constants";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceFormProps {
  onSubmit: (data: ServiceFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ServiceForm = ({ onSubmit, onCancel, isLoading = false }: ServiceFormProps) => {
  const { t } = useLanguage();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<ServiceFormData>();

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
        <CardTitle>{t('services.form.title')}</CardTitle>
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
            <Label>{t('services.form.images')}</Label>
            <div className="mt-2 space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {selectedImages.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                {selectedImages.length < 5 && (
                  <label className="border-2 border-dashed border-gray-300 rounded-lg aspect-square flex flex-col items-center justify-center cursor-pointer hover:border-gray-400">
                    <Upload className="h-8 w-8 text-gray-400" />
                    <span className="mt-2 text-sm text-gray-500">{t('services.form.addImages')}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-sm text-gray-500">{t('services.form.maxImages')}</p>
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