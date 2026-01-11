<template>
  <section id="interests" class="py-32 px-8 bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
    <!-- Formes décoratives animées -->
    <div class="absolute top-10 left-10 w-96 h-96 bg-purple-300 dark:bg-purple-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 dark:opacity-20 animate-float"></div>
    <div class="absolute bottom-10 right-10 w-80 h-80 bg-pink-300 dark:bg-pink-500 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-30 dark:opacity-20 animate-float delay-300"></div>
    
    <div class="max-w-6xl mx-auto relative z-10">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 animate-fade-in-down">
        <span v-if="translations">{{ translations.interests.title }}</span>
        <span v-else>Centres d'intérêt</span>
      </h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div
          v-for="(interest, index) in interests"
          :key="index"
          class="interest-card bg-white dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 dark:border-blue-500/50 hover:scale-105 hover:-translate-y-1 animate-fade-in-up backdrop-blur-sm"
          :style="{ animationDelay: `${index * 0.1}s` }"
        >
          <div class="flex items-center gap-3 mb-4">
            <div class="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg shadow-lg">
              <svg v-if="interest.title.includes('Japon') || interest.title.includes('Japanese') || interest.title.includes('Kültür')" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
              </svg>
              <svg v-else-if="interest.title.includes('Musique') || interest.title.includes('Music') || interest.title.includes('Müzik')" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
              </svg>
              <svg v-else-if="interest.title.includes('Jeux') || interest.title.includes('Video') || interest.title.includes('Games') || interest.title.includes('Oyun')" class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"/>
              </svg>
              <svg v-else class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-gray-800 dark:text-white drop-shadow-sm">
              {{ interest.title }}
            </h3>
          </div>
          <p class="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{{ interest.description }}</p>
          <div class="space-y-4">
            <div class="bg-blue-50 dark:bg-blue-900/40 p-4 rounded-lg border-2 border-blue-200 dark:border-blue-500/50 backdrop-blur-sm">
              <h4 class="font-semibold text-primary-blue dark:text-blue-300 mb-2 flex items-center gap-2">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Top 3
              </h4>
              <ol class="list-decimal list-inside text-gray-700 dark:text-blue-100 space-y-1 font-medium">
                <li v-for="(item, i) in interest.top3" :key="i" class="hover:text-blue-600 dark:hover:text-blue-300 transition-colors">{{ item }}</li>
              </ol>
            </div>
            <div v-if="interest.others && interest.others.length > 0" class="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-200 dark:border-gray-600/50 backdrop-blur-sm">
              <h4 class="font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {{ translations.interests.others }} :
              </h4>
              <ul class="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 text-sm">
                <li v-for="(item, i) in interest.others" :key="i" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ item }}</li>
              </ul>
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

const translations = computed(() => t.value)

const interests = computed(() => {
  const trans = translations.value
  if (!trans || !trans.interests) {
    return [
      {
        title: 'Culture Japonaise',
        description: 'Passionné d\'animes et de mangas.',
        top3: ['Naruto', 'Fullmetal Alchemist: Brotherhood', 'Death Note'],
        others: ['Dragon Ball Z', 'Saint Seiya', 'Yu-Gi-Oh!', 'Chainsaw Man', 'Jujutsu Kaisen']
      },
      {
        title: 'Musique',
        description: 'Éclectique dans mes goûts musicaux.',
        top3: ['Linkin Park', 'Orelsan', 'Flow'],
        others: [
          'Rap : Future, Freeze Corleone, Kendrick Lamar',
          'Rock : Imagine Dragons',
          'J-pop : Ado, Creepy Nuts, SiM, Survive Said The Prophet, MAN WITH A MISSION'
        ]
      },
      {
        title: 'Jeux Vidéo',
        description: 'Amateur de jeux de stratégie et FPS.',
        top3: ['Civilization', 'Age of Empires', 'Football Manager'],
        others: ['Doom', 'League of Legends', 'Crusader Kings III', 'Mobile Legends']
      },
      {
        title: 'Mythologie',
        description: 'Passionné par les contes mythologiques.',
        top3: ['Mythologie Grecque', 'Mythologie Viking', 'Mythologie Turque'],
        others: [
          'Mythologie Romaine',
          'Mythologie Aztèque',
          'Mythologie Inca',
          'Mythologie Maya',
          'Mythologie Japonaise'
        ]
      }
    ]
  }
  
  return [
    {
      title: trans.interests.japanese,
      description: trans.interests.japaneseDesc,
      top3: ['Naruto', 'Fullmetal Alchemist: Brotherhood', 'Death Note'],
      others: ['Dragon Ball Z', 'Saint Seiya', 'Yu-Gi-Oh!', 'Chainsaw Man', 'Jujutsu Kaisen']
    },
    {
      title: trans.interests.music,
      description: trans.interests.musicDesc,
      top3: ['Linkin Park', 'Orelsan', 'Flow'],
      others: [
        'Rap : Future, Freeze Corleone, Kendrick Lamar',
        'Rock : Imagine Dragons',
        'J-pop : Ado, Creepy Nuts, SiM, Survive Said The Prophet, MAN WITH A MISSION'
      ]
    },
    {
      title: trans.interests.gaming,
      description: trans.interests.gamingDesc,
      top3: ['Civilization', 'Age of Empires', 'Football Manager'],
      others: ['Doom', 'League of Legends', 'Crusader Kings III', 'Mobile Legends']
    },
    {
      title: trans.interests.mythology,
      description: trans.interests.mythologyDesc,
      top3: [trans.interests.greekMythology, trans.interests.vikingMythology, trans.interests.turkishMythology],
      others: [
        trans.interests.romanMythology,
        trans.interests.aztecMythology,
        trans.interests.incaMythology,
        trans.interests.mayaMythology,
        trans.interests.japaneseMythology
      ]
    }
  ]
})
</script>
