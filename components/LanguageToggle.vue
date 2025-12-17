<template>
  <div class="fixed bottom-40 right-6 z-40">
    <button @click="toggleMenu"
            class="p-4 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 transform hover:scale-110 group border-2 border-blue-200 dark:border-blue-800"
            aria-label="Change language">
      <div class="relative w-6 h-6 flex items-center justify-center">
        <span class="text-xl">{{ getFlagEmoji(currentLang) }}</span>
      </div>
      
      <!-- Tooltip -->
      <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {{ currentLang === 'fr' ? 'Langue' : currentLang === 'en' ? 'Language' : 'Dil' }}
      </span>
    </button>
    
    <!-- Menu des langues -->
    <Transition name="lang-menu">
      <div v-if="showMenu" 
           class="absolute bottom-full right-0 mb-3 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-blue-200 dark:border-blue-800 overflow-hidden min-w-[160px]">
        <button v-for="lang in languages" 
                :key="lang.code"
                @click="changeLang(lang.code)"
                class="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300"
                :class="{ 'bg-blue-50 dark:bg-blue-900/30': currentLang === lang.code }">
          <span class="text-2xl">{{ lang.flag }}</span>
          <span class="font-medium text-gray-700 dark:text-gray-300 text-sm">{{ lang.name }}</span>
          <span v-if="currentLang === lang.code" 
                class="text-blue-600 dark:text-blue-400 ml-auto">✓</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
const { currentLanguage, setLanguage } = useLanguage()
const currentLang = computed(() => currentLanguage.value)

const showMenu = ref(false)

const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' }
]

const getFlagEmoji = (lang) => {
  const langMap = { fr: '🇫🇷', en: '🇬🇧', tr: '🇹🇷' }
  return langMap[lang] || '🇫🇷'
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const changeLang = (lang) => {
  setLanguage(lang)
  showMenu.value = false
}

// Fermer le menu au clic extérieur
const handleClickOutside = (event) => {
  if (process.client && !event.target.closest('.fixed')) {
    showMenu.value = false
  }
}

onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>
