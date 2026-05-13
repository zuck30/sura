import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 text-center text-gray-400 text-sm border-t border-gray-100 mt-8">
      <p className="mt-1">© {currentYear} Sura.  Shape your words into art</p>
    </footer>
  );
};

export default Footer;