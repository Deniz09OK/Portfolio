<template>
  <section id="about" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <!-- Gradient animé en arrière-plan -->
    <div class="absolute inset-0 animate-gradient bg-gradient-to-br from-blue-400 via-blue-600 to-indigo-800 opacity-90"></div>
    
    <!-- Particules flottantes -->
    <div class="absolute inset-0 overflow-hidden">
      <div v-for="i in 20" :key="i" 
           class="particle absolute w-2 h-2 bg-white rounded-full opacity-30"
           :style="getParticleStyle(i)">
      </div>
    </div>
    
    <!-- Formes décoratives -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-200"></div>
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float delay-400"></div>
    
    <!-- Contenu principal -->
    <div class="relative z-10 container mx-auto px-6 py-20">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        
        <!-- Partie gauche : Texte et boutons -->
        <div 
          class="text-white space-y-8"
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :delay="200"
          :duration="800"
        >
          <!-- Titre avec effet -->
          <div>
            <h1 class="text-5xl md:text-7xl font-bold mb-4 font-serif">
              {{ t.hero.title }}
            </h1>
            <div class="h-1 w-24 bg-gradient-to-r from-white to-blue-300 rounded-full mb-6"></div>
            <p class="text-2xl md:text-3xl font-light text-blue-100">
              {{ t.hero.subtitle }}
            </p>
          </div>
          
          <!-- Description -->
          <p class="text-lg text-blue-50 leading-relaxed max-w-xl">
            {{ t.hero.description }}
          </p>
          
          <!-- Badges de localisation et email -->
          <div class="flex flex-wrap gap-4">
            <div class="glass-premium rounded-lg px-4 py-2">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                <span class="text-sm">Jarville-la-Malgrange, France</span>
              </div>
            </div>
            <a href="mailto:deniz.ok@epitech.eu" 
               class="glass-premium rounded-lg px-4 py-2 hover:bg-white/20 transition-all">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span class="text-sm">deniz.ok@epitech.eu</span>
              </div>
            </a>
          </div>
          
          <!-- Boutons d'action -->
          <div class="flex flex-wrap gap-4">
            <a href="mailto:deniz.ok@epitech.eu" 
               class="group relative inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-2xl">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>{{ t.hero.contact }}</span>
            </a>
            
            <a href="#portfolio" 
               class="group relative inline-flex items-center gap-2 glass-premium text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all transform hover:scale-105">
              <svg class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
              </svg>
              <span>{{ t.hero.viewPortfolio }}</span>
            </a>
            
            <button @click="downloadCV" 
                    class="group relative inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl">
              <svg class="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
              </svg>
              <span>{{ t.hero.downloadCV }}</span>
            </button>
          </div>
          
          <!-- Liens sociaux -->
          <div class="flex gap-4">
            <a href="https://github.com/Deniz09OK" 
               target="_blank"
               class="w-12 h-12 flex items-center justify-center glass-premium rounded-full hover:bg-white hover:text-blue-600 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/deniz-ok" 
               target="_blank"
               class="w-12 h-12 flex items-center justify-center glass-premium rounded-full hover:bg-white hover:text-blue-600 transition-all">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Partie droite : Illustration / Photo -->
        <div 
          class="relative"
          v-motion
          :initial="{ opacity: 0, x: 100 }"
          :enter="{ opacity: 1, x: 0, scale: 1 }"
          :delay="400"
          :duration="800"
        >
          <!-- Carte avec effet glassmorphism -->
          <div class="relative glass-premium rounded-3xl p-8">
            <!-- Image de profil ou illustration -->
            <div class="relative w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-blue-400 to-indigo-600">
              <!-- Photo de profil -->
              <NuxtImg 
                src="/deniz.jpg" 
                alt="Deniz OK" 
                class="absolute inset-0 w-full h-full object-cover"
                format="webp" 
              />
              <!-- Overlay avec effet -->
              <div class="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
            </div>
            
            <!-- Stats cards -->
            <div class="grid grid-cols-3 gap-2 sm:gap-4">
              <div class="glass-premium rounded-xl p-2 sm:p-4 text-center">
                <div class="text-xl sm:text-3xl font-bold text-white mb-1">3+</div>
                <div class="text-[9px] sm:text-xs text-blue-100 leading-tight px-1">{{ currentLang === 'fr' ? 'Ans d\'études' : currentLang === 'en' ? 'Years' : 'Yıl' }}</div>
              </div>
              <div class="glass-premium rounded-xl p-2 sm:p-4 text-center">
                <div class="text-xl sm:text-3xl font-bold text-white mb-1">6+</div>
                <div class="text-[9px] sm:text-xs text-blue-100 leading-tight px-1">{{ currentLang === 'fr' ? 'Projets' : currentLang === 'en' ? 'Projects' : 'Proje' }}</div>
              </div>
              <div class="glass-premium rounded-xl p-2 sm:p-4 text-center">
                <div class="text-xl sm:text-3xl font-bold text-white mb-1">10+</div>
                <div class="text-[9px] sm:text-xs text-blue-100 leading-tight px-1 break-words hyphens-auto" :lang="currentLang">{{ currentLang === 'fr' ? 'Compé­tences' : currentLang === 'en' ? 'Skills' : 'Beceri' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()
const currentLang = computed(() => currentLanguage.value)

// Génération de styles pour les particules
const getParticleStyle = (index) => {
  const size = Math.random() * 4 + 2
  const duration = Math.random() * 20 + 15
  const delay = Math.random() * 5
  const left = Math.random() * 100
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`
  }
}

// Fonction de téléchargement du CV
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