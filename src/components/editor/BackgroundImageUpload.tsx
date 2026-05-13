import React, { useRef } from 'react';
import { Image, X, Sliders } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const BackgroundImageUpload: React.FC = () => {
  const { backgroundImage, setBackgroundImage, backgroundOpacity, setBackgroundOpacity } = useCardStore();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
        <Image className="w-4 h-4" />
        Background Image
      </label>
      
      {backgroundImage ? (
        <div className="space-y-3">
          <div className="relative">
            <img
              src={backgroundImage}
              alt="Background"
              className="w-full h-20 rounded-lg object-cover border border-gray-200"
            />
            <button
              onClick={() => setBackgroundImage(null)}
              className="absolute top-2 right-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-gray-500" />
            <input
              type="range"
              min="0"
              max="0.8"
              step="0.01"
              value={backgroundOpacity}
              onChange={(e) => setBackgroundOpacity(parseFloat(e.target.value))}
              className="flex-1"
            />
            <span className="text-gray-500 text-xs">{Math.round(backgroundOpacity * 100)}%</span>
          </div>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <Image className="w-4 h-4" />
          Add Background
        </button>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />
    </div>
  );
};

export default BackgroundImageUpload;