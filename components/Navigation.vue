<template>
  <div>
    <!-- Bouton de menu -->
    <button
      @click="isOpen = !isOpen"
      class="fixed left-4 top-4 z-50 bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg dark:shadow-md hover:shadow-xl transition-all duration-300 group"
      aria-label="Toggle menu"
    >
      <svg v-if="isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
      <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
      </svg>
    </button>

    <!-- Overlay -->
    <div
      v-if="isOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      @click="isOpen = false"
    />

    <!-- Menu de navigation -->
    <nav
      :class="[
        'fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <div class="p-6">
        <NuxtLink to="/" class="text-xl font-bold text-primary-blue dark:text-accent-blue mb-8 block" @click="isOpen = false">Deniz OK</NuxtLink>
        <div class="space-y-2">
          <!-- Scroll-based menu items -->
          <button
            v-for="item in scrollMenuItems"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="w-full flex items-center p-3 text-gray-600 dark:text-gray-300 hover:text-primary-blue dark:hover:text-accent-blue hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors group"
          >
            <span class="flex-1 text-left">{{ item.name }}</span>
            <span class="opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all">→</span>
          </button>
          
          <!-- Link-based menu items (Blog) removed -->
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()
const isOpen = ref(false)

const scrollMenuItems = computed(() => [
  { id: 'about', name: t.value.nav.about },
  { id: 'education', name: t.value.nav.education },
  { id: 'experience', name: t.value.nav.experience },
  { id: 'skills', name: t.value.nav.skills },
  { id: 'interests', name: t.value.nav.interests },
  { id: 'portfolio', name: t.value.nav.portfolio },
  { id: 'languages', name: t.value.nav.languages },
])

const scrollToSection = (id) => {
  if (process.client) {
    // Navigate to home first if not there
    const router = useRouter()
    const route = useRoute()
    
    if (route.path !== '/') {
      router.push('/').then(() => {
        setTimeout(() => scrollToElement(id), 100)
      })
    } else {
      scrollToElement(id)
    }
    isOpen.value = false
  }
}

const scrollToElement = (id) => {
  const element = document.getElementById(id)
  if (element) {
    const offset = 20
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}
</script>