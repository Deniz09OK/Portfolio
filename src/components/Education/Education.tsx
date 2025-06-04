import { GraduationCap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Education = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="education" className="py-20 px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <GraduationCap className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.education}
        </h2>
        <div className="space-y-8">
          <div className="education-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.mscPro} ({t.currentlyInProgress})</h3>
            <p className="text-gray-600 mb-2">Epitech Nancy | 09/2024-09/2027</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t.activePedagogy}</li>
              <li>{t.virtualization} (Debian, OpenBSD, FreeBSD)</li>
              <li>{t.programming} (HTML, CSS, PHP, Python, Java, JavaScript)</li>
              <li>{t.frameworks} (Node.js, Express.js, React.js, Bootstrap, Tailwind CSS, Symfony)</li>
            </ul>
          </div>
          <div className="education-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.btsSnir}</h3>
            <p className="text-gray-600 mb-2">Charles de Foucauld, Nancy | 09/2020-07/2022</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t.programming} (C/C++, HTML, CSS, Python)</li>
              <li>{t.networkAdmin} (VLAN, LAN, Routeur, Commutateur, IPv4, Sous-réseaux)</li>
              <li>{t.virtualization} (Mageia)</li>
            </ul>
          </div>
          <div className="education-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.bacPro}</h3>
            <p className="text-gray-600 mb-2">Lycée Jean Prouvé, Nancy | 09/2017-07/2020</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t.networkAdmin} (VLAN, LAN, Routeur, Commutateur, IPv4, Sous-réseaux)</li>
              <li>{t.virtualization} (Debian)</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};