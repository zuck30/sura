import React from 'react';
import { AtSign } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const UsernameInput: React.FC = () => {
  const { username, setUsername } = useCardStore();

  return (
    <div className="space-y-2">
      <label className="text-white/80 text-sm font-medium flex items-center gap-2">
        <AtSign className="w-4 h-4" />
        Username
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">@</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.replace('@', ''))}
          placeholder="username"
          className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/30 focus:bg-white/10 transition-all"
        />
      </div>
    </div>
  );
};

export default UsernameInput;