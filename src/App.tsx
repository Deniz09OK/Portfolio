import React, { useState, useEffect } from 'react';
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

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
          <Navbar />
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