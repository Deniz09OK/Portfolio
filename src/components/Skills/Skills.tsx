import { Settings } from 'lucide-react';
import { skillsData } from '../../data/skillsData';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const getLocalizedSkillName = (name: string): string => {
    const translations: { [key: string]: { fr: string; en: string } } = {
      'IT Project Management': {
        fr: 'Gestion de projet informatique',
        en: 'IT Project Management'
      },
      'Software Development': {
        fr: 'Développement logiciel',
        en: 'Software Development'
      },
      'Object-Oriented Programming': {
        fr: 'Programmation orientée objet',
        en: 'Object-Oriented Programming'
      },
      'Technical Documentation': {
        fr: 'Documentation technique',
        en: 'Technical Documentation'
      },
      'Teamwork': {
        fr: 'Travail d\'équipe',
        en: 'Teamwork'
      },
      'Agile/Scrum Methodology': {
        fr: 'Méthodologie Agile/Scrum',
        en: 'Agile/Scrum Methodology'
      },
      'Requirements Analysis': {
        fr: 'Analyse des besoins',
        en: 'Requirements Analysis'
      },
      'Testing and Validation': {
        fr: 'Tests et validation',
        en: 'Testing and Validation'
      },
      'Technical Communication': {
        fr: 'Communication technique',
        en: 'Technical Communication'
      },
      'Technical Support': {
        fr: 'Support technique',
        en: 'Technical Support'
      },
      'Configuration routeurs': {
        fr: 'Configuration routeurs',
        en: 'Router Configuration'
      },
      'Configuration switches': {
        fr: 'Configuration switches',
        en: 'Switch Configuration'
      }
    };

    return translations[name] ? translations[name][language] : name;
  };

  const getLocalizedCategory = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'Operating Systems': 'Systèmes d\'exploitation',
      'Programming Languages': 'Langages de programmation',
      'Frameworks & Tools': 'Frameworks & Outils',
      'Databases': 'Bases de données',
      'Networks': 'Réseaux',
      'Methodologies & Management': 'Méthodologies & Gestion',
      'Troubleshooting': 'Dépannage'
    };
    return language === 'fr' ? categoryMap[category] || category : category;
  };

  return (
    <section id="skills" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <Settings className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.skills}
        </h2>
        
        <div className="bg-white p-6 rounded-lg shadow-lg space-y-8">
          {Object.entries(skillsData).map(([category, { icon: Icon, skills }]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-gray-700 flex items-center">
                <Icon className="w-5 h-5 mr-2 text-red-600" />
                {getLocalizedCategory(category)}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.wikiLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-card bg-white px-4 py-3 rounded-lg text-sm text-gray-600 text-center shadow-sm hover:bg-red-50 hover:text-red-600 transition-all duration-300 flex flex-col items-center justify-center space-y-2"
                  >
                    <skill.icon className="w-6 h-6 text-red-600" />
                    <span>{getLocalizedSkillName(skill.name)}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};