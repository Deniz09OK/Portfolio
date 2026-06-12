# Portfolio Deniz OK

![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)
![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5)

## 🚀 Présentation

Bienvenue sur mon portfolio !  
Ce projet met en avant mes compétences, mes projets et mon parcours de façon moderne, dynamique et responsive. 

Le design adopte le style **Arena**, un concept d'éditorial premium inspiré de l'univers sportif et de la culture japonaise, associant une esthétique minimaliste sombre, des typographies fortes et des effets de verre soignés (*glassmorphism*).

## ✨ Fonctionnalités

- 🌍 **Multilingue** : Support complet et réactif du **Français**, **Anglais** et **Turc**.
- 🌓 **Mode sombre/clair** : Transition de thème fluide et instantanée, mémorisée et optimisée (sans flash au chargement grâce à un script côté serveur/client).
- 📱 **Design responsive** : Parfaitement adapté à tous les écrans (mobiles, tablettes et ordinateurs de bureau).
- ✨ **Animations fluides** : Révélation progressive et élégante des sections au défilement (*reveal-on-scroll*) via un plugin sur mesure.
- 🎨 **Aesthetics Arena** : Fiche joueur en en-tête, bandeau de défilement style live-ticker, et cartes de saison détaillées pour les projets.
- ⚡ **Performances optimisées** : Chargement ultra-rapide et utilisation d'images au format WebP optimisées avec `@nuxt/image`.
- 🔍 **SEO de pointe** : Balises Open Graph dynamiques adaptées à la langue de l'utilisateur pour le partage sur les réseaux sociaux.

## 🛠️ Technologies utilisées

- [Nuxt 3](https://nuxt.com/) - Framework Vue.js pour applications web modernes (SSR & Génération Statique)
- [Vue.js 3](https://vuejs.org/) - Composition API & Reactivité
- [TypeScript](https://www.typescriptlang.org/) - Typage robuste et sécurisé
- **Vanilla CSS (Variables CSS & Grid/Flexbox)** - Design system sur mesure léger et performant (sans framework tiers type Tailwind)
- [@nuxt/image](https://image.nuxt.com/) - Optimisation automatique des images

## 📦 Installation locale

1. **Cloner le dépôt :**

   ```bash
   git clone https://github.com/Deniz09OK/Portfolio.git
   cd Portfolio
   ```

2. **Installer les dépendances :**

   ```bash
   npm install
   ```

3. **Lancer le projet en mode développement :**

   ```bash
   npm run dev
   ```

4. **Accéder au site :**  
   Ouvrez votre navigateur sur [http://localhost:3000](http://localhost:3000).

## 📜 Scripts disponibles

- `npm run dev` : Lance le serveur de développement local.
- `npm run build` : Compile le projet pour la production.
- `npm run generate` : Génère le site entièrement statique dans le dossier `.output/public`.
- `npm run preview` : Prévisualise localement le site généré.
- `npm run test` : Lance les tests Playwright.

## 📁 Structure du projet

```
Portfolio/
├── .github/workflows/          # Workflows d'automatisation
│   └── deploy.yml              # CI/CD pour le déploiement sur GitHub Pages via GitHub Actions
├── assets/css/                 # Design System & Stylesheets par composants
│   ├── arena.css               # Point d'entrée important toutes les feuilles de style
│   ├── base.css                # Réinitialisation globale et règles HTML par défaut
│   ├── variables.css           # Thèmes de couleurs (Variables HSL) et polices globales
│   ├── utils.css               # Utilitaires globaux et animations communes
│   ├── topbar.css              # Styles de la barre supérieure (TopBar.vue)
│   ├── ticker.css              # Styles du bandeau défilant (LiveTicker.vue)
│   ├── hero.css                # Styles de la fiche de présentation (HeroCard.vue)
│   ├── matches.css             # Styles de la section des projets (MatchesSection.vue)
│   ├── career.css              # Styles de la timeline académique/professionnelle (CareerSection.vue)
│   ├── drills.css              # Styles de la section des compétences (DrillsSection.vue)
│   ├── offcourt.css            # Styles de la section hors-clavier et modales (OffCourtSection.vue & OffModal.vue)
│   └── languages.css           # Styles de la section des langues (LanguagesSection.vue)
├── components/                 # Composants Vue du portfolio
│   ├── TopBar.vue              # En-tête de page (changement de thème & sélecteur de langue)
│   ├── LiveTicker.vue          # Bandeau de défilement dynamique (style bandeau sportif)
│   ├── HeroCard.vue            # Fiche joueur de présentation principale
│   ├── MatchesSection.vue      # Section projets ("Card de la saison")
│   ├── CareerSection.vue       # Expériences et Études ("Saisons jouées" sous forme de timeline)
│   ├── DrillsSection.vue       # Compétences techniques ("Entraînement quotidien")
│   ├── OffCourtSection.vue     # Activités annexes ("Hors du clavier")
│   ├── OffModal.vue            # Composant modale pour le détail des activités annexes
│   ├── LanguagesSection.vue    # Indicateurs de maîtrise linguistique
│   └── ContactSection.vue      # Liens et formulaire de contact ("Sifflet final")
├── composables/                # Logique réutilisable
│   ├── useLang.ts              # Gestion de l'internationalisation (FR / EN / TR)
│   └── useTheme.ts             # Gestionnaire de thème sombre/clair
├── data/                       # Données de l'application
│   └── portfolio.ts            # Données structurées et traduites du portfolio
├── plugins/                    # Plugins personnalisés de Nuxt
│   ├── reveal.client.ts        # Gestion des animations d'entrée au scroll
│   └── reveal.server.ts        # Compatibilité SSR pour les animations
├── public/                     # Ressources statiques (images, favicon, portraits)
├── app.vue                     # Fiche racine englobant les composants
├── nuxt.config.ts              # Fichier de configuration de Nuxt (BaseURL, SEO, modules)
└── tsconfig.json               # Fichier de configuration TypeScript
```

## 🚀 Déploiement

Le projet est configuré pour se déployer automatiquement sur **GitHub Pages** à l'aide de **GitHub Actions**. 

Chaque commit poussé sur la branche `main` déclenche le workflow défini dans `.github/workflows/deploy.yml` qui :
1. Installe les dépendances.
2. Exécute `npm run generate` pour compiler le site statique.
3. Déploie le dossier `.output/public` directement sur la plateforme GitHub Pages.

---

**Réalisé avec 💙 par Deniz OK**

- 🌐 [Portfolio Live](https://deniz09ok.github.io/Portfolio/)
- 💼 [LinkedIn](https://www.linkedin.com/in/deniz-ok/)
- 💻 [GitHub](https://github.com/Deniz09OK)
