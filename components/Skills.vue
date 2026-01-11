<template>
  <section id="skills" class="py-32 px-8 bg-white dark:bg-gray-800 relative overflow-hidden">
    <!-- Formes décoratives animées -->
    <div class="absolute top-10 right-20 w-64 h-64 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float"></div>
    <div class="absolute bottom-10 left-20 w-80 h-80 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float delay-300"></div>
    
    <div class="max-w-6xl mx-auto relative z-10">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 animate-fade-in-down">
        <span v-if="translations">{{ translations.skills.title }}</span>
        <span v-else>Compétences techniques</span>
      </h2>
      <div class="grid gap-8">
        <div v-for="(category, key, catIndex) in skillsData" :key="key" 
             class="bg-gray-50 dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 animate-fade-in-up hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
             :style="{ animationDelay: `${catIndex * 100}ms` }">
          <div class="flex items-center gap-3 mb-4">
            <div class="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <svg v-if="key === 'os'" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <svg v-else-if="key === 'languages'" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
              </svg>
              <svg v-else-if="key === 'frameworks'" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
              </svg>
              <svg v-else-if="key === 'databases'" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/>
              </svg>
              <svg v-else class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
              </svg>
            </div>
            <h4 class="font-semibold text-lg text-gray-800 dark:text-gray-200">
              <span v-if="key === 'frameworks'">Frameworks</span>
              <span v-else-if="translations">{{ translations.skills[key] || key }}</span>
              <span v-else>{{ key }}</span>
            </h4>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            <a
              v-for="(skill, index) in category"
              :key="skill.name"
              :href="skill.wikiLink"
              target="_blank"
              rel="noopener noreferrer"
              class="skill-card bg-white dark:bg-gray-800 px-4 py-3 rounded-lg text-sm text-gray-700 dark:text-gray-300 text-center shadow-sm hover:shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-primary-blue dark:hover:text-accent-blue transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-primary-blue dark:hover:border-accent-blue hover:scale-110 hover:-translate-y-1 animate-fade-in"
              :style="{ animationDelay: `${(catIndex * 100) + (index * 50)}ms` }"
            >
              <span class="font-medium">{{ skill.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()

const translations = computed(() => t.value)

const skillsData = computed(() => ({
  os: [
    { name: 'Linux', wikiLink: 'https://fr.wikipedia.org/wiki/Linux' },
    { name: 'Windows', wikiLink: 'https://fr.wikipedia.org/wiki/Microsoft_Windows' },
    { name: 'OpenBSD', wikiLink: 'https://fr.wikipedia.org/wiki/OpenBSD' },
    { name: 'FreeBSD', wikiLink: 'https://fr.wikipedia.org/wiki/FreeBSD' },
    { name: 'Mageia', wikiLink: 'https://fr.wikipedia.org/wiki/Mageia' },
    { name: 'Ubuntu', wikiLink: 'https://fr.wikipedia.org/wiki/Ubuntu_(système_d%27exploitation)' },
    { name: 'Kali Linux', wikiLink: 'https://fr.wikipedia.org/wiki/Kali_Linux' },
    { name: 'Debian', wikiLink: 'https://fr.wikipedia.org/wiki/Debian' }
  ],
  languages: [
    { name: 'C/C++', wikiLink: 'https://fr.wikipedia.org/wiki/C%2B%2B' },
    { name: 'HTML', wikiLink: 'https://fr.wikipedia.org/wiki/Hypertext_Markup_Language' },
    { name: 'CSS', wikiLink: 'https://fr.wikipedia.org/wiki/Feuilles_de_style_en_cascade' },
    { name: 'PHP', wikiLink: 'https://fr.wikipedia.org/wiki/PHP' },
    { name: 'Python', wikiLink: 'https://fr.wikipedia.org/wiki/Python_(langage)' },
    { name: 'Java', wikiLink: 'https://fr.wikipedia.org/wiki/Java_(langage)' },
    { name: 'JavaScript', wikiLink: 'https://fr.wikipedia.org/wiki/JavaScript' },
    { name: 'TypeScript', wikiLink: 'https://fr.wikipedia.org/wiki/TypeScript' }
  ],
  frameworks: [
    { name: 'Node.js', wikiLink: 'https://fr.wikipedia.org/wiki/Node.js' },
    { name: 'Express.js', wikiLink: 'https://fr.wikipedia.org/wiki/Express.js' },
    { name: 'React.js', wikiLink: 'https://fr.wikipedia.org/wiki/React' },
    { name: 'Vue.js', wikiLink: 'https://fr.wikipedia.org/wiki/Vue.js' },
    { name: 'Symfony', wikiLink: 'https://fr.wikipedia.org/wiki/Symfony' },
    { name: 'Nuxt.js', wikiLink: 'https://fr.wikipedia.org/wiki/Nuxt.js' }
  ],
  tools: [
    { name: 'Bootstrap', wikiLink: 'https://fr.wikipedia.org/wiki/Bootstrap_(framework)' },
    { name: 'Tailwind CSS', wikiLink: 'https://fr.wikipedia.org/wiki/Tailwind_CSS' },
    { name: 'Docker', wikiLink: 'https://fr.wikipedia.org/wiki/Docker' },
    { name: 'Kubernetes', wikiLink: 'https://fr.wikipedia.org/wiki/Kubernetes' },
    { name: 'Jenkins', wikiLink: 'https://fr.wikipedia.org/wiki/Jenkins_(logiciel)' }
  ],
  databases: [
    { name: 'MongoDB', wikiLink: 'https://fr.wikipedia.org/wiki/MongoDB' },
    { name: 'MySQL', wikiLink: 'https://fr.wikipedia.org/wiki/MySQL' },
    { name: 'PostgreSQL', wikiLink: 'https://fr.wikipedia.org/wiki/PostgreSQL' },
    { name: 'SQLite', wikiLink: 'https://fr.wikipedia.org/wiki/SQLite' }
  ],
  networks: [
    { name: t.value.skills.routerConfig, wikiLink: 'https://fr.wikipedia.org/wiki/Routeur' },
    { name: t.value.skills.switchConfig, wikiLink: 'https://fr.wikipedia.org/wiki/Commutateur_réseau' }
  ]
}))

const getCategoryIcon = (key) => {
  const icons = {
    os: '💻',
    languages: '📝',
    frameworks: '🔧',
    tools: '🛠️',
    databases: '🗄️',
    networks: '🌐'
  }
  return icons[key] || '⚙️'
}
</script>
