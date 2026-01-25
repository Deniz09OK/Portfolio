<template>
  <section id="portfolio" class="py-32 px-8 bg-white dark:bg-gray-900">
    <div class="max-w-6xl mx-auto">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100">
        {{ t.portfolio.title }}
      </h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in projects"
          :key="project.name"
          class="project-card glass-premium rounded-xl transform transition-all duration-300 hover:scale-[1.02] overflow-hidden group"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :visibleOnce="{ opacity: 1, y: 0 }"
          :delay="index * 100"
        >
          <div class="relative overflow-hidden">
            <video
              v-if="project.media.type === 'video'"
              class="w-full h-48 object-cover"
              controls
              preload="metadata"
            >
              <source :src="project.media.src" type="video/mp4" />
              {{ t.portfolio.videoNotSupported }}
            </video>
            <NuxtImg
              v-else
              :src="project.media.src"
              :alt="project.media.alt"
              format="webp"
              loading="lazy"
              :class="[
                'w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110',
                project.name.includes('NSA') ? 'cursor-zoom-in' : ''
              ]"
              @click="project.name.includes('NSA') && openImageModal(project.media.src)"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <div class="p-6">
            <h3 class="font-bold text-xl mb-3 flex items-center text-gray-800 dark:text-gray-100">
              <span v-if="project.link === '#'" class="mr-2">🔒</span>
              <span v-else class="mr-2">⚙️</span>
              {{ project.name }}
            </h3>
            
            <p class="text-gray-600 dark:text-blue-100 text-sm mb-4">{{ project.description }}</p>
            
            <a
              v-if="project.link && !project.name.includes('NSA')"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center text-primary-blue dark:text-blue-300 hover:text-secondary-blue dark:hover:text-white transition-colors font-medium"
            >
              <span class="mr-2">→</span>
              {{ t.portfolio.viewGithub }}
            </a>
            <div v-else-if="project.name.includes('NSA')" class="inline-flex items-center text-gray-400 dark:text-gray-500 cursor-not-allowed select-none">
              <span class="mr-2">🔒</span>
              {{ t.portfolio.viewGithub }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal pour l'image agrandie -->
    <Transition name="modal">
      <div
        v-if="selectedImage"
        class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
        @click="selectedImage = null"
      >
        <button
          class="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors text-4xl"
          @click="selectedImage = null"
          :title="t.portfolio.close"
          :aria-label="t.portfolio.close"
        >
          ✕
        </button>
        <img
          :src="selectedImage"
          :alt="t.portfolio.enlargedView"
          class="max-w-full max-h-[90vh] object-contain rounded-lg"
          @click.stop
        />
      </div>
    </Transition>
  </section>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()
const selectedImage = ref(null)

const openImageModal = (src) => {
  selectedImage.value = src
}

const projects = computed(() => [
  {
    name: 'Popeye',
    link: 'https://github.com/Deniz09OK/Popeye',
    description: t.value.portfolio.popeyeDesc,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Docker containers illustration'
    }
  },
  {
    name: 'Portfolio',
    link: 'https://portfolio-deniz.netlify.app/Portfolio/',
    description: t.value.portfolio.portfolioDesc,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Code on a computer screen'
    }
  },
  {
    name: 'NSA (Network Security Administration)',
    link: '#',
    description: t.value.portfolio.nsaDesc,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Network security illustration'
    }
  },
  {
    name: 'CultureQuiz',
    link: 'https://github.com/Deniz09OK/CultureQuiz',
    description: t.value.portfolio.cultureQuizDesc,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
      alt: 'Quiz and learning'
    }
  },
  {
    name: 'AI-Morpion',
    link: 'https://github.com/Deniz09OK/AI-Morpion',
    description: t.value.portfolio.aiMorpionDesc,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Tic-tac-toe game'
    }
  },
  {
    name: 'EpiQuest',
    link: 'https://github.com/Deniz09OK/Projet-Jeu-Java',
    description: t.value.portfolio.epiQuestDesc,
    media: {
      type: 'image',
      src: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      alt: 'Retro video game'
    }
  }
])
</script>
