<template>
  <footer class="relative bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
    <!-- Motif de fond décoratif -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl"></div>
    </div>
    
    <div class="relative container mx-auto px-6 py-16">
      <!-- Grille principale -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        <!-- Section À propos -->
        <div class="space-y-6 animate-fade-in-up">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              D
            </div>
            <span class="font-serif text-2xl font-bold">Deniz OK</span>
          </div>
          <p class="text-gray-300 leading-relaxed">
            {{ currentLang === 'fr' 
              ? 'Étudiant passionné par le développement web et la cybersécurité.' 
              : currentLang === 'en' 
              ? 'Student passionate about web development and cybersecurity.'
              : 'Web geliştirme ve siber güvenlik tutkunu öğrenci.' }}
          </p>
          
          <!-- Stats rapides -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
              <div class="text-2xl font-bold text-blue-400">3+</div>
              <div class="text-xs text-gray-300">{{ currentLang === 'fr' ? 'Années' : currentLang === 'en' ? 'Years' : 'Yıl' }}</div>
            </div>
            <div class="bg-white/10 backdrop-blur-md rounded-lg p-3 border border-white/20">
              <div class="text-2xl font-bold text-blue-400">6+</div>
              <div class="text-xs text-gray-300">{{ currentLang === 'fr' ? 'Projets' : currentLang === 'en' ? 'Projects' : 'Proje' }}</div>
            </div>
          </div>
        </div>
        
        <!-- Navigation rapide -->
        <div class="space-y-6 animate-fade-in-up delay-100">
          <h3 class="text-xl font-bold">
            {{ currentLang === 'fr' ? 'Navigation' : currentLang === 'en' ? 'Navigation' : 'Gezinme' }}
          </h3>
          <ul class="space-y-3">
            <li v-for="item in navLinks" :key="item.id">
              <a :href="`#${item.id}`"
                 @click.prevent="scrollToSection(item.id)"
                 class="text-gray-300 hover:text-blue-400 transition-colors">
                <span>{{ t.nav[item.key] }}</span>
              </a>
            </li>
          </ul>
        </div>
        
        <!-- Contact -->
        <div class="space-y-6 animate-fade-in-up delay-200">
          <h3 class="text-xl font-bold">
            Contact
          </h3>
          <ul class="space-y-4">
            <li>
              <a href="mailto:deniz.ok@epitech.eu" 
                 class="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition-all group">
                <div class="p-2 bg-white/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                </div>
                <span class="text-sm">deniz.ok@epitech.eu</span>
              </a>
            </li>
            <li>
              <div class="flex items-center gap-3 text-gray-300">
                <div class="p-2 bg-white/10 rounded-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <span class="text-sm">Jarville-la-Malgrange, France</span>
              </div>
            </li>
          </ul>
          
          <!-- Bouton CV -->
          <button @click="downloadCV"
                  class="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            <span>{{ currentLang === 'fr' ? 'Télécharger CV' : currentLang === 'en' ? 'Download CV' : 'CV İndir' }}</span>
          </button>
        </div>
        
        <!-- Réseaux sociaux -->
        <div class="space-y-6 animate-fade-in-up delay-300">
          <h3 class="text-xl font-bold">
            {{ currentLang === 'fr' ? 'Réseaux' : currentLang === 'en' ? 'Social' : 'Sosyal' }}
          </h3>
          <div class="flex flex-wrap gap-3">
            <a href="https://github.com/Deniz09OK"
               target="_blank"
               rel="noopener noreferrer"
               title="GitHub"
               class="group relative p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all transform hover:scale-110 border border-white/20">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                GitHub
              </span>
            </a>
            <a href="https://www.linkedin.com/in/deniz-ok"
               target="_blank"
               rel="noopener noreferrer"
               title="LinkedIn"
               class="group relative p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all transform hover:scale-110 border border-white/20">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span class="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Séparateur -->
      <div class="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8"></div>
      
      <!-- Bas de page -->
      <div class="flex flex-col items-center justify-center gap-6">
        <p class="text-gray-400 text-sm text-center">
          © {{ currentYear }} Deniz OK. 
          {{ currentLang === 'fr' 
            ? 'Tous droits réservés. Fait avec le cœur' 
            : currentLang === 'en' 
            ? 'All rights reserved. Made with love'
            : 'Tüm hakları saklıdır. Sevgiyle yapıldı' }}
        </p>
        
        <!-- Langues disponibles -->
        <div class="flex gap-2">
          <button v-for="lang in languages" 
                  :key="lang.code"
                  @click="changeLang(lang.code)"
                  class="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                  :class="currentLang === lang.code 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'">
            {{ lang.code.toUpperCase() }}
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { currentLanguage, setLanguage } = useLanguage()
const { t } = useTranslations()
const currentLang = computed(() => currentLanguage.value)

const currentYear = new Date().getFullYear()

// Navigation links
const navLinks = [
  { id: 'about', key: 'about' },
  { id: 'education', key: 'education' },
  { id: 'experience', key: 'experience' },
  { id: 'skills', key: 'skills' },
  { id: 'interests', key: 'interests' },
  { id: 'portfolio', key: 'portfolio' },
  { id: 'languages', key: 'languages' }
]

// Réseaux sociaux (non utilisés maintenant car remplacés par des SVG directs)
const socials = [
  { name: 'GitHub', url: 'https://github.com/Deniz09OK' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/deniz-ok' },
]

// Langues
const languages = [
  { code: 'fr' },
  { code: 'en' },
  { code: 'tr' }
]

// Fonctions
const scrollToSection = (id) => {
  if (process.client) {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

const changeLang = (lang) => {
  setLanguage(lang)
}

const downloadCV = () => {
  if (process.client) {
    const cvUrls = {
      fr: 'https://drive.google.com/uc?export=download&id=1vQ8PkOMx0fr-YoGacFOwWDQnWMThKFS2',
      en: 'https://drive.google.com/uc?export=download&id=1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n',
      tr: 'https://drive.google.com/uc?export=download&id=1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n'
    }
    window.open(cvUrls[currentLang.value] || cvUrls.fr, '_blank')
  }
}
</script>