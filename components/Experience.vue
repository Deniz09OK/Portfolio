<template>
  <section id="experience" class="py-32 px-8 bg-gray-50 dark:bg-gray-800 relative overflow-hidden">
    <!-- Formes décoratives animées -->
    <div class="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float"></div>
    <div class="absolute bottom-20 right-10 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-20 animate-float delay-200"></div>
    
    <div class="max-w-4xl mx-auto relative z-10">
      <h2 class="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-gray-100 animate-fade-in-down">
        {{ t.experience.title }}
      </h2>
      <div class="timeline">
        <div
          v-for="(exp, index) in experiences"
          :key="index"
          class="timeline-item animate-fade-in-up"
          :style="{ animationDelay: `${index * 100}ms` }"
        >
          <div class="timeline-marker animate-pulse"></div>
          <div class="timeline-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105 hover:-translate-y-1 group">
            <div class="flex items-start gap-3 mb-3">
              <div class="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition-colors">
                <svg v-if="exp.type === 'work'" class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <svg v-else class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{{ exp.title }}</h3>
                <p class="text-primary-blue dark:text-accent-blue font-medium">{{ exp.company }}</p>
              </div>
            </div>
            <div class="flex items-center gap-2 mb-4">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ exp.period }}</p>
            </div>
            <ul class="list-disc list-inside text-gray-700 dark:text-gray-200 space-y-2">
              <li v-for="(task, i) in exp.tasks" :key="i" class="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">{{ task }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()

const experiences = computed(() => [
  {
    type: 'work',
    title: t.value.experience.itAssistant,
    company: 'Qualitest, Nancy',
    period: '02/2025 - ' + t.value.experience.current,
    tasks: [
      'Développement de questionnaire et de reporting',
      'Création d\'outils en PHP et JS',
      'Gestion de base de données',
      'Collaboration avec les charges d\'études'
    ]
  },
  {
    type: 'work',
    title: t.value.experience.crewMember,
    company: 'Burger King, Vandoeuvre-lès-Nancy',
    period: '01/2024 - 03/2024',
    tasks: [
      'Service à table et au drive - Entretien du restaurant',
      'Service client : Accueil chaleureux, prise de commande rapide et précise'
    ]
  },
  {
    type: 'work',
    title: t.value.experience.volunteer,
    company: '1er régiment du service militaire volontaire, Montigny-Lès-Metz',
    period: '03/2023 - 12/2023',
    tasks: [
      'Développement de compétences essentielles en discipline et travail d\'équipe',
      'Participation à des missions variées et enrichissantes',
      'Obtention du certificat de Sauveteur Secouriste du Travail (SST)',
      'Décoré de la médaille du mérite'
    ]
  },
  {
    type: 'internship',
    title: currentLanguage.value === 'fr' 
      ? 'Assistant en Maintenance et Déploiement Informatique (Stage)'
      : currentLanguage.value === 'en'
      ? 'IT Maintenance and Deployment Assistant (Internship)'
      : 'BT Bakım ve Dağıtım Asistanı (Staj)',
    company: 'Sciences Po, Nancy',
    period: '09/2019 - 10/2019',
    tasks: [
      currentLanguage.value === 'fr' 
        ? 'Assistance informatique pour le personnel et les étudiants'
        : currentLanguage.value === 'en'
        ? 'IT assistance for staff and students'
        : 'Personel ve öğrenciler için BT desteği'
    ]
  },
  {
    type: 'internship',
    title: t.value.experience.computerRoomSetup,
    company: 'CFA Charles de Foucauld, Nancy',
    period: '04/2021 - 06/2021',
    tasks: [
      currentLanguage.value === 'fr' 
        ? 'Installation de nouveaux ordinateurs dans une salle informatique'
        : currentLanguage.value === 'en'
        ? 'Installation of new computers in a computer room'
        : 'Bilgisayar odasına yeni bilgisayarların kurulumu',
      currentLanguage.value === 'fr' 
        ? 'Création d\'adresses IP pour les étudiants en BTS'
        : currentLanguage.value === 'en'
        ? 'Creation of IP addresses for BTS students'
        : 'BTS öğrencileri için IP adresi oluşturma'
    ]
  },
  {
    type: 'internship',
    title: currentLanguage.value === 'fr' 
      ? 'Assistant en Maintenance et Déploiement Informatique (Stage)'
      : currentLanguage.value === 'en'
      ? 'IT Maintenance and Deployment Assistant (Internship)'
      : 'BT Bakım ve Dağıtım Asistanı (Staj)',
    company: 'Lycée Henri Loritz, Nancy',
    period: '04/2019 - 05/2019',
    tasks: [
      currentLanguage.value === 'fr' 
        ? 'Assistance informatique pour le personnel et les étudiants'
        : currentLanguage.value === 'en'
        ? 'IT assistance for staff and students'
        : 'Personel ve öğrenciler için BT desteği'
    ]
  },
  {
    type: 'internship',
    title: currentLanguage.value === 'fr' 
      ? 'Assistant en Maintenance et Déploiement Informatique (Stage)'
      : currentLanguage.value === 'en'
      ? 'IT Maintenance and Deployment Assistant (Internship)'
      : 'BT Bakım ve Dağıtım Asistanı (Staj)',
    company: 'Lycée Henri Loritz, Nancy',
    period: '01/2019 - 02/2019',
    tasks: [
      currentLanguage.value === 'fr' 
        ? 'Assistance informatique pour le personnel et les étudiants'
        : currentLanguage.value === 'en'
        ? 'IT assistance for staff and students'
        : 'Personel ve öğrenciler için BT desteği'
    ]
  }
])
</script>
