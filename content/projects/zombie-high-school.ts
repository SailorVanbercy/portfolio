import { defineProject } from './define';

export default defineProject({
  slug: 'zombie-high-school',
  title: 'Zombie High School',
  pitch: {
    fr: 'Jeu de survie 2D en C++ et SFML : résister à des vagues de zombies et vaincre des boss dans un lycée infesté.',
    en: '2D survival game in C++ and SFML: hold off waves of zombies and defeat bosses in an infested high school.',
  },
  category: 'academic',
  period: '2025 – 2026',
  team: { solo: false, size: 4 },
  role: {
    fr: 'Développeur gameplay : enchaînement des niveaux, système de clés et de ramassage d’objets, scène de victoire, équilibrage du combat et des boss.',
    en: 'Gameplay developer: level progression, key and item pick-up systems, victory scene, combat and boss balancing.',
  },
  context: {
    fr: 'Projet du cours de développement de jeux vidéo (HELHa, bloc 3), réalisé en équipe de quatre avec Git et des pull requests. Le but était de concevoir un jeu complet en C++ en appliquant les design patterns vus au cours, sans moteur de jeu : uniquement la bibliothèque multimédia SFML.',
    en: 'Game development course project (HELHa, year 3), built by a team of four using Git and pull requests. The goal was to design a complete C++ game applying the design patterns taught in class, without a game engine: only the SFML multimedia library.',
  },
  features: {
    fr: [
      'Menus, options, écran de pause, de victoire et de défaite',
      'Carte en tuiles avec collisions et plusieurs niveaux',
      'Vagues d’ennemis minutées avec plusieurs archétypes (basique, rapide, tank)',
      'Quatre boss avec phases de combat distinctes',
      'Inventaire à emplacements, objets à ramasser et coffres aléatoires',
      'Attaques au corps à corps et projectiles, barre de vie et interface de jeu',
    ],
    en: [
      'Menus, options, pause, victory and defeat screens',
      'Tile map with collisions and several levels',
      'Timed enemy waves with several archetypes (basic, fast, tank)',
      'Four bosses with distinct combat phases',
      'Slot-based inventory, pick-up items and random loot boxes',
      'Melee attacks and projectiles, health bar and in-game HUD',
    ],
  },
  architecture: {
    fr: 'Le code C++20 est organisé en MVC (modèles, vues, contrôleurs) autour d’une boucle de jeu et d’un gestionnaire de scènes en pile (menu, jeu, options, victoire, défaite). Les entrées passent par le pattern Command : chaque touche est liée à un objet commande (déplacement, attaque, inventaire). Les ennemis partagent leurs données d’archétype via une fabrique Flyweight, les boss changent de comportement selon des phases (pattern State) et l’audio est centralisé dans un gestionnaire unique. Des systèmes dédiés gèrent les vagues, les projectiles, les objets au sol et les coffres. Le projet est compilé avec CMake.',
    en: 'The C++20 code is organised as MVC (models, views, controllers) around a game loop and a stack-based scene manager (menu, game, options, victory, defeat). Input goes through the Command pattern: every key is bound to a command object (movement, attack, inventory). Enemies share archetype data through a Flyweight factory, bosses switch behaviour across phases (State pattern) and audio is centralised in a single manager. Dedicated systems handle waves, projectiles, ground items and loot boxes. The project is built with CMake.',
  },
  stack: {
    desktop: ['cpp', 'sfml', 'game-loop'],
    architecture: ['oop', 'mvc', 'pattern-command', 'pattern-state', 'pattern-flyweight', 'pattern-singleton'],
    tooling: ['cmake', 'git'],
  },
  images: [
    {
      src: 'projects/zombie-high-school/01-menu.webp',
      alt: { fr: 'Menu principal du jeu', en: 'Game main menu' },
      viewport: 'desktop',
    },
    {
      src: 'projects/zombie-high-school/02-carte-lycee.webp',
      alt: { fr: 'Carte du lycée avant l’arrivée de la première vague', en: 'High school map before the first wave' },
      viewport: 'desktop',
    },
    {
      src: 'projects/zombie-high-school/03-vague-zombies.webp',
      alt: { fr: 'Vague de zombies qui attaque le joueur', en: 'Zombie wave attacking the player' },
      viewport: 'desktop',
    },
    {
      src: 'projects/zombie-high-school/04-combat.webp',
      alt: { fr: 'Combat avec barre de vie basse', en: 'Combat with low health bar' },
      viewport: 'desktop',
    },
    {
      src: 'projects/zombie-high-school/05-defaite.webp',
      alt: { fr: 'Écran de défaite', en: 'Defeat screen' },
      viewport: 'desktop',
    },
  ],
  featured: false,
  order: 10,
});
