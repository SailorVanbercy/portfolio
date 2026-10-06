import { defineProject } from './define';

export default defineProject({
  slug: 'smaatch',
  title: 'Smaatch',
  pitch: {
    fr: 'Plateforme web et mobile de gestion de clubs sportifs : membres, événements, présences, finances et billetterie.',
    en: 'Web and mobile platform to run sports clubs: members, events, attendance, finances and ticketing.',
  },
  category: 'personal',
  period: '2025 – 2026',
  team: { solo: true },
  role: {
    fr: 'Conception et développement complet : modèle de données et sécurité Supabase, application web Next.js, application mobile Expo, tests et conteneurisation.',
    en: 'End-to-end design and development: Supabase data model and security, Next.js web app, Expo mobile app, testing and containerisation.',
  },
  context: {
    fr: 'Les clubs sportifs amateurs gèrent encore leurs membres, convocations, cotisations et caisses dans des tableurs dispersés. Smaatch centralise toute la vie d’un club, ou d’une fédération de plusieurs clubs, dans une seule plateforme : un back-office web pour le comité et une application mobile pour les entraîneurs et les membres, connectés à la même base.',
    en: 'Amateur sports clubs still run members, call-ups, fees and cash boxes in scattered spreadsheets. Smaatch centralises the whole life of a club, or of a federation of several clubs, in a single platform: a web back office for the committee and a mobile app for coaches and members, both connected to the same database.',
  },
  features: {
    fr: [
      'Gestion multi-clubs : organisations, clubs, catégories d’âge, terrains et membres avec rôles',
      'Calendrier des entraînements, matchs et tournois avec suivi des présences',
      'Résultats de matchs et statistiques (évolution des membres, taux de présence, répartition des événements)',
      'Module financier complet : cotisations, caisse, banque, salaires, buvette et dépenses',
      'Billetterie : génération de lots de tickets numérotés avec QR code et export PDF',
      'Documents administratifs en PDF, contacts parents et notifications configurables',
      'Interface en quatre langues (FR, EN, NL, DE), thème clair/sombre et couleur personnalisable par club',
    ],
    en: [
      'Multi-club management: organisations, clubs, age categories, venues and members with roles',
      'Calendar of trainings, matches and tournaments with attendance tracking',
      'Match results and statistics (member growth, attendance rate, event breakdown)',
      'Full finance module: membership fees, cash box, bank, salaries, bar revenue and expenses',
      'Ticketing: generation of numbered ticket batches with QR codes and PDF export',
      'Administrative PDF documents, parent contacts and configurable notifications',
      'Interface in four languages (FR, EN, NL, DE), light/dark theme and per-club colour',
    ],
  },
  architecture: {
    fr: 'Deux clients partagent un même back-end Supabase. L’application web Next.js (App Router, React 19) utilise @supabase/ssr pour une authentification par cookies, un middleware qui protège les routes selon le rôle et redirige vers l’onboarding, et des schémas Zod pour valider les saisies. L’application mobile Expo (React Native, Expo Router, NativeWind) s’appuie sur TanStack Query pour le cache serveur et Zustand pour l’état local. La base PostgreSQL est multi-tenant : chaque table est rattachée à une organisation et isolée par près de 90 politiques Row Level Security, versionnées dans des migrations. Les deux applications sont couvertes par environ 90 fichiers de tests (Vitest, Jest, Testing Library, Playwright) et la version web est livrée dans une image Docker multi-étapes.',
    en: 'Two clients share a single Supabase back end. The Next.js web app (App Router, React 19) uses @supabase/ssr for cookie-based authentication, a middleware that guards routes by role and redirects to onboarding, and Zod schemas to validate input. The Expo mobile app (React Native, Expo Router, NativeWind) relies on TanStack Query for server cache and Zustand for local state. The PostgreSQL database is multi-tenant: every table belongs to an organisation and is isolated by about 90 Row Level Security policies, versioned in migrations. Both apps are covered by around 90 test files (Vitest, Jest, Testing Library, Playwright) and the web app ships as a multi-stage Docker image.',
  },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss', 'recharts', 'jspdf', 'i18n'],
    mobile: ['react-native', 'expo', 'expo-router', 'nativewind', 'tanstack-query', 'zustand', 'push-notifications'],
    backend: ['supabase', 'nextjs-api-routes'],
    database: ['postgresql', 'sql', 'supabase-client'],
    security: ['row-level-security', 'oauth', 'zod', 'security-headers'],
    architecture: ['multi-tenant', 'rest-api'],
    infrastructure: ['docker'],
    testing: ['vitest', 'jest', 'testing-library', 'playwright'],
    tooling: ['git', 'eslint', 'husky'],
  },
  images: [
    {
      src: 'projects/smaatch/01-tableau-de-bord.webp',
      alt: { fr: 'Tableau de bord du club avec indicateurs et prochains événements', en: 'Club dashboard with key figures and upcoming events' },
      viewport: 'desktop',
    },
    {
      src: 'projects/smaatch/02-membres.webp',
      alt: { fr: 'Liste des membres avec recherche et statuts', en: 'Member list with search and statuses' },
      viewport: 'desktop',
    },
    {
      src: 'projects/smaatch/03-evenements.webp',
      alt: { fr: 'Calendrier des entraînements, matchs et réunions', en: 'Calendar of trainings, matches and meetings' },
      viewport: 'desktop',
    },
    {
      src: 'projects/smaatch/04-statistiques.webp',
      alt: { fr: 'Statistiques : membres, taux de présence et évolution', en: 'Statistics: members, attendance rate and growth' },
      viewport: 'desktop',
    },
    {
      src: 'projects/smaatch/05-finances.webp',
      alt: { fr: 'Bilan financier : cotisations, caisse, banque, buvette et dépenses', en: 'Financial overview: fees, cash, bank, bar and expenses' },
      viewport: 'desktop',
    },
    {
      src: 'projects/smaatch/06-billetterie.webp',
      alt: { fr: 'Billetterie : lot de tickets numérotés avec QR codes', en: 'Ticketing: batch of numbered tickets with QR codes' },
      viewport: 'desktop',
    },
    {
      src: 'projects/smaatch/07-mobile-accueil.webp',
      alt: { fr: 'Application mobile : accueil et prochains événements', en: 'Mobile app: home and upcoming events' },
      viewport: 'mobile',
    },
    {
      src: 'projects/smaatch/08-mobile-evenements.webp',
      alt: { fr: 'Application mobile : liste des événements', en: 'Mobile app: event list' },
      viewport: 'mobile',
    },
    {
      src: 'projects/smaatch/09-mobile-statistiques.webp',
      alt: { fr: 'Application mobile : statistiques du club', en: 'Mobile app: club statistics' },
      viewport: 'mobile',
    },
  ],
  featured: true,
  order: 2,
});
