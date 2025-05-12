
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface GalleryProps {
  title?: string;
}

const Gallery: React.FC<GalleryProps> = ({ title = "Beautiful Memories" }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Placeholder images (replace these with actual images of Isha)
  const images = [
    { src: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24?w=800&auto=format&fit=crop", alt: "Birthday celebration" },
    { src: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&auto=format&fit=crop", alt: "Fun memories" },
    { src: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800&auto=format&fit=crop", alt: "Happy moments" },
    { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop", alt: "Special day" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop", alt: "Lovely moments" },
    { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop", alt: "Together" },
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl font-birthday text-center mb-6">{title}</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div 
                className="gallery-image overflow-hidden rounded-lg aspect-square"
                onClick={() => setSelectedImage(image.src)}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <div className="w-full">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-auto rounded-lg"
                />
                <p className="text-center mt-4 font-medium">{image.alt}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
