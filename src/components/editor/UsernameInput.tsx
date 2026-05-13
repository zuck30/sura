import React from 'react';
import { AtSign } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const UsernameInput: React.FC = () => {
  const { username, setUsername } = useCardStore();

  return (
    <div className="space-y-2">
      <label className="text-gray-700 text-sm font-medium flex items-center gap-2">
        <AtSign className="w-4 h-4" />
        Username
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">@</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value.replace('@', ''))}
          placeholder="username"
          className="w-full pl-7 pr-3 py-2 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-[#002966] focus:ring-1 focus:ring-[#002966] transition-all"
        />
      </div>
    </div>
  );
};

export default UsernameInput;