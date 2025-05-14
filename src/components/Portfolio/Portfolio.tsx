import React, { useState } from 'react';
import { Code2, Github, Lock, X } from 'lucide-react';
import { projectsData } from '../../data/projectsData';

export const Portfolio = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="portfolio" className="py-20 px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 flex items-center justify-center">
          <Code2 className="w-8 h-8 mr-3 text-red-600 icon-spin" />
          Projets
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
                    Votre navigateur ne supporte pas la lecture de vidéos.
                  </video>
                ) : (
                  <div className="relative">
                    <img 
                      src={project.media.src}
                      alt={project.media.alt}
                      className={`w-full h-48 rounded-lg mb-4 border border-gray-200 ${
                        ['Popeye', 'Portfolio', 'CultureQuiz'].includes(project.name)
                          ? 'object-cover'
                          : 'object-contain'
                      } ${
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
                {project.name === 'NSA (Network Security Administration)' && (
                  <p className="text-sm text-gray-500 text-center italic">
                    Cliquez sur l'image pour l'agrandir
                  </p>
                )}
              </div>
              <p className="text-gray-600">
                {project.description}
              </p>
              {project.link !== '#' && (
                <a 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-4 text-red-600 hover:text-red-700"
                >
                  <Github className="w-4 h-4 mr-2" />
                  Voir sur GitHub
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal pour l'image agrandie */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
            onClick={() => setSelectedImage(null)}
            title="Fermer la vue agrandie"
            aria-label="Fermer la vue agrandie"
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