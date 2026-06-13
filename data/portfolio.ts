import type { Portfolio } from '~/types/portfolio'


export const portfolio: Portfolio = {
  fr: {    nav: { roster: "Fiche", matches: "Card de la saison", career: "Saisons jouées", drills: "Entraînement quotidien", off: "Hors du clavier", languages: "Trois langues", contact: "Sifflet final" },

    hero: {
      number: "619",
      name1: "DENIZ",
      name2: "OK",
      position: "CYBERSÉCURITÉ & CLOUD",
      team: "QUALITEST × EPITECH NANCY",
      bio: "Passionné par la Cybersécurité et les infrastructures Cloud, je suis actuellement en MSc à Epitech Nancy. Mon alternance chez Qualitest me permet de consolider mes bases techniques à travers la gestion de bases de données, l'analyse de données et l'automatisation de tâches grâce au scripting (PowerShell, PHP, Bash). Mes domaines de focus : Cybersécurité (protection des données et analyse de vulnérabilités), Cloud (déploiement et sécurisation d'environnements dématérialisés), Infrastructure (maintenance système et réseau au quotidien). Je suis constamment à la recherche de nouveaux défis techniques pour allier sécurité et performance.",
      kanji: "戦",
      stats: [
        { label: "MATCHS JOUÉS", value: "07", sub: "projets livrés" },
        { label: "EXPÉRIENCES", value: "05", sub: "stages, jobs, alternance" },
        { label: "LANGUES OPS", value: "07", sub: "Py · Bash · PHP · JS · C · Java · PS" },
        { label: "OS MAÎTRISÉS", value: "05", sub: "Debian · *BSD · Win" }
      ],
      tale: [
        { k: "BASE", v: "Jarville-la-Malgrange · FR" },
        { k: "DRAFT", v: "Epitech Nancy · Promo 2027" },
        { k: "CONTRAT", v: "Alternance — Qualitest" },
        { k: "STATUT", v: "EN ALTERNANCE · QUALITEST + EPITECH" }
      ],
      cta1: "Voir les matchs",
      cta2: "Télécharger CV",
      cta3: "Me contacter"
    },
    matches: {
      title: "Card de la saison",
      sub: "Sept matchs joués. Sept façons de gagner."
    },
    projects: [
      { idx: "01", name: "Linux System Inventory", kanji: "監査", type: "Outil système", stack: "PYTHON · LINUX · VAGRANT", year: "2026", opponent: "PARC LINUX HÉTÉROGÈNE", verdict: "AUDIT AUTOMATISÉ", desc: "Outil d'inventaire système pour Linux automatisant la collecte d'informations matérielles et logicielles. Génère un rapport exploitable du parc.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "02", name: "NSA — Network Security", kanji: "結界", type: "Infrastructure réseau", stack: "OPENBSD · FREEBSD", year: "2025", opponent: "RÉSEAU NON SEGMENTÉ", verdict: "PASSERELLE SÉCURISÉE", desc: "Infrastructure réseau sécurisée sous OpenBSD et FreeBSD. Configuration d'une passerelle segmentant trois réseaux privés.", link: null },
      { idx: "03", name: "Popeye", kanji: "船団", type: "Conteneurisation", stack: "DOCKER · MICROSERVICES", year: "2025", opponent: "MONOLITHE WEB", verdict: "ARCHITECTURE MODULAIRE", desc: "Projet de conteneurisation avec Docker. Application web complète en architecture microservices, communication inter-services et persistance.", link: "https://github.com/Deniz09OK/Popeye" },
      { idx: "04", name: "Portfolio", kanji: "書庫", type: "Site personnel", stack: "NUXT · VUE · TAILWIND", year: "2025", opponent: "PAGE BLANCHE", verdict: "VITRINE ÉVOLUTIVE", desc: "Refonte 2026 du portfolio. Design éditorial mêlant cybersécurité et culture sportive/japonaise. Storytelling au scroll, multilingue FR/EN/TR, dark & light, fiche joueur en hero.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "05", name: "CultureQuiz", kanji: "知識", type: "App desktop", stack: "PYTHON · TKINTER · GUI", year: "2024", opponent: "ENNUI", verdict: "QUIZ INTERACTIF", desc: "Application de quiz interactif en Python avec interface Tkinter. Base de questions extensible, scoring, timer par manche.", link: "https://github.com/Deniz09OK/CultureQuiz" },
      { idx: "06", name: "AI-Morpion", kanji: "戦略", type: "Jeu · IA", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2024", opponent: "JOUEUR HUMAIN", verdict: "IA INVINCIBLE", desc: "Version moderne du Tic-Tac-Toe avec une IA avancée utilisant l'algorithme Minimax. Élagage alpha-beta : l'IA ne perd jamais.", link: "https://github.com/Deniz09OK/AI-Morpion" },
      { idx: "07", name: "EpiQuest", kanji: "冒険", type: "Jeu vidéo 2D", stack: "JAVA · LIBGDX · GAMEDEV", year: "2024", opponent: "MOTEUR VIDE", verdict: "PLATFORMEUR JOUABLE", desc: "Jeu d'aventure 2D développé avec Java et LibGDX. Système de combat, dialogues, progression. Projet équipe.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java" }
    ],
    career: {
      title: "Saisons jouées",
      eduLabel: "ACADÉMIE",
      expLabel: "TERRAIN"
    },
    edu: [
      { year: "2024 — 2027", school: "EPITECH NANCY", title: "MSc Pro — Cybersécurité & Cloud", desc: "Pédagogie active · Debian/OpenBSD/FreeBSD · Sécu offensive & défensive", current: true },
      { year: "2020 — 2022", school: "LYCÉE JEAN PROUVÉ", title: "BTS SNIR", desc: "C/C++, Python · VLAN, routage, sous-réseaux · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Bac Pro SNIR", desc: "Bases réseau & systèmes · Virtualisation Debian" }
    ],
    exp: [
      { year: "02/2025 — ...", company: "QUALITEST", title: "Assistant informatique (alternance)", desc: "Questionnaires & reporting · Outils PHP/JS · BDD · Études", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING", title: "Équipier polyvalent", desc: "Service salle & drive · Relation client" },
      { year: "03/2023 — 12/2023", company: "1ER RSMV · MONTIGNY-LÈS-METZ", title: "Volontaire stagiaire", desc: "Discipline & cohésion · SST · Médaille du mérite" },
      { year: "04/2021 — 06/2021", company: "CFA CHARLES DE FOUCAULD", title: "Salle informatique (stage)", desc: "Déploiement postes · Adressage IP pour BTS" },
      { year: "09/2019 — 10/2019", company: "SCIENCES PO NANCY", title: "Maintenance & déploiement IT (stage)", desc: "Support personnel & étudiants" },
      { year: "04/2019 — 05/2019", company: "LYCÉE HENRI LORITZ", title: "Maintenance & déploiement IT (stage)", desc: "Support personnel & étudiants" },
      { year: "01/2019 — 02/2019", company: "LYCÉE HENRI LORITZ", title: "Maintenance & déploiement IT (stage)", desc: "Support personnel & étudiants" }
    ],
    drills: {
      title: "Entraînement quotidien",
      groups: [
        { label: "SYSTÈMES", pos: "GARDIEN", items: ["Linux", "Debian", "Ubuntu", "Kali Linux", "OpenBSD", "FreeBSD", "Mageia", "Windows"] },
        { label: "BASES DE DONNÉES", pos: "DÉFENSE", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"] },
        { label: "RÉSEAUX", pos: "LATÉRAL", items: ["Configuration routeurs", "Configuration switches"] },
        { label: "CYBERSÉCURITÉ", pos: "LIBÉRO", items: ["Metasploit", "Burp Suite", "Nmap", "Hydra", "Wireshark", "John the Ripper", "Gobuster"] },
        { label: "OUTILS", pos: "MILIEU", items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "Traefik", "Vite", "Figma", "Tailwind CSS"] },
        { label: "LANGAGES", pos: "MENEUR DE JEU", items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C/C++", "Groovy", "HTML/CSS"] },
        { label: "FRAMEWORKS", pos: "AILIER", items: ["React.js", "Vue.js", "Node.js", "Express.js", "Nuxt.js", "Symfony", "Flask", "Socket.io", "Playwright"] }
      ]
    },
    off: {
      title: "Hors du clavier",
      sub: "Quatre disciplines qui me façonnent. Quatre écoles de discipline, de jeu et de récit.",
      cta: "Lire l'histoire",
      close: "Fermer",
      items: [
        { id: "japan", kanji: "日本", roman: "NIPPON", label: "Japon", color: "#e63946", role: "FORME & SILENCE", desc: "Animes, mangas, langue, philosophie. La façon dont la forme structure le sens.", story: "Ma passion pour le Japon vient des animes et mangas que j'ai pu lire et voir — Naruto, Bleach, ou encore Fullmetal Alchemist : Brotherhood.\n\nMais aussi de ses paysages, de sa culture, de ses temples et de ses traditions." },
        { id: "wrestle", kanji: "格闘", roman: "PURORESU", label: "Catch", color: "#ffb800", role: "STORYTELLING BRUT", desc: "WWE en premier, AEW depuis peu. L'art de raconter une histoire avec un corps, un personnage, un public.", story: "J'ai commencé à regarder le catch pendant la Ruthless Aggression Era.\n\nRey Mysterio en premier, pour son style de catch — vif, aérien, lisible.\n\nEt après, ce fut The Deadman, The Undertaker, et le Heartbreak Kid, Shawn Michaels." },
        { id: "music", kanji: "音楽", roman: "ONGAKU", label: "Musique", color: "#ff7700", role: "ÉNERGIE & RYTHME", desc: "Rock, rap français, metal, synth japonais. Le mélange large, du clavier aux écouteurs.", story: "Je suis un fan absolu de rap et de rock.\n\nEt comme je sais que vous voulez que je me mouille un peu, voici mon top 3 :\n- « San » — Orelsan\n- « Breaking the Habit » — Linkin Park\n- « Sign » — Flow" },
        { id: "myth", kanji: "神話", roman: "SHINWA", label: "Mythologies", color: "#9e7bff", role: "RÉCITS FONDATEURS", desc: "Grecque, viking, turque, romaine, aztèque, inca, maya, japonaise. Ce que les humains racontent pour tenir.", story: "Petite histoire : avant de vouloir travailler dans l'IT, et plus précisément dans la cyber, je voulais devenir archéologue.\n\nPour faire des découvertes historiques, et pour prouver que certains mythes ont vraiment existé." }
      ]
    },
    languages: {
      title: "Trois langues",
      items: [
        { code: "FR", flag: "FR", label: "Français", level: "Langue maternelle" },
        { code: "TR", flag: "TR", label: "Türkçe", level: "Bilingue" },
        { code: "EN", flag: "EN", label: "English", level: "TOEIC 790 / 990" }
      ]
    },
    contact: {
      title: "Sifflet final.",
      lead: "Parler cyber, projet ou juste dire bonjour ? Les vestiaires sont ouverts.",
      email: "deniz.ok@epitech.eu"
    }
  },

  en: {
    nav: { roster: "Roster", matches: "Season card", career: "Seasons played", drills: "Daily training", off: "Off the keyboard", languages: "Three languages", contact: "Final whistle" },
    hero: {
      number: "619",
      name1: "DENIZ",
      name2: "OK",
      position: "CYBERSECURITY & CLOUD",
      team: "QUALITEST × EPITECH NANCY",
      bio: "Passionate about Cybersecurity and Cloud infrastructure, I am currently pursuing an MSc at Epitech Nancy. My work-study position at Qualitest allows me to strengthen my technical foundations through database management, data analysis, and task automation via scripting (PowerShell, PHP, Bash). My focus areas: Cybersecurity (data protection and vulnerability analysis), Cloud (deployment and securing of dematerialised environments), Infrastructure (day-to-day system and network maintenance). I am constantly seeking new technical challenges to combine security and performance.",
      kanji: "戦",
      stats: [
        { label: "MATCHES PLAYED", value: "07", sub: "shipped projects" },
        { label: "EXPERIENCES", value: "05", sub: "internships, jobs, work-study" },
        { label: "OPS LANGUAGES", value: "07", sub: "Py · Bash · PHP · JS · C · Java · PS" },
        { label: "OS MASTERED", value: "05", sub: "Debian · *BSD · Win" }
      ],
      tale: [
        { k: "BASE", v: "Jarville-la-Malgrange · FR" },
        { k: "DRAFT", v: "Epitech Nancy · Class of 2027" },
        { k: "CONTRACT", v: "Work-study — Qualitest" },
        { k: "STATUS", v: "WORK-STUDY · QUALITEST + EPITECH" }
      ],
      cta1: "See the card",
      cta2: "Download CV",
      cta3: "Contact"
    },
    matches: { title: "Season card", sub: "Seven matches played. Seven ways to win." },
    projects: [
      { idx: "01", name: "Linux System Inventory", kanji: "監査", type: "System tool", stack: "PYTHON · LINUX · VAGRANT", year: "2026", opponent: "MIXED LINUX FLEET", verdict: "AUTOMATED AUDIT", desc: "Linux system inventory tool automating hardware and software information collection. Generates a usable fleet report.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "02", name: "NSA — Network Security", kanji: "結界", type: "Network infra", stack: "OPENBSD · FREEBSD", year: "2025", opponent: "FLAT NETWORK", verdict: "SECURE GATEWAY", desc: "Secure network infrastructure on OpenBSD and FreeBSD. Gateway segmenting three private networks.", link: null },
      { idx: "03", name: "Popeye", kanji: "船団", type: "Containerization", stack: "DOCKER · MICROSERVICES", year: "2025", opponent: "WEB MONOLITH", verdict: "MODULAR ARCH.", desc: "Docker containerization project. Full web app in microservices architecture, inter-service comms and persistence.", link: "https://github.com/Deniz09OK/Popeye" },
      { idx: "04", name: "Portfolio", kanji: "書庫", type: "Personal site", stack: "NUXT · VUE · TAILWIND", year: "2025", opponent: "BLANK PAGE", verdict: "LIVING SHOWCASE", desc: "2026 redesign. Editorial design blending cybersecurity with sports/Japanese culture. Scroll storytelling, FR/EN/TR i18n, dark & light, player card hero.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "05", name: "CultureQuiz", kanji: "知識", type: "Desktop app", stack: "PYTHON · TKINTER · GUI", year: "2024", opponent: "BOREDOM", verdict: "INTERACTIVE QUIZ", desc: "Interactive Python quiz app with Tkinter interface. Extensible question base, scoring, round timer.", link: "https://github.com/Deniz09OK/CultureQuiz" },
      { idx: "06", name: "AI-Morpion", kanji: "戦略", type: "Game · AI", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2024", opponent: "HUMAN PLAYER", verdict: "UNBEATEN AI", desc: "Modern Tic-Tac-Toe with advanced AI using the Minimax algorithm. Alpha-beta pruning — the AI never loses.", link: "https://github.com/Deniz09OK/AI-Morpion" },
      { idx: "07", name: "EpiQuest", kanji: "冒険", type: "2D video game", stack: "JAVA · LIBGDX · GAMEDEV", year: "2024", opponent: "EMPTY ENGINE", verdict: "PLAYABLE PLATFORMER", desc: "2D adventure game developed with Java and LibGDX. Combat system, dialogue, progression. Team project.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java" }
    ],
    career: { title: "Seasons played", eduLabel: "ACADEMY", expLabel: "FIELD" },
    edu: [
      { year: "2024 — 2027", school: "EPITECH NANCY", title: "MSc Pro — Cybersecurity & Cloud", desc: "Active pedagogy · Debian/OpenBSD/FreeBSD · Offensive & defensive security", current: true },
      { year: "2020 — 2022", school: "LYCÉE JEAN PROUVÉ", title: "BTS SNIR", desc: "C/C++, Python · VLAN, routing, subnets · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Vocational Baccalaureate SNIR", desc: "Network & system foundations · Debian virtualization" }
    ],
    exp: [
      { year: "02/2025 — now", company: "QUALITEST", title: "IT Assistant (work-study)", desc: "Questionnaire & reporting · PHP/JS tools · DB · Research team", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING", title: "Crew member", desc: "Front of house & drive · Customer service" },
      { year: "03/2023 — 12/2023", company: "1ST RSMV · MONTIGNY-LÈS-METZ", title: "Volunteer trainee", desc: "Discipline & teamwork · First-aid (SST) · Merit medal" },
      { year: "04/2021 — 06/2021", company: "CFA CHARLES DE FOUCAULD", title: "Computer room (intern)", desc: "Workstation rollout · IP addressing for BTS" },
      { year: "09/2019 — 10/2019", company: "SCIENCES PO NANCY", title: "IT maintenance & deployment (intern)", desc: "Staff & student support" },
      { year: "04/2019 — 05/2019", company: "LYCÉE HENRI LORITZ", title: "IT maintenance & deployment (intern)", desc: "Staff & student support" },
      { year: "01/2019 — 02/2019", company: "LYCÉE HENRI LORITZ", title: "IT maintenance & deployment (intern)", desc: "Staff & student support" }
    ],
    drills: {
      title: "Daily training",
      groups: [
        { label: "SYSTEMS", pos: "KEEPER", items: ["Linux", "Debian", "Ubuntu", "Kali Linux", "OpenBSD", "FreeBSD", "Mageia", "Windows"] },
        { label: "DATABASES", pos: "DEFENSE", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"] },
        { label: "NETWORKS", pos: "FULL-BACK", items: ["Router configuration", "Switch configuration"] },
        { label: "CYBERSECURITY", pos: "SWEEPER", items: ["Metasploit", "Burp Suite", "Nmap", "Hydra", "Wireshark", "John the Ripper", "Gobuster"] },
        { label: "TOOLS", pos: "MID-FIELD", items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "Traefik", "Vite", "Figma", "Tailwind CSS"] },
        { label: "LANGUAGES", pos: "PLAYMAKER", items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C/C++", "Groovy", "HTML/CSS"] },
        { label: "FRAMEWORKS", pos: "WINGER", items: ["React.js", "Vue.js", "Node.js", "Express.js", "Nuxt.js", "Symfony", "Flask", "Socket.io", "Playwright"] }
      ]
    },
    off: {
      title: "Off the keyboard",
      sub: "Four disciplines that shape me. Four schools of discipline, play and story.",
      cta: "Read the story",
      close: "Close",
      items: [
        { id: "japan", kanji: "日本", roman: "NIPPON", label: "Japan", color: "#e63946", role: "FORM & SILENCE", desc: "Anime, manga, language, philosophy. How form shapes meaning.", story: "My passion for Japan started with the anime and manga I grew up reading and watching — Naruto, Bleach, Fullmetal Alchemist: Brotherhood.\n\nBut also its landscapes, its culture, its temples and its traditions." },
        { id: "wrestle", kanji: "格闘", roman: "PURORESU", label: "Wrestling", color: "#ffb800", role: "RAW STORYTELLING", desc: "WWE first, AEW lately. Telling a story with a body, a character, a crowd.", story: "I started watching wrestling during the Ruthless Aggression Era.\n\nRey Mysterio first, for his style — fast, aerial, readable.\n\nAnd after that, The Deadman, The Undertaker, and the Heartbreak Kid, Shawn Michaels." },
        { id: "music", kanji: "音楽", roman: "ONGAKU", label: "Music", color: "#ff7700", role: "ENERGY & RHYTHM", desc: "Rock, French rap, metal, Japanese synth. Wide mix, from the keyboard to the headphones.", story: "I'm an absolute rap and rock fan.\n\nAnd since you want me to open up a bit, here's my personal top 3:\n- \"San\" — Orelsan\n- \"Breaking the Habit\" — Linkin Park\n- \"Sign\" — Flow" },
        { id: "myth", kanji: "神話", roman: "SHINWA", label: "Mythologies", color: "#9e7bff", role: "FOUNDING NARRATIVES", desc: "Greek, Viking, Turkish, Roman, Aztec, Inca, Maya, Japanese. What humans tell to hold together.", story: "A small backstory: before wanting to work in IT — and more specifically in cybersecurity — I wanted to be an archaeologist.\n\nTo make historical discoveries, and to prove that some myths really did happen." }
      ]
    },
    languages: {
      title: "Three languages",
      items: [
        { code: "FR", flag: "FR", label: "Français", level: "Native" },
        { code: "TR", flag: "TR", label: "Türkçe", level: "Bilingual" },
        { code: "EN", flag: "EN", label: "English", level: "TOEIC 790 / 990" }
      ]
    },
    contact: { title: "Final whistle.", lead: "Want to talk cyber, a project, or just say hi? Locker room is open.", email: "deniz.ok@epitech.eu" }
  },

  tr: {
    nav: { roster: "Kadro", matches: "Sezon kartı", career: "Oynanan sezonlar", drills: "Günlük antrenman", off: "Klavyenin dışında", languages: "Üç dil", contact: "Son düdük" },
    hero: {
      number: "619",
      name1: "DENIZ",
      name2: "OK",
      position: "SİBER GÜVENLİK & BULUT",
      team: "QUALITEST × EPITECH NANCY",
      bio: "Siber Güvenlik ve Bulut altyapılarına tutkuyla bağlı biri olarak, şu anda Epitech Nancy'de MSc eğitimime devam ediyorum. Qualitest'teki yarı zamanlı çalışmam, veritabanı yönetimi, veri analizi ve scripting (PowerShell, PHP, Bash) ile görev otomasyonu aracılığıyla teknik temellerimi güçlendirmeme olanak tanıyor. Odak alanlarım: Siber Güvenlik (veri koruma ve güvenlik açığı analizi), Bulut (sanallaştırılmış ortamların dağıtımı ve güvenliği), Altyapı (günlük sistem ve ağ bakımı). Güvenliği ve performansı bir araya getirecek yeni teknik meydan okumalar arıyorum.",
      kanji: "戦",
      stats: [
        { label: "OYNANAN MAÇ", value: "07", sub: "teslim proje" },
        { label: "DENEYİMLER", value: "05", sub: "stajlar, işler, yarı zamanlı" },
        { label: "OPS DİL", value: "07", sub: "Py · Bash · PHP · JS · C · Java · PS" },
        { label: "OS HÂKİM", value: "05", sub: "Debian · *BSD · Win" }
      ],
      tale: [
        { k: "ÜS", v: "Jarville-la-Malgrange · FR" },
        { k: "DRAFT", v: "Epitech Nancy · 2027 mezunu" },
        { k: "SÖZLEŞME", v: "Yarı zamanlı — Qualitest" },
        { k: "DURUM", v: "YARI ZAMANLI · QUALITEST + EPITECH" }
      ],
      cta1: "Kartı gör",
      cta2: "CV indir",
      cta3: "İletişim"
    },
    matches: { title: "Sezon kartı", sub: "Yedi maç oynandı. Yedi kazanma yolu." },
    projects: [
      { idx: "01", name: "Linux System Inventory", kanji: "監査", type: "Sistem aracı", stack: "PYTHON · LINUX · VAGRANT", year: "2026", opponent: "KARIŞIK LINUX FİLOSU", verdict: "OTOMATİK DENETİM", desc: "Donanım ve yazılım bilgilerinin toplanmasını otomatikleştiren Linux sistem envanteri aracı. Kullanılabilir bir filo raporu oluşturur.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "02", name: "NSA — Network Security", kanji: "結界", type: "Ağ altyapısı", stack: "OPENBSD · FREEBSD", year: "2025", opponent: "DÜZ AĞ", verdict: "GÜVENLİ GEÇİT", desc: "OpenBSD ve FreeBSD üzerinde güvenli ağ altyapısı. Üç özel ağı segmentleyen ağ geçidi yapılandırması.", link: null },
      { idx: "03", name: "Popeye", kanji: "船団", type: "Konteynerleştirme", stack: "DOCKER · MİKROSERVİS", year: "2025", opponent: "WEB MONOLİT", verdict: "MODÜLER MİMARİ", desc: "Docker konteynerleştirme projesi. Mikroservis mimarisinde tam web uygulaması, servisler arası iletişim ve kalıcılık.", link: "https://github.com/Deniz09OK/Popeye" },
      { idx: "04", name: "Portfolio", kanji: "書庫", type: "Kişisel site", stack: "NUXT · VUE · TAILWIND", year: "2025", opponent: "BOŞ SAYFA", verdict: "YAŞAYAN VİTRİN", desc: "Portfolyonun 2026 yeniden tasarımı. Siber güvenlik ile spor/Japon kültürünü harmanlayan editöryel tasarım. Scroll storytelling, FR/EN/TR çoklu dil, koyu & açık, hero'da oyuncu kartı.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "05", name: "CultureQuiz", kanji: "知識", type: "Masaüstü", stack: "PYTHON · TKINTER · GUI", year: "2024", opponent: "SIKINTI", verdict: "İNTERAKTİF QUIZ", desc: "Tkinter arayüzü ile Python'da interaktif bilgi yarışması uygulaması. Genişletilebilir soru tabanı, puanlama, tur zamanlayıcı.", link: "https://github.com/Deniz09OK/CultureQuiz" },
      { idx: "06", name: "AI-Morpion", kanji: "戦略", type: "Oyun · YZ", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2024", opponent: "İNSAN OYUNCU", verdict: "YENİLMEZ YZ", desc: "Minimax algoritması kullanan gelişmiş YZ ile modern Tic-Tac-Toe. Alfa-beta budama — YZ asla kaybetmez.", link: "https://github.com/Deniz09OK/AI-Morpion" },
      { idx: "07", name: "EpiQuest", kanji: "冒険", type: "2D video oyunu", stack: "JAVA · LIBGDX · OYUN", year: "2024", opponent: "BOŞ MOTOR", verdict: "OYNANABİLİR PLATFORMER", desc: "Java ve LibGDX ile geliştirilmiş 2D macera oyunu. Savaş sistemi, diyalog, ilerleme. Takım projesi.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java" }
    ],
    career: { title: "Oynanan sezonlar", eduLabel: "AKADEMİ", expLabel: "SAHA" },
    edu: [
      { year: "2024 — 2027", school: "EPITECH NANCY", title: "MSc Pro — Siber Güv. & Bulut", desc: "Aktif pedagoji · Debian/OpenBSD/FreeBSD · Saldırı & savunma", current: true },
      { year: "2020 — 2022", school: "LYCÉE JEAN PROUVÉ", title: "BTS SNIR", desc: "C/C++, Python · VLAN, yönlendirme · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Mesleki Lise SNIR", desc: "Ağ ve sistem temelleri · Debian" }
    ],
    exp: [
      { year: "02/2025 — şimdi", company: "QUALITEST", title: "BT Asistanı (yarı zamanlı)", desc: "Anket & raporlama · PHP/JS · Veritabanı · Araştırma", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING", title: "Ekip üyesi", desc: "Salon & drive · Müşteri" },
      { year: "03/2023 — 12/2023", company: "1. RSMV · MONTIGNY-LÈS-METZ", title: "Gönüllü stajyer", desc: "Disiplin & takım · SST · Liyakat madalyası" },
      { year: "04/2021 — 06/2021", company: "CFA CHARLES DE FOUCAULD", title: "Bilgisayar odası (staj)", desc: "Kurulum · BTS için IP adresleme" },
      { year: "09/2019 — 10/2019", company: "SCIENCES PO NANCY", title: "BT bakım & dağıtım (staj)", desc: "Personel & öğrenci desteği" },
      { year: "04/2019 — 05/2019", company: "LYCÉE HENRI LORITZ", title: "BT bakım & dağıtım (staj)", desc: "Personel & öğrenci desteği" },
      { year: "01/2019 — 02/2019", company: "LYCÉE HENRI LORITZ", title: "BT bakım & dağıtım (staj)", desc: "Personel & öğrenci desteği" }
    ],
    drills: {
      title: "Günlük antrenman",
      groups: [
        { label: "SİSTEMLER", pos: "KALECİ", items: ["Linux", "Debian", "Ubuntu", "Kali Linux", "OpenBSD", "FreeBSD", "Mageia", "Windows"] },
        { label: "VERİTABANLARI", pos: "DEFANS", items: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "SQLite"] },
        { label: "AĞLAR", pos: "BEK", items: ["Router yapılandırması", "Switch yapılandırması"] },
        { label: "SİBER GÜVENLİK", pos: "LİBERO", items: ["Metasploit", "Burp Suite", "Nmap", "Hydra", "Wireshark", "John the Ripper", "Gobuster"] },
        { label: "ARAÇLAR", pos: "ORTA SAHA", items: ["Docker", "Kubernetes", "Jenkins", "GitLab CI/CD", "Traefik", "Vite", "Figma", "Tailwind CSS"] },
        { label: "DİLLER", pos: "OYUN KURUCU", items: ["JavaScript", "TypeScript", "Python", "Java", "PHP", "C/C++", "Groovy", "HTML/CSS"] },
        { label: "FRAMEWORK'LER", pos: "KANAT", items: ["React.js", "Vue.js", "Node.js", "Express.js", "Nuxt.js", "Symfony", "Flask", "Socket.io", "Playwright"] }
      ]
    },
    off: {
      title: "Klavyenin dışında",
      sub: "Beni şekillendiren dört disiplin. Disiplin, oyun ve anlatı için dört okul.",
      cta: "Hikâyeyi oku",
      close: "Kapat",
      items: [
        { id: "japan", kanji: "日本", roman: "NIPPON", label: "Japonya", color: "#e63946", role: "BİÇİM & SESSİZLİK", desc: "Anime, manga, dil, felsefe. Biçimin anlamı nasıl şekillendirdiği.", story: "Japonya tutkum, okuduğum ve izlediğim animelerle mangalardan geliyor — Naruto, Bleach, Fullmetal Alchemist: Brotherhood.\n\nAma aynı zamanda manzaralarından, kültüründen, tapınaklarından ve geleneklerinden de." },
        { id: "wrestle", kanji: "格闘", roman: "PURORESU", label: "Güreş", color: "#ffb800", role: "HAM ANLATI", desc: "Önce WWE, son zamanlarda AEW. Beden, karakter, seyirciyle hikâye anlatma sanatı.", story: "Güreş izlemeye Ruthless Aggression Era döneminde başladım.\n\nÖnce Rey Mysterio — tarzı için: hızlı, havadar, okunabilir.\n\nSonra The Deadman, The Undertaker ve Heartbreak Kid, Shawn Michaels." },
        { id: "music", kanji: "音楽", roman: "ONGAKU", label: "Müzik", color: "#ff7700", role: "ENERJİ & RİTİM", desc: "Rock, Fransız rap, metal, Japon synth. Geniş karışım, klavyeden kulaklıklara.", story: "Tam bir rap ve rock hayranıyım.\n\nMadem biraz açılmamı istiyorsunuz, işte favori şarkılarımın top 3'ü:\n- Orelsan'dan « San »\n- Linkin Park'tan « Breaking the Habit »\n- « Sign » — Flow" },
        { id: "myth", kanji: "神話", roman: "SHINWA", label: "Mitolojiler", color: "#9e7bff", role: "KURUCU ANLATILAR", desc: "Yunan, Viking, Türk, Roma, Aztek, İnka, Maya, Japon.", story: "Küçük bir hikâye: BT'de — daha doğrusu siber güvenlikte — çalışmak istemeden önce arkeolog olmak istiyordum.\n\nTarihsel keşifler yapmak ve bazı mitlerin gerçekten yaşandığını kanıtlamak için." }
      ]
    },
    languages: {
      title: "Üç dil",
      items: [
        { code: "FR", flag: "FR", label: "Français", level: "Anadil" },
        { code: "TR", flag: "TR", label: "Türkçe", level: "İki dilli" },
        { code: "EN", flag: "EN", label: "English", level: "TOEIC 790 / 990" }
      ]
    },
    contact: { title: "Son düdük.", lead: "Siber, bir proje ya da sadece merhaba demek mi istersin? Soyunma odası açık.", email: "deniz.ok@epitech.eu" }
  }
}
