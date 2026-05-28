import React from 'react';
import { useCardStore } from '../../stores/cardStore';
import { Palette } from 'lucide-react';

const GradientPicker: React.FC = () => {
  const { backgroundGradient, setBackgroundGradient } = useCardStore();

  const gradients = [
    { name: 'Midnight', value: 'bg-gradient-to-br from-gray-900 to-gray-800' },
    { name: 'Sunset', value: 'bg-gradient-to-br from-orange-500 to-pink-500' },
    { name: 'Ocean', value: 'bg-gradient-to-br from-blue-600 to-cyan-500' },
    { name: 'Lush', value: 'bg-gradient-to-br from-green-400 to-cyan-500' },
    { name: 'Purple', value: 'bg-gradient-to-br from-indigo-600 to-purple-600' },
    { name: 'Fire', value: 'bg-gradient-to-br from-red-600 to-orange-500' },
    { name: 'Golden', value: 'bg-gradient-to-br from-yellow-400 to-orange-500' },
    { name: 'Modern', value: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-gray-500" />
        <h3 className="text-gray-700 text-sm font-medium">Gradients</h3>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {gradients.map((g) => (
          <button
            key={g.name}
            onClick={() => setBackgroundGradient(g.value)}
            className={`h-10 rounded-lg border-2 transition-all ${
              backgroundGradient === g.value ? 'border-blue-600 scale-105' : 'border-transparent hover:scale-105'
            } ${g.value}`}
            title={g.name}
          />
        ))}
      </div>
    </div>
  );
};

export default GradientPicker;