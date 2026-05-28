import React from 'react';
import { useCardStore } from '../../stores/cardStore';
import { Layout, Columns, Quote, User } from 'lucide-react';

const LayoutSelector: React.FC = () => {
  const { layout, setLayout } = useCardStore();

  const options = [
    { id: 'standard', label: 'Standard', icon: Layout },
    { id: 'minimal', label: 'Minimal', icon: Columns },
    { id: 'quote', label: 'Quote', icon: Quote },
    { id: 'hero', label: 'Hero', icon: User },
  ] as const;

  return (
    <div className="space-y-3">
      <h3 className="text-gray-700 text-sm font-medium">Layout Template</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setLayout(option.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
              layout === option.id
                ? 'border-[#002966] bg-blue-50 text-[#002966]'
                : 'border-gray-100 hover:border-gray-200 text-gray-500'
            }`}
          >
            <option.icon className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LayoutSelector;