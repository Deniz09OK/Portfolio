import React from 'react';
import { Github, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex justify-center space-x-6 mb-8">
          <a href="https://github.com/Deniz09OK" className="hover:text-red-400 transition duration-300">
            <Github className="w-6 h-6 icon-spin" />
          </a>
          <a href="https://www.linkedin.com/in/deniz-ok" className="hover:text-red-400 transition duration-300">
            <Linkedin className="w-6 h-6 icon-spin" />
          </a>
        </div>
        <p className="text-center text-gray-400">© 2025 Deniz OK</p>
      </div>
    </footer>
  );
};