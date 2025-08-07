import { Settings } from 'lucide-react';
import { skillsData } from '../../data/skillsData';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Skills = () => {
  const { language } = useLanguage();
  const t = translations[language as keyof typeof translations];

  // Traduction des libellés de compétences. 
  // Pour toute entrée absente de ce dictionnaire, le nom d’origine sera utilisé.
  const getLocalizedSkillName = (name: string): string => {
    const translationsMap: {
      [key: string]: { fr: string; en: string; tr: string };
    } = {
      'IT Project Management': {
        fr: 'Gestion de projet informatique',
        en: 'IT Project Management',
        tr: 'BT Proje Yönetimi'
      },
      'Software Development': {
        fr: 'Développement logiciel',
        en: 'Software Development',
        tr: 'Yazılım Geliştirme'
      },
      'Object-Oriented Programming': {
        fr: 'Programmation orientée objet',
        en: 'Object-Oriented Programming',
        tr: 'Nesne Yönelimli Programlama'
      },
      'Technical Documentation': {
        fr: 'Documentation technique',
        en: 'Technical Documentation',
        tr: 'Teknik Dokümantasyon'
      },
      'Teamwork': {
        fr: 'Travail d’équipe',
        en: 'Teamwork',
        tr: 'Takım Çalışması'
      },
      'Agile/Scrum Methodology': {
        fr: 'Méthodologie Agile/Scrum',
        en: 'Agile/Scrum Methodology',
        tr: 'Çevik/Scrum Metodolojisi'
      },
      'Requirements Analysis': {
        fr: 'Analyse des besoins',
        en: 'Requirements Analysis',
        tr: 'Gereksinim Analizi'
      },
      'Testing and Validation': {
        fr: 'Tests et validation',
        en: 'Testing and Validation',
        tr: 'Test ve Doğrulama'
      },
      'Technical Communication': {
        fr: 'Communication technique',
        en: 'Technical Communication',
        tr: 'Teknik İletişim'
      },
      'Technical Support': {
        fr: 'Support technique',
        en: 'Technical Support',
        tr: 'Teknik Destek'
      },
      'Configuration routeurs': {
        fr: 'Configuration routeurs',
        en: 'Router Configuration',
        tr: 'Yönlendirici Konfigürasyonu'
      },
      'Configuration switches': {
        fr: 'Configuration switches',
        en: 'Switch Configuration',
        tr: 'Anahtar Konfigürasyonu'
      },
      // exemples de traductions supplémentaires
      'Git/GitHub': {
        fr: 'Git/GitHub',
        en: 'Git/GitHub',
        tr: 'Git ve GitHub'
      },
      'Cisco Packet Tracer': {
        fr: 'Cisco Packet Tracer',
        en: 'Cisco Packet Tracer',
        tr: 'Cisco Paket Tracer'
      },
      'VirtualBox': {
        fr: 'VirtualBox',
        en: 'VirtualBox',
        tr: 'VirtualBox'
      }
    };

    const translation = translationsMap[name];
    return translation ? translation[language as 'fr' | 'en' | 'tr'] || name : name;
  };

  // Traductions des catégories. Ajout d’un dictionnaire pour le turc.
  const getLocalizedCategory = (category: string) => {
    const frMap: { [key: string]: string } = {
      'Operating Systems': 'Systèmes d’exploitation',
      'Programming Languages': 'Langages de programmation',
      'Frameworks & Tools': 'Frameworks & Outils',
      'Databases': 'Bases de données',
      'Networks': 'Réseaux',
      'Methodologies & Management': 'Méthodologies & Gestion',
      'Troubleshooting': 'Dépannage'
    };
    const trMap: { [key: string]: string } = {
      'Operating Systems': 'İşletim Sistemleri',
      'Programming Languages': 'Programlama Dilleri',
      'Frameworks & Tools': 'Çerçeveler ve Araçlar',
      'Databases': 'Veritabanları',
      'Networks': 'Ağlar',
      'Methodologies & Management': 'Metodolojiler ve Yönetim',
      'Troubleshooting': 'Sorun Giderme'
    };

    if (language === 'fr') return frMap[category] || category;
    if (language === 'tr') return trMap[category] || category;
    return category; // anglais par défaut
  };

  return (
    <section id="skills" className="py-20 px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 flex items-center justify-center">
          <Settings className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.skills}
        </h2>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-8">
          {Object.entries(skillsData).map(([category, { icon: Icon, skills }]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-gray-700 dark:text-gray-200 flex items-center">
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
                    className="skill-card bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-sm text-gray-600 dark:text-gray-300 text-center shadow-sm hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-all duration-300 flex flex-col items-center justify-center space-y-2"
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
