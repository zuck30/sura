import React from 'react';
import { Sparkles, Moon, Sun, Globe, Languages } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';

const Header: React.FC = () => {
  const { language, setLanguage, rtlEnabled, setRtlEnabled } = useCardStore();

  return (
    <header className="glass sticky top-4 mx-4 lg:mx-8 z-50 backdrop-blur-xl bg-white/5 border border-white/20 rounded-2xl shadow-xl">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-white to-white/20 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-brand-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Sura<span className="text-white/70">.</span>
            </h1>
            <p className="text-xs text-white/50 hidden sm:block">Shape your words</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="glass px-3 py-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 text-sm"
          >
            <Glasses className="w-4 h-4" />
            {language === 'en' ? 'EN' : 'SW'}
          </button>

          {/* RTL Toggle */}
          <button
            onClick={() => setRtlEnabled(!rtlEnabled)}
            className={`glass px-3 py-2 rounded-xl transition-all flex items-center gap-2 text-sm ${
              rtlEnabled ? 'bg-white/20 text-white' : 'text-white/60 hover:text-white'
            }`}
          >
            <Languages className="w-4 h-4" />
            {rtlEnabled ? 'RTL' : 'LTR'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;