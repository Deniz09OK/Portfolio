<template>
  <Transition name="fade-scale">
    <button v-if="showButton"
            @click="scrollToTop"
            class="fixed bottom-6 right-6 sm:right-6 z-40 p-3 sm:p-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-110 group"
            aria-label="Scroll to top">
      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
      
      <!-- Cercle de progression -->
      <svg class="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
        <circle cx="50%" 
                cy="50%" 
                r="45%" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                stroke-width="2" />
        <circle cx="50%" 
                cy="50%" 
                r="45%" 
                fill="none" 
                stroke="white" 
                stroke-width="2"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
                class="transition-all duration-300" />
      </svg>
      
      <!-- Tooltip -->
      <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {{ currentLang === 'fr' ? 'Retour en haut' : currentLang === 'en' ? 'Back to top' : 'Yukarı dön' }}
      </span>
    </button>
  </Transition>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const currentLang = computed(() => currentLanguage.value)

const showButton = ref(false)
const scrollProgress = ref(0)

// Constantes pour le cercle de progression
const radius = 45 // Pourcentage
const circumference = computed(() => 2 * Math.PI * radius)
const dashOffset = computed(() => {
  return circumference.value - (scrollProgress.value / 100) * circumference.value
})

// Gestion du scroll
const handleScroll = () => {
  if (process.client) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    showButton.value = scrollTop > 300
    
    // Calcul de la progression
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    scrollProgress.value = (scrollTop / windowHeight) * 100
  }
}

// Fonction de scroll vers le haut
const scrollToTop = () => {
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}

// Lifecycle
onMounted(() => {
  if (process.client) {
    window.addEventListener('scroll', handleScroll)
    handleScroll()
  }
})

onUnmounted(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>
