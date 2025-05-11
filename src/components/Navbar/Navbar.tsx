import React, { useState } from 'react';
import { Menu, X, GraduationCap, Briefcase, Settings, Heart, Code2, Languages, ChevronRight, User } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: 'about', name: 'À propos', icon: User },
    { id: 'education', name: 'Formation', icon: GraduationCap },
    { id: 'experience', name: 'Expérience', icon: Briefcase },
    { id: 'skills', name: 'Compétences', icon: Settings },
    { id: 'interests', name: 'Centres d\'intérêt', icon: Heart },
    { id: 'portfolio', name: 'Projets', icon: Code2 },
    { id: 'languages', name: 'Langues', icon: Languages },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 20;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed left-4 top-4 z-50 bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-red-600" />
        ) : (
          <Menu className="w-6 h-6 text-red-600 group-hover:rotate-180 transition-transform duration-300" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <nav
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="text-xl font-bold text-red-600 mb-8">Deniz OK</div>
          <div className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="w-full flex items-center p-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
              >
                <item.icon className="w-5 h-5 mr-3" />
                <span className="flex-1 text-left">{item.name}</span>
                <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};