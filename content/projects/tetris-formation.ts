import { defineProject } from './define';

export default defineProject({
  slug: 'tetris-formation',
  title: 'Tetris Formation',
  pitch: {
    fr: 'Jeu de formation qui mêle Tetris et quiz : tous les cinq blocs posés, une question valide les acquis du joueur.',
    en: 'Training game blending Tetris and quizzes: every five blocks placed, a question checks what the player has learned.',
  },
  category: 'professional',
  period: '2026',
  team: { solo: true },
  role: {
    fr: 'Développement complet chez Indigo Studio : moteur de jeu, mode multijoueur temps réel, authentification, back-office et modèle de données.',
    en: 'Full development at Indigo Studio: game engine, real-time multiplayer mode, authentication, back office and data model.',
  },
  context: {
    fr: 'Indigo Studio voulait rendre plus engageante une formation à l’élaboration d’un plan d’affaires. Tetris Formation transforme le contenu du cours en huit niveaux de jeu : le joueur empile des pièces et doit répondre correctement aux questions qui apparaissent pour progresser. Une mauvaise réponse fait perdre la partie, ce qui pousse à réviser la matière.',
    en: 'Indigo Studio wanted to make a business-plan training course more engaging. Tetris Formation turns the course content into eight game levels: the player stacks pieces and must answer the questions that pop up correctly to move on. A wrong answer ends the game, which nudges players to review the material.',
  },
  features: {
    fr: [
      'Moteur Tetris écrit sur mesure (rotation, chute rapide, lignes, accélération par niveau) jouable au clavier et au tactile',
      'Quiz intégré : une question à choix multiples tous les cinq blocs, avec source et explication',
      '96 questions réparties sur 8 niveaux thématiques, déblocage progressif des niveaux',
      'Mode multijoueur en temps réel : création de salle par code, scores et questions synchronisés entre joueurs',
      'Classement par niveau et historique des scores',
      'Back-office administrateur pour gérer les questions et consulter tous les scores',
    ],
    en: [
      'Custom Tetris engine (rotation, hard drop, line clears, per-level speed) playable with keyboard and touch',
      'Built-in quiz: a multiple-choice question every five blocks, with source and explanation',
      '96 questions across 8 themed levels, with progressive level unlocking',
      'Real-time multiplayer mode: room creation by code, scores and questions synchronised across players',
      'Per-level leaderboard and score history',
      'Admin back office to manage questions and review every score',
    ],
  },
  architecture: {
    fr: 'Application Next.js (App Router) en TypeScript. Le moteur de jeu est une classe TypeScript indépendante de React, rendue par un composant de plateau et piloté par des hooks (contrôles tactiles, partie multijoueur). Les données (utilisateurs, niveaux, questions, scores, salles) sont modélisées avec Prisma sur PostgreSQL et versionnées par migrations. L’authentification repose sur NextAuth (identifiants, mots de passe hachés avec bcrypt) avec un rôle joueur ou administrateur, et un middleware protège les routes de jeu et d’administration. Le multijoueur utilise des route handlers d’API et Pusher pour diffuser en temps réel les événements de salle (démarrage, question, réponse, scores).',
    en: 'Next.js (App Router) application in TypeScript. The game engine is a TypeScript class independent from React, rendered by a board component and driven by hooks (touch controls, multiplayer game). Data (users, levels, questions, scores, rooms) is modelled with Prisma on PostgreSQL and versioned through migrations. Authentication relies on NextAuth (credentials, passwords hashed with bcrypt) with a player or admin role, and a middleware guards game and admin routes. Multiplayer uses API route handlers and Pusher to broadcast room events in real time (start, question, answer, scores).',
  },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss'],
    backend: ['nodejs', 'nextjs-api-routes', 'pusher'],
    database: ['postgresql', 'prisma'],
    security: ['nextauth', 'bcrypt', 'rbac', 'zod'],
    architecture: ['rest-api', 'websocket'],
    tooling: ['git', 'eslint'],
  },
  images: [
    {
      src: 'projects/tetris-formation/01-partie.webp',
      alt: { fr: 'Partie en cours avec score, blocs, lignes et pièce suivante', en: 'Game in progress with score, blocks, lines and next piece' },
      viewport: 'desktop',
    },
    {
      src: 'projects/tetris-formation/02-question.webp',
      alt: { fr: 'Question de quiz qui interrompt la partie', en: 'Quiz question interrupting the game' },
      viewport: 'desktop',
    },
    {
      src: 'projects/tetris-formation/03-niveaux.webp',
      alt: { fr: 'Choix du niveau et règles du jeu', en: 'Level selection and game rules' },
      viewport: 'desktop',
    },
    {
      src: 'projects/tetris-formation/04-classement.webp',
      alt: { fr: 'Classement des joueurs par niveau', en: 'Player leaderboard per level' },
      viewport: 'desktop',
    },
    {
      src: 'projects/tetris-formation/05-multijoueur.webp',
      alt: { fr: 'Création ou accès à une salle multijoueur', en: 'Creating or joining a multiplayer room' },
      viewport: 'desktop',
    },
    {
      src: 'projects/tetris-formation/06-admin-questions.webp',
      alt: { fr: 'Back-office : questions par niveau avec la bonne réponse', en: 'Back office: questions per level with the correct answer' },
      viewport: 'desktop',
    },
  ],
  featured: true,
  order: 3,
});
