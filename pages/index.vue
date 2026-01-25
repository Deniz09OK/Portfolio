<template>
  <div>
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
  </div>
</template>

<script setup>
// Page-specific SEO
useSeoMeta({
  title: 'Deniz OK - Portfolio',
  description: 'Bienvenue sur mon portfolio. Découvrez mon parcours, mes compétences et mes projets.',
})
</script>
