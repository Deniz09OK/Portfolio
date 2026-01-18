<template>
  <!-- Bouton flottant terminal -->
  <button
    @click="toggleTerminal"
    class="fixed bottom-24 left-4 z-[100] bg-gray-900 hover:bg-gray-800 text-green-400 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-green-500/50 group"
    :title="isOpen ? uiTexts.close : uiTexts.open"
  >
    <svg v-if="!isOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
    </svg>
    <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
    </svg>
  </button>

  <!-- Terminal Modal -->
  <Transition name="terminal">
    <div
      v-if="isOpen"
      ref="terminalWindow"
      class="fixed z-50 bg-gray-900 rounded-lg shadow-2xl border border-green-500/30 overflow-hidden"
      :style="terminalStyle"
    >
      <!-- Barre de titre du terminal (draggable) -->
      <div 
        class="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700 cursor-move select-none"
        @mousedown="startDrag"
      >
        <div class="flex items-center gap-2">
          <div class="flex gap-1.5">
            <button @click="toggleTerminal" class="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" :title="uiTexts.close"></button>
            <button @click="toggleMinimize" class="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" :title="uiTexts.minimize"></button>
            <button @click="toggleMaximize" class="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" :title="uiTexts.maximize"></button>
          </div>
          <span class="text-gray-400 text-sm ml-2 font-mono">deniz@portfolio ~ </span>
        </div>
        <span class="text-gray-500 text-xs font-mono">bash</span>
      </div>

      <!-- Corps du terminal -->
      <div 
        v-show="!isMinimized"
        ref="terminalBody"
        class="overflow-y-auto p-4 font-mono text-sm custom-scrollbar"
        :style="{ height: `${terminalHeight - 40}px` }"
      >
        <!-- Historique des commandes -->
        <div v-for="(entry, index) in history" :key="index" class="mb-2">
          <div class="flex items-center text-green-400">
            <span class="text-blue-400">deniz@portfolio</span>
            <span class="text-gray-400">:</span>
            <span class="text-purple-400">~</span>
            <span class="text-gray-400">$ </span>
            <span class="text-white ml-1">{{ entry.command }}</span>
          </div>
          <div v-if="entry.output" class="text-gray-300 whitespace-pre-wrap mt-1" v-html="entry.output"></div>
        </div>

        <!-- Ligne de commande active -->
        <div class="flex items-center text-green-400">
          <span class="text-blue-400">deniz@portfolio</span>
          <span class="text-gray-400">:</span>
          <span class="text-purple-400">~</span>
          <span class="text-gray-400">$ </span>
          <input
            ref="inputRef"
            v-model="currentCommand"
            @keydown.enter="executeCommand"
            @keydown.up.prevent="navigateHistory(-1)"
            @keydown.down.prevent="navigateHistory(1)"
            @keydown.tab.prevent="autoComplete"
            class="flex-1 bg-transparent text-white outline-none ml-1 caret-green-400"
            type="text"
            autocomplete="off"
            spellcheck="false"
          />
          <span class="animate-pulse text-green-400">▊</span>
        </div>
      </div>

      <!-- Poignée de redimensionnement -->
      <div 
        v-show="!isMinimized && !isMaximized"
        class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
        @mousedown="startResize"
      >
        <svg class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z"/>
        </svg>
      </div>
    </div>
  </Transition>
</template>

<script setup>
const { currentLanguage } = useLanguage()
const { t } = useTranslations()

const isOpen = ref(false)
const isMinimized = ref(false)
const isMaximized = ref(false)
const currentCommand = ref('')
const history = ref([])
const commandHistory = ref([])
const historyIndex = ref(-1)
const inputRef = ref(null)
const terminalBody = ref(null)
const terminalWindow = ref(null)

// Position et taille du terminal
const terminalX = ref(16)
const terminalY = ref(100)
const terminalWidth = ref(550)
const terminalHeight = ref(400)
const savedPosition = ref({ x: 16, y: 100, width: 550, height: 400 })

// Drag state
const isDragging = ref(false)
const dragOffset = ref({ x: 0, y: 0 })

// Resize state
const isResizing = ref(false)

const terminalStyle = computed(() => {
  if (isMaximized.value) {
    return {
      left: '16px',
      top: '16px',
      width: 'calc(100vw - 32px)',
      height: 'calc(100vh - 32px)'
    }
  }
  return {
    left: `${terminalX.value}px`,
    top: `${terminalY.value}px`,
    width: `${terminalWidth.value}px`,
    height: isMinimized.value ? '40px' : `${terminalHeight.value}px`
  }
})

// UI Texts for tooltips (translated)
const uiTexts = computed(() => {
  const lang = currentLanguage.value
  const texts = {
    fr: { open: 'Ouvrir le terminal', close: 'Fermer', minimize: 'Réduire', maximize: 'Agrandir' },
    en: { open: 'Open terminal', close: 'Close', minimize: 'Minimize', maximize: 'Maximize' },
    tr: { open: 'Terminali aç', close: 'Kapat', minimize: 'Küçült', maximize: 'Büyüt' }
  }
  return texts[lang] || texts.fr
})

// Drag functions
const startDrag = (e) => {
  if (isMaximized.value) return
  isDragging.value = true
  dragOffset.value = {
    x: e.clientX - terminalX.value,
    y: e.clientY - terminalY.value
  }
  document.addEventListener('mousemove', onDrag)
  document.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  terminalX.value = Math.max(0, Math.min(window.innerWidth - terminalWidth.value, e.clientX - dragOffset.value.x))
  terminalY.value = Math.max(0, Math.min(window.innerHeight - 40, e.clientY - dragOffset.value.y))
}

const stopDrag = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// Resize functions
const startResize = (e) => {
  isResizing.value = true
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (e) => {
  if (!isResizing.value) return
  terminalWidth.value = Math.max(400, e.clientX - terminalX.value)
  terminalHeight.value = Math.max(200, e.clientY - terminalY.value)
}

const stopResize = () => {
  isResizing.value = false
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

// Toggle functions
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
  if (isMaximized.value) isMaximized.value = false
}

const toggleMaximize = () => {
  if (!isMaximized.value) {
    savedPosition.value = {
      x: terminalX.value,
      y: terminalY.value,
      width: terminalWidth.value,
      height: terminalHeight.value
    }
  } else {
    terminalX.value = savedPosition.value.x
    terminalY.value = savedPosition.value.y
    terminalWidth.value = savedPosition.value.width
    terminalHeight.value = savedPosition.value.height
  }
  isMaximized.value = !isMaximized.value
  isMinimized.value = false
}

// Section content getter
const getSectionContent = (sectionId) => {
  const lang = currentLanguage.value
  const trans = t.value
  
  const sections = {
    about: () => {
      const texts = {
        fr: `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                    <span class="text-yellow-400">À PROPOS DE MOI</span>                       ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-green-400">Nom:</span> Deniz OK
<span class="text-green-400">Poste:</span> Assistant informatique
<span class="text-green-400">Entreprise:</span> Qualitest
<span class="text-green-400">École:</span> Epitech Nancy
<span class="text-green-400">Localisation:</span> Jarville-la-Malgrange, France

<span class="text-gray-400">${trans.hero.description}</span>`,
        en: `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                      <span class="text-yellow-400">ABOUT ME</span>                           ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-green-400">Name:</span> Deniz OK
<span class="text-green-400">Position:</span> IT Assistant
<span class="text-green-400">Company:</span> Qualitest
<span class="text-green-400">School:</span> Epitech Nancy
<span class="text-green-400">Location:</span> Jarville-la-Malgrange, France

<span class="text-gray-400">${trans.hero.description}</span>`,
        tr: `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                     <span class="text-yellow-400">HAKKIMDA</span>                            ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-green-400">İsim:</span> Deniz OK
<span class="text-green-400">Pozisyon:</span> BT Asistanı
<span class="text-green-400">Şirket:</span> Qualitest
<span class="text-green-400">Okul:</span> Epitech Nancy
<span class="text-green-400">Konum:</span> Jarville-la-Malgrange, Fransa

<span class="text-gray-400">${trans.hero.description}</span>`
      }
      return texts[lang] || texts.fr
    },
    
    education: () => {
      const header = { fr: 'FORMATION', en: 'EDUCATION', tr: 'EĞİTİM' }
      return `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                      <span class="text-yellow-400">${header[lang] || header.fr}</span>                          ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">▶ ${trans.education.mscPro}</span> <span class="text-gray-500">(2024-2027)</span>
  <span class="text-blue-400">${trans.education.epitech}</span>
  <span class="text-gray-400">${trans.education.mscProDesc}</span>

<span class="text-yellow-400">▶ ${trans.education.bts}</span> <span class="text-gray-500">(2020-2022)</span>
  <span class="text-blue-400">Lycée Jean Prouvé, Nancy</span>
  <span class="text-gray-400">${trans.education.btsDesc}</span>

<span class="text-yellow-400">▶ ${trans.education.bac}</span> <span class="text-gray-500">(2017-2020)</span>
  <span class="text-blue-400">Lycée Jean Prouvé, Nancy</span>
  <span class="text-gray-400">${trans.education.bacDesc}</span>`
    },
    
    experience: () => {
      const header = { fr: 'EXPÉRIENCE', en: 'EXPERIENCE', tr: 'DENEYİM' }
      return `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                     <span class="text-yellow-400">${header[lang] || header.fr}</span>                          ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">▶ ${trans.experience.itAssistant}</span> <span class="text-gray-500">(02/2025 - ${trans.experience.current})</span>
  <span class="text-blue-400">Qualitest, Nancy</span>
  • ${trans.experience.qualitestTask1}
  • ${trans.experience.qualitestTask2}
  • ${trans.experience.qualitestTask3}

<span class="text-yellow-400">▶ ${trans.experience.crewMember}</span> <span class="text-gray-500">(01/2024 - 03/2024)</span>
  <span class="text-blue-400">Burger King, Vandoeuvre-lès-Nancy</span>

<span class="text-yellow-400">▶ ${trans.experience.volunteer}</span> <span class="text-gray-500">(03/2023 - 12/2023)</span>
  <span class="text-blue-400">1er régiment du SMV, Montigny-Lès-Metz</span>`
    },
    
    skills: () => {
      const header = { fr: 'COMPÉTENCES', en: 'SKILLS', tr: 'BECERİLER' }
      return `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                    <span class="text-yellow-400">${header[lang] || header.fr}</span>                          ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-green-400">${trans.skills.os}:</span>
  Linux, Windows, OpenBSD, FreeBSD, Debian, Ubuntu, Kali

<span class="text-green-400">${trans.skills.languages}:</span>
  C/C++, HTML, CSS, PHP, Python, Java, JavaScript, TypeScript

<span class="text-green-400">Frameworks:</span>
  Node.js, Express.js, React.js, Vue.js, Symfony, Nuxt.js

<span class="text-green-400">${trans.skills.databases}:</span>
  MongoDB, MySQL, PostgreSQL, SQLite

<span class="text-green-400">${trans.skills.tools}:</span>
  Docker, Kubernetes, Jenkins, Bootstrap, Tailwind CSS`
    },
    
    interests: () => {
      const header = { fr: "CENTRES D'INTÉRÊT", en: 'INTERESTS', tr: 'İLGİ ALANLARI' }
      return `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                   <span class="text-yellow-400">${header[lang] || header.fr}</span>                       ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-purple-400">🎌 ${trans.interests.japanese}</span>
  Top 3: Naruto, Fullmetal Alchemist, Death Note

<span class="text-purple-400">🎵 ${trans.interests.music}</span>
  Top 3: Linkin Park, Orelsan, Flow

<span class="text-purple-400">🎮 ${trans.interests.gaming}</span>
  Top 3: Civilization, Age of Empires, Football Manager

<span class="text-purple-400">⚡ ${trans.interests.mythology}</span>
  ${trans.interests.greekMythology}, ${trans.interests.vikingMythology}, ${trans.interests.turkishMythology}`
    },
    
    portfolio: () => {
      const header = { fr: 'PROJETS', en: 'PROJECTS', tr: 'PROJELER' }
      return `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                      <span class="text-yellow-400">${header[lang] || header.fr}</span>                           ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-yellow-400">📦 Popeye</span>
  <span class="text-gray-400">${trans.portfolio.popeyeDesc}</span>
  <span class="text-blue-400">→ github.com/Deniz09OK/Popeye</span>

<span class="text-yellow-400">🌐 Portfolio</span>
  <span class="text-gray-400">${trans.portfolio.portfolioDesc}</span>
  <span class="text-blue-400">→ portfolio-deniz.netlify.app/Portfolio/</span>

<span class="text-yellow-400">🔒 NSA (Network Security Administration)</span>
  <span class="text-gray-400">${trans.portfolio.nsaDesc}</span>

<span class="text-yellow-400">🧠 CultureQuiz</span>
  <span class="text-gray-400">${trans.portfolio.cultureQuizDesc}</span>

<span class="text-yellow-400">🎮 AI-Morpion</span>
  <span class="text-gray-400">${trans.portfolio.aiMorpionDesc}</span>

<span class="text-yellow-400">⚔️ EpiQuest</span>
  <span class="text-gray-400">${trans.portfolio.epiQuestDesc}</span>`
    },
    
    languages: () => {
      const header = { fr: 'LANGUES', en: 'LANGUAGES', tr: 'DİLLER' }
      return `<span class="text-cyan-400">╔══════════════════════════════════════════════════════════╗
║                      <span class="text-yellow-400">${header[lang] || header.fr}</span>                           ║
╚══════════════════════════════════════════════════════════╝</span>

<span class="text-green-400">🇫🇷 ${trans.languages.french}</span>
  <span class="text-gray-400">${trans.languages.native}</span>

<span class="text-green-400">🇹🇷 ${trans.languages.turkish}</span>
  <span class="text-gray-400">${trans.languages.native}</span>

<span class="text-green-400">🇬🇧 ${trans.languages.english}</span>
  <span class="text-gray-400">${trans.languages.toeic}</span>`
    }
  }
  
  return sections[sectionId] ? sections[sectionId]() : null
}

// Commands
const commands = {
  help: () => {
    const lang = currentLanguage.value
    const helpText = {
      fr: `<span class="text-yellow-400">Commandes disponibles :</span>

  <span class="text-green-400">about</span>      - Afficher la section À propos
  <span class="text-green-400">education</span>  - Afficher la section Formation
  <span class="text-green-400">experience</span> - Afficher la section Expérience
  <span class="text-green-400">skills</span>     - Afficher la section Compétences
  <span class="text-green-400">interests</span>  - Afficher la section Centres d'intérêt
  <span class="text-green-400">portfolio</span>  - Afficher la section Projets
  <span class="text-green-400">languages</span>  - Afficher la section Langues
  <span class="text-green-400">contact</span>    - Envoyer un email
  <span class="text-green-400">github</span>     - Ouvrir mon GitHub
  <span class="text-green-400">linkedin</span>   - Ouvrir mon LinkedIn
  <span class="text-green-400">cv</span>         - Télécharger mon CV
  <span class="text-green-400">clear</span>      - Effacer le terminal
  <span class="text-green-400">whoami</span>     - Qui suis-je ?
  <span class="text-green-400">neofetch</span>   - Infos système
  <span class="text-green-400">help</span>       - Afficher cette aide`,
      en: `<span class="text-yellow-400">Available commands:</span>

  <span class="text-green-400">about</span>      - Show About section
  <span class="text-green-400">education</span>  - Show Education section
  <span class="text-green-400">experience</span> - Show Experience section
  <span class="text-green-400">skills</span>     - Show Skills section
  <span class="text-green-400">interests</span>  - Show Interests section
  <span class="text-green-400">portfolio</span>  - Show Projects section
  <span class="text-green-400">languages</span>  - Show Languages section
  <span class="text-green-400">contact</span>    - Send an email
  <span class="text-green-400">github</span>     - Open my GitHub
  <span class="text-green-400">linkedin</span>   - Open my LinkedIn
  <span class="text-green-400">cv</span>         - Download my CV
  <span class="text-green-400">clear</span>      - Clear terminal
  <span class="text-green-400">whoami</span>     - Who am I?
  <span class="text-green-400">neofetch</span>   - System info
  <span class="text-green-400">help</span>       - Show this help`,
      tr: `<span class="text-yellow-400">Kullanılabilir komutlar:</span>

  <span class="text-green-400">about</span>      - Hakkında bölümünü göster
  <span class="text-green-400">education</span>  - Eğitim bölümünü göster
  <span class="text-green-400">experience</span> - Deneyim bölümünü göster
  <span class="text-green-400">skills</span>     - Beceriler bölümünü göster
  <span class="text-green-400">interests</span>  - İlgi Alanları bölümünü göster
  <span class="text-green-400">portfolio</span>  - Projeler bölümünü göster
  <span class="text-green-400">languages</span>  - Diller bölümünü göster
  <span class="text-green-400">contact</span>    - E-posta gönder
  <span class="text-green-400">github</span>     - GitHub'ımı aç
  <span class="text-green-400">linkedin</span>   - LinkedIn'imi aç
  <span class="text-green-400">cv</span>         - CV'mi indir
  <span class="text-green-400">clear</span>      - Terminali temizle
  <span class="text-green-400">whoami</span>     - Ben kimim?
  <span class="text-green-400">neofetch</span>   - Sistem bilgisi
  <span class="text-green-400">help</span>       - Bu yardımı göster`
    }
    return helpText[lang] || helpText.fr
  },

  whoami: () => {
    const lang = currentLanguage.value
    const text = {
      fr: `<span class="text-cyan-400">╔══════════════════════════════════════════╗
║           <span class="text-yellow-400">Deniz OK</span>                       ║
║   Assistant informatique @ Qualitest     ║
║   Étudiant @ Epitech Nancy               ║
╚══════════════════════════════════════════╝</span>`,
      en: `<span class="text-cyan-400">╔══════════════════════════════════════════╗
║           <span class="text-yellow-400">Deniz OK</span>                       ║
║   IT Assistant @ Qualitest               ║
║   Student @ Epitech Nancy                ║
╚══════════════════════════════════════════╝</span>`,
      tr: `<span class="text-cyan-400">╔══════════════════════════════════════════╗
║           <span class="text-yellow-400">Deniz OK</span>                       ║
║   BT Asistanı @ Qualitest                ║
║   Öğrenci @ Epitech Nancy                ║
╚══════════════════════════════════════════╝</span>`
    }
    return text[lang] || text.fr
  },

  about: () => getSectionContent('about'),
  education: () => getSectionContent('education'),
  experience: () => getSectionContent('experience'),
  skills: () => getSectionContent('skills'),
  interests: () => getSectionContent('interests'),
  portfolio: () => getSectionContent('portfolio'),
  languages: () => getSectionContent('languages'),

  contact: () => {
    window.open('mailto:deniz.ok@epitech.eu', '_blank')
    const lang = currentLanguage.value
    const text = {
      fr: '<span class="text-green-400">✓ Ouverture du client email...</span>',
      en: '<span class="text-green-400">✓ Opening email client...</span>',
      tr: '<span class="text-green-400">✓ E-posta istemcisi açılıyor...</span>'
    }
    return text[lang] || text.fr
  },

  github: () => {
    window.open('https://github.com/Deniz09OK', '_blank')
    const lang = currentLanguage.value
    const text = {
      fr: '<span class="text-green-400">✓ Ouverture de GitHub...</span>',
      en: '<span class="text-green-400">✓ Opening GitHub...</span>',
      tr: '<span class="text-green-400">✓ GitHub açılıyor...</span>'
    }
    return text[lang] || text.fr
  },

  linkedin: () => {
    window.open('https://www.linkedin.com/in/deniz-ok', '_blank')
    const lang = currentLanguage.value
    const text = {
      fr: '<span class="text-green-400">✓ Ouverture de LinkedIn...</span>',
      en: '<span class="text-green-400">✓ Opening LinkedIn...</span>',
      tr: '<span class="text-green-400">✓ LinkedIn açılıyor...</span>'
    }
    return text[lang] || text.fr
  },

  cv: () => {
    const lang = currentLanguage.value
    const cvUrls = {
      fr: 'https://drive.google.com/uc?export=download&id=1vQ8PkOMx0fr-YoGacFOwWDQnWMThKFS2',
      en: 'https://drive.google.com/uc?export=download&id=1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n',
      tr: 'https://drive.google.com/uc?export=download&id=1ZJG6kY_AEZjh0aw7SAzywQ5bCfplxd6n'
    }
    window.open(cvUrls[lang] || cvUrls.fr, '_blank')
    const text = {
      fr: '<span class="text-green-400">✓ Téléchargement du CV...</span>',
      en: '<span class="text-green-400">✓ Downloading CV...</span>',
      tr: '<span class="text-green-400">✓ CV indiriliyor...</span>'
    }
    return text[lang] || text.fr
  },

  clear: () => {
    history.value = []
    return null
  },

  ls: () => {
    return `<span class="text-blue-400">about/</span>  <span class="text-blue-400">education/</span>  <span class="text-blue-400">experience/</span>  <span class="text-blue-400">skills/</span>  <span class="text-blue-400">interests/</span>  <span class="text-blue-400">portfolio/</span>  <span class="text-blue-400">languages/</span>
<span class="text-gray-400">README.md</span>  <span class="text-gray-400">CV.pdf</span>`
  },

  pwd: () => '/home/deniz/portfolio',

  date: () => new Date().toLocaleString(currentLanguage.value === 'en' ? 'en-US' : currentLanguage.value === 'tr' ? 'tr-TR' : 'fr-FR'),

  echo: (args) => args.join(' '),

  neofetch: () => {
    return `<span class="text-cyan-400">        .--.      </span>  <span class="text-yellow-400">deniz</span>@<span class="text-yellow-400">portfolio</span>
<span class="text-cyan-400">       |o_o |     </span>  <span class="text-white">──────────────────</span>
<span class="text-cyan-400">       |:_/ |     </span>  <span class="text-cyan-400">OS:</span> Nuxt 3
<span class="text-cyan-400">      //   \\ \\    </span>  <span class="text-cyan-400">Host:</span> Vercel
<span class="text-cyan-400">     (|     | )   </span>  <span class="text-cyan-400">Kernel:</span> Vue 3.x
<span class="text-cyan-400">    /'\\_   _/\`\\   </span>  <span class="text-cyan-400">Shell:</span> Terminal v2.0
<span class="text-cyan-400">    \\___)=(___/   </span>  <span class="text-cyan-400">Theme:</span> Dark Mode`
  }
}

const availableCommands = Object.keys(commands)

const toggleTerminal = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    nextTick(() => {
      inputRef.value?.focus()
      if (history.value.length === 0) {
        const lang = currentLanguage.value
        const welcome = {
          fr: `<span class="text-cyan-400">Bienvenue dans le terminal de Deniz OK!</span>
<span class="text-gray-400">Tapez</span> <span class="text-yellow-400">help</span> <span class="text-gray-400">pour voir les commandes disponibles.</span>
<span class="text-gray-400">💡 Astuce: Vous pouvez déplacer et redimensionner cette fenêtre!</span>`,
          en: `<span class="text-cyan-400">Welcome to Deniz OK's terminal!</span>
<span class="text-gray-400">Type</span> <span class="text-yellow-400">help</span> <span class="text-gray-400">to see available commands.</span>
<span class="text-gray-400">💡 Tip: You can drag and resize this window!</span>`,
          tr: `<span class="text-cyan-400">Deniz OK'un terminaline hoş geldiniz!</span>
<span class="text-gray-400">Kullanılabilir komutları görmek için</span> <span class="text-yellow-400">help</span> <span class="text-gray-400">yazın.</span>
<span class="text-gray-400">💡 İpucu: Bu pencereyi sürükleyip yeniden boyutlandırabilirsiniz!</span>`
        }
        history.value.push({ command: '', output: welcome[lang] || welcome.fr })
      }
    })
  }
}

const executeCommand = () => {
  const cmd = currentCommand.value.trim()
  if (!cmd) return

  commandHistory.value.push(cmd)
  historyIndex.value = commandHistory.value.length

  const [command, ...args] = cmd.toLowerCase().split(' ')
  let output = null

  if (commands[command]) {
    output = typeof commands[command] === 'function' 
      ? commands[command](args) 
      : commands[command]
  } else if (cmd) {
    const lang = currentLanguage.value
    const errorText = {
      fr: `<span class="text-red-400">bash: ${command}: commande introuvable</span>
<span class="text-gray-400">Tapez</span> <span class="text-yellow-400">help</span> <span class="text-gray-400">pour voir les commandes disponibles.</span>`,
      en: `<span class="text-red-400">bash: ${command}: command not found</span>
<span class="text-gray-400">Type</span> <span class="text-yellow-400">help</span> <span class="text-gray-400">to see available commands.</span>`,
      tr: `<span class="text-red-400">bash: ${command}: komut bulunamadı</span>
<span class="text-gray-400">Kullanılabilir komutları görmek için</span> <span class="text-yellow-400">help</span> <span class="text-gray-400">yazın.</span>`
    }
    output = errorText[lang] || errorText.fr
  }

  if (command !== 'clear') {
    history.value.push({ command: cmd, output })
  }

  currentCommand.value = ''

  nextTick(() => {
    if (terminalBody.value) {
      terminalBody.value.scrollTop = terminalBody.value.scrollHeight
    }
  })
}

const navigateHistory = (direction) => {
  if (commandHistory.value.length === 0) return

  historyIndex.value += direction

  if (historyIndex.value < 0) {
    historyIndex.value = 0
  } else if (historyIndex.value >= commandHistory.value.length) {
    historyIndex.value = commandHistory.value.length
    currentCommand.value = ''
    return
  }

  currentCommand.value = commandHistory.value[historyIndex.value] || ''
}

const autoComplete = () => {
  const input = currentCommand.value.toLowerCase()
  if (!input) return

  const matches = availableCommands.filter(cmd => cmd.startsWith(input))
  if (matches.length === 1) {
    currentCommand.value = matches[0]
  } else if (matches.length > 1) {
    const output = matches.map(m => `<span class="text-green-400">${m}</span>`).join('  ')
    history.value.push({ command: currentCommand.value, output })
    nextTick(() => {
      if (terminalBody.value) {
        terminalBody.value.scrollTop = terminalBody.value.scrollHeight
      }
    })
  }
}

onMounted(() => {
  console.log('Terminal component mounted')
})
</script>

<style scoped>
.terminal-enter-active,
.terminal-leave-active {
  transition: all 0.3s ease;
}

.terminal-enter-from,
.terminal-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #1f2937;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #4b5563;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #6b7280;
}
</style>
