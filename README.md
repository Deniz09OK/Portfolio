# Portfolio Deniz OK

![Nuxt](https://img.shields.io/badge/Nuxt-3-00DC82?logo=nuxt.js)
![Vue.js](https://img.shields.io/badge/Vue.js-3-4FC08D?logo=vue.js)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)

## 🚀 Présentation

Bienvenue sur mon portfolio !  
Ce projet met en avant mes compétences, mes projets et mon parcours de façon moderne et responsive.

## ✨ Fonctionnalités

- 🌍 **Multilingue** : Support complet du Français, Anglais et Turc
- 🌓 **Mode sombre/clair** : Changement de thème instantané et optimisé
- 📱 **Design responsive** : Adapté à tous les écrans (mobile, tablette, desktop)
- ✨ **Animations fluides** : Transitions et effets visuels modernes
- 🎨 **Glassmorphism** : Design moderne avec effets de verre
- ⚡ **Performances optimisées** : Chargement rapide et navigation fluide
- 🎯 **Navigation intuitive** : Menu latéral et scroll-to-top avec progression
- 📊 **Sections complètes** : À propos, Formation, Expérience, Compétences, Centres d'intérêt, Projets, Langues

## 🛠️ Technologies utilisées

- [Nuxt.js 3](https://nuxt.com/) - Framework Vue.js pour applications web modernes
- [Vue.js 3](https://vuejs.org/) - Framework JavaScript progressif
- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) - Langage de programmation 
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [SVG Icons](https://heroicons.com/) - Icônes vectorielles optimisées

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

## 📁 Structure du projet

```
Portfolio/
├── assets/
│   └── css/                    # Fichiers CSS globaux
│       ├── main.css
│       ├── components.css
│       ├── timeline.css
│       ├── animations.css
│       └── theme-optimization.css
├── components/                 # Composants Vue réutilisables
│   ├── Navigation.vue         # Menu de navigation latéral
│   ├── Hero.vue              # Section d'accueil
│   ├── Education.vue         # Parcours académique
│   ├── Experience.vue        # Expériences professionnelles
│   ├── Skills.vue            # Compétences techniques
│   ├── Interests.vue         # Centres d'intérêt
│   ├── Portfolio.vue         # Projets réalisés
│   ├── Languages.vue         # Langues parlées
│   ├── Footer.vue            # Pied de page
│   ├── ThemeToggle.vue       # Bouton de changement de thème
│   ├── LanguageToggle.vue    # Sélecteur de langue
│   └── ScrollToTop.vue       # Bouton retour en haut
├── composables/               # Fonctions réutilisables
│   ├── useLanguage.js        # Gestion de la langue
│   └── useTranslations.js    # Traductions multilingues
├── public/                    # Fichiers statiques
│   ├── deniz.jpg            # Photo de profil
│   └── favicon.ico
├── app.vue                    # Composant racine
├── nuxt.config.ts            # Configuration Nuxt
└── package.json              # Dépendances du projet
```

## 🌐 Sections du Portfolio

### 🏠 Hero
Présentation générale avec photo, titre, description et liens de contact.

### 🎓 Formation
Parcours académique de Epitech à aujourd'hui, avec détails des compétences acquises.

### 💼 Expérience
Expériences professionnelles et stages, de l'alternance actuelle aux premiers stages.

### ⚙️ Compétences
Liste complète des compétences techniques : systèmes d'exploitation, langages, frameworks, bases de données et réseaux.

### ❤️ Centres d'intérêt
Passions personnelles : culture japonaise, musique, jeux vidéo et mythologie.

### 💻 Projets
Portfolio de projets réalisés avec descriptions, technologies et liens GitHub.

### 🌍 Langues
Maîtrise du Français (langue maternelle), Turc (langue maternelle) et Anglais (TOEIC 790/990).

## 🎨 Personnalisation

### Modifier les traductions
Les traductions se trouvent dans `composables/useTranslations.js`. Vous pouvez ajouter ou modifier les textes en français, anglais et turc.

### Changer les couleurs
Les couleurs principales sont définies dans `nuxt.config.ts` et peuvent être personnalisées via Tailwind CSS.

### Ajouter des projets
Modifiez le fichier `components/Portfolio.vue` pour ajouter vos propres projets.

## 🚀 Déploiement

### Build pour la production
```bash
npm run build
```

### Génération statique
```bash
npm run generate
```

Les fichiers générés se trouvent dans le dossier `.output/public/` et peuvent être déployés sur n'importe quel hébergeur statique (Netlify, Vercel, GitHub Pages, etc.).

---

**Réalisé avec 💙 par Deniz OK**

- 🌐 [Portfolio](https://portfolio-ok.com/)
- 💼 [LinkedIn](https://www.linkedin.com/in/deniz-ok/)
- 💻 [GitHub](https://github.com/Deniz09OK)


