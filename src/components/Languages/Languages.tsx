import React from 'react';
import { Languages as LanguagesIcon, Globe } from 'lucide-react';

export const Languages = () => {
  return (
    <section id="languages" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <LanguagesIcon className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          Langues
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Français', level: 'Langue maternelle' },
            { name: 'Turc', level: 'Langue maternelle' },
            { name: 'Anglais', level: 'TOEIC 790/990' }
          ].map((language, index) => (
            <div 
              key={language.name}
              className="language-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-red-600" />
                {language.name}
              </h3>
              <p className="text-gray-600">{language.level}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};