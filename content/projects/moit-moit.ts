import { defineProject } from './define';

export default defineProject({
  slug: 'moit-moit',
  title: 'Moit-Moit',
  pitch: {
    fr: 'Application web de partage de dépenses entre amis, sur le thème du manga One Piece : chaque groupe est un équipage.',
    en: 'Web app to share expenses between friends, themed around the One Piece manga: every group is a pirate crew.',
  },
  category: 'academic',
  period: '2025',
  team: { solo: false, size: 3 },
  role: {
    fr: 'Développeur full-stack : pages de connexion et d’inscription, création d’équipages et de dépenses, suppression des dépenses, navigation et intégration Bootstrap.',
    en: 'Full-stack developer: sign-in and sign-up pages, crew and expense creation, expense deletion, navigation and Bootstrap integration.',
  },
  context: {
    fr: 'Projet du cours de technologies mobiles (HELHa, bloc 2), réalisé à trois avec une branche Git par membre. L’objectif était de concevoir une application web responsive utilisable sur smartphone pour répartir les frais d’un groupe, à la manière de Tricount, avec une identité visuelle forte.',
    en: 'Mobile technologies course project (HELHa, year 2), built by three people with one Git branch per member. The goal was to design a responsive web app usable on a smartphone to split a group’s costs, in the spirit of Tricount, with a strong visual identity.',
  },
  features: {
    fr: [
      'Inscription et connexion avec mots de passe hachés (bcrypt) et sessions',
      'Création d’équipages avec choix d’un capitaine (avatar) et gestion des membres',
      'Ajout de dépenses avec photo et coordonnées GPS optionnelles',
      'Répartition automatique de chaque dépense entre les membres',
      'Calcul de « qui doit quoi à qui » dans l’équipage',
      'Interface responsive pour mobile et desktop',
    ],
    en: [
      'Sign-up and sign-in with bcrypt-hashed passwords and sessions',
      'Crew creation with a captain avatar and member management',
      'Expense entry with optional photo and GPS coordinates',
      'Automatic split of every expense between members',
      '“Who owes what to whom” calculation within the crew',
      'Responsive interface for mobile and desktop',
    ],
  },
  architecture: {
    fr: 'Application PHP sans framework, séparée en front-end (HTML, CSS, Bootstrap, JavaScript) et back-end (une série de points d’accès PHP qui renvoient du JSON). L’interface communique avec le serveur en AJAX via l’API Fetch. Les données sont stockées dans MySQL (utilisateurs, groupes, membres, dépenses, répartitions) et toutes les requêtes passent par PDO avec des requêtes préparées. L’application était hébergée sur un serveur mutualisé.',
    en: 'Framework-free PHP application split into a front end (HTML, CSS, Bootstrap, JavaScript) and a back end (a set of PHP endpoints returning JSON). The UI talks to the server through AJAX with the Fetch API. Data is stored in MySQL (users, groups, members, expenses, splits) and every query goes through PDO with prepared statements. The app was hosted on shared web hosting.',
  },
  stack: {
    frontend: ['html-css', 'javascript', 'bootstrap', 'ajax'],
    backend: ['php'],
    database: ['mysql', 'pdo', 'sql'],
    security: ['bcrypt', 'sessions', 'prepared-statements'],
    architecture: ['rest-api'],
    tooling: ['git'],
  },
  images: [
    {
      src: 'projects/moit-moit/01-equipages.webp',
      alt: { fr: 'Liste des équipages de l’utilisateur', en: 'List of the user’s crews' },
      viewport: 'desktop',
    },
    {
      src: 'projects/moit-moit/02-depenses-et-dettes.webp',
      alt: { fr: 'Dépenses d’un équipage et calcul de qui doit quoi à qui', en: 'Crew expenses and who-owes-whom calculation' },
      viewport: 'desktop',
    },
    {
      src: 'projects/moit-moit/03-ajout-depense.webp',
      alt: { fr: 'Formulaire d’ajout d’une dépense avec photo et coordonnées', en: 'Expense form with photo and coordinates' },
      viewport: 'desktop',
    },
    {
      src: 'projects/moit-moit/04-nouvel-equipage.webp',
      alt: { fr: 'Création d’un équipage avec choix du capitaine', en: 'Crew creation with captain selection' },
      viewport: 'desktop',
    },
    {
      src: 'projects/moit-moit/05-connexion.webp',
      alt: { fr: 'Page de connexion', en: 'Sign-in page' },
      viewport: 'desktop',
    },
    {
      src: 'projects/moit-moit/06-mobile-depenses.webp',
      alt: { fr: 'Dépenses en version mobile', en: 'Mobile expense view' },
      viewport: 'mobile',
    },
  ],
  featured: false,
  order: 13,
});
