import React from 'react';
import { useCardStore } from '../../stores/cardStore';
import { Square, Smartphone, Image as ImageIcon, SmartphoneNfc } from 'lucide-react';

const AspectRatioSelector: React.FC = () => {
  const { aspectRatio, setAspectRatio } = useCardStore();

  const options = [
    { id: 'square', label: 'Square', icon: Square, desc: '1:1 (Post)' },
    { id: 'portrait', label: 'Portrait', icon: Smartphone, desc: '9:16 (Standard)' },
    { id: 'story', label: 'Story', icon: SmartphoneNfc, desc: '9:16 (Mobile)' },
    { id: 'landscape', label: 'Landscape', icon: ImageIcon, desc: '3:2' },
  ] as const;

  return (
    <div className="space-y-3">
      <h3 className="text-gray-700 text-sm font-medium">Aspect Ratio</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setAspectRatio(option.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              aspectRatio === option.id
                ? 'border-[#002966] bg-blue-50 text-[#002966]'
                : 'border-gray-100 hover:border-gray-200 text-gray-500'
            }`}
          >
            <option.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">{option.label}</span>
            <span className="text-[10px] opacity-60">{option.desc}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AspectRatioSelector;