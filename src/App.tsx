import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar/Navbar';
import { Hero } from './components/Hero/Hero';
import { Education } from './components/Education/Education';
import { Experience } from './components/Experience/Experience';
import { Skills } from './components/Skills/Skills';
import { Interests } from './components/Interests/Interests';
import { Portfolio } from './components/Portfolio/Portfolio';
import { Languages } from './components/Languages/Languages';
import { Footer } from './components/Footer/Footer';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { Loader } from './components/Loader/Loader';
import { Section } from './components/Section';
import { LanguageToggle } from './components/LanguageToggle';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

// Theme toggling logic
const toggleTheme = () => {
  document.documentElement.classList.toggle('dark');
};

useEffect(() => {
  const timer = setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  return () => clearTimeout(timer);
}, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
          <button
            onClick={toggleTheme}
            className="fixed top-32 right-4 z-50 p-3 rounded-full bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 transform hover:scale-110 shadow-lg flex items-center space-x-2"
            aria-label="Toggle theme"
          >
            🌓
          </button>
          <Navbar />
          <LanguageToggle />
          <Hero />
          <Section id="education">
            <Education />
          </Section>
          <Section id="experience">
            <Experience />
          </Section>
          <Section id="skills">
            <Skills />
          </Section>
          <Section id="interests">
            <Interests />
          </Section>
          <Section id="portfolio">
            <Portfolio />
          </Section>
          <Section id="languages">
            <Languages />
          </Section>
          <Footer />
          <ScrollToTop />
        </div>
      )}
    </>
  );
}