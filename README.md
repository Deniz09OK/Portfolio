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

- 🌍 **Multilingue** : Support complet et réactif du **Français**, **Anglais** et **Turc** (contenus, libellés d'interface, bandeau défilant et libellés d'accessibilité). La langue choisie est mémorisée.
- 🌓 **Mode sombre/clair** : Transition de thème fluide, choix mémorisé et appliqué avant le premier affichage (aucun flash du thème sombre).
- 📱 **Design responsive** : Testé du 320 px à l'ultrawide 3440 px, en portrait et en paysage, sur Chromium, Firefox et WebKit.
- ♿ **Accessibilité** : Cibles tactiles d'au moins 44 × 44 px, `aria-label` traduits dans les trois langues, respect de `prefers-reduced-motion`.
- ✨ **Animations fluides** : Révélation progressive et élégante des sections au défilement (*reveal-on-scroll*) via un plugin sur mesure.
- 🎨 **Aesthetics Arena** : Fiche joueur en en-tête, bandeau de défilement style live-ticker, et cartes de saison détaillées pour les projets.
- ⚡ **Performances optimisées** : Chargement ultra-rapide et utilisation d'images au format WebP optimisées avec `@nuxt/image`.
- 🔍 **SEO** : Balises Open Graph et Twitter Card, lien canonique, `sitemap.xml` et `robots.txt`. Le titre et les descriptions suivent la langue active dans le navigateur ; le HTML prérendu, lu par les réseaux sociaux, est en français.
- 🚫 **Page 404 dédiée** : Page « Hors du terrain » trilingue, prérendue dans `404.html` pour GitHub Pages.

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
- `npm run test` : Lance les tests Playwright sur le site généré (lancer `npm run generate` avant).

## 🧪 Tests

Les tests Playwright (`tests/portfolio.spec.ts`) tournent sur le site statique généré, servi comme sur GitHub Pages par `tests/serve.mjs` (404.html compris), sur trois profils : Chromium desktop, Chromium mobile (Pixel 7) et WebKit mobile (iPhone 15). Ils vérifient :

- le rendu des trois langues, sans erreur JavaScript ;
- que chaque projet affiche un seul statut (lien vers le code, « Confidentiel » ou « En développement ») ;
- la navigation vers chaque section, desktop et burger mobile ;
- l'ouverture et la fermeture des modales (clic et Échap) ;
- l'absence de défilement horizontal à 320 px dans les trois langues ;
- des cibles tactiles d'au moins 44 × 44 px sur mobile ;
- l'application du thème clair avant le chargement de l'application, et sa mémorisation ;
- une vraie page 404 pour les URL inconnues.

```bash
npm run generate
npx playwright install chromium webkit   # une seule fois
npm test
```

## 📁 Structure du projet

```
Portfolio/
├── .github/workflows/          # Workflows d'automatisation
│   └── deploy.yml              # CI/CD : génération, tests Playwright puis déploiement sur GitHub Pages
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
│   ├── languages.css           # Styles de la section des langues (LanguagesSection.vue)
│   └── contact.css             # Styles de la section de contact (ContactSection.vue)
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
│   └── ContactSection.vue      # Liens de contact ("Sifflet final")
├── composables/                # Logique réutilisable
│   ├── useLang.ts              # Gestion de l'internationalisation (FR / EN / TR)
│   └── useTheme.ts             # Gestionnaire de thème sombre/clair
├── data/                       # Données de l'application
│   └── portfolio.ts            # Données structurées et traduites du portfolio
├── types/                      # Définitions TypeScript
│   └── portfolio.ts            # Interfaces décrivant la structure du contenu du portfolio
├── plugins/                    # Plugins personnalisés de Nuxt
│   ├── reveal.client.ts        # Gestion des animations d'entrée au scroll
│   └── reveal.server.ts        # Compatibilité SSR pour les animations
├── tests/                      # Tests de bout en bout
│   ├── portfolio.spec.ts       # Suite Playwright
│   └── serve.mjs               # Serveur statique reproduisant GitHub Pages (404.html)
├── public/                     # Ressources statiques
│   ├── portrait.jpg            # Portrait utilisé en hero et dans les balises Open Graph
│   ├── cv-deniz-ok-fr.pdf      # CV téléchargeable (FR)
│   ├── cv-deniz-ok-en.pdf      # CV téléchargeable (EN/TR)
│   ├── favicon.ico             # Favicon de repli pour les navigateurs qui le demandent par défaut
│   ├── sitemap.xml             # Plan du site pour les moteurs de recherche
│   └── robots.txt              # Autorisation d'indexation et lien vers le sitemap
├── app.vue                     # Fiche racine englobant les composants
├── error.vue                   # Page 404 trilingue, prérendue en 404.html pour GitHub Pages
├── nuxt.config.ts              # Fichier de configuration de Nuxt (BaseURL, SEO, prérendu de la 404)
├── playwright.config.ts        # Configuration Playwright (profils desktop et mobile)
└── tsconfig.json               # Fichier de configuration TypeScript
```

## 🚀 Déploiement

Le projet est configuré pour se déployer automatiquement sur **GitHub Pages** à l'aide de **GitHub Actions**, et servi sur le domaine personnalisé [portfolio-deniz.me](https://portfolio-deniz.me/).

Chaque commit poussé sur la branche `main` déclenche le workflow défini dans `.github/workflows/deploy.yml` qui :
1. Installe les dépendances.
2. Exécute `npm run generate` pour compiler le site statique.
3. Lance les tests Playwright sur ce build. **Si un test échoue, rien n'est déployé** et le rapport est disponible dans les artefacts du workflow.
4. Déploie sur GitHub Pages le dossier `.output/public` qui vient d'être testé.

Sur une pull request, seuls la génération et les tests sont exécutés.

La page 404 est générée à partir de `error.vue` : Nuxt produit toujours `/404.html` comme une coquille vide remplie en JavaScript, la route `/404` est donc rendue côté serveur puis écrite dans `404.html` via le hook Nitro `prerender:generate` (voir `nuxt.config.ts`).

---

**Réalisé avec 💙 par Deniz OK**

- 🌐 [Portfolio Live](https://portfolio-deniz.me/)
- 💼 [LinkedIn](https://www.linkedin.com/in/deniz-ok/)
- 💻 [GitHub](https://github.com/Deniz09OK)
- 🦊 [GitLab](https://gitlab.com/Deniz09OK)
