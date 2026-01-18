<template>
  <div>
    <NuxtLayout>
      <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <!-- Navigation -->
        <Navigation />
        
        <!-- Theme Toggle -->
        <ThemeToggle />
        
        <!-- Language Toggle -->
        <LanguageToggle />

        <!-- Hero Section -->
        <Hero />

        <!-- Education Section -->
        <Education />

        <!-- Experience Section -->
        <Experience />

        <!-- Skills Section -->
        <ClientOnly>
          <Skills />
        </ClientOnly>

        <!-- Interests Section -->
        <ClientOnly>
          <Interests />
        </ClientOnly>

        <!-- Portfolio Section -->
        <Portfolio />

        <!-- Languages Section -->
        <Languages />

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
