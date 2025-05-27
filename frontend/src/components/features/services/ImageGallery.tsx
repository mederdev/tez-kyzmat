import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ImageGalleryProps {
  images: string[];
  serviceName: string;
}

export function ImageGallery({ images, serviceName }: ImageGalleryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
        <ImageIcon className="h-12 w-12 text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div 
        className="relative aspect-video cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <img
          src={images[0]}
          alt={serviceName}
          className="w-full h-full object-cover rounded-lg hover:opacity-95 transition-opacity"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
            <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
              {t('services.card.clickToView')}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.slice(1, 4).map((image, index) => (
            <div 
              key={index} 
              className="relative aspect-square cursor-pointer group"
              onClick={() => {
                setCurrentIndex(index + 1);
                setIsOpen(true);
              }}
            >
              <img
                src={image}
                alt={`${serviceName} ${index + 2}`}
                className="w-full h-full object-cover rounded hover:opacity-95 transition-opacity"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
            </div>
          ))}
          {images.length > 4 && (
            <div 
              className="aspect-square bg-gray-100 rounded flex items-center justify-center text-xs text-gray-600 cursor-pointer hover:bg-gray-200 transition-colors relative group"
              onClick={() => {
                setCurrentIndex(4);
                setIsOpen(true);
              }}
            >
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity rounded" />
              <span className="relative z-10">
                +{images.length - 4} {t('services.card.moreImages')}
              </span>
            </div>
          )}
        </div>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 bg-white">
          <div className="relative h-full flex items-center justify-center bg-gray-100">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white shadow-sm z-50"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>

            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 bg-white/90 hover:bg-white shadow-sm z-50 rounded-full w-10 h-10"
                  onClick={handlePrevious}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 bg-white/90 hover:bg-white shadow-sm z-50 rounded-full w-10 h-10"
                  onClick={handleNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}

            <img
              src={images[currentIndex]}
              alt={`${serviceName} ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 