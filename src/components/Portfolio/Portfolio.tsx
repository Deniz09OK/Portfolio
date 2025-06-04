import { useState } from 'react';
import { Code2, Github, Lock, X } from 'lucide-react';
import { projectsData } from '../../data/projectsData';
import { useLanguage } from '../../context/LanguageContext';
import { translations } from '../../translations/translations';

export const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { language } = useLanguage();
  const t = translations[language];

  const getProjectDescription = (name: string) => {
    if (name === 'NSA (Network Security Administration)') {
      return language === 'fr' 
        ? projectsData.find(p => p.name === name)?.description 
        : t.projectDescriptions.nsa;
    }
    const key = name.toLowerCase().replace(/[^a-z]/g, '');
    return language === 'fr' 
      ? projectsData.find(p => p.name === name)?.description 
      : t.projectDescriptions[key as keyof typeof t.projectDescriptions];
  };

  const getImageCaption = () => {
    return language === 'fr' ? 'Cliquez sur l\'image pour l\'agrandir' : 'Click on the image to enlarge';
  };

  return (
    <section id="portfolio" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <Code2 className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          {t.portfolio}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projectsData.map((project) => (
            <div 
              key={project.name}
              className="project-card bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <h3 className="font-bold text-xl mb-4 flex items-center text-gray-800">
                {project.link === '#' ? (
                  <Lock className="w-5 h-5 mr-2 text-red-600" />
                ) : (
                  <Github className="w-5 h-5 mr-2 text-red-600" />
                )}
                {project.name}
              </h3>
              <div className="mb-4">
                {project.media.type === 'video' ? (
                  <video 
                    className="w-full h-48 object-cover rounded-lg mb-4 border border-gray-200"
                    controls
                    preload="metadata"
                  >
                    <source src={project.media.src} type="video/mp4" />
                    {language === 'fr' ? 
                      'Votre navigateur ne supporte pas la lecture de vidéos.' :
                      'Your browser does not support video playback.'}
                  </video>
                ) : (
                  <div className="relative flex justify-center items-center">
                    <img 
                      src={project.media.src}
                      alt={project.media.alt}
                      className={`w-full h-48 object-cover rounded-lg mb-4 border border-gray-200 ${
                        project.name.includes('NSA') ? 'cursor-zoom-in hover:opacity-90' : ''
                      }`}
                      onClick={() => {
                        if (project.name.includes('NSA')) {
                          setSelectedImage(project.media.src);
                        }
                      }}
                    />
                  </div>
                )}
                {project.name.includes('NSA') && (
                  <p className="text-sm text-gray-500 text-center italic">
                    {getImageCaption()}
                  </p>
                )}
              </div>
              <p className="text-gray-600">
                {getProjectDescription(project.name)}
              </p>
              {project.link !== '#' && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-red-600 hover:text-red-700"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t.viewOnGithub}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            onClick={() => setSelectedImage(null)}
            title={language === 'fr' ? 'Fermer' : 'Close'}
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Vue agrandie"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};