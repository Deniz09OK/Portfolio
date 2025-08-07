import { Monitor, Mail, Scroll, BookOpen, MapPin, FileDown, Github, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const handleCVDownload = () => {
    const cvUrl = language === 'fr' 
      ? 'https://drive.google.com/uc?export=download&id=1vQ8PkOMx0fr-YoGacFOwWDQnWMThKFS2'
      : 'https://drive.google.com/uc?export=download&id=1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n';
    window.open(cvUrl, '_blank');
  };

  return (
    <div id="about" className="relative min-h-screen flex items-center justify-center">
      {/*
        L'image de fond est légèrement visible en mode clair (opacity-10) et davantage assombrie en mode sombre pour créer un contraste suffisant.
      */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558862107-d49ef2a04d72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10 dark:opacity-40"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <Monitor className="w-16 h-16 mx-auto md:mx-0 mb-6 text-red-600 animate-bounce" />
            <h1 className="hero-title text-5xl font-bold mb-4 text-gray-800 dark:text-white font-['Noto_Serif_JP']">Deniz OK</h1>
            <p className="hero-subtitle text-xl text-gray-600 dark:text-gray-300 mb-4">{t.jobTitle}</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              <a href="https://github.com/Deniz09OK" target="_blank" rel="noopener noreferrer" title="GitHub Profile" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
                <Github className="w-6 h-6 icon-spin" />
              </a>
              <a href="https://www.linkedin.com/in/deniz-ok" target="_blank" rel="noopener noreferrer" title="LinkedIn Profile" className="text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-300">
                <Linkedin className="w-6 h-6 icon-spin" />
              </a>
            </div>
            <div className="hero-buttons flex flex-wrap justify-center md:justify-start gap-4">
              <a href="mailto:deniz.ok@epitech.eu" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-300 transform hover:scale-105 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                {t.contact}
              </a>
              <a href="#portfolio" className="border-2 border-red-600 text-red-600 dark:text-red-400 px-6 py-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900 transition-all duration-300 transform hover:scale-105 flex items-center">
                <Scroll className="w-5 h-5 mr-2 animate-bounce" />
                {t.portfolio}
              </a>
              <button
                onClick={handleCVDownload}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 dark:hover:from-red-700 dark:hover:to-red-800 transition-all duration-300 transform hover:scale-105 flex items-center shadow-md"
              >
                <FileDown className="w-5 h-5 mr-2" />
                {t.downloadCV}
              </button>
            </div>
          </div>
          <div className="space-y-6 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-red-600" />
              {t.about}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.aboutMe}
            </p>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Jarville-la-Malgrange, France
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};