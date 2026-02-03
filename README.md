# Portfolio Deniz OK

![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)
![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vue.js)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)
![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)

## 🚀 Présentation

Bienvenue sur mon portfolio !  
Ce projet met en avant mes compétences, mes projets et mon parcours de façon moderne et responsive.

## ✨ Fonctionnalités

- 🌍 **Multilingue** : Support complet du Français, Anglais et Turc
- 🌓 **Mode sombre/clair** : Changement de thème instantané et optimisé
- 📱 **Design responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- ✨ **Animations fluides** : Transitions et effets visuels modernes avec `@vueuse/motion`
- 🎨 **Glassmorphism Premium** : Design moderne avec effets de verre sophistiqués
- ⚡ **Performances optimisées** : Images WebP via `@nuxt/image`
- 🎯 **Navigation intuitive** : Menu latéral et scroll-to-top avec progression
- 📊 **Sections complètes** : À propos, Formation, Expérience, Compétences (dont Cybersécurité), Centres d'intérêt, Projets, Langues
- 🌌 **Fond Animé** : Particules et dégradés dynamiques
- 🎮 **Terminal Interactif** : Commandes, jeux et easter eggs cachés
- 📲 **PWA Ready** : Application installable via `@vite-pwa/nuxt`
- 🔍 **SEO Optimisé** : Balises Open Graph pour les réseaux sociaux

## 🛠️ Technologies utilisées

- [Nuxt.js 3](https://nuxt.com/) - Framework Vue.js pour applications web modernes
- [Vue.js 3](https://vuejs.org/) - Framework JavaScript progressif
- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) - Langage de programmation
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [@vueuse/motion](https://motion.vueuse.org/) - Animations déclaratives
- [@nuxt/image](https://image.nuxt.com/) - Optimisation des images
- [@nuxt/content](https://content.nuxt.com/) - Gestion de contenu
- [@vite-pwa/nuxt](https://vite-pwa-org.netlify.app/) - Progressive Web App

## 📦 Installation

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

4. **Accéder au portfolio :**
   Ouvrez votre navigateur à l'adresse : `http://localhost:3000`

## 📜 Scripts disponibles

- `npm run dev` : Lance le serveur de développement
- `npm run build` : Génère une version optimisée pour la production
- `npm run preview` : Prévisualise le projet après le build
- `npm run generate` : Génère un site statique
- `npm run deploy` : Déploie le site sur GitHub Pages

## 📁 Structure du projet

```
Portfolio/
├── assets/css/                 # Fichiers CSS (main, animations, components, timeline, theme)
├── components/                 # 13 composants Vue réutilisables
│   ├── Hero.vue                # Section d'accueil avec présentation
│   ├── Terminal.vue            # Terminal interactif gamifié
│   ├── Navigation.vue          # Menu de navigation latéral
│   ├── ThemeToggle.vue         # Bouton mode sombre/clair
│   ├── LanguageToggle.vue      # Sélecteur de langue
│   └── ...                     # Education, Experience, Skills, Portfolio, etc.
├── composables/                # Fonctions réutilisables
│   ├── useLanguage.js          # Gestion de la langue active
│   └── useTranslations.js      # Traductions FR/EN/TR
├── pages/                      # Routes de l'application
│   └── index.vue               # Page d'accueil
├── plugins/                    # Plugins Nuxt
│   └── language.client.js      # Initialisation langue côté client
├── public/                     # Fichiers statiques (images, favicon, robots.txt)
├── app.vue                     # Composant racine avec layout
├── nuxt.config.ts              # Configuration Nuxt
├── tailwind.config.js          # Configuration Tailwind CSS
└── package.json                # Dépendances du projet
```

## 🌐 Sections du Portfolio

### 🏠 Hero

Présentation générale avec photo, animations d'entrée et liens de contact.

### 🎓 Formation

Parcours académique de Epitech à aujourd'hui.

### 💼 Expérience

Expériences professionnelles et stages.

### ⚙️ Compétences

Liste complète des compétences techniques.

### ❤️ Centres d'intérêt

Passions personnelles : culture japonaise, musique, jeux vidéo et mythologie.

### 💻 Projets

Portfolio de projets avec animations au scroll et effets glassmorphism.

### 🌍 Langues

Maîtrise du Français, Turc et Anglais (TOEIC 790/990).

## 🎮 Terminal Interactif

Le terminal caché offre une expérience gamifiée :

- Tapez `help` pour voir les commandes disponibles
- Tapez `game` pour jouer au Juste Nombre
- Trouvez les commandes secrètes comme `secret` ou `matrix`

## 🎨 Personnalisation

### Modifier les traductions

Les traductions se trouvent dans `composables/useTranslations.js`.

### Changer les couleurs

Les couleurs principales sont définies dans `nuxt.config.ts` et `tailwind.config.js`.

## 🚀 Déploiement

```bash
npm run build
```

Les fichiers générés se trouvent dans `.output/public/` et peuvent être déployés sur Netlify, Vercel, GitHub Pages, etc.

---

**Réalisé avec 💙 par Deniz OK**

- 🌐 [Portfolio](https://portfolio-deniz.netlify.app/)
- 💼 [LinkedIn](https://www.linkedin.com/in/deniz-ok/)
- 💻 [GitHub](https://github.com/Deniz09OK)
