import { Languages as LanguagesIcon, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Languages = () => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  return (
    <section id="languages" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <LanguagesIcon className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.languages}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name:
                language === 'fr'
                  ? 'Français'
                  : language === 'en'
                  ? 'French'
                  : 'Fransızca',
              level:
                language === 'fr'
                  ? 'Langue maternelle'
                  : language === 'en'
                  ? 'Native language'
                  : 'Anadil'
            },
            {
              name:
                language === 'fr'
                  ? 'Turc'
                  : language === 'en'
                  ? 'Turkish'
                  : 'Türkçe',
              level:
                language === 'fr'
                  ? 'Langue maternelle'
                  : language === 'en'
                  ? 'Native language'
                  : 'Anadil'
            },
            {
              name:
                language === 'fr'
                  ? 'Anglais'
                  : language === 'en'
                  ? 'English'
                  : 'İngilizce',
              level: 'TOEIC 790/990'
            }
          ].map((lang, index) => (
            <div
              key={lang.name}
              className="language-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-red-600" />
                {lang.name}
              </h3>
              <p className="text-gray-600">{lang.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
