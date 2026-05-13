import React from 'react';
import { User } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const NameInput: React.FC = () => {
  const { name, setName } = useCardStore();

  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <User className="w-4 h-4" />
        Display Name
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your display name"
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:bg-white/10 transition-all"
      />
    </div>
  );
};

export default NameInput;