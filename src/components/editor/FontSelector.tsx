import React from 'react';
import { useCardStore } from '../../stores/cardStore';
import { Type } from 'lucide-react';

const FontSelector: React.FC = () => {
  const { fontFamily, setFontFamily } = useCardStore();

  const fonts = [
    { name: 'Inter', value: "'Inter', sans-serif" },
    { name: 'Playfair Display', value: "'Playfair Display', serif" },
    { name: 'Roboto Mono', value: "'Roboto Mono', monospace" },
    { name: 'Montserrat', value: "'Montserrat', sans-serif" },
    { name: 'System Sans', value: "system-ui, sans-serif" },
    { name: 'System Serif', value: "serif" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Type className="w-4 h-4 text-gray-500" />
        <h3 className="text-gray-700 text-sm font-medium">Typography</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {fonts.map((font) => (
          <button
            key={font.name}
            onClick={() => setFontFamily(font.value)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
              fontFamily === font.value
                ? 'bg-[#002966] text-white border-[#002966]'
                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
            }`}
            style={{ fontFamily: font.value }}
          >
            {font.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FontSelector;