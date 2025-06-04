import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      className="fixed top-16 right-4 z-50 p-3 rounded-full bg-white hover:bg-gray-100 transition-all duration-200 transform hover:scale-110 shadow-lg flex items-center space-x-2"
      aria-label="Toggle language"
    >
      <Languages className="w-5 h-5 text-red-600" />
      <span className="text-sm font-medium text-gray-700">{language.toUpperCase()}</span>
    </button>
  );
};