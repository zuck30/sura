import React from 'react';
import { useCardStore } from '../../stores/cardStore';
import { Sparkles } from 'lucide-react';

const DesignPresets: React.FC = () => {
  const store = useCardStore();

  const presets = [
    {
      name: 'Midnight Pro',
      style: {
        themeColor: '#3b82f6',
        fontFamily: "'Inter', sans-serif",
        backgroundGradient: 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900',
        layout: 'standard',
        fontSize: 18,
      }
    },
    {
      name: 'Modern Quote',
      style: {
        themeColor: '#fbbf24',
        fontFamily: "'Playfair Display', serif",
        backgroundGradient: 'bg-gradient-to-br from-indigo-900 to-purple-900',
        layout: 'quote',
        fontSize: 24,
      }
    },
    {
      name: 'Minimal Clean',
      style: {
        themeColor: '#10b981',
        fontFamily: "'Montserrat', sans-serif",
        backgroundGradient: 'bg-gradient-to-br from-zinc-100 to-zinc-300',
        layout: 'minimal',
        fontSize: 16,
      }
    },
    {
        name: 'Sunset Hero',
        style: {
          themeColor: '#ffffff',
          fontFamily: "'Inter', sans-serif",
          backgroundGradient: 'bg-gradient-to-br from-orange-500 to-pink-500',
          layout: 'hero',
          fontSize: 20,
        }
      }
  ];

  const applyPreset = (preset: any) => {
    store.setThemeColor(preset.style.themeColor);
    store.setFontFamily(preset.style.fontFamily);
    store.setBackgroundGradient(preset.style.backgroundGradient);
    store.setLayout(preset.style.layout as any);
    store.setFontSize(preset.style.fontSize);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-amber-500" />
        <h3 className="text-gray-700 text-sm font-medium">One-Click Styles</h3>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {presets.map((p) => (
          <button
            key={p.name}
            onClick={() => applyPreset(p)}
            className="p-3 rounded-xl border border-gray-200 bg-white hover:border-amber-400 hover:shadow-md transition-all text-left"
          >
            <span className="text-xs font-bold text-gray-800">{p.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesignPresets;