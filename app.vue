<template>
  <div>
    <NuxtLayout>
      <div class="min-h-screen bg-blue-50 dark:bg-gray-900 relative transition-colors duration-300">

        <!-- Navigation -->
        <Navigation />
        
        <!-- Theme Toggle -->
        <ThemeToggle />
        
        <!-- Language Toggle -->
        <LanguageToggle />

        <!-- Page Content -->
        <NuxtPage />

        <!-- Footer -->
        <Footer />

        <!-- Scroll to Top -->
        <ScrollToTop />

        <!-- Terminal -->
        <ClientOnly>
          <Terminal />
        </ClientOnly>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
// SEO Meta Tags
useSeoMeta({
  title: 'Portfolio Deniz OK - Développeur Full Stack',
  ogTitle: 'Portfolio Deniz OK - Développeur Full Stack',
  description: 'Portfolio de Deniz OK, développeur Full Stack passionné. Découvrez mes projets, compétences et parcours.',
  ogDescription: 'Portfolio de Deniz OK, développeur Full Stack passionné. Découvrez mes projets, compétences et parcours.',
  ogImage: '/og-image.png',
  twitterCard: 'summary_large_image',
})

// Initialize language immediately
const { initLanguage } = useLanguage()

// Initialize on mount
onMounted(() => {
  initLanguage()
  
  // Load theme preference
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }
})
</script>
