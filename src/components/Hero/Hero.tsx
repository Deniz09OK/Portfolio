import React from 'react';
import { Monitor, Mail, Scroll, BookOpen, MapPin, FileDown, Github, Linkedin } from 'lucide-react';

export const Hero = () => {
  return (
    <div id="about" className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558862107-d49ef2a04d72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <Monitor className="w-16 h-16 mx-auto md:mx-0 mb-6 text-red-600 animate-bounce" />
            <h1 className="hero-title text-5xl font-bold mb-4 text-gray-800 font-['Noto_Serif_JP']">Deniz OK</h1>
            <p className="hero-subtitle text-xl text-gray-600 mb-4">Assistant informaticien</p>
            <div className="flex justify-center md:justify-start space-x-4 mb-8">
              <a href="https://github.com/Deniz09OK" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                <Github className="w-6 h-6 icon-spin" />
              </a>
              <a href="https://www.linkedin.com/in/deniz-ok" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-red-600 transition-colors duration-300">
                <Linkedin className="w-6 h-6 icon-spin" />
              </a>
            </div>
            <div className="hero-buttons flex flex-wrap justify-center md:justify-start gap-4">
              <a href="mailto:deniz.ok@epitech.eu" className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                Contact
              </a>
              <a href="#Projets" className="border-2 border-red-600 text-red-600 px-6 py-3 rounded-lg hover:bg-red-50 transition-all duration-300 transform hover:scale-105 flex items-center">
                <Scroll className="w-5 h-5 mr-2 animate-bounce" />
                Projets
              </a>
              <button 
                onClick={() => window.open('https://drive.google.com/uc?export=download&id=1R7w66xBzH_ewoGBWFmrk_bSPk39jj6Sw', '_blank')}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 flex items-center shadow-md"
              >
                <FileDown className="w-5 h-5 mr-2" />
                Télécharger CV
              </button>
            </div>
          </div>
          <div className="space-y-6 bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <BookOpen className="w-6 h-6 mr-2 text-red-600" />
              À propos
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Étudiant à Epitech en alternance chez Qualitest en tant que Assistant informaticien Stack depuis février 2025. Passionné par les technologies, je développe mes compétences en développement logiciel, programmation et gestion de projets dans un environnement innovant et dynamique.
            </p>
            <div className="flex items-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2 text-red-600" />
              Jarville-la-Malgrange, France
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};            {/* The location is displayed in a row */}
