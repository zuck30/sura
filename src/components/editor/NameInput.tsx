import React from 'react';
import { User } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const NameInput: React.FC = () => {
  const { name, setName } = useCardStore();

  return (
    <div className="space-y-2">
      <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
        <User className="w-4 h-4" />
        Display Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your display name"
        className="w-full px-4 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#002966] focus:ring-1 focus:ring-[#002966] transition-all"
      />
    </div>
  );
};

export default NameInput;