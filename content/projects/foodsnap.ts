import { defineProject } from './define';

export default defineProject({
  slug: 'foodsnap',
  title: 'FoodSnap',
  pitch: {
    fr: 'Application mobile Flutter pour créer, photographier et partager ses recettes avec une communauté.',
    en: 'Flutter mobile app to create, photograph and share recipes with a community.',
  },
  category: 'academic',
  period: '2025',
  team: { solo: true },
  role: {
    fr: 'Développement complet de l’application mobile Flutter et de son API REST Node.js.',
    en: 'Full development of the Flutter mobile app and its Node.js REST API.',
  },
  context: {
    fr: 'Projet du cours de technologies mobiles (HELHa, bloc 3). L’objectif était de concevoir une application mobile native multiplateforme connectée à une API sécurisée, autour d’un cas d’usage simple : garder ses recettes au même endroit et découvrir celles des autres utilisateurs.',
    en: 'Mobile technologies course project (HELHa, year 3). The goal was to build a cross-platform native mobile app connected to a secured API, around a simple use case: keeping your recipes in one place and discovering other users’ recipes.',
  },
  features: {
    fr: [
      'Inscription et connexion avec jeton JWT stocké de manière sécurisée sur l’appareil',
      'Création de recettes avec photo (appareil photo ou galerie), description et liste d’ingrédients',
      'Recettes privées ou publiées sur le Hub communautaire',
      'Hub de découverte avec recherche et mise en favori',
      'Profil utilisateur avec liste des favoris',
      'Gestes de balayage pour éditer ou supprimer, et chargements animés',
    ],
    en: [
      'Sign-up and sign-in with a JWT stored securely on the device',
      'Recipe creation with a photo (camera or gallery), description and ingredient list',
      'Private recipes or recipes published to the community Hub',
      'Discovery Hub with search and favourites',
      'User profile with favourites list',
      'Swipe gestures to edit or delete, and animated loading states',
    ],
  },
  architecture: {
    fr: 'L’application Flutter (Dart) est organisée en pages, modèles, services et widgets réutilisables ; les services encapsulent les appels HTTP et la gestion du jeton via flutter_secure_storage, et image_picker gère la capture photo. L’API Node.js / Express suit une structure routes, contrôleurs et middleware : authentification JWT, mots de passe hachés avec bcrypt, upload des images avec Multer et service des fichiers statiques. Le contrat de l’API est décrit dans une spécification OpenAPI 3.',
    en: 'The Flutter (Dart) app is organised into pages, models, services and reusable widgets; services wrap HTTP calls and token handling through flutter_secure_storage, and image_picker handles photo capture. The Node.js / Express API follows a routes, controllers and middleware structure: JWT authentication, bcrypt-hashed passwords, image upload with Multer and static file serving. The API contract is described in an OpenAPI 3 specification.',
  },
  stack: {
    mobile: ['flutter', 'dart'],
    backend: ['nodejs', 'express', 'multer'],
    security: ['jwt', 'bcrypt', 'secure-storage'],
    architecture: ['rest-api', 'mvc', 'openapi'],
    tooling: ['git'],
  },
  images: [
    {
      src: 'projects/foodsnap/01-mes-recettes.webp',
      alt: { fr: 'Liste de mes recettes avec statut privé ou en ligne', en: 'My recipes list with private or published status' },
      viewport: 'mobile',
    },
    {
      src: 'projects/foodsnap/02-hub.webp',
      alt: { fr: 'Hub communautaire des recettes publiées', en: 'Community hub of published recipes' },
      viewport: 'mobile',
    },
    {
      src: 'projects/foodsnap/03-detail-recette.webp',
      alt: { fr: 'Détail d’une recette avec photo et ingrédients', en: 'Recipe detail with photo and ingredients' },
      viewport: 'mobile',
    },
    {
      src: 'projects/foodsnap/04-nouvelle-recette.webp',
      alt: { fr: 'Formulaire de création d’une recette', en: 'Recipe creation form' },
      viewport: 'mobile',
    },
    {
      src: 'projects/foodsnap/05-profil-favoris.webp',
      alt: { fr: 'Profil utilisateur et recettes favorites', en: 'User profile and favourite recipes' },
      viewport: 'mobile',
    },
  ],
  featured: false,
  order: 9,
});
