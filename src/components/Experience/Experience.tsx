import { Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Experience = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="experience" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <Briefcase className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.experience}
        </h2>
        <div className="space-y-8">
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.itAssistant}</h3>
            <p className="text-gray-600 mb-2">Qualitest, Nancy · {language === 'fr' ? 'Contrat en alternance' : 'Apprenticeship'} | 02/2025-09/2027</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t.questionnaireDev}</li>
              <li>{t.toolCreation}</li>
              <li>{t.dbManagement}</li>
              <li>{t.teamCollaboration}</li>
            </ul>
          </div>
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.crewMember}</h3>
            <p className="text-gray-600 mb-2">Burger King, Vandoeuvre-lès-Nancy | 01/2024-03/2024</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t.tableService}</li>
              <li>{t.customerService}</li>
            </ul>
          </div>
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{t.volunteerTrainee}</h3>
            <p className="text-gray-600 mb-2">1er régiment du service militaire volontaire, Montigny-Lès-Metz | 03/2023-12/2023</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{t.skillsDevelopment}</li>
              <li>{t.variedMissions}</li>
              <li>{t.sstCertification}</li>
              <li>{t.meritMedal}</li>
            </ul>
          </div>
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{language === 'fr' ? 'Installation et mise en service d\'une salle informatique (Stage)' : 'Installation and setup of a computer room (Internship)'}</h3>
            <p className="text-gray-600 mb-2">Charles de Foucauld Nancy | 05/2021-07/2021</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{language === 'fr' ? 'Installation de nouveaux ordinateurs dans une salle informatique' : 'Installation of new computers in a computer room'}</li>
              <li>{language === 'fr' ? 'Création d\'adresses IP pour les étudiants en BTS' : 'Creation of IP addresses for BTS students'}</li>
            </ul>
          </div>
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{language === 'fr' ? 'Assistant en Maintenance et Déploiement Informatique (Stage)' : 'IT Maintenance and Deployment Assistant (Internship)'}</h3>
            <p className="text-gray-600 mb-2">Sciences Po, Nancy | 09/2019-10/2019</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{language === 'fr' ? 'Assistance informatique pour le personnel et les étudiants' : 'IT support for staff and students'}</li>
            </ul>
          </div>
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{language === 'fr' ? 'Assistant en Maintenance et Déploiement Informatique (Stage)' : 'IT Maintenance and Deployment Assistant (Internship)'}</h3>
            <p className="text-gray-600 mb-2">Lycée Henri Loritz, Nancy | 04/2019-05/2019</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{language === 'fr' ? 'Assistance informatique pour le personnel et les étudiants' : 'IT support for staff and students'}</li>
            </ul>
          </div>
          <div className="experience-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{language === 'fr' ? 'Assistant en Maintenance et Déploiement Informatique (Stage)' : 'IT Maintenance and Deployment Assistant (Internship)'}</h3>
            <p className="text-gray-600 mb-2">Lycée Henri Loritz, Nancy | 01/2019-02/2019</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>{language === 'fr' ? 'Assistance informatique pour le personnel et les étudiants' : 'IT support for staff and students'}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};