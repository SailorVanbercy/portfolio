import { defineProject } from './define';

export default defineProject({
  slug: 'adresseur-ip',
  title: 'Adresseur IP',
  pitch: {
    fr: 'Logiciel desktop Python d’adressage IP : calcul d’adresses, découpe en sous-réseaux, vérification VLSM et sauvegarde des plans d’adressage.',
    en: 'Python desktop IP addressing tool: address calculation, subnetting, VLSM checks and saved addressing plans.',
  },
  category: 'academic',
  period: '2025',
  team: { solo: false, size: 4 },
  role: {
    fr: 'Développeur : recherche, modification et suppression des découpes enregistrées, filtrage par utilisateur, contraintes d’unicité en base et confirmation du mot de passe.',
    en: 'Developer: search, edit and deletion of saved subnetting plans, per-user filtering, database uniqueness constraints and password confirmation.',
  },
  context: {
    fr: 'Projet du cours de réseaux (HELHa, bloc 3), réalisé en équipe de quatre avec des pull requests. L’outil aide un administrateur réseau à planifier l’adressage d’une infrastructure : il calcule les caractéristiques d’un réseau, vérifie qu’une découpe est possible et conserve les plans validés pour les retrouver et les modifier plus tard.',
    en: 'Networking course project (HELHa, year 3), built by a team of four using pull requests. The tool helps a network administrator plan an infrastructure’s addressing: it computes a network’s characteristics, checks whether a subnetting plan is feasible and stores validated plans to find and edit them later.',
  },
  features: {
    fr: [
      'Accès protégé par mot de passe haché avec bcrypt',
      'Calcul de l’adresse réseau et de broadcast en mode classless (CIDR) ou classful',
      'Vérification de l’appartenance d’une adresse IP à un réseau',
      'Découpe d’un réseau par nombre de sous-réseaux ou nombre d’adresses, avec tableau détaillé',
      'Vérification de faisabilité d’une découpe VLSM selon les besoins en hôtes',
      'Enregistrement, recherche, modification et suppression des découpes en base SQLite',
    ],
    en: [
      'Access protected by a bcrypt-hashed password',
      'Network and broadcast address calculation in classless (CIDR) or classful mode',
      'Check whether an IP address belongs to a network',
      'Network subnetting by number of subnets or number of addresses, with a detailed table',
      'VLSM feasibility check based on host requirements',
      'Save, search, edit and delete subnetting plans in a SQLite database',
    ],
  },
  architecture: {
    fr: 'Application Python à interface CustomTkinter, organisée en couches : des pages de vue (une par outil) et des composants utilitaires (dialogues, messages), un service réseau qui centralise les calculs (CIDR, classful, découpe, VLSM) en s’appuyant sur la bibliothèque netaddr, et une couche repository (gestion de la base, des découpes et de la sécurité) qui isole tous les accès SQLite. Le mot de passe est stocké haché avec bcrypt.',
    en: 'Python application with a CustomTkinter interface, organised in layers: view pages (one per tool) and utility components (dialogs, messages), a network service that centralises calculations (CIDR, classful, subnetting, VLSM) on top of the netaddr library, and a repository layer (database, plans and security management) that isolates every SQLite access. The password is stored as a bcrypt hash.',
  },
  stack: {
    desktop: ['python', 'customtkinter'],
    database: ['sqlite', 'sql'],
    security: ['bcrypt'],
    architecture: ['layered-architecture', 'repository-pattern', 'networking'],
    tooling: ['git'],
  },
  images: [
    {
      src: 'projects/adresseur-ip/01-menu.webp',
      alt: { fr: 'Menu principal des outils réseau', en: 'Main menu of the network tools' },
      viewport: 'desktop',
    },
    {
      src: 'projects/adresseur-ip/02-calcul-adresse.webp',
      alt: { fr: 'Calcul de l’adresse réseau et de broadcast', en: 'Network and broadcast address calculation' },
      viewport: 'desktop',
    },
    {
      src: 'projects/adresseur-ip/03-decoupe-sous-reseaux.webp',
      alt: { fr: 'Découpe d’un réseau en sous-réseaux avec tableau de résultat', en: 'Network subnetting with result table' },
      viewport: 'desktop',
    },
    {
      src: 'projects/adresseur-ip/04-verification-vlsm.webp',
      alt: { fr: 'Vérification d’une découpe VLSM', en: 'VLSM plan verification' },
      viewport: 'desktop',
    },
    {
      src: 'projects/adresseur-ip/05-connexion.webp',
      alt: { fr: 'Écran de connexion protégé par mot de passe', en: 'Password-protected sign-in screen' },
      viewport: 'desktop',
    },
  ],
  featured: false,
  order: 11,
});
