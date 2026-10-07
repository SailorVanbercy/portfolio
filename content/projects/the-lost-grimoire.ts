import { defineProject } from './define';

export default defineProject({
  slug: 'the-lost-grimoire',
  title: 'The Lost Grimoire',
  pitch: {
    fr: 'Application de prise de notes en Markdown organisées en arborescence de dossiers, conçue en équipe pendant un hackathon de cinq jours.',
    en: 'Markdown note-taking app organised in a folder tree, built as a team during a five-day hackathon.',
  },
  category: 'academic',
  period: '2026',
  team: { solo: false, size: 6 },
  role: {
    fr: 'Développeur front-end principal : interface React, éditeur de notes, arborescence de dossiers, intégration de l’API et exports.',
    en: 'Lead front-end developer: React interface, note editor, folder tree, API integration and exports.',
  },
  context: {
    fr: 'Projet d’examen du cours d’applications d’entreprise (HELHa, bloc 3) réalisé sous forme de hackathon. L’objectif était de livrer en cinq jours une application complète et sécurisée pour écrire et organiser ses notes, avec un thème graphique libre : l’équipe a choisi un univers de grimoire hanté.',
    en: 'Exam project for the enterprise applications course (HELHa, year 3), run as a hackathon. The goal was to ship, in five days, a complete and secure app to write and organise notes, with a free visual theme: the team picked a haunted spellbook universe.',
  },
  features: {
    fr: [
      'Inscription et connexion avec jeton JWT stocké dans un cookie HttpOnly',
      'Arborescence de dossiers et sous-dossiers dépliable, avec recherche',
      'Éditeur riche avec barre d’outils, raccourcis clavier et aperçu Markdown',
      'Métadonnées de note (taille, nombre de mots, dernière sauvegarde)',
      'Export d’une note en PDF et d’un dossier complet en archive ZIP',
      'Tableau de bord des notes récentes',
    ],
    en: [
      'Sign-up and sign-in with a JWT stored in an HttpOnly cookie',
      'Expandable tree of folders and sub-folders, with search',
      'Rich editor with toolbar, keyboard shortcuts and Markdown preview',
      'Note metadata (size, word count, last save)',
      'Export a note to PDF and a whole folder to a ZIP archive',
      'Dashboard of recent notes',
    ],
  },
  architecture: {
    fr: 'Le back-end Spring Boot (Java 17) suit une architecture en couches inspirée de la clean architecture (domaine, application, infrastructure, contrôleurs) et applique le pattern CQRS : chaque cas d’usage possède son handler de commande ou de requête avec des DTO d’entrée et de sortie. La persistance repose sur Spring Data JPA et Hibernate avec MySQL, la sécurité sur Spring Security et JWT, la documentation sur OpenAPI. Les exports convertissent le Markdown en HTML (Flexmark) puis en PDF (OpenHTMLtoPDF). Le front-end React 19 + TypeScript, construit avec Vite, utilise React Router, TipTap pour l’édition, Marked et Turndown pour la conversion Markdown, et Framer Motion pour les animations. Les 89 tests back-end utilisent JUnit et Testcontainers, et l’ensemble démarre avec Docker Compose (MySQL, API, front).',
    en: 'The Spring Boot back end (Java 17) follows a layered design inspired by clean architecture (domain, application, infrastructure, controllers) and applies the CQRS pattern: every use case has its own command or query handler with input and output DTOs. Persistence relies on Spring Data JPA and Hibernate with MySQL, security on Spring Security and JWT, documentation on OpenAPI. Exports turn Markdown into HTML (Flexmark) and then PDF (OpenHTMLtoPDF). The React 19 + TypeScript front end, built with Vite, uses React Router, TipTap for editing, Marked and Turndown for Markdown conversion, and Framer Motion for animations. The 89 back-end tests use JUnit and Testcontainers, and the whole stack starts with Docker Compose (MySQL, API, front end).',
  },
  stack: {
    frontend: ['react', 'typescript', 'vite', 'react-router', 'tiptap', 'framer-motion'],
    backend: ['java', 'spring-boot'],
    database: ['mysql', 'jpa', 'hibernate', 'spring-data-jpa', 'sql'],
    security: ['spring-security', 'jwt', 'bean-validation', 'cors'],
    architecture: ['rest-api', 'cqrs', 'clean-architecture', 'dto', 'openapi'],
    infrastructure: ['docker', 'docker-compose'],
    testing: ['junit', 'testcontainers'],
    tooling: ['maven', 'lombok', 'git'],
  },
  images: [
    {
      src: 'projects/the-lost-grimoire/01-accueil.webp',
      alt: { fr: 'Accueil avec arborescence de dossiers et notes récentes', en: 'Home with folder tree and recent notes' },
      viewport: 'desktop',
    },
    {
      src: 'projects/the-lost-grimoire/02-editeur-markdown.webp',
      alt: { fr: 'Éditeur de note avec barre d’outils et rendu Markdown', en: 'Note editor with toolbar and Markdown rendering' },
      viewport: 'desktop',
    },
    {
      src: 'projects/the-lost-grimoire/03-connexion.webp',
      alt: { fr: 'Écran de connexion au thème grimoire', en: 'Spellbook-themed sign-in screen' },
      viewport: 'desktop',
    },
  ],
  links: { repo: 'https://github.com/SailorVanbercy/HackathonFront' },
  featured: false,
  order: 7,
});
