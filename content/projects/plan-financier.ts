import { defineProject } from './define';

export default defineProject({
  slug: 'plan-financier',
  title: 'Plan Financier',
  pitch: {
    fr: 'Application pédagogique qui guide des élèves dans la construction du plan financier de leur projet d’entreprise, conformément au droit belge.',
    en: 'Educational app that guides students through building the financial plan of their business project, in line with Belgian company law.',
  },
  category: 'professional',
  period: '2026',
  team: { solo: false, size: 2 },
  role: {
    fr: 'Développeur full-stack chez Indigo Studio : évolution d’un prototype vers une plateforme multi-utilisateurs (authentification, isolation des données, calculs financiers, tests).',
    en: 'Full-stack developer at Indigo Studio: evolving a prototype into a multi-user platform (authentication, data isolation, financial calculations, testing).',
  },
  context: {
    fr: 'En Belgique, le Code des sociétés impose un plan financier à la création d’une SRL. L’application s’adresse à des élèves de fin de secondaire : elle combine un module de formation en neuf chapitres et un outil qui calcule automatiquement les états financiers à partir de leurs hypothèses, avec des alertes pédagogiques qui expliquent chaque incohérence.',
    en: 'In Belgium, company law requires a financial plan when founding an SRL (private limited company). The app targets final-year secondary students: it combines a nine-chapter training module with a tool that automatically computes the financial statements from their assumptions, with teaching alerts that explain every inconsistency.',
  },
  features: {
    fr: [
      'Parcours guidé en étapes : configuration, investissements, financement, chiffre d’affaires, charges et personnel',
      'Calculs automatiques : amortissements, emprunts, compte de résultats, trésorerie mensuelle, bilan et tableau de financement',
      'Seuil de rentabilité, point mort et marge de sécurité avec graphique coûts/revenus',
      'Score de viabilité du projet et tableau de bord de synthèse',
      'Alertes pédagogiques contextuelles (financement insuffisant, trésorerie négative, bilan déséquilibré)',
      'Module de formation e-learning en neuf chapitres',
      'Comptes utilisateurs avec projets privés et isolés',
    ],
    en: [
      'Step-by-step guided flow: setup, investments, funding, revenue, expenses and staff',
      'Automatic calculations: depreciation, loans, income statement, monthly cash flow, balance sheet and funding table',
      'Break-even point, break-even date and safety margin with a cost/revenue chart',
      'Project viability score and summary dashboard',
      'Contextual teaching alerts (insufficient funding, negative cash, unbalanced balance sheet)',
      'Nine-chapter e-learning training module',
      'User accounts with private, isolated projects',
    ],
  },
  architecture: {
    fr: 'Application Next.js en TypeScript avec des route handlers REST par domaine (projets, investissements, financements, chiffre d’affaires, charges, personnel). Les données sont stockées dans SQLite via Drizzle ORM ; les calculs financiers sont isolés dans une bibliothèque de fonctions pures testées unitairement. L’authentification repose sur des mots de passe hachés avec bcrypt et un jeton de session signé en HMAC, vérifié par un middleware ; chaque requête contrôle que le projet appartient à l’utilisateur. L’état de l’interface est géré avec Zustand et les graphiques avec Recharts. Environ 130 tests Jest couvrent les calculs, l’API, l’authentification et l’isolation des données. Le déploiement est documenté pour un VPS Ubuntu avec PM2 et Nginx.',
    en: 'Next.js application in TypeScript with per-domain REST route handlers (projects, investments, funding, revenue, expenses, staff). Data is stored in SQLite through Drizzle ORM; financial calculations live in a library of pure, unit-tested functions. Authentication uses bcrypt-hashed passwords and an HMAC-signed session token checked by a middleware; every request verifies that the project belongs to the user. UI state is handled with Zustand and charts with Recharts. Around 130 Jest tests cover calculations, the API, authentication and data isolation. Deployment is documented for an Ubuntu VPS with PM2 and Nginx.',
  },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss', 'zustand', 'recharts'],
    backend: ['nodejs', 'nextjs-api-routes'],
    database: ['sqlite', 'drizzle', 'sql'],
    security: ['bcrypt', 'jwt'],
    architecture: ['rest-api'],
    infrastructure: ['linux-vps', 'nginx', 'pm2'],
    testing: ['jest', 'testing-library'],
    tooling: ['git', 'eslint'],
  },
  images: [
    {
      src: 'projects/plan-financier/01-tableau-de-bord.webp',
      alt: { fr: 'Tableau de bord : progression, score de viabilité et indicateurs clés', en: 'Dashboard: progress, viability score and key figures' },
      viewport: 'desktop',
    },
    {
      src: 'projects/plan-financier/02-investissements.webp',
      alt: { fr: 'Plan d’investissement avec amortissements et répartition', en: 'Investment plan with depreciation and breakdown' },
      viewport: 'desktop',
    },
    {
      src: 'projects/plan-financier/03-compte-de-resultats.webp',
      alt: { fr: 'Compte de résultats prévisionnel sur trois ans', en: 'Three-year forecast income statement' },
      viewport: 'desktop',
    },
    {
      src: 'projects/plan-financier/04-tresorerie.webp',
      alt: { fr: 'Flux de trésorerie mensuels avec alerte de trésorerie négative', en: 'Monthly cash flow with a negative-cash alert' },
      viewport: 'desktop',
    },
    {
      src: 'projects/plan-financier/05-seuil-de-rentabilite.webp',
      alt: { fr: 'Seuil de rentabilité et graphique coûts/revenus', en: 'Break-even analysis and cost/revenue chart' },
      viewport: 'desktop',
    },
    {
      src: 'projects/plan-financier/06-formation.webp',
      alt: { fr: 'Module de formation e-learning', en: 'E-learning training module' },
      viewport: 'desktop',
    },
  ],
  featured: false,
  order: 4,
});
