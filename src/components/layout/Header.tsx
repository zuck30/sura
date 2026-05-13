import React from 'react';
import { Globe, Languages } from 'lucide-react';
import { useCardStore } from '../../stores/cardStore';
import suraLogo from '../../logo/sura.png';

const Header: React.FC = () => {
  const { language, setLanguage, rtlEnabled, setRtlEnabled } = useCardStore();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img 
            src={suraLogo} 
            alt="Sura Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-[#002966] tracking-tight">
              Sura<span className="text-gray-400">.</span>
            </h1>
            <p className="text-xs text-gray-400 hidden sm:block">Shape your words</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLanguage(language === 'en' ? 'sw' : 'en')}
            className="px-3 py-2 rounded-lg text-gray-600 hover:text-[#002966] hover:bg-gray-50 transition-all flex items-center gap-2 text-sm"
          >
            <Globe className="w-4 h-4" />
            {language === 'en' ? 'EN' : 'SW'}
          </button>

          <button
            onClick={() => setRtlEnabled(!rtlEnabled)}
            className={`px-3 py-2 rounded-lg transition-all flex items-center gap-2 text-sm ${
              rtlEnabled ? 'bg-[#002966]/10 text-[#002966]' : 'text-gray-600 hover:text-[#002966]'
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