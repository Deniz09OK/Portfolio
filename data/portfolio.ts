import type { Portfolio } from '~/types/portfolio'


export const portfolio: Portfolio = {
  fr: {    nav: { roster: "Fiche", matches: "Card de la saison", career: "Saisons jouées", drills: "Entraînement quotidien", off: "Hors du clavier", languages: "Trois langues", contact: "Sifflet final" },
    a11y: { navPrimary: "Navigation principale", navMobile: "Navigation mobile", language: "Langue", theme: "Changer de thème", menu: "Menu", legend: "Légende" },
    ticker: ["LIVE", "·", "PORTFOLIO 2026", "·", "MSc CYBERSÉCURITÉ & CLOUD", "·", "EPITECH NANCY", "·", "ALTERNANCE QUALITEST", "·", "TRILINGUE FR/EN/TR", "·"],

    hero: {
      number: "619",
      name1: "DENIZ",
      name2: "OK",
      position: "CYBERSÉCURITÉ & CLOUD",
      team: "QUALITEST × EPITECH NANCY",
      bio: "Passionné par la Cybersécurité et les infrastructures Cloud, je suis actuellement en MSc à Epitech Nancy. Mon alternance chez Qualitest me permet de consolider mes bases techniques à travers la gestion de bases de données, l’analyse de données et l’automatisation de tâches grâce au scripting (PowerShell, PHP, Bash). Mes domaines de prédilection : Cybersécurité (protection des données et analyse de vulnérabilités), Cloud (déploiement et sécurisation d’environnements dématérialisés), Infrastructure (maintenance système et réseau au quotidien). Je suis constamment à la recherche de nouveaux défis techniques pour allier sécurité et performance.",
      kanji: "戦",
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
      sub: "Onze matchs joués. Onze façons de gagner."
    },
    projects: [
      { idx: "01", name: "CIA — Infrastructure hybride Proxmox", kanji: "要塞", type: "Infrastructure cloud hybride", stack: "PROXMOX · PFSENSE · OPENVPN · NETBOX · ELASTICSEARCH", year: "2026", opponent: "SITES ISOLÉS ET EXPOSÉS", verdict: "INFRA HYBRIDE SÉCURISÉE", desc: "Conception, déploiement et sécurisation d’une infrastructure hybride sur deux sites Proxmox (on-prem et distant) : VPN site à site OpenVPN, pare-feu pfSense de chaque côté avec coupure d’urgence, bastion pour l’accès externe, IPAM NetBox mis à jour automatiquement, logs centralisés dans Elasticsearch, DNS forwarding entre sites et site web interne. Déploiement en IaC, runbooks et PRA, architecture prête pour un troisième site.", link: null },
      { idx: "02", name: "Veille DevSecOps IA", kanji: "視", type: "Veille technologique", stack: "PYTHON · DEVSECOPS · IA", year: "2026", opponent: "FAILLES IGNORÉES", verdict: "SÉCURITÉ ANTICIPÉE", desc: "Ressources et scripts autour de l’intégration de l’intelligence artificielle dans les processus et la culture DevSecOps.", link: "https://github.com/Deniz09OK/veille-devsecops-ia" },
      { idx: "03", name: "MediSync", kanji: "癒", type: "Plateforme e-santé", stack: "SCRUM · JIRA · REACT NATIVE · IA", year: "2025-2027", opponent: "ANGLE MORT MÉDICAL", verdict: "DONNÉES OBJECTIVES", desc: "Projet de fin de MSc mené à 10, dont je suis Scrum Master : j’anime 8 sprints calés sur l’alternance, le backlog Jira et la documentation Confluence, au service de quatre binômes (frontend, backend, IA, DevSecOps). Le produit : une app mobile et un tableau de bord médecin qui relient la prise des traitements au vécu du patient, avec une IA qui en tire des corrélations, conçus pour le RGPD et l’hébergement HDS.", link: null, wip: true },
      { idx: "04", name: "NSA — Network Security", kanji: "結界", type: "Infrastructure réseau", stack: "OPENBSD · FREEBSD", year: "2026", opponent: "RÉSEAU NON SEGMENTÉ", verdict: "PASSERELLE SÉCURISÉE", desc: "Infrastructure réseau sécurisée sous OpenBSD et FreeBSD. Configuration d’une passerelle segmentant trois réseaux privés.", link: null },
      { idx: "05", name: "Linux System Inventory", kanji: "監査", type: "Outil système", stack: "PYTHON · LINUX · VAGRANT", year: "2026", opponent: "PARC LINUX HÉTÉROGÈNE", verdict: "AUDIT AUTOMATISÉ", desc: "Outil d’inventaire système pour Linux automatisant la collecte d’informations matérielles et logicielles. Génère un rapport exploitable sur le parc.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "06", name: "Portfolio", kanji: "書庫", type: "Site personnel", stack: "NUXT · VUE · TYPESCRIPT", year: "2025-2026", opponent: "PAGE BLANCHE", verdict: "VITRINE ÉVOLUTIVE", desc: "Design éditorial mêlant cybersécurité et culture sportive/japonaise. Storytelling au scroll, multilingue FR/EN/TR, dark & light, fiche joueur en hero.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "07", name: "GoCrew", kanji: "旅", type: "Application web", stack: "JAVASCRIPT · WEB", year: "2025", opponent: "ORGANISATION CHAOTIQUE", verdict: "VOYAGE CENTRALISÉ", desc: "Application web collaborative (Pré-MSc Epitech). Centralise l’organisation de voyages en groupe dans une interface unique et intuitive.", link: "https://github.com/Deniz09OK/GoCrew" },
      { idx: "08", name: "AI-Morpion", kanji: "戦略", type: "Jeu · IA", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2025", opponent: "JOUEUR HUMAIN", verdict: "IA INVINCIBLE", desc: "Version moderne du Tic-Tac-Toe avec une IA avancée utilisant l’algorithme Minimax. Élagage alpha-bêta : l’IA joue de façon optimale.", link: "https://github.com/Deniz09OK/AI-Morpion" },
      { idx: "09", name: "CultureQuiz", kanji: "知識", type: "App desktop", stack: "PYTHON · TKINTER · GUI", year: "2025", opponent: "ENNUI", verdict: "QUIZ INTERACTIF", desc: "Application de quiz interactif en Python avec interface Tkinter. Base de questions extensible, scoring, timer par manche.", link: "https://github.com/Deniz09OK/CultureQuiz" },
      { idx: "10", name: "Popeye", kanji: "船団", type: "Conteneurisation", stack: "DOCKER · FLASK · NODE.JS · POSTGRESQL", year: "2025", opponent: "MONOLITHE WEB", verdict: "ARCHITECTURE MODULAIRE", desc: "Projet de conteneurisation avec Docker. Application web complète en architecture microservices, communication inter-services et persistance.", link: "https://github.com/Deniz09OK/Popeye" },
      { idx: "11", name: "EpiQuest", kanji: "冒険", type: "Jeu vidéo 2D", stack: "JAVA · LIBGDX · GAMEDEV", year: "2024", opponent: "MOTEUR VIDE", verdict: "AVENTURE JOUABLE", desc: "Jeu d’aventure 2D développé avec Java et LibGDX. Système de combat, dialogues, progression. Projet en équipe.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java" }
    ],
    career: {
      title: "Saisons jouées",
      eduLabel: "ACADÉMIE",
      expLabel: "TERRAIN"
    },
    edu: [
      { year: "2024 — 2027", school: "EPITECH NANCY", title: "MSc Pro — Cybersécurité & Cloud", desc: "Pédagogie active · Debian/OpenBSD/FreeBSD · Sécu offensive & défensive", current: true },
      { year: "2020 — 2022", school: "CHARLES DE FOUCAULD", title: "BTS SNIR", desc: "C/C++, Python · VLAN, routage, sous-réseaux · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Bac Pro SNIR", desc: "Bases réseau & systèmes · Virtualisation Debian" }
    ],
    exp: [
      { year: "02/2025 — aujourd’hui", company: "QUALITEST", title: "Assistant informatique (alternance)", desc: "Questionnaires & reporting (Sphinx, IQ3, Dataviv') · BDD & analyse de données · Automatisation (extraction, transferts Dropbox, détection d’anomalies)", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING", title: "Équipier polyvalent", desc: "Service salle & drive · Relation client" },
      { year: "03/2023 — 12/2023", company: "1ER RSMV · MONTIGNY-LÈS-METZ", title: "Volontaire stagiaire", desc: "Discipline & cohésion · SST · Médaille du mérite" },
      { year: "04/2021 — 06/2021", company: "CFA CHARLES DE FOUCAULD", title: "Salle informatique (stage)", desc: "Déploiement postes · Adressage IP pour BTS" },
      { year: "09/2019 — 10/2019", company: "SCIENCES PO NANCY", title: "Maintenance & déploiement IT (stage)", desc: "Support personnel & étudiants" },
      { year: "04/2019 — 05/2019", company: "LYCÉE HENRI LORITZ", title: "Maintenance & déploiement IT (stage)", desc: "Support personnel & étudiants" },
      { year: "01/2019 — 02/2019", company: "LYCÉE HENRI LORITZ", title: "Maintenance & déploiement IT (stage)", desc: "Support personnel & étudiants" }
    ],
    drills: {
      title: "Entraînement quotidien",
      sub: "Deux statuts, pas de liste gonflée : titulaire quand c’est pratiqué pour de vrai, remplaçant quand c’est seulement vu en cours.",
      legend: { starter: "TITULAIRE — utilisé sur un projet réel (livré ou en cours), en alternance ou dans une room TryHackMe dédiée", bench: "REMPLAÇANT — vu en cours ou en lab, sans pratique dédiée, ou pratiqué il y a plusieurs saisons" },
      groups: [
        { label: "INFRASTRUCTURE & RÉSEAU", pos: "GARDIEN", items: [{ name: "Proxmox VE", tier: "starter" }, { name: "pfSense", tier: "starter" }, { name: "OpenVPN", tier: "starter" }, { name: "NetBox (IPAM)", tier: "starter" }, { name: "OpenBSD", tier: "starter" }, { name: "FreeBSD", tier: "starter" }, { name: "Debian / Ubuntu", tier: "starter" }, { name: "Kali Linux", tier: "starter" }, { name: "Windows", tier: "starter" }, { name: "Vagrant", tier: "starter" }, { name: "VLAN, routage, commutateurs", tier: "bench" }] },
        { label: "SÉCURITÉ OFFENSIVE", pos: "LIBÉRO", items: [{ name: "Élévation de privilèges Linux", tier: "starter" }, { name: "Reverse & bind shells", tier: "starter" }, { name: "Énumération web & sous-domaines", tier: "starter" }, { name: "Vulnérabilités web (SSRF)", tier: "starter" }, { name: "John the Ripper", tier: "starter" }, { name: "Gobuster", tier: "starter" }, { name: "Nmap", tier: "starter" }, { name: "Burp Suite", tier: "starter" }, { name: "Metasploit", tier: "starter" }, { name: "Hydra", tier: "starter" }], proof: { label: "Profil TryHackMe · 32 rooms · Top 15 %", url: "https://tryhackme.com/p/Deniz23Ok" } },
        { label: "SÉCURITÉ DÉFENSIVE & OBSERVABILITÉ", pos: "STOPPEUR", items: [{ name: "Elasticsearch", tier: "starter" }, { name: "Wazuh (SIEM)", tier: "starter" }, { name: "Splunk", tier: "starter" }, { name: "Sysmon", tier: "starter" }, { name: "Hashing & cryptographie", tier: "starter" }, { name: "Fondamentaux SOC & SIEM", tier: "starter" }, { name: "Wireshark", tier: "bench" }] },
        { label: "AUTOMATISATION & DEVOPS", pos: "MILIEU", items: [{ name: "Docker / Compose", tier: "starter" }, { name: "GitHub Actions", tier: "starter" }, { name: "GitLab CI/CD", tier: "starter" }, { name: "Bash", tier: "starter" }, { name: "PowerShell", tier: "starter" }, { name: "pytest", tier: "starter" }, { name: "Playwright", tier: "starter" }, { name: "Jenkins", tier: "starter" }, { name: "Kubernetes", tier: "bench" }, { name: "Traefik", tier: "bench" }] },
        { label: "LANGAGES", pos: "MENEUR DE JEU", items: [{ name: "Python", tier: "starter" }, { name: "JavaScript", tier: "starter" }, { name: "TypeScript", tier: "starter" }, { name: "PHP", tier: "starter" }, { name: "Java", tier: "starter" }, { name: "HTML / CSS", tier: "starter" }, { name: "C / C++", tier: "bench" }] },
        { label: "FRAMEWORKS", pos: "AILIER", items: [{ name: "Vue.js", tier: "starter" }, { name: "Nuxt", tier: "starter" }, { name: "Node.js", tier: "starter" }, { name: "Express", tier: "starter" }, { name: "Socket.io", tier: "starter" }, { name: "Flask", tier: "starter" }, { name: "React", tier: "starter" }, { name: "Tailwind CSS", tier: "starter" }, { name: "Symfony", tier: "bench" }] },
        { label: "BASES DE DONNÉES", pos: "ARRIÈRE", items: [{ name: "PostgreSQL", tier: "starter" }, { name: "Redis", tier: "starter" }, { name: "SQLite", tier: "starter" }, { name: "MySQL", tier: "bench" }, { name: "MongoDB", tier: "bench" }] },
        { label: "GESTION DE PROJET", pos: "CAPITAINE", items: [{ name: "Scrum (Scrum Master, MediSync)", tier: "starter" }, { name: "Kanban (projet CIA)", tier: "starter" }, { name: "Jira", tier: "starter" }, { name: "Confluence", tier: "starter" }, { name: "Conventional Commits", tier: "starter" }] }
      ]
    },
    off: {
      title: "Hors du clavier",
      sub: "Cinq disciplines qui me façonnent. Cinq écoles de discipline, de jeu et de récit.",
      cta: "Lire l’histoire",
      close: "Fermer",
      items: [
        { id: "football", kanji: "蹴球", roman: "SHŪKYŪ", label: "Football", color: "#e30a17", colorAlt: "#0055a4", role: "DERNIER REMPART", desc: "PSG, France, Turquie. Un club, deux nations, et un cœur neutre les soirs de France–Turquie.", story: "Plus jeune, je jouais gardien ou défenseur central. J’étais grand, alors on me mettait derrière — mais balle au pied, je reste pire que Matuidi.\n\nJe suis fan du PSG, de l’équipe de France et de la Turquie. Alors quand il y a un France–Turquie, la famille se divise… et moi, je reste neutre : je suis pour la Suisse.\n\nEt si mes compétences sont rangées par poste sur ce site, ce n’est pas un hasard : j’ai toujours joué pour défendre le but. Aujourd’hui, je le fais en cybersécurité." },
        { id: "japan", kanji: "日本", roman: "NIPPON", label: "Japon", color: "#e63946", role: "FORME & SILENCE", desc: "Animes, mangas, langue, philosophie. La façon dont la forme structure le sens.", story: "Ma passion pour le Japon vient des mangas que j’ai lus et des animes que j’ai vus — Naruto, Bleach, ou encore Fullmetal Alchemist: Brotherhood.\n\nMais aussi de ses paysages, de sa culture, de ses temples et de ses traditions." },
        { id: "wrestle", kanji: "格闘", roman: "PURORESU", label: "Catch", color: "#ffb800", role: "STORYTELLING BRUT", desc: "WWE en premier, AEW depuis peu. L’art de raconter une histoire avec un corps, un personnage, un public.", story: "J’ai commencé à regarder le catch pendant la Ruthless Aggression Era.\n\nRey Mysterio en premier, pour son style de catch — vif, aérien, lisible.\n\nEt après, ce fut The Deadman, The Undertaker, et le Heartbreak Kid, Shawn Michaels." },
        { id: "music", kanji: "音楽", roman: "ONGAKU", label: "Musique", color: "#ff7700", role: "ÉNERGIE & RYTHME", desc: "Rock, rap français, metal, synth japonais. Le mélange large, du clavier aux écouteurs.", story: "Je suis un fan absolu de rap et de rock.\n\nEt comme je sais que vous voulez que je me mouille un peu, voici mon top 3 :\n- « San » — Orelsan\n- « Breaking the Habit » — Linkin Park\n- « Sign » — Flow" },
        { id: "myth", kanji: "神話", roman: "SHINWA", label: "Mythologies", color: "#9e7bff", role: "RÉCITS FONDATEURS", desc: "Grecque, viking, turque, romaine, aztèque, inca, maya, japonaise. Ce que les humains racontent pour tenir.", story: "Petite histoire : avant de vouloir travailler dans l’IT, et plus précisément dans la cyber, je voulais devenir archéologue.\n\nPour faire des découvertes historiques, et pour prouver que certains mythes ont vraiment existé." }
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
      lead: "Parler cyber, projet ou juste dire bonjour ? Les vestiaires sont ouverts.",
      email: "deniz.ok@epitech.eu"
    }
  },

  en: {
    nav: { roster: "Roster", matches: "Season card", career: "Seasons played", drills: "Daily training", off: "Off the keyboard", languages: "Three languages", contact: "Final whistle" },
    a11y: { navPrimary: "Primary navigation", navMobile: "Mobile navigation", language: "Language", theme: "Toggle theme", menu: "Menu", legend: "Legend" },
    ticker: ["LIVE", "·", "PORTFOLIO 2026", "·", "MSc CYBERSECURITY & CLOUD", "·", "EPITECH NANCY", "·", "QUALITEST WORK-STUDY", "·", "TRILINGUAL FR/EN/TR", "·"],
    hero: {
      number: "619",
      name1: "DENIZ",
      name2: "OK",
      position: "CYBERSECURITY & CLOUD",
      team: "QUALITEST × EPITECH NANCY",
      bio: "Passionate about Cybersecurity and Cloud infrastructure, I am currently pursuing an MSc at Epitech Nancy. My work-study position at Qualitest allows me to strengthen my technical foundations through database management, data analysis, and task automation via scripting (PowerShell, PHP, Bash). My focus areas: Cybersecurity (data protection and vulnerability analysis), Cloud (deploying and securing cloud environments), Infrastructure (day-to-day system and network maintenance). I am constantly seeking new technical challenges to combine security and performance.",
      kanji: "戦",
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
    matches: { title: "Season card", sub: "Eleven matches played. Eleven ways to win." },
    projects: [
      { idx: "01", name: "CIA — Proxmox Hybrid Infrastructure", kanji: "要塞", type: "Hybrid cloud infrastructure", stack: "PROXMOX · PFSENSE · OPENVPN · NETBOX · ELASTICSEARCH", year: "2026", opponent: "ISOLATED, EXPOSED SITES", verdict: "SECURED HYBRID INFRA", desc: "Design, deployment and hardening of a hybrid infrastructure across two Proxmox sites (on-prem and remote): OpenVPN site-to-site tunnel, pfSense firewalls on both sides with an emergency kill switch, bastion host for external access, auto-updated NetBox IPAM, centralised logs in Elasticsearch, cross-site DNS forwarding and an internal-only website. Deployed as IaC, with runbooks, a DRP and an architecture ready for a third site.", link: null },
      { idx: "02", name: "Veille DevSecOps IA", kanji: "視", type: "Tech watch", stack: "PYTHON · DEVSECOPS · AI", year: "2026", opponent: "IGNORED FLAWS", verdict: "ANTICIPATED SECURITY", desc: "Resources and scripts focused on integrating Artificial Intelligence into DevSecOps processes and culture.", link: "https://github.com/Deniz09OK/veille-devsecops-ia" },
      { idx: "03", name: "MediSync", kanji: "癒", type: "E-health platform", stack: "SCRUM · JIRA · REACT NATIVE · AI", year: "2025-2027", opponent: "MEDICAL BLIND SPOT", verdict: "OBJECTIVE DATA", desc: "MSc final project run by a team of 10, where I am the Scrum Master: I run 8 sprints aligned with the work-study schedule, the Jira backlog and the Confluence documentation, supporting four pairs (frontend, backend, AI, DevSecOps). The product: a mobile app and a doctor dashboard linking medication intake to the patient's daily experience, with an AI that draws correlations from them, designed for GDPR and HDS-certified hosting.", link: null, wip: true },
      { idx: "04", name: "NSA — Network Security", kanji: "結界", type: "Network infrastructure", stack: "OPENBSD · FREEBSD", year: "2026", opponent: "FLAT NETWORK", verdict: "SECURE GATEWAY", desc: "Secure network infrastructure on OpenBSD and FreeBSD. Configuration of a gateway segmenting three private networks.", link: null },
      { idx: "05", name: "Linux System Inventory", kanji: "監査", type: "System tool", stack: "PYTHON · LINUX · VAGRANT", year: "2026", opponent: "MIXED LINUX FLEET", verdict: "AUTOMATED AUDIT", desc: "Linux system inventory tool automating hardware and software information collection. Generates an actionable fleet report.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "06", name: "Portfolio", kanji: "書庫", type: "Personal site", stack: "NUXT · VUE · TYPESCRIPT", year: "2025-2026", opponent: "BLANK PAGE", verdict: "LIVING SHOWCASE", desc: "Editorial design blending cybersecurity with sports and Japanese culture. Scroll storytelling, FR/EN/TR i18n, dark & light, player-card hero.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "07", name: "GoCrew", kanji: "旅", type: "Web application", stack: "JAVASCRIPT · WEB", year: "2025", opponent: "CHAOTIC PLANNING", verdict: "CENTRALISED TRIP", desc: "Collaborative web app (Epitech Pre-MSc). Centralises group trip planning in a single, intuitive interface.", link: "https://github.com/Deniz09OK/GoCrew" },
      { idx: "08", name: "AI-Morpion", kanji: "戦略", type: "Game · AI", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2025", opponent: "HUMAN PLAYER", verdict: "UNBEATABLE AI", desc: "Modern take on Tic-Tac-Toe with an advanced AI powered by the Minimax algorithm. Alpha-beta pruning: the AI plays optimally.", link: "https://github.com/Deniz09OK/AI-Morpion" },
      { idx: "09", name: "CultureQuiz", kanji: "知識", type: "Desktop app", stack: "PYTHON · TKINTER · GUI", year: "2025", opponent: "BOREDOM", verdict: "INTERACTIVE QUIZ", desc: "Interactive quiz application in Python with a Tkinter interface. Extensible question bank, scoring, per-round timer.", link: "https://github.com/Deniz09OK/CultureQuiz" },
      { idx: "10", name: "Popeye", kanji: "船団", type: "Containerisation", stack: "DOCKER · FLASK · NODE.JS · POSTGRESQL", year: "2025", opponent: "WEB MONOLITH", verdict: "MODULAR ARCHITECTURE", desc: "Docker containerisation project. Full web application in a microservices architecture, with inter-service communication and persistence.", link: "https://github.com/Deniz09OK/Popeye" },
      { idx: "11", name: "EpiQuest", kanji: "冒険", type: "2D video game", stack: "JAVA · LIBGDX · GAMEDEV", year: "2024", opponent: "EMPTY ENGINE", verdict: "PLAYABLE ADVENTURE", desc: "2D adventure game built with Java and LibGDX. Combat system, dialogues, progression. Team project.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java" }
    ],
    career: { title: "Seasons played", eduLabel: "ACADEMY", expLabel: "FIELD" },
    edu: [
      { year: "2024 — 2027", school: "EPITECH NANCY", title: "MSc Pro — Cybersecurity & Cloud", desc: "Active pedagogy · Debian/OpenBSD/FreeBSD · Offensive & defensive security", current: true },
      { year: "2020 — 2022", school: "CHARLES DE FOUCAULD", title: "BTS SNIR", desc: "C/C++, Python · VLAN, routing, subnets · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Vocational Baccalaureate SNIR", desc: "Network & system foundations · Debian virtualisation" }
    ],
    exp: [
      { year: "02/2025 — now", company: "QUALITEST", title: "IT Assistant (work-study)", desc: "Questionnaires & reporting (Sphinx, IQ3, Dataviv') · Database management & data analysis · Automated scripts (extraction, Dropbox transfers, anomaly detection)", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING", title: "Crew member", desc: "Front of house & drive · Customer service" },
      { year: "03/2023 — 12/2023", company: "1ST RSMV · MONTIGNY-LÈS-METZ", title: "Volunteer trainee", desc: "Discipline & teamwork · First-aid (SST) · Merit medal" },
      { year: "04/2021 — 06/2021", company: "CFA CHARLES DE FOUCAULD", title: "IT room support (internship)", desc: "Workstation rollout · IP addressing for BTS" },
      { year: "09/2019 — 10/2019", company: "SCIENCES PO NANCY", title: "IT maintenance & deployment (intern)", desc: "Staff & student support" },
      { year: "04/2019 — 05/2019", company: "LYCÉE HENRI LORITZ", title: "IT maintenance & deployment (intern)", desc: "Staff & student support" },
      { year: "01/2019 — 02/2019", company: "LYCÉE HENRI LORITZ", title: "IT maintenance & deployment (intern)", desc: "Staff & student support" }
    ],
    drills: {
      title: "Daily training",
      sub: "Two statuses, no padded list: starter when genuinely practised, bench when only covered in class.",
      legend: { starter: "STARTER — used on a real project (shipped or ongoing), at work or in a dedicated TryHackMe room", bench: "BENCH — covered in class or a lab without dedicated practice, or several seasons ago" },
      groups: [
        { label: "INFRASTRUCTURE & NETWORK", pos: "KEEPER", items: [{ name: "Proxmox VE", tier: "starter" }, { name: "pfSense", tier: "starter" }, { name: "OpenVPN", tier: "starter" }, { name: "NetBox (IPAM)", tier: "starter" }, { name: "OpenBSD", tier: "starter" }, { name: "FreeBSD", tier: "starter" }, { name: "Debian / Ubuntu", tier: "starter" }, { name: "Kali Linux", tier: "starter" }, { name: "Windows", tier: "starter" }, { name: "Vagrant", tier: "starter" }, { name: "VLANs, routing, switches", tier: "bench" }] },
        { label: "OFFENSIVE SECURITY", pos: "SWEEPER", items: [{ name: "Linux privilege escalation", tier: "starter" }, { name: "Reverse & bind shells", tier: "starter" }, { name: "Web & subdomain enumeration", tier: "starter" }, { name: "Web vulnerabilities (SSRF)", tier: "starter" }, { name: "John the Ripper", tier: "starter" }, { name: "Gobuster", tier: "starter" }, { name: "Nmap", tier: "starter" }, { name: "Burp Suite", tier: "starter" }, { name: "Metasploit", tier: "starter" }, { name: "Hydra", tier: "starter" }], proof: { label: "TryHackMe profile · 32 rooms · Top 15%", url: "https://tryhackme.com/p/Deniz23Ok" } },
        { label: "DEFENSIVE SECURITY & OBSERVABILITY", pos: "CENTRE-BACK", items: [{ name: "Elasticsearch", tier: "starter" }, { name: "Wazuh (SIEM)", tier: "starter" }, { name: "Splunk", tier: "starter" }, { name: "Sysmon", tier: "starter" }, { name: "Hashing & cryptography", tier: "starter" }, { name: "SOC & SIEM fundamentals", tier: "starter" }, { name: "Wireshark", tier: "bench" }] },
        { label: "AUTOMATION & DEVOPS", pos: "MID-FIELD", items: [{ name: "Docker / Compose", tier: "starter" }, { name: "GitHub Actions", tier: "starter" }, { name: "GitLab CI/CD", tier: "starter" }, { name: "Bash", tier: "starter" }, { name: "PowerShell", tier: "starter" }, { name: "pytest", tier: "starter" }, { name: "Playwright", tier: "starter" }, { name: "Jenkins", tier: "starter" }, { name: "Kubernetes", tier: "bench" }, { name: "Traefik", tier: "bench" }] },
        { label: "LANGUAGES", pos: "PLAYMAKER", items: [{ name: "Python", tier: "starter" }, { name: "JavaScript", tier: "starter" }, { name: "TypeScript", tier: "starter" }, { name: "PHP", tier: "starter" }, { name: "Java", tier: "starter" }, { name: "HTML / CSS", tier: "starter" }, { name: "C / C++", tier: "bench" }] },
        { label: "FRAMEWORKS", pos: "WINGER", items: [{ name: "Vue.js", tier: "starter" }, { name: "Nuxt", tier: "starter" }, { name: "Node.js", tier: "starter" }, { name: "Express", tier: "starter" }, { name: "Socket.io", tier: "starter" }, { name: "Flask", tier: "starter" }, { name: "React", tier: "starter" }, { name: "Tailwind CSS", tier: "starter" }, { name: "Symfony", tier: "bench" }] },
        { label: "DATABASES", pos: "FULL-BACK", items: [{ name: "PostgreSQL", tier: "starter" }, { name: "Redis", tier: "starter" }, { name: "SQLite", tier: "starter" }, { name: "MySQL", tier: "bench" }, { name: "MongoDB", tier: "bench" }] },
        { label: "PROJECT MANAGEMENT", pos: "CAPTAIN", items: [{ name: "Scrum (Scrum Master, MediSync)", tier: "starter" }, { name: "Kanban (CIA project)", tier: "starter" }, { name: "Jira", tier: "starter" }, { name: "Confluence", tier: "starter" }, { name: "Conventional Commits", tier: "starter" }] }
      ]
    },
    off: {
      title: "Off the keyboard",
      sub: "Five disciplines that shape me. Five schools of discipline, play and story.",
      cta: "Read the story",
      close: "Close",
      items: [
        { id: "football", kanji: "蹴球", roman: "SHŪKYŪ", label: "Football", color: "#e30a17", colorAlt: "#0055a4", role: "LAST LINE OF DEFENCE", desc: "PSG, France, Turkey. One club, two nations, and a neutral heart whenever France play Turkey.", story: "When I was younger, I played in goal or at centre-back. I was tall, so they put me at the back — but with the ball at my feet, I’m still worse than Matuidi.\n\nI support PSG, the French national team and Turkey. So whenever France play Turkey, the family is split… and I stay neutral: I support Switzerland.\n\nAnd if my skills on this site are sorted by position, that’s no accident: I’ve always played to defend the goal. Today, I do it in cybersecurity." },
        { id: "japan", kanji: "日本", roman: "NIPPON", label: "Japan", color: "#e63946", role: "FORM & SILENCE", desc: "Anime, manga, language, philosophy. How form shapes meaning.", story: "My passion for Japan started with the anime and manga I grew up reading and watching — Naruto, Bleach, Fullmetal Alchemist: Brotherhood.\n\nBut also its landscapes, its culture, its temples and its traditions." },
        { id: "wrestle", kanji: "格闘", roman: "PURORESU", label: "Wrestling", color: "#ffb800", role: "RAW STORYTELLING", desc: "WWE first, AEW lately. Telling a story with a body, a character, a crowd.", story: "I started watching wrestling during the Ruthless Aggression Era.\n\nRey Mysterio first, for his style — fast, aerial, readable.\n\nAnd after that, The Deadman, The Undertaker, and the Heartbreak Kid, Shawn Michaels." },
        { id: "music", kanji: "音楽", roman: "ONGAKU", label: "Music", color: "#ff7700", role: "ENERGY & RHYTHM", desc: "Rock, French rap, metal, Japanese synth. Wide mix, from the keyboard to the headphones.", story: "I'm an absolute rap and rock fan.\n\nAnd since you want me to open up a bit, here's my personal top 3:\n- “San” — Orelsan\n- “Breaking the Habit” — Linkin Park\n- “Sign” — Flow" },
        { id: "myth", kanji: "神話", roman: "SHINWA", label: "Mythologies", color: "#9e7bff", role: "FOUNDING NARRATIVES", desc: "Greek, Viking, Turkish, Roman, Aztec, Inca, Maya, Japanese. What humans tell themselves to keep going.", story: "A little backstory: before wanting to work in IT — and more specifically in cybersecurity — I wanted to be an archaeologist.\n\nTo make historical discoveries, and to prove that some myths really did happen." }
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
    contact: { title: "Final whistle.", lead: "Want to talk cyber, a project, or just say hi? The locker room is open.", email: "deniz.ok@epitech.eu" }
  },

  tr: {
    nav: { roster: "Kadro", matches: "Sezon kartı", career: "Oynanan sezonlar", drills: "Günlük antrenman", off: "Klavyenin dışında", languages: "Üç dil", contact: "Son düdük" },
    a11y: { navPrimary: "Ana gezinme", navMobile: "Mobil gezinme", language: "Dil", theme: "Temayı değiştir", menu: "Menü", legend: "Açıklama" },
    ticker: ["CANLI", "·", "PORTFOLYO 2026", "·", "MSc SİBER GÜVENLİK & BULUT", "·", "EPITECH NANCY", "·", "QUALITEST DÖNÜŞÜMLÜ EĞİTİM", "·", "ÜÇ DİLLİ FR/EN/TR", "·"],
    hero: {
      number: "619",
      name1: "DENIZ",
      name2: "OK",
      position: "SİBER GÜVENLİK & BULUT",
      team: "QUALITEST × EPITECH NANCY",
      bio: "Siber Güvenlik ve Bulut altyapılarına tutkuyla bağlı biri olarak, şu anda Epitech Nancy'de MSc eğitimime devam ediyorum. Qualitest'teki dönüşümlü eğitim çalışmam, veritabanı yönetimi, veri analizi ve scripting (PowerShell, PHP, Bash) ile görev otomasyonu aracılığıyla teknik temellerimi güçlendirmeme olanak tanıyor. Odak alanlarım: Siber Güvenlik (veri koruma ve güvenlik açığı analizi), Bulut (sanallaştırılmış ortamların dağıtımı ve güvenliği), Altyapı (günlük sistem ve ağ bakımı). Güvenliği ve performansı bir araya getirecek yeni teknik zorlukları sürekli arıyorum.",
      kanji: "戦",
      tale: [
        { k: "ÜS", v: "Jarville-la-Malgrange · FR" },
        { k: "DRAFT", v: "Epitech Nancy · 2027 mezunu" },
        { k: "SÖZLEŞME", v: "Dönüşümlü eğitim — Qualitest" },
        { k: "DURUM", v: "DÖNÜŞÜMLÜ EĞİTİM · QUALITEST + EPITECH" }
      ],
      cta1: "Kartı gör",
      cta2: "CV indir",
      cta3: "İletişim"
    },
    matches: { title: "Sezon kartı", sub: "On bir maç oynandı. On bir kazanma yolu." },
    projects: [
      { idx: "01", name: "CIA — Proxmox Hibrit Altyapı", kanji: "要塞", type: "Hibrit bulut altyapısı", stack: "PROXMOX · PFSENSE · OPENVPN · NETBOX · ELASTICSEARCH", year: "2026", opponent: "İZOLE VE AÇIKTA SİTELER", verdict: "GÜVENLİ HİBRİT ALTYAPI", desc: "İki Proxmox sitesi (yerinde ve uzak) üzerinde hibrit bir altyapının tasarımı, kurulumu ve güvenliğinin sağlanması: OpenVPN ile siteler arası VPN, her iki tarafta acil kesme özellikli pfSense güvenlik duvarları, dış erişim için bastion sunucusu, otomatik güncellenen NetBox IPAM, Elasticsearch'te merkezi log toplama, siteler arası DNS yönlendirme ve yalnızca iç ağdan erişilebilen web sitesi. IaC ile dağıtım, runbook'lar, felaket kurtarma planı ve üçüncü siteye hazır mimari.", link: null },
      { idx: "02", name: "Veille DevSecOps IA", kanji: "視", type: "Teknoloji takibi", stack: "PYTHON · DEVSECOPS · YZ", year: "2026", opponent: "GÖZ ARDI EDİLEN AÇIKLAR", verdict: "ÖNGÖRÜLEN GÜVENLİK", desc: "yapay zekânın DevSecOps süreçlerine ve kültürüne entegrasyonu üzerine kaynaklar ve betikler.", link: "https://github.com/Deniz09OK/veille-devsecops-ia" },
      { idx: "03", name: "MediSync", kanji: "癒", type: "E-sağlık platformu", stack: "SCRUM · JIRA · REACT NATIVE · YZ", year: "2025-2027", opponent: "TIBBİ KÖR NOKTA", verdict: "OBJEKTİF VERİ", desc: "10 kişilik ekiple yürütülen MSc bitirme projesi; Scrum Master benim: dönüşümlü eğitim takvimine göre planlanan 8 sprinti, Jira backlog'unu ve Confluence dokümantasyonunu yönetiyor, dört ikiliye (frontend, backend, YZ, DevSecOps) destek oluyorum. Ürün: ilaç kullanımını hastanın günlük deneyimiyle ilişkilendiren bir mobil uygulama ve doktor paneli; bir YZ bunlardan korelasyonlar çıkarıyor. GDPR ve HDS barındırma için tasarlandı.", link: null, wip: true },
      { idx: "04", name: "NSA — Network Security", kanji: "結界", type: "Ağ altyapısı", stack: "OPENBSD · FREEBSD", year: "2026", opponent: "SEGMENTSİZ AĞ", verdict: "GÜVENLİ AĞ GEÇİDİ", desc: "OpenBSD ve FreeBSD üzerinde güvenli ağ altyapısı. Üç özel ağı segmentlere ayıran bir ağ geçidinin yapılandırılması.", link: null },
      { idx: "05", name: "Linux System Inventory", kanji: "監査", type: "Sistem aracı", stack: "PYTHON · LINUX · VAGRANT", year: "2026", opponent: "KARIŞIK LINUX FİLOSU", verdict: "OTOMATİK DENETİM", desc: "Donanım ve yazılım bilgilerinin toplanmasını otomatikleştiren Linux sistem envanter aracı. Filo için kullanılabilir bir rapor üretir.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "06", name: "Portfolio", kanji: "書庫", type: "Kişisel site", stack: "NUXT · VUE · TYPESCRIPT", year: "2025-2026", opponent: "BOŞ SAYFA", verdict: "YAŞAYAN VİTRİN", desc: "Siber güvenlik ile spor ve Japon kültürünü harmanlayan editöryel tasarım. Kaydırmalı anlatım, FR/EN/TR çoklu dil, koyu ve açık tema, hero'da oyuncu kartı.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "07", name: "GoCrew", kanji: "旅", type: "Web uygulaması", stack: "JAVASCRIPT · WEB", year: "2025", opponent: "KAOTİK PLANLAMA", verdict: "MERKEZİ SEYAHAT", desc: "İş birliğine dayalı web uygulaması (Epitech Pre-MSc). Grup seyahat organizasyonunu tek ve sezgisel bir arayüzde toplar.", link: "https://github.com/Deniz09OK/GoCrew" },
      { idx: "08", name: "AI-Morpion", kanji: "戦略", type: "Oyun · YZ", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2025", opponent: "İNSAN OYUNCU", verdict: "YENİLMEZ YZ", desc: "Minimax algoritmasını kullanan gelişmiş bir YZ ile Tic-Tac-Toe'nun modern sürümü. Alfa-beta budama: YZ en iyi hamleyi oynar.", link: "https://github.com/Deniz09OK/AI-Morpion" },
      { idx: "09", name: "CultureQuiz", kanji: "知識", type: "Masaüstü uygulaması", stack: "PYTHON · TKINTER · GUI", year: "2025", opponent: "SIKINTI", verdict: "İNTERAKTİF BİLGİ YARIŞMASI", desc: "Tkinter arayüzlü, Python ile geliştirilmiş interaktif bilgi yarışması uygulaması. Genişletilebilir soru tabanı, puanlama, tur başına zamanlayıcı.", link: "https://github.com/Deniz09OK/CultureQuiz" },
      { idx: "10", name: "Popeye", kanji: "船団", type: "Konteynerleştirme", stack: "DOCKER · FLASK · NODE.JS · POSTGRESQL", year: "2025", opponent: "WEB MONOLİT", verdict: "MODÜLER MİMARİ", desc: "Docker ile konteynerleştirme projesi. Mikroservis mimarisinde tam bir web uygulaması, servisler arası iletişim ve kalıcılık.", link: "https://github.com/Deniz09OK/Popeye" },
      { idx: "11", name: "EpiQuest", kanji: "冒険", type: "2D video oyunu", stack: "JAVA · LIBGDX · OYUN", year: "2024", opponent: "BOŞ MOTOR", verdict: "OYNANABİLİR MACERA", desc: "Java ve LibGDX ile geliştirilmiş 2D macera oyunu. Savaş sistemi, diyaloglar, ilerleme. Takım projesi.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java" }
    ],
    career: { title: "Oynanan sezonlar", eduLabel: "AKADEMİ", expLabel: "SAHA" },
    edu: [
      { year: "2024 — 2027", school: "EPITECH NANCY", title: "MSc Pro — Siber Güvenlik & Bulut", desc: "Aktif pedagoji · Debian/OpenBSD/FreeBSD · Saldırı & savunma", current: true },
      { year: "2020 — 2022", school: "CHARLES DE FOUCAULD", title: "BTS SNIR", desc: "C/C++, Python · VLAN, yönlendirme, alt ağlar · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Mesleki Lise SNIR", desc: "Ağ ve sistem temelleri · Debian sanallaştırma" }
    ],
    exp: [
      { year: "02/2025 — şimdi", company: "QUALITEST", title: "BT Asistanı (dönüşümlü eğitim)", desc: "Anket & raporlama (Sphinx, IQ3, Dataviv') · Veritabanı yönetimi & veri analizi · Otomasyon (çıkarma, Dropbox aktarımları, anomali tespiti)", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING", title: "Ekip üyesi", desc: "Salon & drive · Müşteri ilişkileri" },
      { year: "03/2023 — 12/2023", company: "1. RSMV · MONTIGNY-LÈS-METZ", title: "Gönüllü stajyer", desc: "Disiplin & takım çalışması · SST · Liyakat madalyası" },
      { year: "04/2021 — 06/2021", company: "CFA CHARLES DE FOUCAULD", title: "Bilgisayar odası (staj)", desc: "İş istasyonu kurulumu · BTS için IP adresleme" },
      { year: "09/2019 — 10/2019", company: "SCIENCES PO NANCY", title: "BT bakım & dağıtım (staj)", desc: "Personel & öğrenci desteği" },
      { year: "04/2019 — 05/2019", company: "LYCÉE HENRI LORITZ", title: "BT bakım & dağıtım (staj)", desc: "Personel & öğrenci desteği" },
      { year: "01/2019 — 02/2019", company: "LYCÉE HENRI LORITZ", title: "BT bakım & dağıtım (staj)", desc: "Personel & öğrenci desteği" }
    ],
    drills: {
      title: "Günlük antrenman",
      sub: "İki statü, şişirilmiş liste yok: gerçekten pratik yapıldıysa ilk 11, yalnızca derste görüldüyse yedek.",
      legend: { starter: "İLK 11 — gerçek bir projede (teslim edilmiş ya da devam eden), işte ya da özel bir TryHackMe odasında kullanıldı", bench: "YEDEK — derste ya da laboratuvarda görüldü, özel pratik yok, ya da birkaç sezon önce" },
      groups: [
        { label: "ALTYAPI & AĞ", pos: "KALECİ", items: [{ name: "Proxmox VE", tier: "starter" }, { name: "pfSense", tier: "starter" }, { name: "OpenVPN", tier: "starter" }, { name: "NetBox (IPAM)", tier: "starter" }, { name: "OpenBSD", tier: "starter" }, { name: "FreeBSD", tier: "starter" }, { name: "Debian / Ubuntu", tier: "starter" }, { name: "Kali Linux", tier: "starter" }, { name: "Windows", tier: "starter" }, { name: "Vagrant", tier: "starter" }, { name: "VLAN, yönlendirme, switch", tier: "bench" }] },
        { label: "OFANSİF GÜVENLİK", pos: "LİBERO", items: [{ name: "Linux yetki yükseltme", tier: "starter" }, { name: "Reverse & bind shell", tier: "starter" }, { name: "Web & alt alan adı keşfi", tier: "starter" }, { name: "Web zafiyetleri (SSRF)", tier: "starter" }, { name: "John the Ripper", tier: "starter" }, { name: "Gobuster", tier: "starter" }, { name: "Nmap", tier: "starter" }, { name: "Burp Suite", tier: "starter" }, { name: "Metasploit", tier: "starter" }, { name: "Hydra", tier: "starter" }], proof: { label: "TryHackMe profili · 32 oda · İlk %15", url: "https://tryhackme.com/p/Deniz23Ok" } },
        { label: "DEFANSİF GÜVENLİK & GÖZLEMLENEBİLİRLİK", pos: "STOPER", items: [{ name: "Elasticsearch", tier: "starter" }, { name: "Wazuh (SIEM)", tier: "starter" }, { name: "Splunk", tier: "starter" }, { name: "Sysmon", tier: "starter" }, { name: "Hashing & kriptografi", tier: "starter" }, { name: "SOC & SIEM temelleri", tier: "starter" }, { name: "Wireshark", tier: "bench" }] },
        { label: "OTOMASYON & DEVOPS", pos: "ORTA SAHA", items: [{ name: "Docker / Compose", tier: "starter" }, { name: "GitHub Actions", tier: "starter" }, { name: "GitLab CI/CD", tier: "starter" }, { name: "Bash", tier: "starter" }, { name: "PowerShell", tier: "starter" }, { name: "pytest", tier: "starter" }, { name: "Playwright", tier: "starter" }, { name: "Jenkins", tier: "starter" }, { name: "Kubernetes", tier: "bench" }, { name: "Traefik", tier: "bench" }] },
        { label: "DİLLER", pos: "OYUN KURUCU", items: [{ name: "Python", tier: "starter" }, { name: "JavaScript", tier: "starter" }, { name: "TypeScript", tier: "starter" }, { name: "PHP", tier: "starter" }, { name: "Java", tier: "starter" }, { name: "HTML / CSS", tier: "starter" }, { name: "C / C++", tier: "bench" }] },
        { label: "FRAMEWORK'LER", pos: "KANAT", items: [{ name: "Vue.js", tier: "starter" }, { name: "Nuxt", tier: "starter" }, { name: "Node.js", tier: "starter" }, { name: "Express", tier: "starter" }, { name: "Socket.io", tier: "starter" }, { name: "Flask", tier: "starter" }, { name: "React", tier: "starter" }, { name: "Tailwind CSS", tier: "starter" }, { name: "Symfony", tier: "bench" }] },
        { label: "VERİTABANLARI", pos: "BEK", items: [{ name: "PostgreSQL", tier: "starter" }, { name: "Redis", tier: "starter" }, { name: "SQLite", tier: "starter" }, { name: "MySQL", tier: "bench" }, { name: "MongoDB", tier: "bench" }] },
        { label: "PROJE YÖNETİMİ", pos: "KAPTAN", items: [{ name: "Scrum (Scrum Master, MediSync)", tier: "starter" }, { name: "Kanban (CIA projesi)", tier: "starter" }, { name: "Jira", tier: "starter" }, { name: "Confluence", tier: "starter" }, { name: "Conventional Commits", tier: "starter" }] }
      ]
    },
    off: {
      title: "Klavyenin dışında",
      sub: "Beni şekillendiren beş disiplin. Disiplin, oyun ve anlatı için beş okul.",
      cta: "Hikâyeyi oku",
      close: "Kapat",
      items: [
        { id: "football", kanji: "蹴球", roman: "SHŪKYŪ", label: "Futbol", color: "#e30a17", colorAlt: "#0055a4", role: "SON KALE", desc: "PSG, Fransa, Türkiye. Bir kulüp, iki millet ve Fransa–Türkiye akşamlarında tarafsız bir kalp.", story: "Küçükken kaleci ya da stoper oynardım. Uzun boyluydum, o yüzden beni hep arkaya koyarlardı — ama top ayağımdayken Matuidi’den bile kötüyüm.\n\nPSG’yi, Fransa Milli Takımı’nı ve Türkiye’yi tutuyorum. Bu yüzden bir Fransa–Türkiye maçı olduğunda aile ikiye bölünür… ben ise tarafsız kalırım: İsviçre’yi tutuyorum.\n\nBu sitede yeteneklerimin mevkilere göre sıralanması tesadüf değil: hep kaleyi savunmak için oynadım. Bugün bunu siber güvenlikte yapıyorum." },
        { id: "japan", kanji: "日本", roman: "NIPPON", label: "Japonya", color: "#e63946", role: "BİÇİM & SESSİZLİK", desc: "Anime, manga, dil, felsefe. Biçimin anlamı nasıl şekillendirdiği.", story: "Japonya tutkum, okuduğum ve izlediğim anime ve mangalardan geliyor — Naruto, Bleach, Fullmetal Alchemist: Brotherhood.\n\nAma aynı zamanda manzaralarından, kültüründen, tapınaklarından ve geleneklerinden de." },
        { id: "wrestle", kanji: "格闘", roman: "PURORESU", label: "Güreş", color: "#ffb800", role: "HAM ANLATI", desc: "Önce WWE, son zamanlarda AEW. Beden, karakter, seyirciyle hikâye anlatma sanatı.", story: "Güreş izlemeye Ruthless Aggression Era döneminde başladım.\n\nÖnce Rey Mysterio — tarzı için: hızlı, havai, okunabilir.\n\nSonra The Deadman, The Undertaker ve Heartbreak Kid, Shawn Michaels." },
        { id: "music", kanji: "音楽", roman: "ONGAKU", label: "Müzik", color: "#ff7700", role: "ENERJİ & RİTİM", desc: "Rock, Fransız rap, metal, Japon synth. Geniş karışım, klavyeden kulaklıklara.", story: "Tam bir rap ve rock hayranıyım.\n\nMadem biraz açılmamı istiyorsunuz, işte favori şarkılarımın top 3'ü:\n- Orelsan'dan “San”\n- Linkin Park'tan “Breaking the Habit”\n- Flow'dan “Sign”" },
        { id: "myth", kanji: "神話", roman: "SHINWA", label: "Mitolojiler", color: "#9e7bff", role: "KURUCU ANLATILAR", desc: "Yunan, Viking, Türk, Roma, Aztek, İnka, Maya, Japon. İnsanların ayakta kalmak için anlattıkları.", story: "Küçük bir hikâye: BT'de — daha doğrusu siber güvenlikte — çalışmak istemeden önce arkeolog olmak istiyordum.\n\nTarihsel keşifler yapmak ve bazı mitlerin gerçekten yaşandığını kanıtlamak için." }
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
    contact: { title: "Son düdük.", lead: "Siber güvenlik ya da bir proje hakkında konuşmak, ya da sadece merhaba demek mi istersin? Soyunma odası açık.", email: "deniz.ok@epitech.eu" }
  }
}
