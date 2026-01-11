<template>
  <section id="education" class="py-32 px-8 bg-white dark:bg-gray-900 relative overflow-hidden">
    <!-- Formes décoratives animées -->
    <div class="absolute top-10 left-20 w-72 h-72 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float delay-100"></div>
    <div class="absolute bottom-10 right-20 w-80 h-80 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float delay-400"></div>
    
    <div class="max-w-4xl mx-auto relative z-10">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 animate-fade-in-down">
        {{ t.education.title }}
      </h2>
      <div class="timeline">
        <div
          v-for="(edu, index) in educations"
          :key="index"
          class="timeline-item animate-fade-in-up"
          :style="{ animationDelay: `${index * 150}ms` }"
        >
          <div class="timeline-marker animate-pulse"></div>
          <div class="timeline-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 group border border-gray-200 dark:border-gray-700">
            <div class="flex items-start gap-3 mb-3">
              <div class="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"/>
                </svg>
              </div>
              <div class="flex-1">
                <span class="inline-block px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full text-sm mb-2 shadow-md">
                  {{ edu.period }}
                </span>
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ edu.title }}</h3>
                <p class="text-gray-600 dark:text-gray-300 font-medium mb-2">{{ edu.school }}</p>
              </div>
            </div>
            <p class="text-gray-700 dark:text-gray-200 leading-relaxed">{{ edu.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()

const educations = computed(() => [
  {
    title: t.value.education.mscPro,
    school: t.value.education.epitech,
    period: '2024-2027 · ' + t.value.education.current,
    description: t.value.education.mscProDesc
  },
  {
    title: t.value.education.bts,
    school: 'Lycée Jean Prouvé, Nancy',
    period: '2020-2022',
    description: t.value.education.btsDesc
  },
  {
    title: t.value.education.bac,
    school: 'Lycée Jean Prouvé, Nancy',
    period: '2017-2020',
    description: t.value.education.bacDesc
  }
])
</script>
