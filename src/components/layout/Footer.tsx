import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 py-6 text-center text-white/40 text-sm">
      <div className="flex items-center justify-center gap-1">
        Made with <Heart className="w-3 h-3 text-red-400 fill-red-400" /> in Tanzania
      </div>
      <p className="mt-1">© 2026 Sura. Shape your words into art</p>
    </footer>
  );
};

export default Footer;