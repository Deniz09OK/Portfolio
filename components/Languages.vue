<template>
  <section id="languages" class="py-32 px-8 bg-white dark:bg-gray-800 relative overflow-hidden">
    <!-- Formes décoratives animées -->
    <div class="absolute top-20 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 dark:opacity-20 animate-float"></div>
    <div class="absolute bottom-20 left-10 w-80 h-80 bg-indigo-300 dark:bg-indigo-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 dark:opacity-20 animate-float delay-200"></div>
    
    <div class="max-w-4xl mx-auto relative z-10">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 animate-fade-in-down">
        {{ t.languages.title }}
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div
          v-for="(lang, index) in languages"
          :key="lang.name"
          class="language-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-indigo-900/40 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 dark:border-blue-500/50 hover:scale-110 hover:-translate-y-2 animate-fade-in-up backdrop-blur-sm"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="text-center">
            <span class="text-5xl mb-4 block drop-shadow-lg">{{ lang.flag }}</span>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white mb-3 drop-shadow-sm">
              {{ lang.name }}
            </h3>
            <div class="px-4 py-2 bg-white/50 dark:bg-blue-600/30 rounded-full backdrop-blur-sm border border-blue-300 dark:border-blue-400/50">
              <p class="text-gray-700 dark:text-blue-100 font-semibold">{{ lang.level }}</p>
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

const languages = computed(() => [
  {
    name: t.value.languages.french,
    level: t.value.languages.native,
    flag: '🇫🇷'
  },
  {
    name: t.value.languages.turkish,
    level: t.value.languages.native,
    flag: '🇹🇷'
  },
  {
    name: t.value.languages.english,
    level: t.value.languages.toeic,
    flag: '🇬🇧'
  }
])
</script>
