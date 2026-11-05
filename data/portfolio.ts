import type { Portfolio } from '~/types/portfolio'

export const portfolio: Portfolio = {
  fr: {
    nav: { roster: "Fiche", matches: "Card de la saison", career: "Saisons jouées", drills: "Entraînement quotidien", htb: "Labs cyber", htbSub: "HTB & TryHackMe", off: "Hors du clavier", languages: "Trois langues", contact: "Sifflet final" },
    sectionLabels: { roster: "Profil", matches: "Projets", career: "Parcours", drills: "Compétences", htb: "Hack The Box", thm: "TryHackMe", off: "Centres d'intérêt", languages: "Langues", contact: "Contact" },
    a11y: { navPrimary: "Navigation principale", navMobile: "Navigation mobile", language: "Langue", theme: "Thème clair", menu: "Menu", legend: "Légende", backToTop: "Remonter en haut de page" },
    ticker: ["ALTERNANCE CYBER & DEV WEB", "·", "DISPONIBLE IMMÉDIATEMENT", "·", "GRAND EST & LUXEMBOURG", "·", "MSc CYBERSÉCURITÉ & CLOUD", "·", "EPITECH NANCY", "·", "TRILINGUE FR/EN/TR", "·", "OUVERT AUX OPPORTUNITÉS", "·", "LIVE", "·", "PORTFOLIO 2026", "·"],
    seoTitle: "Deniz OK — Alternant Cybersécurité & Dev web · Epitech Nancy",
    seoJobTitle: "Alternant en cybersécurité et développement web",
    ogImageAlt: "Deniz OK, alternant cybersécurité et dev web, Epitech Nancy",
    seoDescription: "Deniz OK — alternant en cybersécurité & développement web, MSc à Epitech Nancy. Disponible dès maintenant jusqu'en 09/2027, Grand Est & Luxembourg.",

    hero: {
      number: "619",
      numberNote: "Clin d’œil au 619, la prise de finish de Rey Mysterio et de Dominik Mysterio.",
      luckyNote: "Mon chiffre porte-bonheur : 23",
      numberLabel: "En savoir plus sur le 619",
      luckyLabel: "En savoir plus sur le 23",
      name1: "DENIZ",
      name2: "OK",
      position: "CYBERSÉCURITÉ & CLOUD",
      team: "EN RECHERCHE D’ALTERNANCE · EPITECH NANCY",
      bio: "Étudiant en MSc Cybersécurité & Cloud à Epitech Nancy, je recherche une alternance en cybersécurité ou en développement web, disponible dès maintenant et jusqu’en septembre 2027. Depuis février 2025 chez Qualitest, je développe des pipelines de données Python pour des clients, j’administre des serveurs Windows et j’automatise les traitements (Python, PowerShell, PHP, Bash).",
      kanji: "戦",
      tale: [
        { k: "BASE", v: "Jarville-la-Malgrange (Nancy) · train/bus, déménagement possible" },
        { k: "DRAFT", v: "Epitech Nancy · Promo 2027" },
        { k: "CONTRAT", v: "Alternance (apprentissage ou pro) · 4 j entreprise / 1 j école · jusqu'en 09/2027" },
        { k: "STATUT", v: "Alternance cyber & dev web · Disponible immédiatement · Grand Est & Luxembourg" }
      ],
      cta1: "Voir les matchs",
      cta2: "Télécharger CV",
      cta3: "Me contacter"
    },
    matches: {
      title: "Card de la saison",
      sub: "Six matchs à l’affiche, cinq autres en réserve.",
      more: "Voir les 5 projets plus anciens (2024‑2025)"
    },
    projects: [
      { idx: "01", name: "CIA — Infrastructure hybride Proxmox", kanji: "要塞", type: "Infrastructure hybride multi-site", stack: "PROXMOX VE · PFSENSE · OPENVPN · NETBOX · ELASTICSEARCH · TERRAFORM · LINUX", year: "2026", opponent: "SITES ISOLÉS ET EXPOSÉS", verdict: "INFRA HYBRIDE SÉCURISÉE", desc: "CIA (Cloud Infrastructure Architects) : conception, déploiement et sécurisation d’une infrastructure hybride sur deux sites Proxmox, reliés par un VPN site à site. Le cahier des charges imposait un maximum de 3 VM par site et une architecture prête à accueillir de nouveaux sites. Projet Epitech, de janvier à juin 2026, équipe de 4 puis 5 personnes. Projet terminé.", link: null, schema: "/diagrams/cia-architecture.svg", status: "INFRASTRUCTURE DÉMONTÉE EN FIN DE PROJET", caseStudy: [{ label: "Mon rôle", text: "Chef de projet, et responsable des pare-feu pfSense et du VPN OpenVPN entre les deux sites. J’ai piloté le projet en Kanban : découpage en tickets, planning, suivi des blocages et des jalons." }, { label: "Stack", text: "Proxmox VE, pfSense, OpenVPN, NetBox (IPAM), Elasticsearch, Terraform, VM Linux." }, { label: "Sécurité", text: "Pare-feu sur chaque site pour limiter l’exposition. Le VPN site à site est chiffré. L’accès externe au site distant passe par un bastion, avec authentification par clé SSH uniquement. L’équipe a aussi mis en place une coupure d’urgence : si une adresse IP inattendue est détectée, la liaison est coupée immédiatement." }, { label: "Ce que j’en retiens", text: "C’était mon premier projet en tant que chef de projet. J’ai appris à découper, planifier et répartir le travail, et c’est sur ce point que je ferais différemment aujourd’hui : un cadrage plus précis dès le départ et un suivi plus régulier." }] },
      { idx: "02", name: "Veille DevSecOps IA", kanji: "視", type: "Agent IA · automatisation", stack: "PYTHON · PLAYWRIGHT · GROQ · MISTRAL · CHROMADB · GITHUB ACTIONS", year: "2026", opponent: "OFFRES NOYÉES DANS LE BRUIT", verdict: "VEILLE AUTOMATISÉE", desc: "Agent Python qui collecte chaque jour les offres d’alternance (API France Travail et La Bonne Alternance, scraping Playwright), les note avec deux LLM (via Groq, puis contre-vérification par Mistral) et une mémoire RAG (ChromaDB), recommande le CV adapté et rédige une ébauche de candidature. Planifié sur GitHub Actions, bloqué si les tests échouent.", link: "https://github.com/Deniz09OK/veille-devsecops-ia", caseStudy: [{ label: "Mon rôle", text: "Projet personnel conçu, développé et maintenu seul : collecte des offres, filtres, scoring par IA, rapports et automatisation." }, { label: "Stack", text: "Python 3.11, Playwright, API France Travail et La Bonne Alternance, Groq et Mistral, ChromaDB, pandas et openpyxl, pytest, GitHub Actions." }, { label: "Sécurité", text: "Secrets dans GitHub Secrets, jamais dans le dépôt. Sorties des modèles validées (scores bornés de 0 à 10, relance en cas de limite de débit). Tests obligatoires : s’ils échouent, le run du jour est bloqué. Aucune candidature n’est envoyée automatiquement : je relis et je décide moi-même. Les sites qui bloquaient le scraping ont été retirés, pas contournés." }, { label: "Ce que j’en retiens", text: "Faire se contre-vérifier deux modèles et calibrer le scoring avec mes résultats réels (entretien, refus, sans réponse) limite les erreurs d’un seul modèle. Et un pipeline automatique doit être bloqué par ses tests, sinon il produit de faux résultats sans que personne ne le voie." }] },
      { idx: "03", name: "MediSync", kanji: "癒", type: "Plateforme de santé connectée", stack: "REACT NATIVE · TYPESCRIPT · REACT · FASTAPI · POSTGRESQL · REDIS · CELERY · ML KIT · GITLAB CI/CD", year: "2025-2027", opponent: "ANGLE MORT MÉDICAL", verdict: "DONNÉES OBJECTIVES", desc: "MediSync, plateforme de santé connectée pour le suivi des maladies chroniques. Elle relie le patient et son médecin entre deux consultations : une application mobile pour gérer ses traitements (scan d’ordonnance par OCR, rappels) et tenir un journal de symptômes, et un tableau de bord médecin qui met en évidence les liens entre observance et symptômes. Projet de fin de cycle Epitech, équipe de 10 personnes, livraison prévue en avril 2027.", link: null, wip: true, caseStudy: [{ label: "Mon rôle", text: "Scrum Master. J’adapte Scrum à une équipe en alternance : des sprints calés sur nos périodes à l’école, des points d’avancement hebdomadaires asynchrones sur Discord, le suivi des tickets et du backlog dans Jira, la documentation sur Confluence, et le suivi des merge requests sur GitLab." }, { label: "Stack", text: "React Native et TypeScript (mobile), React (dashboard médecin), FastAPI (API et microservice IA), PostgreSQL, Redis et Celery, ML Kit pour l’OCR, CI/CD GitLab, Railway pour le développement." }, { label: "Sécurité", text: "Conçue dès le départ (security by design) avec une équipe DevSecOps dédiée : chiffrement, authentification forte, contrôle d’accès par rôles et isolation des données patient. Le développement se fait sur des données fictives. Le cadre RGPD et les exigences d’hébergement de données de santé guident la conception, sans prétendre à une conformité tant que le projet n’est pas en production." }, { label: "Ce que j’en retiens", text: "Coordonner 10 personnes en alternance, c’est surtout de la communication. Relancer sans braquer, prioriser quand les réponses tardent, et garder tout le monde aligné sur le même objectif." }] },
      { idx: "04", name: "NSA — Network Security", kanji: "結界", type: "Infrastructure réseau", stack: "OPENBSD · FREEBSD", year: "2026", opponent: "RÉSEAU NON SEGMENTÉ", verdict: "PASSERELLE SÉCURISÉE", desc: "Infrastructure réseau sécurisée sous OpenBSD et FreeBSD, réalisée en équipe de 3 : configuration d’une passerelle segmentant trois réseaux privés.", link: null, schema: "/diagrams/nsa-architecture.svg" },
      { idx: "05", name: "Linux System Inventory", kanji: "監査", type: "Outil d’audit système", stack: "PYTHON · FLASK · VAGRANT · GITHUB ACTIONS", year: "2026", opponent: "PARC LINUX HÉTÉROGÈNE", verdict: "AUDIT AUTOMATISÉ", desc: "Outil d’audit automatisé pour Debian, Rocky Linux et FreeBSD (architecture multi-OS) : matériel, disques, charge, ports en écoute, comptes sudo/wheel. Rapports TXT/JSON, tableau de bord web Flask, labo Vagrant multi-machines et CI sur les trois systèmes.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "06", name: "Portfolio", kanji: "書庫", type: "Site personnel", stack: "NUXT · VUE · TYPESCRIPT", year: "2025-2026", opponent: "PAGE BLANCHE", verdict: "VITRINE ÉVOLUTIVE", desc: "Design éditorial mêlant cybersécurité et culture sportive/japonaise. Storytelling au scroll, multilingue FR/EN/TR, dark & light, fiche joueur en hero.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "07", name: "GoCrew", kanji: "旅", type: "Application web", stack: "JAVASCRIPT · WEB", year: "2025", opponent: "ORGANISATION CHAOTIQUE", verdict: "VOYAGE CENTRALISÉ", desc: "Application web collaborative (Pré-MSc Epitech). Centralise l’organisation de voyages en groupe dans une interface unique et intuitive.", link: "https://github.com/Deniz09OK/GoCrew", archived: true },
      { idx: "08", name: "AI-Morpion", kanji: "戦略", type: "Jeu · IA", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2025", opponent: "JOUEUR HUMAIN", verdict: "IA INVINCIBLE", desc: "Version moderne du Tic-Tac-Toe avec une IA avancée utilisant l’algorithme Minimax. Élagage alpha-bêta : l’IA joue de façon optimale.", link: "https://github.com/Deniz09OK/AI-Morpion", archived: true },
      { idx: "09", name: "CultureQuiz", kanji: "知識", type: "App desktop", stack: "PYTHON · TKINTER · GUI", year: "2025", opponent: "ENNUI", verdict: "QUIZ INTERACTIF", desc: "Application de quiz interactif en Python avec interface Tkinter. Base de questions extensible, scoring, timer par manche.", link: "https://github.com/Deniz09OK/CultureQuiz", archived: true },
      { idx: "10", name: "Popeye", kanji: "船団", type: "Conteneurisation", stack: "DOCKER · FLASK · NODE.JS · POSTGRESQL", year: "2025", opponent: "MONOLITHE WEB", verdict: "ARCHITECTURE MODULAIRE", desc: "Projet de conteneurisation avec Docker. Application web complète en architecture microservices, communication inter-services et persistance.", link: "https://github.com/Deniz09OK/Popeye", archived: true },
      { idx: "11", name: "EpiQuest", kanji: "冒険", type: "Jeu vidéo 2D", stack: "JAVA · LIBGDX · GAMEDEV", year: "2024", opponent: "MOTEUR VIDE", verdict: "AVENTURE JOUABLE", desc: "Jeu d’aventure 2D développé avec Java et LibGDX. Système de combat, dialogues, progression. Projet en équipe.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java", archived: true }
    ],
    career: {
      title: "Saisons jouées",
      eduLabel: "ACADÉMIE",
      expLabel: "TERRAIN"
    },
    edu: [
      { year: "09/2024 — 09/2027", school: "EPITECH NANCY", title: "MSc Pro — Cybersécurité & Cloud", desc: "Pédagogie active · Debian/OpenBSD/FreeBSD · Sécu offensive & défensive", current: true },
      { year: "09/2020 — 07/2022", school: "CHARLES DE FOUCAULD", title: "BTS SNIR", desc: "C/C++, Python · VLAN, routage, sous-réseaux · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Bac Pro SNIR", desc: "Bases réseau & systèmes · Virtualisation Debian" }
    ],
    exp: [
      { year: "02/2025 — aujourd’hui", company: "QUALITEST · NANCY", title: "Assistant informatique (alternance)", desc: "Pipelines de données Python en production pour des clients (intégration d’enquêtes Sphinx vers Odoo) · Administration Windows Server, outils internes PHP/JS et automatisation (PowerShell, Bash) · Questionnaires et reporting (Sphinx iQ 3, Dataviv’), bases de données et analyse · Rédaction de procédures internes (traitement des bases e-mails clients)", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING · VANDŒUVRE-LÈS-NANCY", title: "Équipier polyvalent", desc: "Service salle & drive · Relation client" },
      { year: "03/2023 — 12/2023", company: "1ER RSMV · MONTIGNY-LÈS-METZ", title: "Volontaire stagiaire", desc: "Régiment du Service Militaire Volontaire basé à Montigny-lès-Metz · Discipline & cohésion · SST · Médaille du mérite" },
      { year: "01/2019 — 06/2021", company: "LYCÉE HENRI LORITZ · SCIENCES PO NANCY · CFA CHARLES DE FOUCAULD", title: "Stages IT (Bac Pro puis BTS)", desc: "Maintenance et déploiement de postes · Support personnel & étudiants · Adressage IP" }
    ],
    drills: {
      title: "Entraînement quotidien",
      sub: "Trois niveaux, pas de liste gonflée : chaque compétence dit où je l’ai pratiquée, preuve à l’appui.",
      legend: { pro: { label: "Équipe première", clear: "Pro", text: "utilisé en entreprise, en alternance chez Qualitest" }, project: { label: "Match officiel", clear: "Projet", text: "utilisé dans un projet réel, à Epitech ou en personnel" }, lab: { label: "Centre de formation", clear: "Lab", text: "pratiqué sur Hack The Box, TryHackMe ou en cours" } },
      groups: [
        { label: "INFRASTRUCTURE & RÉSEAU", pos: "GARDIEN", items: [{ name: "Windows Server", tier: "pro", evidence: "Qualitest, administration des serveurs" }, { name: "Linux (Debian, Ubuntu, Kali)", tier: "project", evidence: "Projet CIA, machines virtuelles" }, { name: "pfSense", tier: "project", evidence: "Projet CIA, pare-feu des deux sites" }, { name: "Proxmox", tier: "project", evidence: "Projet CIA, deux sites Proxmox" }, { name: "OpenVPN", tier: "project", evidence: "Projet CIA, VPN site à site" }] },
        { label: "SÉCURITÉ OFFENSIVE", pos: "LIBÉRO", items: [{ name: "Pentest web (énumération, SSRF)", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Élévation de privilèges Linux", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Nmap", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Metasploit", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Burp Suite", tier: "lab", evidence: "Hack The Box / TryHackMe" }] },
        { label: "SÉCURITÉ DÉFENSIVE & OBSERVABILITÉ", pos: "STOPPEUR", items: [{ name: "Wazuh", tier: "lab", evidence: "TryHackMe" }, { name: "Splunk", tier: "lab", evidence: "TryHackMe" }, { name: "Wireshark", tier: "lab", evidence: "TryHackMe" }] },
        { label: "AUTOMATISATION & DEVOPS", pos: "MILIEU", items: [{ name: "PowerShell", tier: "pro", evidence: "Scripts d’automatisation chez Qualitest" }, { name: "Bash", tier: "pro", evidence: "Scripts d’automatisation chez Qualitest" }, { name: "Docker", tier: "project", evidence: "La plupart de mes projets" }, { name: "GitHub Actions", tier: "project", evidence: "CI de ce portfolio" }, { name: "Playwright", tier: "project", evidence: "Tests de ce portfolio" }, { name: "Kubernetes", tier: "project", evidence: "Projets Epitech" }] },
        { label: "LANGAGES", pos: "MENEUR DE JEU", items: [{ name: "Python", tier: "pro", evidence: "Qualitest, pipelines de données clients" }, { name: "PHP", tier: "pro", evidence: "Qualitest, outil interne (2025)" }, { name: "TypeScript / JavaScript", tier: "project", evidence: "Ce portfolio" }, { name: "HTML / CSS", tier: "project", evidence: "Ce portfolio" }] },
        { label: "FRAMEWORKS", pos: "AILIER", items: [{ name: "Vue / Nuxt", tier: "project", evidence: "Ce portfolio" }, { name: "Node.js", tier: "project", evidence: "Ce portfolio (Nuxt et scripts de synchronisation)" }, { name: "React", tier: "project", evidence: "MediSync (React Native et dashboard)" }] },
        { label: "BASES DE DONNÉES", pos: "ARRIÈRE", items: [{ name: "MySQL", tier: "pro", evidence: "Qualitest" }, { name: "PostgreSQL", tier: "project", evidence: "Plusieurs projets, dont MediSync" }, { name: "MongoDB", tier: "project", evidence: "Projet Epitech" }] },
        { label: "GESTION DE PROJET", pos: "CAPITAINE", items: [{ name: "Scrum", tier: "project", evidence: "MediSync, en tant que Scrum Master" }, { name: "Jira", tier: "project", evidence: "MediSync, en tant que Scrum Master" }] }
      ]
    },
    htb: {
      "title": "La pratique en direct",
      "sub": "Depuis fin septembre 2026. Statistiques publiques synchronisées automatiquement depuis l’API Hack The Box : machines compromises et saison en cours.",
      "labels": {
        "rank": "Rang",
        "points": "Points",
        "ranking": "Classement mondial",
        "boxes": "Machines root",
        "bloods": "First bloods",
        "nextRank": "Prochain rang",
        "season": "Saison en cours",
        "seasonRank": "Classement",
        "seasonPoints": "Points de saison",
        "seasonFlags": "Flags",
        "nextLeague": "Prochaine ligue",
        "latest": "Dernière machine",
        "boxesTitle": "Boxes résolues",
        "inProgress": "En cours",
        "prevPage": "Page précédente",
        "nextPage": "Page suivante",
        "filtersLabel": "Filtrer les boxes",
        "filterOs": "Système",
        "filterLevel": "Niveau",
        "filterAll": "Tous",
        "filterReset": "Réinitialiser",
        "noResult": "Aucune box pour ce filtre",
        "colBox": "Box",
        "colDifficulty": "Difficulté",
        "colOs": "Système",
        "colDate": "Date",
        "root": "ROOT",
        "user": "USER",
        "noDate": "—",
        "updated": "Dernière mise à jour",
        "profile": "Voir le profil Hack The Box",
        "statsLabel": "Statistiques Hack The Box",
        "empty": "Les statistiques Hack The Box ne sont pas disponibles pour le moment.",
        "emptyLink": "Voir directement mon profil"
      },
      "notes": {
        "label": "Notes HTB",
        "title": "Ma façon de rejouer des machines HTB retirées : la méthode, les pièges rencontrés sur mon environnement (Kali sous WSL), et comment se protéger.",
        "credit": "Réalisées avec l’appui de walkthroughs de la communauté.",
        "cta": "Lire la note",
        "eyebrow": "Note HTB",
        "closeLabel": "Fermer",
        "rubrics": {
          "chain": "Chaîne d’attaque",
          "flaws": "Failles",
          "pitfalls": "Pièges rencontrés",
          "defense": "Se protéger",
          "takeaway": "Ce que j’en retiens"
        },
        "notes": [
          {
            "id": "support",
            "box": "Support",
            "os": "Windows",
            "difficulty": "Easy",
            "keywords": [
              "AD",
              "LDAP",
              "RBCD"
            ],
            "chain": [
              "Partage SMB anonyme",
              "Binaire .NET dont le mot de passe est protégé par un simple XOR",
              "Compte LDAP",
              "Mot de passe stocké dans l’attribut « info »",
              "Accès WinRM",
              "Droit GenericAll sur le contrôleur de domaine",
              "RBCD",
              "Compte Administrateur"
            ],
            "flaws": [
              "Secret en dur dans un binaire",
              "Mot de passe dans un attribut d’annuaire lisible par tout utilisateur authentifié",
              "Droits ACL trop larges",
              "MachineAccountQuota laissé par défaut"
            ],
            "pitfalls": [
              "L’horloge de WSL qui dérive et casse Kerberos : resynchronisation sur le contrôleur de domaine avec ntpdate (hwclock absent)",
              "/etc/hosts réécrit au redémarrage",
              "CrackMapExec remplacé par NetExec",
              "MD4 désactivé sous OpenSSL 3"
            ],
            "defense": [
              "Aucun secret dans un binaire ou un annuaire",
              "Audit régulier des ACL (BloodHound)",
              "MachineAccountQuota à 0"
            ],
            "takeaway": "Un secret rangé dans un annuaire ou un binaire n’est jamais caché, tout utilisateur authentifié peut le lire. Et un droit ACL qui semble anodin (GenericAll) suffit à prendre un domaine : auditer les droits compte autant que les mots de passe."
          },
          {
            "id": "fireflow",
            "box": "Fireflow",
            "os": "Linux",
            "difficulty": "Medium",
            "keywords": [
              "Kubernetes",
              "JWT",
              "RCE"
            ],
            "chain": [
              "Exécution de code non authentifiée dans Langflow",
              "JWT « alg:none » accepté par le MCP Registry",
              "Exécution de code",
              "Vol du token du Service Account",
              "Exécution dans un pod via le kubelet",
              "Pod avec accès au système de fichiers de l’hôte",
              "Root"
            ],
            "flaws": [
              "Algorithme du JWT non vérifié",
              "Service Account aux droits trop larges",
              "Pod avec accès à l’hôte"
            ],
            "pitfalls": [
              "Un composant personnalisé Langflow qui échoue avec une erreur de validation tant qu’on laisse deux méthodes de journalisation (notées dans mon writeup)"
            ],
            "defense": [
              "Mettre à jour Langflow",
              "Refuser « alg:none »",
              "Moindre privilège pour les Service Accounts",
              "Interdire les montages hostPath",
              "NetworkPolicies"
            ],
            "takeaway": "Dans Kubernetes, chaque couche fait confiance à la précédente : un jeton volé dans un pod devient un accès au cluster si les droits du Service Account sont larges. Le moindre privilège et la validation stricte des JWT sont des défenses simples et efficaces."
          },
          {
            "id": "reactor",
            "box": "Reactor",
            "os": "Linux",
            "difficulty": "",
            "keywords": [
              "Next.js",
              "CVE",
              "Node Inspector"
            ],
            "chain": [
              "Application Next.js avec React en version candidate",
              "CVE React2Shell (exécution de code avant authentification)",
              "Shell",
              "Hash MD5 d’un utilisateur cassé",
              "SSH",
              "Node Inspector actif sur un process root",
              "Root"
            ],
            "flaws": [
              "Version RC en production",
              "Désérialisation vulnérable",
              "Option --inspect active sur un process root",
              "MD5 pour des mots de passe"
            ],
            "pitfalls": [
              "Un reverse shell direct dans execSync échouait à cause de l’échappement du JSON : remplacé par un script servi en HTTP puis exécuté par curl",
              "Les PoC Python automatiques se sont avérés instables, d’où une exploitation manuelle avec Burp Repeater"
            ],
            "defense": [
              "Jamais de version RC en production",
              "Jamais --inspect en production",
              "Un hash moderne pour les mots de passe (bcrypt ou argon2)",
              "Un process de monitoring sans droits root"
            ],
            "takeaway": "Un outil de débogage laissé actif sur un process root est une porte ouverte, même limitée à 127.0.0.1. Et une version candidate d’un framework ne va pas en production."
          }
        ]
      }
    },
    thm: {
      "title": "Les rooms en direct",
      "sub": "Statistiques publiques TryHackMe, en mise à jour manuelle : rooms complétées, classement, niveau, badges et points.",
      "labels": {
        "rooms": "Rooms complétées",
        "top": "Top",
        "level": "Niveau",
        "badges": "Badges",
        "points": "Points",
        "updated": "Dernière mise à jour",
        "profile": "Voir le profil TryHackMe",
        "statsLabel": "Statistiques TryHackMe",
        "empty": "Les statistiques TryHackMe ne sont pas disponibles pour le moment.",
        "emptyLink": "Voir directement mon profil"
      }
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
      availability: "Je recherche une alternance en cybersécurité ou développement web, disponible dès maintenant et jusqu’à septembre 2027. Basé à Nancy, mobile dans tout le Grand Est et au Luxembourg. Rythme : 4 jours en entreprise, 1 jour en formation.",
      email: "deniz16ok@gmail.com"
    }
  },

  en: {
    nav: { roster: "Roster", matches: "Season card", career: "Seasons played", drills: "Daily training", htb: "Cyber labs", htbSub: "HTB & TryHackMe", off: "Off the keyboard", languages: "Three languages", contact: "Final whistle" },
    sectionLabels: { roster: "Profile", matches: "Projects", career: "Experience", drills: "Skills", htb: "Hack The Box", thm: "TryHackMe", off: "Interests", languages: "Languages", contact: "Contact" },
    a11y: { navPrimary: "Primary navigation", navMobile: "Mobile navigation", language: "Language", theme: "Light theme", menu: "Menu", legend: "Legend", backToTop: "Back to top" },
    ticker: ["CYBER & WEB DEV APPRENTICESHIP", "·", "AVAILABLE NOW", "·", "GRAND EST & LUXEMBOURG", "·", "MSc CYBERSECURITY & CLOUD", "·", "EPITECH NANCY", "·", "TRILINGUAL FR/EN/TR", "·", "OPEN TO WORK", "·", "LIVE", "·", "PORTFOLIO 2026", "·"],
    seoTitle: "Deniz OK — Cybersecurity & Web Dev Apprentice · Epitech Nancy",
    seoJobTitle: "Cybersecurity and web development apprentice",
    ogImageAlt: "Deniz OK, cybersecurity and web dev apprentice, Epitech Nancy",
    seoDescription: "Deniz OK — cybersecurity & web development apprentice, MSc at Epitech Nancy. Available now until 09/2027, Grand Est & Luxembourg.",
    hero: {
      number: "619",
      numberNote: "A nod to the 619, the finishing move of Rey Mysterio and Dominik Mysterio.",
      luckyNote: "My lucky number: 23",
      numberLabel: "Learn more about the 619",
      luckyLabel: "Learn more about the 23",
      name1: "DENIZ",
      name2: "OK",
      position: "CYBERSECURITY & CLOUD",
      team: "SEEKING WORK-STUDY · EPITECH NANCY",
      bio: "MSc Cybersecurity & Cloud student at Epitech Nancy, looking for an apprenticeship in cybersecurity or web development, starting now and running until September 2027. At Qualitest since February 2025, I build Python data pipelines for clients, administer Windows servers and automate data processing (Python, PowerShell, PHP, Bash).",
      kanji: "戦",
      tale: [
        { k: "BASE", v: "Jarville-la-Malgrange (Nancy) · train/bus, open to relocating" },
        { k: "DRAFT", v: "Epitech Nancy · Class of 2027" },
        { k: "CONTRACT", v: "Work-study (apprenticeship or professionalisation contract) · 4 days company / 1 day school · until 09/2027" },
        { k: "STATUS", v: "Cyber & web dev apprenticeship · Available now · Grand Est & Luxembourg" }
      ],
      cta1: "See the card",
      cta2: "Download CV",
      cta3: "Contact"
    },
    matches: { title: "Season card", sub: "Six featured matches, five more in reserve.", more: "Show 5 earlier projects (2024‑2025)" },
    projects: [
      { idx: "01", name: "CIA — Proxmox Hybrid Infrastructure", kanji: "要塞", type: "Multi-site hybrid infrastructure", stack: "PROXMOX VE · PFSENSE · OPENVPN · NETBOX · ELASTICSEARCH · TERRAFORM · LINUX", year: "2026", opponent: "ISOLATED, EXPOSED SITES", verdict: "SECURED HYBRID INFRA", desc: "CIA (Cloud Infrastructure Architects): design, deployment and hardening of a hybrid infrastructure across two Proxmox sites, linked by a site-to-site VPN. The specification allowed at most 3 VMs per site and required an architecture ready to take on new sites. Epitech project, January to June 2026, team of 4 then 5. Project completed.", link: null, schema: "/diagrams/cia-architecture.svg", status: "INFRASTRUCTURE TAKEN DOWN AT PROJECT END", caseStudy: [{ label: "My role", text: "Project lead, and owner of the pfSense firewalls and the OpenVPN tunnel between the two sites. I ran the project with Kanban: breaking the work into tickets, planning, tracking blockers and milestones." }, { label: "Stack", text: "Proxmox VE, pfSense, OpenVPN, NetBox (IPAM), Elasticsearch, Terraform, Linux VMs." }, { label: "Security", text: "A firewall on each site to limit exposure. The site-to-site VPN is encrypted. External access to the remote site goes through a bastion host, with SSH key authentication only. The team also set up an emergency kill switch: if an unexpected IP address is detected, the link is cut immediately." }, { label: "What I take from it", text: "It was my first project as project lead. I learned to break down, plan and share out the work, and that is what I would do differently today: tighter scoping from the start and more regular follow-up." }] },
      { idx: "02", name: "AI DevSecOps Watch", kanji: "視", type: "AI agent · automation", stack: "PYTHON · PLAYWRIGHT · GROQ · MISTRAL · CHROMADB · GITHUB ACTIONS", year: "2026", opponent: "OFFERS LOST IN THE NOISE", verdict: "AUTOMATED WATCH", desc: "Python agent that collects work-study offers every day (France Travail and La Bonne Alternance APIs, Playwright scraping), scores them with two LLMs (via Groq, then cross-checked by Mistral) and a RAG memory (ChromaDB), recommends the right CV and drafts an application. Scheduled on GitHub Actions, blocked if the tests fail.", link: "https://github.com/Deniz09OK/veille-devsecops-ia", caseStudy: [{ label: "My role", text: "Personal project designed, built and maintained on my own: job offer collection, filters, AI scoring, reports and automation." }, { label: "Stack", text: "Python 3.11, Playwright, France Travail and La Bonne Alternance APIs, Groq and Mistral, ChromaDB, pandas and openpyxl, pytest, GitHub Actions." }, { label: "Security", text: "Secrets in GitHub Secrets, never in the repository. Model outputs validated (scores bounded from 0 to 10, retry when the rate limit is hit). Mandatory tests: if they fail, the day’s run is blocked. No application is sent automatically: I review and decide myself. Sites that blocked scraping were removed, not bypassed." }, { label: "What I take from it", text: "Having two models cross-check each other and calibrating the scoring against my real outcomes (interview, rejection, no reply) limits the errors of a single model. And an automated pipeline must be blocked by its tests, otherwise it produces false results without anyone noticing." }] },
      { idx: "03", name: "MediSync", kanji: "癒", type: "Connected health platform", stack: "REACT NATIVE · TYPESCRIPT · REACT · FASTAPI · POSTGRESQL · REDIS · CELERY · ML KIT · GITLAB CI/CD", year: "2025-2027", opponent: "MEDICAL BLIND SPOT", verdict: "OBJECTIVE DATA", desc: "MediSync is a connected health platform for following chronic illnesses. It links patients and their doctor between two appointments: a mobile app to manage treatments (prescription scanning with OCR, reminders) and keep a symptom journal, and a doctor dashboard that highlights the links between treatment adherence and symptoms. Epitech end-of-programme project, team of 10, delivery planned for April 2027.", link: null, wip: true, caseStudy: [{ label: "My role", text: "Scrum Master. I adapt Scrum to a work-study team: sprints aligned with our school periods, weekly asynchronous progress check-ins on Discord, ticket and backlog tracking in Jira, documentation on Confluence, and merge request follow-up on GitLab." }, { label: "Stack", text: "React Native and TypeScript (mobile), React (doctor dashboard), FastAPI (API and AI microservice), PostgreSQL, Redis and Celery, ML Kit for OCR, GitLab CI/CD, Railway for development." }, { label: "Security", text: "Built in from the start (security by design) with a dedicated DevSecOps team: encryption, strong authentication, role-based access control and isolation of patient data. Development uses fictitious data only. GDPR and health-data hosting requirements guide the design, with no claim of compliance while the project is not in production." }, { label: "What I take from it", text: "Coordinating 10 people on a work-study schedule is mostly about communication: following up without putting people off, prioritising when answers are slow to come, and keeping everyone aligned on the same goal." }] },
      { idx: "04", name: "NSA — Network Security", kanji: "結界", type: "Network infrastructure", stack: "OPENBSD · FREEBSD", year: "2026", opponent: "FLAT NETWORK", verdict: "SECURE GATEWAY", desc: "Secure network infrastructure on OpenBSD and FreeBSD, built as a team of 3: configuration of a gateway segmenting three private networks.", link: null, schema: "/diagrams/nsa-architecture.svg" },
      { idx: "05", name: "Linux System Inventory", kanji: "監査", type: "System audit tool", stack: "PYTHON · FLASK · VAGRANT · GITHUB ACTIONS", year: "2026", opponent: "MIXED LINUX FLEET", verdict: "AUTOMATED AUDIT", desc: "Automated audit tool for Debian, Rocky Linux and FreeBSD (multi-OS architecture): hardware, disks, load, listening ports, sudo/wheel accounts. TXT/JSON reports, Flask web dashboard, multi-machine Vagrant lab and CI on all three systems.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "06", name: "Portfolio", kanji: "書庫", type: "Personal site", stack: "NUXT · VUE · TYPESCRIPT", year: "2025-2026", opponent: "BLANK PAGE", verdict: "LIVING SHOWCASE", desc: "Editorial design blending cybersecurity with sports and Japanese culture. Scroll storytelling, FR/EN/TR i18n, dark & light, player-card hero.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "07", name: "GoCrew", kanji: "旅", type: "Web application", stack: "JAVASCRIPT · WEB", year: "2025", opponent: "CHAOTIC PLANNING", verdict: "CENTRALISED TRIP", desc: "Collaborative web app (Epitech Pre-MSc). Centralises group trip planning in a single, intuitive interface.", link: "https://github.com/Deniz09OK/GoCrew", archived: true },
      { idx: "08", name: "AI-Morpion", kanji: "戦略", type: "Game · AI", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2025", opponent: "HUMAN PLAYER", verdict: "UNBEATABLE AI", desc: "Modern take on Tic-Tac-Toe with an advanced AI powered by the Minimax algorithm. Alpha-beta pruning: the AI plays optimally.", link: "https://github.com/Deniz09OK/AI-Morpion", archived: true },
      { idx: "09", name: "CultureQuiz", kanji: "知識", type: "Desktop app", stack: "PYTHON · TKINTER · GUI", year: "2025", opponent: "BOREDOM", verdict: "INTERACTIVE QUIZ", desc: "Interactive quiz application in Python with a Tkinter interface. Extensible question bank, scoring, per-round timer.", link: "https://github.com/Deniz09OK/CultureQuiz", archived: true },
      { idx: "10", name: "Popeye", kanji: "船団", type: "Containerisation", stack: "DOCKER · FLASK · NODE.JS · POSTGRESQL", year: "2025", opponent: "WEB MONOLITH", verdict: "MODULAR ARCHITECTURE", desc: "Docker containerisation project. Full web application in a microservices architecture, with inter-service communication and persistence.", link: "https://github.com/Deniz09OK/Popeye", archived: true },
      { idx: "11", name: "EpiQuest", kanji: "冒険", type: "2D video game", stack: "JAVA · LIBGDX · GAMEDEV", year: "2024", opponent: "EMPTY ENGINE", verdict: "PLAYABLE ADVENTURE", desc: "2D adventure game built with Java and LibGDX. Combat system, dialogues, progression. Team project.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java", archived: true }
    ],
    career: { title: "Seasons played", eduLabel: "ACADEMY", expLabel: "FIELD" },
    edu: [
      { year: "09/2024 — 09/2027", school: "EPITECH NANCY", title: "MSc Pro — Cybersecurity & Cloud", desc: "Active pedagogy · Debian/OpenBSD/FreeBSD · Offensive & defensive security", current: true },
      { year: "09/2020 — 07/2022", school: "CHARLES DE FOUCAULD", title: "BTS SNIR", desc: "C/C++, Python · VLAN, routing, subnets · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Vocational Baccalaureate SNIR", desc: "Network & system foundations · Debian virtualisation" }
    ],
    exp: [
      { year: "02/2025 — now", company: "QUALITEST · NANCY", title: "IT Assistant (work-study)", desc: "Production Python data pipelines for clients (Sphinx survey data into Odoo) · Windows Server administration, internal PHP/JS tools and automation (PowerShell, Bash) · Surveys & reporting (Sphinx iQ 3, Dataviv’), databases and data analysis · Internal procedures (client email database processing)", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING · VANDŒUVRE-LÈS-NANCY", title: "Versatile crew member", desc: "Front of house & drive · Customer service" },
      { year: "03/2023 — 12/2023", company: "1ST RSMV · MONTIGNY-LÈS-METZ", title: "Volunteer trainee", desc: "Voluntary Military Service (SMV) regiment based in Montigny-lès-Metz · Discipline & teamwork · First-aid (SST) · Merit medal" },
      { year: "01/2019 — 06/2021", company: "LYCÉE HENRI LORITZ · SCIENCES PO NANCY · CFA CHARLES DE FOUCAULD", title: "IT internships (vocational bac, then BTS)", desc: "Workstation maintenance & rollout · Staff & student support · IP addressing" }
    ],
    drills: {
      title: "Daily training",
      sub: "Three levels, no padded list: each skill says where I actually used it, with the proof.",
      legend: { pro: { label: "First team", clear: "Pro", text: "used at work, during my apprenticeship at Qualitest" }, project: { label: "Competitive match", clear: "Project", text: "used in a real project, at Epitech or on my own" }, lab: { label: "Academy", clear: "Lab", text: "practised on Hack The Box, TryHackMe or in class" } },
      groups: [
        { label: "INFRASTRUCTURE & NETWORK", pos: "KEEPER", items: [{ name: "Windows Server", tier: "pro", evidence: "Qualitest, server administration" }, { name: "Linux (Debian, Ubuntu, Kali)", tier: "project", evidence: "CIA project, virtual machines" }, { name: "pfSense", tier: "project", evidence: "CIA project, firewalls on both sites" }, { name: "Proxmox", tier: "project", evidence: "CIA project, two Proxmox sites" }, { name: "OpenVPN", tier: "project", evidence: "CIA project, site-to-site VPN" }] },
        { label: "OFFENSIVE SECURITY", pos: "SWEEPER", items: [{ name: "Web pentesting (enumeration, SSRF)", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Linux privilege escalation", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Nmap", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Metasploit", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Burp Suite", tier: "lab", evidence: "Hack The Box / TryHackMe" }] },
        { label: "DEFENSIVE SECURITY & OBSERVABILITY", pos: "CENTRE-BACK", items: [{ name: "Wazuh", tier: "lab", evidence: "TryHackMe" }, { name: "Splunk", tier: "lab", evidence: "TryHackMe" }, { name: "Wireshark", tier: "lab", evidence: "TryHackMe" }] },
        { label: "AUTOMATION & DEVOPS", pos: "MID-FIELD", items: [{ name: "PowerShell", tier: "pro", evidence: "Automation scripts at Qualitest" }, { name: "Bash", tier: "pro", evidence: "Automation scripts at Qualitest" }, { name: "Docker", tier: "project", evidence: "Most of my projects" }, { name: "GitHub Actions", tier: "project", evidence: "This portfolio's CI" }, { name: "Playwright", tier: "project", evidence: "This portfolio's tests" }, { name: "Kubernetes", tier: "project", evidence: "Epitech projects" }] },
        { label: "LANGUAGES", pos: "PLAYMAKER", items: [{ name: "Python", tier: "pro", evidence: "Qualitest, client data pipelines" }, { name: "PHP", tier: "pro", evidence: "Qualitest, internal tool (2025)" }, { name: "TypeScript / JavaScript", tier: "project", evidence: "This portfolio" }, { name: "HTML / CSS", tier: "project", evidence: "This portfolio" }] },
        { label: "FRAMEWORKS", pos: "WINGER", items: [{ name: "Vue / Nuxt", tier: "project", evidence: "This portfolio" }, { name: "Node.js", tier: "project", evidence: "This portfolio (Nuxt and sync scripts)" }, { name: "React", tier: "project", evidence: "MediSync (React Native and dashboard)" }] },
        { label: "DATABASES", pos: "FULL-BACK", items: [{ name: "MySQL", tier: "pro", evidence: "Qualitest" }, { name: "PostgreSQL", tier: "project", evidence: "Several projects, including MediSync" }, { name: "MongoDB", tier: "project", evidence: "Epitech project" }] },
        { label: "PROJECT MANAGEMENT", pos: "CAPTAIN", items: [{ name: "Scrum", tier: "project", evidence: "MediSync, as Scrum Master" }, { name: "Jira", tier: "project", evidence: "MediSync, as Scrum Master" }] }
      ]
    },
    htb: {
      "title": "Live practice",
      "sub": "Since late September 2026. Public stats synced automatically from the Hack The Box API: owned machines and current season.",
      "labels": {
        "rank": "Rank",
        "points": "Points",
        "ranking": "Global ranking",
        "boxes": "Rooted machines",
        "bloods": "First bloods",
        "nextRank": "Next rank",
        "season": "Current season",
        "seasonRank": "Standing",
        "seasonPoints": "Season points",
        "seasonFlags": "Flags",
        "nextLeague": "Next league",
        "latest": "Latest machine",
        "boxesTitle": "Solved boxes",
        "inProgress": "In progress",
        "prevPage": "Previous page",
        "nextPage": "Next page",
        "filtersLabel": "Filter the boxes",
        "filterOs": "System",
        "filterLevel": "Level",
        "filterAll": "All",
        "filterReset": "Reset",
        "noResult": "No box for this filter",
        "colBox": "Box",
        "colDifficulty": "Difficulty",
        "colOs": "OS",
        "colDate": "Date",
        "root": "ROOT",
        "user": "USER",
        "noDate": "—",
        "updated": "Last updated",
        "profile": "View Hack The Box profile",
        "statsLabel": "Hack The Box stats",
        "empty": "Hack The Box stats are not available right now.",
        "emptyLink": "Open my profile directly"
      },
      "notes": {
        "label": "HTB notes",
        "title": "How I replay retired HTB machines: the method, the pitfalls I ran into on my setup (Kali on WSL), and how to defend against them.",
        "credit": "Done with the help of community walkthroughs.",
        "cta": "Read the note",
        "eyebrow": "HTB note",
        "closeLabel": "Close",
        "rubrics": {
          "chain": "Attack chain",
          "flaws": "Flaws",
          "pitfalls": "Pitfalls I ran into",
          "defense": "How to defend",
          "takeaway": "What I take away"
        },
        "notes": [
          {
            "id": "support",
            "box": "Support",
            "os": "Windows",
            "difficulty": "Easy",
            "keywords": [
              "AD",
              "LDAP",
              "RBCD"
            ],
            "chain": [
              "Anonymous SMB share",
              ".NET binary whose password is protected by a simple XOR",
              "LDAP account",
              "Password stored in the “info” attribute",
              "WinRM access",
              "GenericAll right over the domain controller",
              "RBCD",
              "Administrator account"
            ],
            "flaws": [
              "Secret hard-coded in a binary",
              "Password in a directory attribute readable by any authenticated user",
              "Overly broad ACL rights",
              "MachineAccountQuota left at its default"
            ],
            "pitfalls": [
              "The WSL clock drifting and breaking Kerberos: resynced against the domain controller with ntpdate (no hwclock)",
              "/etc/hosts rewritten on restart",
              "CrackMapExec replaced by NetExec",
              "MD4 disabled in OpenSSL 3"
            ],
            "defense": [
              "No secrets in a binary or a directory",
              "Regular ACL audits (BloodHound)",
              "MachineAccountQuota set to 0"
            ],
            "takeaway": "A secret stored in a directory or a binary is never hidden: any authenticated user can read it. And an ACL right that looks harmless (GenericAll) is enough to take over a domain: auditing rights matters as much as passwords."
          },
          {
            "id": "fireflow",
            "box": "Fireflow",
            "os": "Linux",
            "difficulty": "Medium",
            "keywords": [
              "Kubernetes",
              "JWT",
              "RCE"
            ],
            "chain": [
              "Unauthenticated code execution in Langflow",
              "JWT with “alg:none” accepted by the MCP Registry",
              "Code execution",
              "Theft of the Service Account token",
              "Execution in a pod through the kubelet",
              "Pod with access to the host file system",
              "Root"
            ],
            "flaws": [
              "JWT algorithm not checked",
              "Service Account with overly broad rights",
              "Pod with access to the host"
            ],
            "pitfalls": [
              "A custom Langflow component failing with a validation error as long as two logging methods are left in (noted in my writeup)"
            ],
            "defense": [
              "Update Langflow",
              "Reject “alg:none”",
              "Least privilege for Service Accounts",
              "Forbid hostPath mounts",
              "NetworkPolicies"
            ],
            "takeaway": "In Kubernetes, each layer trusts the previous one: a token stolen in a pod becomes access to the cluster if the Service Account has broad rights. Least privilege and strict JWT validation are simple and effective defences."
          },
          {
            "id": "reactor",
            "box": "Reactor",
            "os": "Linux",
            "difficulty": "",
            "keywords": [
              "Next.js",
              "CVE",
              "Node Inspector"
            ],
            "chain": [
              "Next.js application running a release candidate of React",
              "React2Shell CVE (pre-authentication code execution)",
              "Shell",
              "A user’s MD5 hash cracked",
              "SSH",
              "Node Inspector enabled on a root process",
              "Root"
            ],
            "flaws": [
              "Release candidate in production",
              "Vulnerable deserialisation",
              "--inspect option enabled on a root process",
              "MD5 for passwords"
            ],
            "pitfalls": [
              "A direct reverse shell in execSync failed because of JSON escaping: replaced by a script served over HTTP and run with curl",
              "The automated Python PoCs proved unstable, hence a manual exploitation with Burp Repeater"
            ],
            "defense": [
              "Never a release candidate in production",
              "Never --inspect in production",
              "A modern hash for passwords (bcrypt or argon2)",
              "A monitoring process without root rights"
            ],
            "takeaway": "A debugging tool left enabled on a root process is an open door, even when limited to 127.0.0.1. And a release candidate of a framework does not go to production."
          }
        ]
      }
    },
    thm: {
      "title": "Rooms, live",
      "sub": "Public TryHackMe stats, updated manually: completed rooms, ranking, level, badges and points.",
      "labels": {
        "rooms": "Rooms completed",
        "top": "Top",
        "level": "Level",
        "badges": "Badges",
        "points": "Points",
        "updated": "Last updated",
        "profile": "View TryHackMe profile",
        "statsLabel": "TryHackMe stats",
        "empty": "TryHackMe stats are not available right now.",
        "emptyLink": "Open my profile directly"
      }
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
    contact: { title: "Final whistle.", lead: "Want to talk cyber, a project, or just say hi? The locker room is open.", availability: "I am looking for an apprenticeship in cybersecurity or web development, starting now and running until September 2027. Based in Nancy, I can work anywhere in the Grand Est region and in Luxembourg. Schedule: 4 days a week at the company, 1 day in training.", email: "deniz16ok@gmail.com" }
  },

  tr: {
    nav: { roster: "Kadro", matches: "Sezon kartı", career: "Oynanan sezonlar", drills: "Günlük antrenman", htb: "Siber lab'lar", htbSub: "HTB & TryHackMe", off: "Klavyenin dışında", languages: "Üç dil", contact: "Son düdük" },
    sectionLabels: { roster: "Profil", matches: "Projeler", career: "Deneyim", drills: "Yetenekler", htb: "Hack The Box", thm: "TryHackMe", off: "İlgi Alanları", languages: "Diller", contact: "İletişim" },
    a11y: { navPrimary: "Ana gezinme", navMobile: "Mobil gezinme", language: "Dil", theme: "Açık tema", menu: "Menü", legend: "Açıklama", backToTop: "Sayfanın başına dön" },
    ticker: ["SİBER & WEB GELİŞTİRME DÖNÜŞÜMLÜ EĞİTİM", "·", "HEMEN MÜSAİT", "·", "GRAND EST & LÜKSEMBURG", "·", "MSc SİBER GÜVENLİK & BULUT", "·", "EPITECH NANCY", "·", "ÜÇ DİLLİ FR/EN/TR", "·", "YENİ FIRSATLARA AÇIĞIM", "·", "CANLI", "·", "PORTFOLYO 2026", "·"],
    seoTitle: "Deniz OK — Siber Güvenlik & Web Geliştirme · Dönüşümlü Eğitim · Epitech Nancy",
    seoJobTitle: "Siber güvenlik ve web geliştirme alanında dönüşümlü eğitim öğrencisi",
    ogImageAlt: "Deniz OK, siber güvenlik ve web geliştirme dönüşümlü eğitim öğrencisi, Epitech Nancy",
    seoDescription: "Deniz OK — siber güvenlik & web geliştirme alanında dönüşümlü eğitim öğrencisi (MSc, Epitech Nancy). Hemen müsait, 09/2027'ye kadar, Grand Est & Lüksemburg.",
    hero: {
      number: "619",
      numberNote: "Rey Mysterio ve Dominik Mysterio’nun bitiriş hamlesi 619’a bir selam.",
      luckyNote: "Şans sayım: 23",
      numberLabel: "619 hakkında daha fazla bilgi",
      luckyLabel: "23 hakkında daha fazla bilgi",
      name1: "DENIZ",
      name2: "OK",
      position: "SİBER GÜVENLİK & BULUT",
      team: "DÖNÜŞÜMLÜ EĞİTİM ARIYOR · EPITECH NANCY",
      bio: "Epitech Nancy'de MSc Siber Güvenlik & Bulut öğrencisiyim; siber güvenlik veya web geliştirme alanında, hemen başlayıp Eylül 2027'ye kadar sürecek bir dönüşümlü eğitim arıyorum. Şubat 2025'ten beri Qualitest'te müşteriler için Python veri hatları geliştiriyor, Windows sunucularını yönetiyor ve süreçleri otomatikleştiriyorum (Python, PowerShell, PHP, Bash).",
      kanji: "戦",
      tale: [
        { k: "ÜS", v: "Jarville-la-Malgrange (Nancy) · tren/otobüs, taşınmaya açık" },
        { k: "DRAFT", v: "Epitech Nancy · 2027 mezunu" },
        { k: "SÖZLEŞME", v: "Dönüşümlü eğitim (çıraklık veya profesyonelleşme sözleşmesi) · 4 gün şirket / 1 gün okul · 09/2027'ye kadar" },
        { k: "DURUM", v: "Siber güvenlik & web geliştirme alanında dönüşümlü eğitim · Hemen müsait · Grand Est & Lüksemburg" }
      ],
      cta1: "Kartı gör",
      cta2: "CV indir",
      cta3: "İletişim"
    },
    matches: { title: "Sezon kartı", sub: "Altı maç vitrinde, beşi yedekte.", more: "5 eski projeyi göster (2024‑2025)" },
    projects: [
      { idx: "01", name: "CIA — Proxmox Hibrit Altyapı", kanji: "要塞", type: "Çok siteli hibrit altyapı", stack: "PROXMOX VE · PFSENSE · OPENVPN · NETBOX · ELASTICSEARCH · TERRAFORM · LINUX", year: "2026", opponent: "İZOLE VE AÇIKTA SİTELER", verdict: "GÜVENLİ HİBRİT ALTYAPI", desc: "CIA (Cloud Infrastructure Architects): siteler arası bir VPN ile birbirine bağlanan iki Proxmox sitesi üzerinde hibrit bir altyapının tasarımı, kurulumu ve güvenliğinin sağlanması. Şartname site başına en fazla 3 sanal makineye izin veriyor ve yeni siteler eklemeye hazır bir mimari istiyordu. Epitech projesi, Ocak–Haziran 2026, önce 4 sonra 5 kişilik ekip. Proje tamamlandı.", link: null, schema: "/diagrams/cia-architecture.svg", status: "ALTYAPI PROJE SONUNDA KALDIRILDI", caseStudy: [{ label: "Rolüm", text: "Proje yöneticisi; ayrıca pfSense güvenlik duvarlarından ve iki site arasındaki OpenVPN bağlantısından sorumluydum. Projeyi Kanban ile yönettim: işi görevlere bölme, planlama, engellerin ve kilometre taşlarının takibi." }, { label: "Teknolojiler", text: "Proxmox VE, pfSense, OpenVPN, NetBox (IPAM), Elasticsearch, Terraform, Linux sanal makineleri." }, { label: "Güvenlik", text: "Maruziyeti sınırlamak için her sitede bir güvenlik duvarı. Siteler arası VPN şifreli. Uzak siteye dış erişim, yalnızca SSH anahtarıyla kimlik doğrulama yapılan bir bastion sunucusu üzerinden sağlanıyor. Ekip ayrıca bir acil kesme mekanizması kurdu: beklenmeyen bir IP adresi tespit edildiğinde bağlantı anında kesiliyor." }, { label: "Bu projeden öğrendiklerim", text: "Proje yöneticisi olarak ilk projemdi. İşi bölmeyi, planlamayı ve paylaştırmayı öğrendim; bugün farklı yapacağım nokta da tam olarak bu: baştan daha net bir kapsam belirleme ve daha düzenli bir takip." }] },
      { idx: "02", name: "Veille DevSecOps IA", kanji: "視", type: "YZ ajanı · otomasyon", stack: "PYTHON · PLAYWRIGHT · GROQ · MISTRAL · CHROMADB · GITHUB ACTIONS", year: "2026", opponent: "GÜRÜLTÜDE KAYBOLAN İLANLAR", verdict: "OTOMATİK TAKİP", desc: "Her gün dönüşümlü eğitim ilanlarını toplayan Python ajanı (France Travail ve La Bonne Alternance API'leri, Playwright ile scraping): ilanları iki LLM ile puanlar (Groq üzerinden, ardından Mistral ile çapraz kontrol) ve RAG belleği (ChromaDB) kullanır, uygun CV'yi önerir ve başvuru taslağı hazırlar. GitHub Actions üzerinde zamanlanmış çalışır; testler başarısız olursa engellenir.", link: "https://github.com/Deniz09OK/veille-devsecops-ia", caseStudy: [{ label: "Rolüm", text: "Tek başıma tasarladığım, geliştirdiğim ve sürdürdüğüm kişisel proje: ilanların toplanması, filtreler, YZ ile puanlama, raporlar ve otomasyon." }, { label: "Teknolojiler", text: "Python 3.11, Playwright, France Travail ve La Bonne Alternance API’leri, Groq ve Mistral, ChromaDB, pandas ve openpyxl, pytest, GitHub Actions." }, { label: "Güvenlik", text: "Sırlar GitHub Secrets’ta tutulur, asla depoda değil. Model çıktıları doğrulanır (puanlar 0 ile 10 arasında sınırlı, istek sınırına takılınca yeniden deneme). Testler zorunludur: başarısız olurlarsa günün çalıştırması engellenir. Hiçbir başvuru otomatik olarak gönderilmez: kendim okuyup karar veririm. Scraping’i engelleyen siteler atlatılmadı, listeden çıkarıldı." }, { label: "Bu projeden öğrendiklerim", text: "İki modelin birbirini çapraz kontrol etmesi ve puanlamanın gerçek sonuçlarıma (mülakat, ret, yanıt yok) göre ayarlanması, tek bir modelin hatalarını sınırlar. Otomatik bir pipeline da testleriyle engellenmelidir; aksi hâlde kimse fark etmeden yanlış sonuçlar üretir." }] },
      { idx: "03", name: "MediSync", kanji: "癒", type: "Bağlantılı sağlık platformu", stack: "REACT NATIVE · TYPESCRIPT · REACT · FASTAPI · POSTGRESQL · REDIS · CELERY · ML KIT · GITLAB CI/CD", year: "2025-2027", opponent: "TIBBİ KÖR NOKTA", verdict: "OBJEKTİF VERİ", desc: "MediSync, kronik hastalıkların takibi için bağlantılı bir sağlık platformu. İki muayene arasında hastayı ve doktorunu birbirine bağlıyor: tedavileri yönetmek (OCR ile reçete tarama, hatırlatıcılar) ve semptom günlüğü tutmak için bir mobil uygulama, tedaviye uyum ile semptomlar arasındaki bağlantıları öne çıkaran bir doktor paneli. Epitech dönem sonu projesi, 10 kişilik ekip, teslim Nisan 2027'de planlanıyor.", link: null, wip: true, caseStudy: [{ label: "Rolüm", text: "Scrum Master. Scrum'ı dönüşümlü eğitimdeki bir ekibe uyarlıyorum: okul dönemlerimize göre planlanan sprintler, Discord'da haftalık asenkron ilerleme paylaşımları, Jira'da iş ve backlog takibi, Confluence'ta dokümantasyon ve GitLab'de merge request takibi." }, { label: "Teknolojiler", text: "React Native ve TypeScript (mobil), React (doktor paneli), FastAPI (API ve YZ mikroservisi), PostgreSQL, Redis ve Celery, OCR için ML Kit, GitLab CI/CD, geliştirme için Railway." }, { label: "Güvenlik", text: "Baştan itibaren güvenlik odaklı tasarlandı (security by design), özel bir DevSecOps ekibiyle: şifreleme, güçlü kimlik doğrulama, rol tabanlı erişim kontrolü ve hasta verilerinin izolasyonu. Geliştirme yalnızca kurgusal verilerle yapılıyor. GDPR çerçevesi ve sağlık verisi barındırma gereksinimleri tasarıma yön veriyor; proje üretime geçmediği sürece herhangi bir uyumluluk iddiası yok." }, { label: "Bu projeden öğrendiklerim", text: "10 kişiyi dönüşümlü eğitim temposunda koordine etmek her şeyden önce iletişim demek: kimseyi kırmadan hatırlatmak, yanıtlar geciktiğinde önceliklendirmek ve herkesi aynı hedefte buluşturmak." }] },
      { idx: "04", name: "NSA — Network Security", kanji: "結界", type: "Ağ altyapısı", stack: "OPENBSD · FREEBSD", year: "2026", opponent: "SEGMENTSİZ AĞ", verdict: "GÜVENLİ AĞ GEÇİDİ", desc: "OpenBSD ve FreeBSD üzerinde 3 kişilik bir ekiple kurulan güvenli ağ altyapısı: üç özel ağı segmentlere ayıran bir ağ geçidinin yapılandırılması.", link: null, schema: "/diagrams/nsa-architecture.svg" },
      { idx: "05", name: "Linux System Inventory", kanji: "監査", type: "Sistem denetim aracı", stack: "PYTHON · FLASK · VAGRANT · GITHUB ACTIONS", year: "2026", opponent: "KARIŞIK LINUX FİLOSU", verdict: "OTOMATİK DENETİM", desc: "Debian, Rocky Linux ve FreeBSD için otomatik denetim aracı (çoklu işletim sistemi mimarisi): donanım, diskler, yük, dinlenen portlar, sudo/wheel hesapları. TXT/JSON raporlar, Flask web paneli, çok makineli Vagrant laboratuvarı ve üç sistemde CI.", link: "https://github.com/Deniz09OK/Linux-System-Inventory-Tool" },
      { idx: "06", name: "Portfolio", kanji: "書庫", type: "Kişisel site", stack: "NUXT · VUE · TYPESCRIPT", year: "2025-2026", opponent: "BOŞ SAYFA", verdict: "YAŞAYAN VİTRİN", desc: "Siber güvenlik ile spor ve Japon kültürünü harmanlayan editöryel tasarım. Kaydırmalı anlatım, FR/EN/TR çoklu dil, koyu ve açık tema, hero'da oyuncu kartı.", link: "https://github.com/Deniz09OK/Portfolio" },
      { idx: "07", name: "GoCrew", kanji: "旅", type: "Web uygulaması", stack: "JAVASCRIPT · WEB", year: "2025", opponent: "KAOTİK PLANLAMA", verdict: "MERKEZİ SEYAHAT", desc: "İş birliğine dayalı web uygulaması (Epitech Pre-MSc). Grup seyahat organizasyonunu tek ve sezgisel bir arayüzde toplar.", link: "https://github.com/Deniz09OK/GoCrew", archived: true },
      { idx: "08", name: "AI-Morpion", kanji: "戦略", type: "Oyun · YZ", stack: "PYTHON · MINIMAX · ALPHA-BETA", year: "2025", opponent: "İNSAN OYUNCU", verdict: "YENİLMEZ YZ", desc: "Minimax algoritmasını kullanan gelişmiş bir YZ ile Tic-Tac-Toe'nun modern sürümü. Alfa-beta budama: YZ en iyi hamleyi oynar.", link: "https://github.com/Deniz09OK/AI-Morpion", archived: true },
      { idx: "09", name: "CultureQuiz", kanji: "知識", type: "Masaüstü uygulaması", stack: "PYTHON · TKINTER · GUI", year: "2025", opponent: "SIKINTI", verdict: "İNTERAKTİF BİLGİ YARIŞMASI", desc: "Tkinter arayüzlü, Python ile geliştirilmiş interaktif bilgi yarışması uygulaması. Genişletilebilir soru tabanı, puanlama, tur başına zamanlayıcı.", link: "https://github.com/Deniz09OK/CultureQuiz", archived: true },
      { idx: "10", name: "Popeye", kanji: "船団", type: "Konteynerleştirme", stack: "DOCKER · FLASK · NODE.JS · POSTGRESQL", year: "2025", opponent: "WEB MONOLİT", verdict: "MODÜLER MİMARİ", desc: "Docker ile konteynerleştirme projesi. Mikroservis mimarisinde tam bir web uygulaması, servisler arası iletişim ve kalıcılık.", link: "https://github.com/Deniz09OK/Popeye", archived: true },
      { idx: "11", name: "EpiQuest", kanji: "冒険", type: "2D video oyunu", stack: "JAVA · LIBGDX · OYUN", year: "2024", opponent: "BOŞ MOTOR", verdict: "OYNANABİLİR MACERA", desc: "Java ve LibGDX ile geliştirilmiş 2D macera oyunu. Savaş sistemi, diyaloglar, ilerleme. Takım projesi.", link: "https://github.com/Deniz09OK/Projet-Jeu-Java", archived: true }
    ],
    career: { title: "Oynanan sezonlar", eduLabel: "AKADEMİ", expLabel: "SAHA" },
    edu: [
      { year: "09/2024 — 09/2027", school: "EPITECH NANCY", title: "MSc Pro — Siber Güvenlik & Bulut", desc: "Aktif pedagoji · Debian/OpenBSD/FreeBSD · Saldırı & savunma", current: true },
      { year: "09/2020 — 07/2022", school: "CHARLES DE FOUCAULD", title: "BTS SNIR", desc: "C/C++, Python · VLAN, yönlendirme, alt ağlar · Mageia" },
      { year: "2017 — 2020", school: "LYCÉE JEAN PROUVÉ", title: "Mesleki Lise SNIR", desc: "Ağ ve sistem temelleri · Debian sanallaştırma" }
    ],
    exp: [
      { year: "02/2025 — şimdi", company: "QUALITEST · NANCY", title: "BT Asistanı (dönüşümlü eğitim)", desc: "Müşteriler için üretimde çalışan Python veri hatları (Sphinx anket verilerinin Odoo'ya aktarımı) · Windows Server yönetimi, PHP/JS iç araçlar ve otomasyon (PowerShell, Bash) · Anket ve raporlama (Sphinx iQ 3, Dataviv’), veritabanları ve veri analizi · İç prosedürlerin yazımı (müşteri e-posta veritabanlarının işlenmesi)", current: true },
      { year: "01/2024 — 03/2024", company: "BURGER KING · VANDŒUVRE-LÈS-NANCY", title: "Çok yönlü ekip üyesi", desc: "Salon & drive · Müşteri ilişkileri" },
      { year: "03/2023 — 12/2023", company: "1. RSMV · MONTIGNY-LÈS-METZ", title: "Gönüllü stajyer", desc: "Montigny-lès-Metz'te bulunan Gönüllü Askerlik Hizmeti (SMV) alayı · Disiplin & takım çalışması · SST · Liyakat madalyası" },
      { year: "01/2019 — 06/2021", company: "LYCÉE HENRI LORITZ · SCIENCES PO NANCY · CFA CHARLES DE FOUCAULD", title: "BT stajları (Mesleki Lise, ardından BTS)", desc: "İş istasyonu bakımı ve kurulumu · Personel & öğrenci desteği · IP adresleme" }
    ],
    drills: {
      title: "Günlük antrenman",
      sub: "Üç seviye, şişirilmiş liste yok: her yetenek nerede kullandığımı kanıtıyla gösteriyor.",
      legend: { pro: { label: "A takımı", clear: "Profesyonel", text: "Qualitest'teki dönüşümlü eğitimimde, iş ortamında kullanıldı" }, project: { label: "Resmî maç", clear: "Proje", text: "Epitech'te ya da kişisel olarak, gerçek bir projede kullanıldı" }, lab: { label: "Altyapı", clear: "Lab", text: "Hack The Box, TryHackMe'de ya da derste çalışıldı" } },
      groups: [
        { label: "ALTYAPI & AĞ", pos: "KALECİ", items: [{ name: "Windows Server", tier: "pro", evidence: "Qualitest, sunucu yönetimi" }, { name: "Linux (Debian, Ubuntu, Kali)", tier: "project", evidence: "CIA projesi, sanal makineler" }, { name: "pfSense", tier: "project", evidence: "CIA projesi, iki sitenin güvenlik duvarları" }, { name: "Proxmox", tier: "project", evidence: "CIA projesi, iki Proxmox sitesi" }, { name: "OpenVPN", tier: "project", evidence: "CIA projesi, siteler arası VPN" }] },
        { label: "OFANSİF GÜVENLİK", pos: "LİBERO", items: [{ name: "Web sızma testi (keşif, SSRF)", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Linux yetki yükseltme", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Nmap", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Metasploit", tier: "lab", evidence: "Hack The Box / TryHackMe" }, { name: "Burp Suite", tier: "lab", evidence: "Hack The Box / TryHackMe" }] },
        { label: "DEFANSİF GÜVENLİK & GÖZLEMLENEBİLİRLİK", pos: "STOPER", items: [{ name: "Wazuh", tier: "lab", evidence: "TryHackMe" }, { name: "Splunk", tier: "lab", evidence: "TryHackMe" }, { name: "Wireshark", tier: "lab", evidence: "TryHackMe" }] },
        { label: "OTOMASYON & DEVOPS", pos: "ORTA SAHA", items: [{ name: "PowerShell", tier: "pro", evidence: "Qualitest'te otomasyon betikleri" }, { name: "Bash", tier: "pro", evidence: "Qualitest'te otomasyon betikleri" }, { name: "Docker", tier: "project", evidence: "Projelerimin çoğu" }, { name: "GitHub Actions", tier: "project", evidence: "Bu portfolyonun CI süreci" }, { name: "Playwright", tier: "project", evidence: "Bu portfolyonun testleri" }, { name: "Kubernetes", tier: "project", evidence: "Epitech projeleri" }] },
        { label: "DİLLER", pos: "OYUN KURUCU", items: [{ name: "Python", tier: "pro", evidence: "Qualitest, müşteri veri hatları" }, { name: "PHP", tier: "pro", evidence: "Qualitest, şirket içi araç (2025)" }, { name: "TypeScript / JavaScript", tier: "project", evidence: "Bu portfolyo" }, { name: "HTML / CSS", tier: "project", evidence: "Bu portfolyo" }] },
        { label: "FRAMEWORK'LER", pos: "KANAT", items: [{ name: "Vue / Nuxt", tier: "project", evidence: "Bu portfolyo" }, { name: "Node.js", tier: "project", evidence: "Bu portfolyo (Nuxt ve senkronizasyon betikleri)" }, { name: "React", tier: "project", evidence: "MediSync (React Native ve panel)" }] },
        { label: "VERİTABANLARI", pos: "BEK", items: [{ name: "MySQL", tier: "pro", evidence: "Qualitest" }, { name: "PostgreSQL", tier: "project", evidence: "MediSync dahil birkaç proje" }, { name: "MongoDB", tier: "project", evidence: "Epitech projesi" }] },
        { label: "PROJE YÖNETİMİ", pos: "KAPTAN", items: [{ name: "Scrum", tier: "project", evidence: "MediSync, Scrum Master olarak" }, { name: "Jira", tier: "project", evidence: "MediSync, Scrum Master olarak" }] }
      ]
    },
    htb: {
      "title": "Canlı pratik",
      "sub": "Eylül 2026 sonundan beri. Hack The Box API'sinden otomatik senkronize edilen herkese açık istatistikler: ele geçirilen makineler ve mevcut sezon.",
      "labels": {
        "rank": "Seviye",
        "points": "Puan",
        "ranking": "Dünya sıralaması",
        "boxes": "Root makineler",
        "bloods": "First blood",
        "nextRank": "Sonraki seviye",
        "season": "Mevcut sezon",
        "seasonRank": "Sıralama",
        "seasonPoints": "Sezon puanı",
        "seasonFlags": "Bayraklar",
        "nextLeague": "Sonraki lig",
        "latest": "Son makine",
        "boxesTitle": "Çözülen kutular",
        "inProgress": "Devam ediyor",
        "prevPage": "Önceki sayfa",
        "nextPage": "Sonraki sayfa",
        "filtersLabel": "Kutuları filtrele",
        "filterOs": "Sistem",
        "filterLevel": "Zorluk",
        "filterAll": "Tümü",
        "filterReset": "Sıfırla",
        "noResult": "Bu filtre için kutu yok",
        "colBox": "Kutu",
        "colDifficulty": "Zorluk",
        "colOs": "Sistem",
        "colDate": "Tarih",
        "root": "ROOT",
        "user": "USER",
        "noDate": "—",
        "updated": "Son güncelleme",
        "profile": "Hack The Box profilini gör",
        "statsLabel": "Hack The Box istatistikleri",
        "empty": "Hack The Box istatistikleri şu anda kullanılamıyor.",
        "emptyLink": "Profilimi doğrudan aç"
      },
      "notes": {
        "label": "HTB notları",
        "title": "Emekliye ayrılmış HTB makinelerini nasıl yeniden çözdüğüm: yöntem, kendi ortamımda (WSL üzerinde Kali) karşılaştığım tuzaklar ve nasıl korunulacağı.",
        "credit": "Topluluğun walkthrough’larından yardım alınarak hazırlandı.",
        "cta": "Notu oku",
        "eyebrow": "HTB notu",
        "closeLabel": "Kapat",
        "rubrics": {
          "chain": "Saldırı zinciri",
          "flaws": "Açıklar",
          "pitfalls": "Karşılaştığım tuzaklar",
          "defense": "Korunma",
          "takeaway": "Çıkardığım ders"
        },
        "notes": [
          {
            "id": "support",
            "box": "Support",
            "os": "Windows",
            "difficulty": "Easy",
            "keywords": [
              "AD",
              "LDAP",
              "RBCD"
            ],
            "chain": [
              "Anonim SMB paylaşımı",
              "Parolası basit bir XOR ile korunan .NET ikili dosyası",
              "LDAP hesabı",
              "“info” özniteliğinde saklanan parola",
              "WinRM erişimi",
              "Etki alanı denetleyicisi üzerinde GenericAll hakkı",
              "RBCD",
              "Administrator hesabı"
            ],
            "flaws": [
              "İkili dosyaya gömülü sır",
              "Kimliği doğrulanmış her kullanıcının okuyabildiği bir dizin özniteliğinde parola",
              "Fazla geniş ACL hakları",
              "Varsayılan değerinde bırakılmış MachineAccountQuota"
            ],
            "pitfalls": [
              "WSL saatinin kayması ve Kerberos’u bozması: ntpdate ile etki alanı denetleyicisine göre yeniden eşitleme (hwclock yok)",
              "Yeniden başlatmada üzerine yazılan /etc/hosts",
              "CrackMapExec’in yerini NetExec’in alması",
              "OpenSSL 3’te devre dışı bırakılmış MD4"
            ],
            "defense": [
              "İkili dosyada ya da dizinde hiçbir sır bulunmaması",
              "ACL’lerin düzenli denetimi (BloodHound)",
              "MachineAccountQuota’nın 0’a ayarlanması"
            ],
            "takeaway": "Bir dizine ya da ikili dosyaya konan sır asla gizli değildir: kimliği doğrulanmış her kullanıcı onu okuyabilir. Zararsız görünen bir ACL hakkı (GenericAll) bir etki alanını ele geçirmeye yeter: hakları denetlemek, parolaları denetlemek kadar önemlidir."
          },
          {
            "id": "fireflow",
            "box": "Fireflow",
            "os": "Linux",
            "difficulty": "Medium",
            "keywords": [
              "Kubernetes",
              "JWT",
              "RCE"
            ],
            "chain": [
              "Langflow’da kimlik doğrulaması gerektirmeyen kod çalıştırma",
              "MCP Registry’nin kabul ettiği “alg:none” JWT",
              "Kod çalıştırma",
              "Service Account token’ının çalınması",
              "kubelet üzerinden bir pod içinde komut çalıştırma",
              "Ana makinenin dosya sistemine erişimi olan pod",
              "Root"
            ],
            "flaws": [
              "JWT algoritmasının doğrulanmaması",
              "Fazla geniş haklara sahip Service Account",
              "Ana makineye erişimi olan pod"
            ],
            "pitfalls": [
              "İki günlükleme yöntemi bırakıldığı sürece doğrulama hatasıyla başarısız olan özel bir Langflow bileşeni (writeup’ımda not ettim)"
            ],
            "defense": [
              "Langflow’u güncellemek",
              "“alg:none” değerini reddetmek",
              "Service Account’lar için en az yetki",
              "hostPath bağlamalarını yasaklamak",
              "NetworkPolicy’ler"
            ],
            "takeaway": "Kubernetes’te her katman bir öncekine güvenir: bir pod’da çalınan token, Service Account’un hakları genişse kümeye erişime dönüşür. En az yetki ilkesi ve JWT’lerin sıkı doğrulanması basit ve etkili savunmalardır."
          },
          {
            "id": "reactor",
            "box": "Reactor",
            "os": "Linux",
            "difficulty": "",
            "keywords": [
              "Next.js",
              "CVE",
              "Node Inspector"
            ],
            "chain": [
              "React’in sürüm adayını (RC) kullanan Next.js uygulaması",
              "React2Shell CVE’si (kimlik doğrulamadan önce kod çalıştırma)",
              "Shell",
              "Bir kullanıcının kırılan MD5 hash’i",
              "SSH",
              "Root olarak çalışan bir süreçte etkin Node Inspector",
              "Root"
            ],
            "flaws": [
              "Üretimde RC sürümü",
              "Güvenlik açığı içeren seri durumdan çıkarma (deserialization)",
              "Root olarak çalışan bir süreçte etkin --inspect seçeneği",
              "Parolalar için MD5"
            ],
            "pitfalls": [
              "execSync içindeki doğrudan reverse shell, JSON kaçışı yüzünden başarısız oldu: yerine HTTP ile sunulan ve curl ile çalıştırılan bir betik kullandım",
              "Otomatik Python PoC’leri kararsız çıktı, bu yüzden Burp Repeater ile elle istismar ettim"
            ],
            "defense": [
              "Üretimde asla RC sürümü kullanmamak",
              "Üretimde asla --inspect kullanmamak",
              "Parolalar için modern bir hash (bcrypt ya da argon2)",
              "Root hakları olmayan bir izleme süreci"
            ],
            "takeaway": "Root olarak çalışan bir süreçte etkin bırakılan bir hata ayıklama aracı, yalnızca 127.0.0.1 ile sınırlı olsa bile açık bir kapıdır. Bir framework’ün sürüm adayı da üretime çıkmaz."
          }
        ]
      }
    },
    thm: {
      "title": "Odalar, canlı",
      "sub": "Elle güncellenen herkese açık TryHackMe istatistikleri: tamamlanan odalar, sıralama, seviye, rozetler ve puan.",
      "labels": {
        "rooms": "Tamamlanan odalar",
        "top": "İlk",
        "level": "Seviye",
        "badges": "Rozetler",
        "points": "Puan",
        "updated": "Son güncelleme",
        "profile": "TryHackMe profilini gör",
        "statsLabel": "TryHackMe istatistikleri",
        "empty": "TryHackMe istatistikleri şu anda kullanılamıyor.",
        "emptyLink": "Profilimi doğrudan aç"
      }
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
    contact: { title: "Son düdük.", lead: "Siber güvenlik ya da bir proje hakkında konuşmak, ya da sadece merhaba demek mi istersin? Soyunma odası açık.", availability: "Siber güvenlik veya web geliştirme alanında dönüşümlü eğitim (alternance) arıyorum; hemen başlayabilirim ve Eylül 2027'ye kadar devam edebilirim. Nancy'de yaşıyorum; tüm Grand Est bölgesinde ve Lüksemburg'da çalışabilirim. Tempo: haftada 4 gün şirkette, 1 gün eğitimde.", email: "deniz16ok@gmail.com" }
  }
}
