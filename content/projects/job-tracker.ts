import { defineProject } from './define';

export default defineProject({
  slug: 'job-tracker',
  title: 'Job Tracker',
  pitch: {
    fr: 'Suivi de candidatures avec analyse IA : chaque offre est comparée au CV pour obtenir un score de compatibilité et les compétences manquantes.',
    en: 'Job application tracker with AI analysis: every job ad is compared to the resume to get a match score and the missing skills.',
  },
  category: 'personal',
  period: '2026',
  team: { solo: true },
  role: {
    fr: 'Conception et développement complet : API REST Spring Boot sécurisée par JWT, intégration de l’IA générative, frontend Next.js et tests.',
    en: 'End-to-end design and development: Spring Boot REST API secured with JWT, generative AI integration, Next.js front end and tests.',
  },
  context: {
    fr: 'Pendant une recherche d’emploi, il devient vite difficile de suivre où l’on a postulé, à quel stade en est chaque candidature et si son profil correspond vraiment au poste. Job Tracker centralise les candidatures et, une fois le CV importé en PDF, utilise Google Gemini pour estimer la correspondance avec chaque offre et lister jusqu’à cinq compétences clés à renforcer.',
    en: 'During a job search it quickly gets hard to keep track of where you applied, what stage each application is at and whether your profile really fits the role. Job Tracker centralises applications and, once the resume is uploaded as a PDF, uses Google Gemini to estimate how well it matches each job ad and list up to five key skills to strengthen.',
  },
  features: {
    fr: [
      'Inscription et connexion sécurisées (JWT en cookie HttpOnly ou en en-tête Bearer)',
      'Création, modification et suppression de candidatures avec statut (brouillon, postulé, entretien, offre, refus)',
      'Import du CV en PDF et extraction automatique du texte',
      'Analyse IA de chaque offre : score de compatibilité de 0 à 100 et compétences manquantes',
      'Tableau de bord filtrable par statut, recherche et tri',
      'Documentation interactive de l’API avec Swagger UI',
    ],
    en: [
      'Secure sign-up and sign-in (JWT in an HttpOnly cookie or Bearer header)',
      'Create, edit and delete applications with a status (draft, applied, interviewing, offer, rejected)',
      'PDF resume upload with automatic text extraction',
      'AI analysis of every job ad: 0 to 100 match score and missing skills',
      'Dashboard with status filters, search and sorting',
      'Interactive API documentation with Swagger UI',
    ],
  },
  architecture: {
    fr: 'Le back-end est une API REST Java 21 / Spring Boot 4 organisée en couches (contrôleurs, services, repositories, DTO, gestionnaire d’exceptions global). La persistance passe par Spring Data JPA et Hibernate sur PostgreSQL, avec une colonne JSONB pour les compétences manquantes. Spring Security et un filtre JWT (jjwt) protègent les routes, avec CORS configurable par variable d’environnement et validation des entrées par Bean Validation. Apache Tika extrait le texte du CV et Spring AI interroge Gemini, dont la réponse JSON est mappée directement sur un DTO. Le front-end Next.js en TypeScript consomme l’API ; les deux parties sont testées (JUnit 5, Mockito, Spring Security Test côté API, Vitest côté front).',
    en: 'The back end is a Java 21 / Spring Boot 4 REST API organised in layers (controllers, services, repositories, DTOs, global exception handler). Persistence uses Spring Data JPA and Hibernate on PostgreSQL, with a JSONB column for missing skills. Spring Security and a JWT filter (jjwt) protect the routes, with CORS configured through environment variables and input validated by Bean Validation. Apache Tika extracts the resume text and Spring AI queries Gemini, whose JSON answer is mapped straight onto a DTO. The TypeScript Next.js front end consumes the API; both sides are tested (JUnit 5, Mockito, Spring Security Test on the API, Vitest on the front end).',
  },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss'],
    backend: ['java', 'spring-boot', 'spring-ai', 'apache-tika'],
    database: ['postgresql', 'jpa', 'hibernate', 'spring-data-jpa', 'sql'],
    security: ['spring-security', 'jwt', 'bean-validation', 'cors'],
    architecture: ['rest-api', 'layered-architecture', 'dto', 'openapi'],
    infrastructure: ['docker', 'docker-compose'],
    testing: ['junit', 'mockito', 'vitest'],
    ai: ['gemini-api', 'prompt-engineering'],
    tooling: ['maven', 'lombok', 'git'],
  },
  images: [
    {
      src: 'projects/job-tracker/01-tableau-de-bord.webp',
      alt: { fr: 'Tableau de bord des candidatures avec score IA et compétences manquantes', en: 'Application dashboard with AI score and missing skills' },
      viewport: 'desktop',
    },
    {
      src: 'projects/job-tracker/02-nouvelle-candidature.webp',
      alt: { fr: 'Formulaire d’ajout d’une candidature avec description de l’offre', en: 'Form to add an application with the job description' },
      viewport: 'desktop',
    },
    {
      src: 'projects/job-tracker/03-profil-cv.webp',
      alt: { fr: 'Profil utilisateur et import du CV en PDF', en: 'User profile and PDF resume upload' },
      viewport: 'desktop',
    },
    {
      src: 'projects/job-tracker/04-connexion.webp',
      alt: { fr: 'Écran de connexion', en: 'Sign-in screen' },
      viewport: 'desktop',
    },
    {
      src: 'projects/job-tracker/05-api-swagger.webp',
      alt: { fr: 'Documentation OpenAPI de l’API REST dans Swagger UI', en: 'OpenAPI documentation of the REST API in Swagger UI' },
      viewport: 'desktop',
    },
  ],
  featured: false,
  order: 5,
});
