import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// Remove local Language type and import from context
import type { Language } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const order: Language[] = ['fr', 'en', 'tr'];

  const handleClick = () => {
    const idx = order.indexOf(language);
    const next = order[(idx + 1) % order.length];
    setLanguage(next);
  };

  return (
    <button
      onClick={handleClick}
      className="fixed top-16 right-4 z-50 p-3 rounded-full bg-white hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 shadow-lg flex items-center space-x-2"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5 text-red-600" />
      <span className="text-sm font-medium text-gray-700">
        {language.toUpperCase()}
      </span>
    </button>
  );
};
