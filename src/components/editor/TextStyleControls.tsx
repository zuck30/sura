import React from 'react';
import { useCardStore } from '../../stores/cardStore';
import { AlignLeft, AlignCenter, AlignRight, Type } from 'lucide-react';

const TextStyleControls: React.FC = () => {
  const { fontSize, setFontSize, textAlign, setTextAlign } = useCardStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700 text-sm font-medium">
          <Type className="w-4 h-4" />
          <span>Font Size</span>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="12"
            max="48"
            value={fontSize}
            onChange={(e) => setFontSize(parseInt(e.target.value))}
            className="w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#002966]"
          />
          <span className="text-xs font-mono text-gray-500 min-w-[24px]">{fontSize}px</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-gray-700 text-sm font-medium">Alignment</div>
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setTextAlign('left')}
            className={`p-1.5 rounded-md transition-all ${
              textAlign === 'left' ? 'bg-white shadow-sm text-[#002966]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTextAlign('center')}
            className={`p-1.5 rounded-md transition-all ${
              textAlign === 'center' ? 'bg-white shadow-sm text-[#002966]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            onClick={() => setTextAlign('right')}
            className={`p-1.5 rounded-md transition-all ${
              textAlign === 'right' ? 'bg-white shadow-sm text-[#002966]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <AlignRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextStyleControls;