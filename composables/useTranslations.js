export const useTranslations = () => {
  const { currentLanguage } = useLanguage()
  
  const t = computed(() => translations[currentLanguage.value] || translations.fr)
  
  return { t }
}

export const translations = {
  fr: {
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
      bac: 'Bac Pro SNIR'
    },
    experience: {
      title: 'Expérience professionnelle',
      current: 'Actuellement',
      itAssistant: 'Assistant informatique',
      crewMember: 'Equipier polyvalent',
      volunteer: 'Volontaire Stagiaire',
      computerRoomSetup: 'Installation et mise en service d\'une salle informatique (Stage)'
    },
    skills: {
      title: 'Compétences techniques',
      os: 'Systèmes d\'exploitation',
      languages: 'Langages de programmation',
      frameworks: 'Frameworks & Outils',
      databases: 'Bases de données',
      networks: 'Réseaux'
    },
    interests: {
      title: 'Centres d\'intérêt',
      japanese: 'Culture Japonaise',
      music: 'Musique',
      gaming: 'Jeux Vidéo',
      mythology: 'Mythologie'
    },
    portfolio: {
      title: 'Mes Projets',
      viewProject: 'Voir le projet',
      viewGithub: 'Voir sur GitHub'
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
      bac: 'Professional Baccalaureate SNIR'
    },
    experience: {
      title: 'Professional Experience',
      current: 'Currently',
      itAssistant: 'IT Assistant',
      crewMember: 'Crew Member',
      volunteer: 'Volunteer Trainee',
      computerRoomSetup: 'Computer Room Installation and Setup (Internship)'
    },
    skills: {
      title: 'Technical Skills',
      os: 'Operating Systems',
      languages: 'Programming Languages',
      frameworks: 'Frameworks & Tools',
      databases: 'Databases',
      networks: 'Networks'
    },
    interests: {
      title: 'Interests',
      japanese: 'Japanese Culture',
      music: 'Music',
      gaming: 'Video Games',
      mythology: 'Mythology'
    },
    portfolio: {
      title: 'My Projects',
      viewProject: 'View project',
      viewGithub: 'View on GitHub'
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
      bac: 'Mesleki Lise Diploması SNIR'
    },
    experience: {
      title: 'Profesyonel Deneyim',
      current: 'Şu anda',
      itAssistant: 'BT Asistanı',
      crewMember: 'Ekip Üyesi',
      volunteer: 'Gönüllü Stajyer',
      computerRoomSetup: 'Bilgisayar Odasının Kurulumu ve Hizmete Açılması (Staj)'
    },
    skills: {
      title: 'Teknik Beceriler',
      os: 'İşletim Sistemleri',
      languages: 'Programlama Dilleri',
      frameworks: 'Çerçeveler ve Araçlar',
      databases: 'Veritabanları',
      networks: 'Ağlar'
    },
    interests: {
      title: 'İlgi Alanları',
      japanese: 'Japon Kültürü',
      music: 'Müzik',
      gaming: 'Video Oyunları',
      mythology: 'Mitoloji'
    },
    portfolio: {
      title: 'Projelerim',
      viewProject: 'Projeyi gör',
      viewGithub: 'GitHub\'da gör'
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
