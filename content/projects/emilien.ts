import { defineProject } from './define';

export default defineProject({
  slug: 'emilien',
  title: 'Are You the New Emilien ?',
  pitch: {
    fr: 'Jeu de plateau de culture générale en JavaFX, inspiré du jeu « Tu te mets combien ? », de 2 à 4 joueurs.',
    en: 'JavaFX general-knowledge board game inspired by the game “Tu te mets combien ?”, for 2 to 4 players.',
  },
  category: 'academic',
  period: '2025',
  team: { solo: false },
  role: {
    fr: 'Développeur : interface JavaFX (plateau, pions, déroulement des tours), contrôleur de jeu et rédaction de cartes de questions.',
    en: 'Developer: JavaFX interface (board, pawns, turn flow), game controller and writing question cards.',
  },
  context: {
    fr: 'Projet de programmation orientée objet de bloc 2 (HELHa), mené en mode Scrum avec user stories, backlog de sprint et diagramme de classes. Avant chaque question, le joueur s’auto-évalue de 1 à 4 sur le thème de la case : plus il se note haut, plus il avance s’il répond juste.',
    en: 'Year-2 object-oriented programming project (HELHa), run with Scrum: user stories, sprint backlog and class diagram. Before each question, the player rates themselves from 1 to 4 on the square’s theme: the higher the rating, the further they move on a correct answer.',
  },
  features: {
    fr: [
      'Configuration de 2 à 4 joueurs avec leurs noms',
      'Plateau graphique avec cases thématiques et pions colorés',
      'Auto-évaluation avant chaque question, qui détermine le déplacement',
      'Cartes de questions chargées depuis un fichier JSON, avec plusieurs réponses acceptées',
      'Cases spéciales : rejouer ou perdre des points',
      'Suivi du tour et du score de chaque joueur',
    ],
    en: [
      'Setup for 2 to 4 named players',
      'Graphical board with themed squares and coloured pawns',
      'Self-assessment before each question, which drives the movement',
      'Question cards loaded from a JSON file, with several accepted answers',
      'Special squares: play again or lose points',
      'Per-player turn and score tracking',
    ],
  },
  architecture: {
    fr: 'Application Java organisée en MVC : un projet « modèle » (partie, plateau, cases, joueurs, cartes, questions, thèmes) et un projet « interface » JavaFX (vues du plateau et des cartes, contrôleur de jeu, feuille de style CSS). Les cases spéciales implémentent une interface commune, ce qui permet d’ajouter de nouveaux effets sans modifier le moteur (pattern Strategy). Les cartes sont désérialisées depuis un fichier JSON avec Gson, et l’interface se met à jour via des propriétés observables JavaFX.',
    en: 'Java application organised as MVC: a “model” project (game, board, squares, players, cards, questions, themes) and a JavaFX “interface” project (board and card views, game controller, CSS stylesheet). Special squares implement a common interface, so new effects can be added without touching the engine (Strategy pattern). Cards are deserialised from a JSON file with Gson, and the UI updates through JavaFX observable properties.',
  },
  stack: {
    desktop: ['java', 'javafx'],
    architecture: ['oop', 'mvc', 'pattern-strategy'],
    tooling: ['gson', 'eclipse', 'git', 'uml', 'scrum'],
  },
  images: [
    {
      src: 'projects/emilien/01-plateau-question.webp',
      alt: { fr: 'Plateau de jeu et question posée au joueur', en: 'Game board and question asked to the player' },
      viewport: 'desktop',
    },
    {
      src: 'projects/emilien/02-reponse-correcte.webp',
      alt: { fr: 'Réponse correcte et passage au joueur suivant', en: 'Correct answer and next player’s turn' },
      viewport: 'desktop',
    },
    {
      src: 'projects/emilien/03-partie-en-cours.webp',
      alt: { fr: 'Partie en cours avec score et carte active', en: 'Game in progress with score and active card' },
      viewport: 'desktop',
    },
  ],
  featured: false,
  order: 12,
});
