import React from 'react';
import { Palette } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const ColorPicker: React.FC = () => {
  const { themeColor, setThemeColor } = useCardStore();

  const presetColors = ['#002966', '#ffffff', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <Palette className="w-4 h-4" />
        Accent Color
      </label>
      
      <div className="flex gap-2 flex-wrap">
        {presetColors.map((color) => (
          <button
            key={color}
            onClick={() => setThemeColor(color)}
            className={`w-8 h-8 rounded-full transition-all ${
              themeColor === color ? 'ring-2 ring-white scale-110' : 'ring-1 ring-white/20'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
          className="w-8 h-8 rounded-full cursor-pointer bg-transparent border border-white/20"
        />
      </div>
    </div>
  );
};

export default ColorPicker;