// Single source for the ATS-friendly resume (FR/EN). Build with `npm run cv`.
import type { Locale } from '../src/lib/i18n';

export interface CvEntry {
  title: string;
  org: string;
  place?: string;
  period: string;
  bullets: string[];
}

export interface CvProject {
  name: string;
  text: string;
}

export interface CvContent {
  documentTitle: string;
  name: string;
  headline: string;
  contact: string[];
  sections: {
    profile: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
    languages: string;
    strengths: string;
  };
  profile: string;
  skills: { label: string; items: string }[];
  experience: CvEntry[];
  projects: CvProject[];
  education: CvEntry[];
  languages: string[];
  strengths: string;
}

const CONTACT_COMMON = {
  phone: '+32 497 20 67 05',
  email: 'sailorvanbercy2005@gmail.com',
  portfolio: 'portfolio-sailorvanbercy.vercel.app',
  github: 'github.com/SailorVanbercy',
};

// Set to the profile URL (without https://) to print it on both versions.
export const LINKEDIN_URL: string | null = 'linkedin.com/in/sailor-vanbercy-141241398';

const contactLine = (location: string, licence: string): string[] =>
  [
    location,
    CONTACT_COMMON.phone,
    CONTACT_COMMON.email,
    CONTACT_COMMON.portfolio,
    CONTACT_COMMON.github,
    LINKEDIN_URL,
    licence,
  ].filter((item): item is string => Boolean(item));

export const cv: Record<Locale, CvContent> = {
  fr: {
    documentTitle: 'CV Sailor Vanbercy - Développeur Full-Stack Junior',
    name: 'Sailor Vanbercy',
    headline: 'Développeur Full-Stack Junior',
    contact: contactLine('Manage, Belgique (mobilité 40 km)', 'Permis B'),
    sections: {
      profile: 'Profil',
      skills: 'Compétences techniques',
      experience: 'Expérience professionnelle',
      projects: 'Projets',
      education: 'Formation',
      languages: 'Langues',
      strengths: 'Qualités',
    },
    profile:
      'Développeur full-stack junior, diplômé d’un bachelier en informatique orientation développement d’applications (HELHa). En stage chez Indigo Studio, j’ai conçu et mis en production LeadBoy, un agent IA de prospection automobile. Je développe des applications web et mobiles complètes (TypeScript, React, Next.js, Node.js, Java, Spring Boot, PostgreSQL) et j’intègre l’IA générative, dont Claude Code, dans un workflow rigoureux : tests automatisés, revue de code et sécurité.',
    skills: [
      { label: 'Langages', items: 'TypeScript, JavaScript, Java, C# (.NET), Python, PHP, SQL, C++, Dart, HTML, CSS' },
      { label: 'Front-end', items: 'React, Next.js, Angular, Tailwind CSS, React Native (Expo), Flutter, JavaFX' },
      {
        label: 'Back-end et API',
        items: 'Node.js, Express, Spring Boot (Spring Security, Spring AI), ASP.NET Core, API REST, WebSocket, OpenAPI (Swagger)',
      },
      {
        label: 'Bases de données et ORM',
        items: 'PostgreSQL, MySQL, SQL Server, SQLite, Supabase (Row Level Security), JPA, Hibernate, Entity Framework Core, Prisma, Drizzle',
      },
      { label: 'Sécurité', items: 'JWT, OAuth 2.0, bcrypt, validation Zod, RBAC, CORS, rate limiting, requêtes préparées' },
      { label: 'DevOps et outils', items: 'Docker, Docker Compose, Git, GitHub, Linux (VPS), Traefik, Nginx, Vercel, Maven, CMake' },
      { label: 'Tests', items: 'Vitest, Jest, Playwright, JUnit 5, Mockito, Testing Library, Testcontainers' },
      {
        label: 'Intelligence artificielle',
        items: 'Claude API, Claude Code, Gemini API, LLM multimodaux (vision), RAG (LlamaIndex), agents IA, prompt engineering',
      },
      {
        label: 'Architecture et méthodes',
        items: 'MVC, architecture en couches, clean architecture, CQRS, design patterns (Command, State, Strategy, Flyweight), méthodes agiles (Scrum), UML',
      },
    ],
    experience: [
      {
        title: 'Stagiaire développeur full-stack',
        org: 'Indigo Studio',
        period: 'Février 2026 – Mai 2026',
        bullets: [
          'Conception et mise en production de LeadBoy (travail de fin d’études) : agent IA qui extrait les annonces AutoScout24 (Playwright), contacte les vendeurs sur WhatsApp et négocie les prix (Claude, RAG LlamaIndex). Stack : Next.js, TypeScript, Node.js, Supabase, PostgreSQL.',
          'Sécurisation d’une API d’une quarantaine d’endpoints : authentification JWT, validation Zod, limitation de débit, protection par clé API, tests unitaires Vitest.',
          'Déploiement de l’application et de son serveur WhatsApp (Node.js, Express) avec Docker Compose sur un VPS Linux durci, derrière Traefik et Let’s Encrypt ; internationalisation FR, EN, NL.',
          'Développement d’outils internes : Tetris Formation, jeu de quiz multijoueur en temps réel (Next.js, Prisma, PostgreSQL, Pusher), et Plan Financier, application de calcul de plans financiers (SQLite, Drizzle, Jest).',
          'Intégration de Claude Code dans le workflow quotidien : exploration de code, refactoring, écriture de tests et documentation, avec revue systématique du code produit.',
        ],
      },
      {
        title: 'Employé polyvalent (job étudiant)',
        org: 'McDonald’s',
        place: 'La Louvière',
        period: 'Août 2024 – aujourd’hui',
        bullets: [
          'Service client et préparation des commandes à forte cadence, en équipe et dans le respect strict des normes d’hygiène et de qualité.',
        ],
      },
    ],
    projects: [
      {
        name: 'Smaatch',
        text: 'plateforme web et mobile de gestion de clubs sportifs : membres, présences, finances, billetterie. Next.js, React Native (Expo), Supabase, PostgreSQL multi-tenant avec Row Level Security, environ 90 fichiers de tests.',
      },
      {
        name: 'Job Tracker',
        text: 'suivi de candidatures avec score de compatibilité calculé par IA entre le CV et l’offre. Java 21, Spring Boot, Spring Security (JWT), JPA, Hibernate, Spring AI (Gemini), Next.js, Docker.',
      },
      {
        name: 'The Lost Grimoire',
        text: 'application de notes Markdown réalisée en hackathon de cinq jours, en équipe de six ; développeur front-end principal. React, Spring Boot, CQRS, MySQL, Docker.',
      },
      {
        name: 'ClinikTime',
        text: 'plateforme de prise de rendez-vous médicaux avec espaces patient, médecin et administrateur. Angular, ASP.NET Core, Entity Framework Core, SQL Server, JWT.',
      },
    ],
    education: [
      {
        title: 'Bachelier en informatique, orientation développement d’applications',
        org: 'HELHa',
        place: 'Mons',
        period: '2023 – 2026',
        bullets: [],
      },
    ],
    languages: ['Français : langue maternelle', 'Anglais : B2 (professionnel)'],
    strengths: 'Travail en équipe, résolution de problèmes, organisation et gestion du temps, communication.',
  },
  en: {
    documentTitle: 'Resume Sailor Vanbercy - Junior Full-Stack Developer',
    name: 'Sailor Vanbercy',
    headline: 'Junior Full-Stack Developer',
    contact: contactLine('Manage, Belgium (40 km commute)', 'Driving licence B'),
    sections: {
      profile: 'Profile',
      skills: 'Technical skills',
      experience: 'Professional experience',
      projects: 'Projects',
      education: 'Education',
      languages: 'Languages',
      strengths: 'Strengths',
    },
    profile:
      'Junior full-stack developer holding a bachelor’s degree in computer science, application development track (HELHa). During my internship at Indigo Studio, I designed and shipped LeadBoy to production, an AI agent for used-vehicle sourcing. I build complete web and mobile applications (TypeScript, React, Next.js, Node.js, Java, Spring Boot, PostgreSQL) and use generative AI, including Claude Code, within a rigorous workflow: automated tests, code review and security.',
    skills: [
      { label: 'Languages', items: 'TypeScript, JavaScript, Java, C# (.NET), Python, PHP, SQL, C++, Dart, HTML, CSS' },
      { label: 'Front end', items: 'React, Next.js, Angular, Tailwind CSS, React Native (Expo), Flutter, JavaFX' },
      {
        label: 'Back end and APIs',
        items: 'Node.js, Express, Spring Boot (Spring Security, Spring AI), ASP.NET Core, REST APIs, WebSocket, OpenAPI (Swagger)',
      },
      {
        label: 'Databases and ORMs',
        items: 'PostgreSQL, MySQL, SQL Server, SQLite, Supabase (Row Level Security), JPA, Hibernate, Entity Framework Core, Prisma, Drizzle',
      },
      { label: 'Security', items: 'JWT, OAuth 2.0, bcrypt, Zod validation, RBAC, CORS, rate limiting, prepared statements' },
      { label: 'DevOps and tools', items: 'Docker, Docker Compose, Git, GitHub, Linux (VPS), Traefik, Nginx, Vercel, Maven, CMake' },
      { label: 'Testing', items: 'Vitest, Jest, Playwright, JUnit 5, Mockito, Testing Library, Testcontainers' },
      {
        label: 'Artificial intelligence',
        items: 'Claude API, Claude Code, Gemini API, multimodal LLMs (vision), RAG (LlamaIndex), AI agents, prompt engineering',
      },
      {
        label: 'Architecture and methods',
        items: 'MVC, layered architecture, clean architecture, CQRS, design patterns (Command, State, Strategy, Flyweight), Agile (Scrum), UML',
      },
    ],
    experience: [
      {
        title: 'Full-Stack Developer Intern',
        org: 'Indigo Studio',
        period: 'February 2026 – May 2026',
        bullets: [
          'Designed and shipped LeadBoy to production (final-year project): an AI agent that extracts AutoScout24 listings (Playwright), contacts sellers on WhatsApp and negotiates prices (Claude, LlamaIndex RAG). Stack: Next.js, TypeScript, Node.js, Supabase, PostgreSQL.',
          'Secured an API of around forty endpoints: JWT authentication, Zod validation, rate limiting, API key protection, Vitest unit tests.',
          'Deployed the application and its WhatsApp server (Node.js, Express) with Docker Compose on a hardened Linux VPS behind Traefik and Let’s Encrypt; added FR, EN and NL internationalisation.',
          'Built internal tools: Tetris Formation, a real-time multiplayer quiz game (Next.js, Prisma, PostgreSQL, Pusher), and Plan Financier, a financial-plan calculator (SQLite, Drizzle, Jest).',
          'Embedded Claude Code in the daily workflow: codebase exploration, refactoring, test writing and documentation, with systematic review of generated code.',
        ],
      },
      {
        title: 'Crew Member (student job)',
        org: 'McDonald’s',
        place: 'La Louvière',
        period: 'August 2024 – present',
        bullets: [
          'Customer service and order preparation at a high pace, as a team and in strict compliance with hygiene and quality standards.',
        ],
      },
    ],
    projects: [
      {
        name: 'Smaatch',
        text: 'web and mobile platform to run sports clubs: members, attendance, finances, ticketing. Next.js, React Native (Expo), Supabase, multi-tenant PostgreSQL with Row Level Security, around 90 test files.',
      },
      {
        name: 'Job Tracker',
        text: 'job application tracker with an AI match score between the resume and the job ad. Java 21, Spring Boot, Spring Security (JWT), JPA, Hibernate, Spring AI (Gemini), Next.js, Docker.',
      },
      {
        name: 'The Lost Grimoire',
        text: 'Markdown note-taking app built in a five-day hackathon by a team of six; lead front-end developer. React, Spring Boot, CQRS, MySQL, Docker.',
      },
      {
        name: 'ClinikTime',
        text: 'medical appointment booking platform with patient, doctor and admin areas. Angular, ASP.NET Core, Entity Framework Core, SQL Server, JWT.',
      },
    ],
    education: [
      {
        title: 'Bachelor in Computer Science, Application Development track',
        org: 'HELHa',
        place: 'Mons, Belgium',
        period: '2023 – 2026',
        bullets: [],
      },
    ],
    languages: ['French: native', 'English: B2 (professional working proficiency)'],
    strengths: 'Teamwork, problem solving, organisation and time management, communication.',
  },
};
