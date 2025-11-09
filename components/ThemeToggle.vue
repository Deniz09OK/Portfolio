<template>
  <button @click="toggleTheme"
          class="fixed bottom-24 right-6 sm:bottom-24 sm:right-6 z-40 p-3 sm:p-4 rounded-full bg-white dark:bg-gray-800 shadow-2xl hover:shadow-blue-500/50 dark:hover:shadow-blue-400/50 transition-all duration-300 transform hover:scale-110 group border-2 border-blue-200 dark:border-blue-800"
          aria-label="Toggle theme">
    <div class="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
      <!-- Soleil -->
      <svg class="absolute inset-0 w-full h-full text-yellow-500 transition-all duration-500 transform"
           :class="isDark ? 'rotate-180 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
      </svg>
      <!-- Lune -->
      <svg class="absolute inset-0 w-full h-full text-blue-400 transition-all duration-500 transform"
           :class="isDark ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-0 opacity-0'"
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
      </svg>
    </div>
    
    <!-- Tooltip -->
    <span class="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      {{ isDark ? (currentLang === 'fr' ? 'Mode clair' : currentLang === 'en' ? 'Light mode' : 'Açık mod') : (currentLang === 'fr' ? 'Mode sombre' : currentLang === 'en' ? 'Dark mode' : 'Karanlık mod') }}
    </span>
  </button>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const currentLang = computed(() => currentLanguage.value)

const isDark = ref(false)

const toggleTheme = () => {
  if (process.client) {
    // Désactiver temporairement les transitions pour éviter la latence
    document.documentElement.classList.add('theme-transitioning')
    
    // Changer le thème
    document.documentElement.classList.toggle('dark')
    isDark.value = document.documentElement.classList.contains('dark')
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    
    // Réactiver les transitions après un court délai
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning')
    }, 50)
  }
}

onMounted(() => {
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    isDark.value = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    }
  }
})
</script>
