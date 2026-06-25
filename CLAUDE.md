# CLAUDE.md — Portfolio Sailor Vanbercy

## Projet

Portfolio personnel Angular (v20) avec thème sombre violet. Composants standalone, routing simple, pas de backend.

## Commandes

```bash
npm start          # Serveur de dev (ng serve)
npm run build      # Build production
npm test           # Tests unitaires Karma/Jasmine
```

## Architecture

```
src/
├── app/
│   ├── core/                  # Layout persistant
│   │   ├── header/            # Navigation + hamburger mobile
│   │   └── footer/
│   ├── pages/                 # Pages routées
│   │   ├── home/              # Hero avec animations
│   │   ├── projects/
│   │   │   ├── projects-list/ # Grille de projets
│   │   │   └── project-detail/# Détail par slug (:id)
│   │   ├── about/             # Parcours + timeline + compétences
│   │   └── contact/           # Grille de 3 cartes + bouton CV
│   ├── services/
│   │   └── project-service.ts # Données projets (in-memory)
│   ├── app.ts                 # Root : IntersectionObserver + MutationObserver pour .reveal
│   ├── app.html
│   ├── app.scss               # Container max-width 1200px
│   └── app.routes.ts          # Routes : /, /projets, /projets/:id, /about, /contact
├── styles.scss                # Variables CSS, reset, keyframes, classes .reveal
└── index.html
public/                        # Assets statiques (logo, favicon, CV PDF)
```

## Stack technique

- **Framework** : Angular 20 (standalone components, signals)
- **Styles** : SCSS avec CSS custom properties
- **TypeScript** : strict mode, strict templates
- **Build** : @angular/build:application
- **Tests** : Karma + Jasmine

## Conventions

- Composants standalone uniquement (pas de NgModule)
- Chaque composant = 3 fichiers : `.ts`, `.html`, `.scss`
- Nommage des classes CSS : BEM (`.block__element--modifier`)
- Sélecteurs composants préfixés `app-` (`app-header`, `app-footer`)
- Exports nommés avec le nom de la classe (ex: `export class Header`)

## Thème et styles

- **Palette** : violet sombre (`--primary: #7c3aed`, `--accent: #c084fc`, `--bg: #0f0a1a`)
- **Animations globales** définies dans `styles.scss` : `fadeUp`, `fadeIn`, `float`, `gradientShift`, `pulseGlow`, `scaleIn`
- **Scroll reveal** : ajouter la classe `.reveal` (+ `.delay-1` à `.delay-5`) — l'observer dans `app.ts` gère tout automatiquement via MutationObserver
- **Cartes** : fond `rgba(26, 17, 40, 0.6)` avec bordure violette au hover

## Données projets

Les projets sont définis en dur dans `src/app/services/project-service.ts`. Interface `Project` :

```typescript
interface Project {
  title: string;
  description: string;
  slug: string;           // Utilisé pour la route /projets/:id
  status: 'done' | 'progress';
  technologies: string[];
  isGroup: boolean;       // Affiche une icône groupe si true
  url?: string;           // Lien externe optionnel
}
```

## Responsive

- Breakpoint mobile : `768px`
- Header : hamburger menu en dessous de 768px
- Grilles (projets, contact) : passent en colonne unique
- Hero : taille de texte réduite, boutons empilés

## Points d'attention

- Ne pas supprimer la classe `.reveal` des templates — c'est elle qui déclenche les animations au scroll
- Le `MutationObserver` dans `app.ts` observe le DOM en continu pour les éléments `.reveal` ajoutés dynamiquement par le routeur
- Les accents français doivent être préservés dans tous les templates HTML
- `project-service.ts` est la source unique de données pour les projets
