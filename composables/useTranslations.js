export const useTranslations = () => {
  const { currentLanguage } = useLanguage()

  const t = computed(() => translations[currentLanguage.value] || translations.fr)

  return { t }
}

export const translations = {
  fr: {
    terminal: {
      welcome: 'Bienvenue dans le terminal de Deniz OK!',
      typeHelp: 'Tapez "help" pour voir les commandes disponibles.',
      tip: '💡 Astuce: Vous pouvez déplacer et redimensionner cette fenêtre!',
      game: {
        start: '🎮 JEU DU JUSTE NOMBRE<br>J\'ai choisi un nombre entre 1 et 100. À vous de deviner !<br><span class="text-gray-500">(Tapez "exit" pour quitter)</span>',
        win: '🎉 GAGNÉ ! Vous avez trouvé le nombre {target} en {attempts} essais !',
        higher: 'C\'est plus grand ! ⬆️',
        lower: 'C\'est plus petit ! ⬇️',
        invalid: 'Veuillez entrer un nombre valide !',
        over: 'Jeu terminé.'
      },
      secret: '🕵️ Vous avez trouvé une commande secrète ! Le mot de passe est "42".',
      matrix: 'Wake up, Neo...<br>The Matrix has you...',
      notFound: 'commande introuvable',
      opening: 'Ouverture de',
      downloading: 'Téléchargement du CV...'
    },
    nav: {
      about: 'À propos',
      education: 'Formation',
      experience: 'Expérience',
      skills: 'Compétences',
      interests: 'Centres d\'intérêt',
      portfolio: 'Projets',
      languages: 'Langues'
    },
    hero: {
      title: 'Deniz OK',
      subtitle: 'Assistant informatique',
      description: 'Étudiant à Epitech en alternance chez Qualitest en tant que Assistant informatique depuis février 2025. Passionné par les technologies, par la cybersécurité je développe mes compétences en développement logiciel, programmation et gestion de projets dans un environnement innovant et dynamique.',
      contact: 'Me contacter',
      viewPortfolio: 'Voir mes projets',
      downloadCV: 'Télécharger mon CV'
    },
    education: {
      title: 'Formation',
      current: 'En cours',
      mscPro: 'Programme MSc Pro',
      epitech: 'Epitech Nancy',
      bts: 'BTS SNIR',
      bac: 'Bac Pro SNIR',
      mscProDesc: 'Pédagogie active • Virtualisation (Debian, OpenBSD, FreeBSD) • Programmation (HTML, CSS, PHP, Python, Java, JavaScript) • Framework (Node.js, Express.js, React.js, Bootstrap, Tailwind CSS, Symfony)',
      btsDesc: 'Programmation (C/C++, HTML, CSS, Python) • Administration Réseau (VLAN, LAN, Routeur, Commutateur, IPv4, Sous-réseaux) • Virtualisation (Mageia)',
      bacDesc: 'Administration Réseau (VLAN, LAN, Routeur, Commutateur, IPv4, Sous-réseaux) • Virtualisation (Debian)'
    },
    experience: {
      title: 'Expérience professionnelle',
      current: 'Actuellement',
      itAssistant: 'Assistant informatique',
      crewMember: 'Equipier polyvalent',
      volunteer: 'Volontaire Stagiaire',
      computerRoomSetup: 'Installation et mise en service d\'une salle informatique (Stage)',
      itMaintenanceAssistant: 'Assistant en Maintenance et Déploiement Informatique (Stage)',
      // Qualitest tasks
      qualitestTask1: 'Développement de questionnaire et de reporting',
      qualitestTask2: 'Création d\'outils en PHP et JS',
      qualitestTask3: 'Gestion de base de données',
      qualitestTask4: 'Collaboration avec les chargés d\'études',
      // Burger King tasks
      bkTask1: 'Service à table et au drive - Entretien du restaurant',
      bkTask2: 'Service client : Accueil chaleureux, prise de commande rapide et précise',
      // SMV tasks
      smvTask1: 'Développement de compétences essentielles en discipline et travail d\'équipe',
      smvTask2: 'Participation à des missions variées et enrichissantes',
      smvTask3: 'Obtention du certificat de Sauveteur Secouriste du Travail (SST)',
      smvTask4: 'Décoré de la médaille du mérite',
      // Stages tasks
      itAssistanceTask: 'Assistance informatique pour le personnel et les étudiants',
      computerInstallTask: 'Installation de nouveaux ordinateurs dans une salle informatique',
      ipCreationTask: 'Création d\'adresses IP pour les étudiants en BTS'
    },
    skills: {
      title: 'Compétences techniques',
      os: 'Systèmes d\'exploitation',
      languages: 'Langages de programmation',
      frameworks: 'Frameworks & Outils',
      databases: 'Bases de données',
      networks: 'Réseaux',
      tools: 'Outils',
      routerConfig: 'Configuration routeurs',
      switchConfig: 'Configuration switches',
      security: 'Cybersécurité'
    },
    interests: {
      title: 'Centres d\'intérêt',
      japanese: 'Culture Japonaise',
      music: 'Musique',
      gaming: 'Jeux Vidéo',
      mythology: 'Mythologie',
      others: 'Autres',
      japaneseDesc: 'Passionné d\'animes et de mangas.',
      musicDesc: 'Éclectique dans mes goûts musicaux.',
      gamingDesc: 'Amateur de jeux de stratégie et FPS.',
      mythologyDesc: 'Passionné par les contes mythologiques.',
      greekMythology: 'Mythologie Grecque',
      vikingMythology: 'Mythologie Viking',
      turkishMythology: 'Mythologie Turque',
      romanMythology: 'Mythologie Romaine',
      aztecMythology: 'Mythologie Aztèque',
      incaMythology: 'Mythologie Inca',
      mayaMythology: 'Mythologie Maya',
      japaneseMythology: 'Mythologie Japonaise'
    },
    portfolio: {
      title: 'Mes Projets',
      viewProject: 'Voir le projet',
      viewGithub: 'Voir sur GitHub',
      close: 'Fermer',
      enlargedView: 'Vue agrandie',
      videoNotSupported: 'Votre navigateur ne supporte pas la lecture de vidéos.',
      popeyeDesc: 'Projet de conteneurisation avec Docker, mettant en place une application web complète avec une architecture microservices.',
      portfolioDesc: 'Portfolio personnel développé avec Nuxt, Vite et JavaScript. Interface moderne et responsive.',
      nsaDesc: 'Infrastructure réseau sécurisée sous OpenBSD et FreeBSD. Configuration d\'une passerelle avec 3 réseaux privés.',
      cultureQuizDesc: 'Application de quiz interactif en Python avec interface Tkinter.',
      aiMorpionDesc: 'Version moderne du Tic-Tac-Toe avec une IA avancée utilisant l\'algorithme Minimax.',
      epiQuestDesc: 'Jeu d\'aventure 2D développé avec Java et LibGDX.'
    },
    languages: {
      title: 'Langues',
      french: 'Français',
      turkish: 'Turc',
      english: 'Anglais',
      native: 'Langue maternelle',
      toeic: 'TOEIC 790/990'
    },
    footer: {
      rights: '© 2025 Deniz OK. Tous droits réservés.',
      madeWith: 'Fait avec',
      and: 'et'
    }
  },
  en: {
    terminal: {
      welcome: 'Welcome to Deniz OK\'s terminal!',
      typeHelp: 'Type "help" to see available commands.',
      tip: '💡 Tip: You can drag and resize this window!',
      game: {
        start: '🎮 NUMBER GUESSING GAME<br>I chose a number between 1 and 100. Try to guess it!<br><span class="text-gray-500">(Type "exit" to quit)</span>',
        win: '🎉 YOU WON! You found the number {target} in {attempts} attempts!',
        higher: 'It\'s higher! ⬆️',
        lower: 'It\'s lower! ⬇️',
        invalid: 'Please enter a valid number!',
        over: 'Game over.'
      },
      secret: '🕵️ You found a secret command! The password is "42".',
      matrix: 'Wake up, Neo...<br>The Matrix has you...',
      notFound: 'command not found',
      opening: 'Opening',
      downloading: 'Downloading CV...'
    },
    nav: {
      about: 'About',
      education: 'Education',
      experience: 'Experience',
      skills: 'Skills',
      interests: 'Interests',
      portfolio: 'Projects',
      languages: 'Languages'
    },
    hero: {
      title: 'Deniz OK',
      subtitle: 'IT Assistant',
      description: 'Epitech student working as an IT Assistant at Qualitest since February 2025. Passionate about technology and cybersecurity, I\'m developing my skills in software development, programming, and project management in an innovative and dynamic environment.',
      contact: 'Contact me',
      viewPortfolio: 'View my projects',
      downloadCV: 'Download my CV'
    },
    education: {
      title: 'Education',
      current: 'Ongoing',
      mscPro: 'MSc Pro Program',
      epitech: 'Epitech Nancy',
      bts: 'BTS SNIR',
      bac: 'Professional Baccalaureate SNIR',
      mscProDesc: 'Active pedagogy • Virtualization (Debian, OpenBSD, FreeBSD) • Programming (HTML, CSS, PHP, Python, Java, JavaScript) • Framework (Node.js, Express.js, React.js, Bootstrap, Tailwind CSS, Symfony)',
      btsDesc: 'Programming (C/C++, HTML, CSS, Python) • Network Administration (VLAN, LAN, Router, Switch, IPv4, Subnets) • Virtualization (Mageia)',
      bacDesc: 'Network Administration (VLAN, LAN, Router, Switch, IPv4, Subnets) • Virtualization (Debian)'
    },
    experience: {
      title: 'Professional Experience',
      current: 'Currently',
      itAssistant: 'IT Assistant',
      crewMember: 'Crew Member',
      volunteer: 'Volunteer Trainee',
      computerRoomSetup: 'Computer Room Installation and Setup (Internship)',
      itMaintenanceAssistant: 'IT Maintenance and Deployment Assistant (Internship)',
      // Qualitest tasks
      qualitestTask1: 'Questionnaire and reporting development',
      qualitestTask2: 'Tool creation in PHP and JS',
      qualitestTask3: 'Database management',
      qualitestTask4: 'Collaboration with research managers',
      // Burger King tasks
      bkTask1: 'Table and drive-through service - Restaurant maintenance',
      bkTask2: 'Customer service: Warm welcome, fast and accurate order taking',
      // SMV tasks
      smvTask1: 'Development of essential skills in discipline and teamwork',
      smvTask2: 'Participation in various and enriching missions',
      smvTask3: 'Obtained the First Aid at Work certificate (SST)',
      smvTask4: 'Awarded the merit medal',
      // Stages tasks
      itAssistanceTask: 'IT assistance for staff and students',
      computerInstallTask: 'Installation of new computers in a computer room',
      ipCreationTask: 'Creation of IP addresses for BTS students'
    },
    skills: {
      title: 'Technical Skills',
      os: 'Operating Systems',
      languages: 'Programming Languages',
      frameworks: 'Frameworks & Tools',
      databases: 'Databases',
      networks: 'Networks',
      tools: 'Tools',
      routerConfig: 'Router configuration',
      switchConfig: 'Switch configuration',
      security: 'Cybersecurity'
    },
    interests: {
      title: 'Interests',
      japanese: 'Japanese Culture',
      music: 'Music',
      gaming: 'Video Games',
      mythology: 'Mythology',
      others: 'Others',
      japaneseDesc: 'Passionate about anime and manga.',
      musicDesc: 'Eclectic in my musical tastes.',
      gamingDesc: 'Fan of strategy games and FPS.',
      mythologyDesc: 'Passionate about mythological tales.',
      greekMythology: 'Greek Mythology',
      vikingMythology: 'Viking Mythology',
      turkishMythology: 'Turkish Mythology',
      romanMythology: 'Roman Mythology',
      aztecMythology: 'Aztec Mythology',
      incaMythology: 'Inca Mythology',
      mayaMythology: 'Maya Mythology',
      japaneseMythology: 'Japanese Mythology'
    },
    portfolio: {
      title: 'My Projects',
      viewProject: 'View project',
      viewGithub: 'View on GitHub',
      close: 'Close',
      enlargedView: 'Enlarged view',
      videoNotSupported: 'Your browser does not support video playback.',
      popeyeDesc: 'Docker containerization project, setting up a complete web application with microservices architecture.',
      portfolioDesc: 'Personal portfolio developed with Nuxt, Vite and JavaScript. Modern and responsive interface.',
      nsaDesc: 'Secure network infrastructure on OpenBSD and FreeBSD. Gateway configuration with 3 private networks.',
      cultureQuizDesc: 'Interactive quiz application in Python with Tkinter interface.',
      aiMorpionDesc: 'Modern version of Tic-Tac-Toe with advanced AI using the Minimax algorithm.',
      epiQuestDesc: '2D adventure game developed with Java and LibGDX.'
    },
    languages: {
      title: 'Languages',
      french: 'French',
      turkish: 'Turkish',
      english: 'English',
      native: 'Native language',
      toeic: 'TOEIC 790/990'
    },
    footer: {
      rights: '© 2025 Deniz OK. All rights reserved.',
      madeWith: 'Made with',
      and: 'and'
    }
  },
  tr: {
    terminal: {
      welcome: 'Deniz OK\'un terminaline hoş geldiniz!',
      typeHelp: 'Kullanılabilir komutları görmek için "help" yazın.',
      tip: '💡 İpucu: Bu pencereyi sürükleyip yeniden boyutlandırabilirsiniz!',
      game: {
        start: '🎮 SAYI TAHMİN OYUNU<br>1 ile 100 arasında bir sayı tuttum. Tahmin etmeye çalış!<br><span class="text-gray-500">(Çıkmak için "exit" yazın)</span>',
        win: '🎉 KAZANDIN! {target} sayısını {attempts} denemede buldun!',
        higher: 'Daha büyük! ⬆️',
        lower: 'Daha küçük! ⬇️',
        invalid: 'Lütfen geçerli bir sayı girin!',
        over: 'Oyun bitti.'
      },
      secret: '🕵️ Gizli bir komut buldun! Şifre "42".',
      matrix: 'Uyan, Neo...<br>Matrix seni ele geçirdi...',
      notFound: 'komut bulunamadı',
      opening: 'Açılıyor:',
      downloading: 'CV indiriliyor...'
    },
    nav: {
      about: 'Hakkında',
      education: 'Eğitim',
      experience: 'Deneyim',
      skills: 'Beceriler',
      interests: 'İlgi Alanları',
      portfolio: 'Projeler',
      languages: 'Diller'
    },
    hero: {
      title: 'Deniz OK',
      subtitle: 'BT Asistanı',
      description: 'Şubat 2025\'ten beri Qualitest\'te BT Asistanı olarak çalışan Epitech öğrencisi. Teknoloji ve siber güvenlik tutkunu olarak, yenilikçi ve dinamik bir ortamda yazılım geliştirme, programlama ve proje yönetimi becerilerimi geliştiriyorum.',
      contact: 'İletişim',
      viewPortfolio: 'Projelerimi gör',
      downloadCV: 'CV İndir'
    },
    education: {
      title: 'Eğitim',
      current: 'Devam ediyor',
      mscPro: 'MSc Pro Programı',
      epitech: 'Epitech Nancy',
      bts: 'BTS SNIR',
      bac: 'Mesleki Lise Diploması SNIR',
      mscProDesc: 'Aktif pedagoji • Sanallaştırma (Debian, OpenBSD, FreeBSD) • Programlama (HTML, CSS, PHP, Python, Java, JavaScript) • Framework (Node.js, Express.js, React.js, Bootstrap, Tailwind CSS, Symfony)',
      btsDesc: 'Programlama (C/C++, HTML, CSS, Python) • Ağ Yönetimi (VLAN, LAN, Yönlendirici, Anahtar, IPv4, Alt ağlar) • Sanallaştırma (Mageia)',
      bacDesc: 'Ağ Yönetimi (VLAN, LAN, Yönlendirici, Anahtar, IPv4, Alt ağlar) • Sanallaştırma (Debian)'
    },
    experience: {
      title: 'Profesyonel Deneyim',
      current: 'Şu anda',
      itAssistant: 'BT Asistanı',
      crewMember: 'Ekip Üyesi',
      volunteer: 'Gönüllü Stajyer',
      computerRoomSetup: 'Bilgisayar Odasının Kurulumu ve Hizmete Açılması (Staj)',
      itMaintenanceAssistant: 'BT Bakım ve Dağıtım Asistanı (Staj)',
      // Qualitest tasks
      qualitestTask1: 'Anket ve raporlama geliştirme',
      qualitestTask2: 'PHP ve JS ile araç oluşturma',
      qualitestTask3: 'Veritabanı yönetimi',
      qualitestTask4: 'Araştırma yöneticileriyle işbirliği',
      // Burger King tasks
      bkTask1: 'Masa ve drive-through servisi - Restoran bakımı',
      bkTask2: 'Müşteri hizmetleri: Sıcak karşılama, hızlı ve doğru sipariş alma',
      // SMV tasks
      smvTask1: 'Disiplin ve takım çalışmasında temel becerilerin geliştirilmesi',
      smvTask2: 'Çeşitli ve zenginleştirici görevlere katılım',
      smvTask3: 'İş Güvenliği İlk Yardım sertifikası alındı (SST)',
      smvTask4: 'Liyakat madalyası ile ödüllendirildi',
      // Stages tasks
      itAssistanceTask: 'Personel ve öğrenciler için BT desteği',
      computerInstallTask: 'Bilgisayar odasına yeni bilgisayarların kurulumu',
      ipCreationTask: 'BTS öğrencileri için IP adresi oluşturma'
    },
    skills: {
      title: 'Teknik Beceriler',
      os: 'İşletim Sistemleri',
      languages: 'Programlama Dilleri',
      frameworks: 'Çerçeveler ve Araçlar',
      databases: 'Veritabanları',
      networks: 'Ağlar',
      tools: 'Araçlar',
      routerConfig: 'Yönlendirici yapılandırma',
      switchConfig: 'Anahtar yapılandırma',
      security: 'Siber Güvenlik'
    },
    interests: {
      title: 'İlgi Alanları',
      japanese: 'Japon Kültürü',
      music: 'Müzik',
      gaming: 'Video Oyunları',
      mythology: 'Mitoloji',
      others: 'Diğerleri',
      japaneseDesc: 'Anime ve manga tutkunu.',
      musicDesc: 'Müzik zevkimde eklektik.',
      gamingDesc: 'Strateji oyunları ve FPS hayranı.',
      mythologyDesc: 'Mitolojik hikayeler tutkunu.',
      greekMythology: 'Yunan Mitolojisi',
      vikingMythology: 'Viking Mitolojisi',
      turkishMythology: 'Türk Mitolojisi',
      romanMythology: 'Roma Mitolojisi',
      aztecMythology: 'Aztek Mitolojisi',
      incaMythology: 'İnka Mitolojisi',
      mayaMythology: 'Maya Mitolojisi',
      japaneseMythology: 'Japon Mitolojisi'
    },
    portfolio: {
      title: 'Projelerim',
      viewProject: 'Projeyi gör',
      viewGithub: 'GitHub\'da gör',
      close: 'Kapat',
      enlargedView: 'Büyütülmüş görünüm',
      videoNotSupported: 'Tarayıcınız video oynatmayı desteklemiyor.',
      popeyeDesc: 'Docker konteynerleştirme projesi, mikroservis mimarisiyle eksiksiz bir web uygulaması kurulumu.',
      portfolioDesc: 'Nuxt, Vite ve JavaScript ile geliştirilen kişisel portfolyo. Modern ve duyarlı arayüz.',
      nsaDesc: 'OpenBSD ve FreeBSD üzerinde güvenli ağ altyapısı. 3 özel ağ ile ağ geçidi yapılandırması.',
      cultureQuizDesc: 'Tkinter arayüzü ile Python\'da interaktif bilgi yarışması uygulaması.',
      aiMorpionDesc: 'Minimax algoritması kullanan gelişmiş yapay zekalı modern Tic-Tac-Toe versiyonu.',
      epiQuestDesc: 'Java ve LibGDX ile geliştirilen 2D macera oyunu.'
    },
    languages: {
      title: 'Diller',
      french: 'Fransızca',
      turkish: 'Türkçe',
      english: 'İngilizce',
      native: 'Anadil',
      toeic: 'TOEIC 790/990'
    },
    footer: {
      rights: '© 2025 Deniz OK. Tüm hakları saklıdır.',
      madeWith: 'İle yapıldı',
      and: 've'
    }
  }
}
