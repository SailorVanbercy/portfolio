import type { Locale } from '../src/lib/i18n';

type Localized = Record<Locale, string>;

export const profile = {
  name: 'Sailor Vanbercy',
  title: { fr: 'Développeur Full-Stack Junior', en: 'Junior Full-Stack Developer' } satisfies Localized,
  headline: {
    fr: 'Je conçois et livre des applications web et mobiles complètes, de la base de données à l’interface, avec un workflow de développement augmenté par l’IA.',
    en: 'I design and ship complete web and mobile applications, from the database to the interface, with an AI-augmented development workflow.',
  } satisfies Localized,
  location: { fr: 'Hainaut, Belgique', en: 'Hainaut, Belgium' } satisfies Localized,
  bio: {
    fr: [
      'Diplômé d’un bachelier en informatique orientation développement d’applications à la HELHa, je travaille principalement avec TypeScript, Next.js, React et PostgreSQL (Supabase). Côté serveur, je suis à l’aise avec Node.js, Java et Spring Boot, ainsi que C# et ASP.NET Core.',
      'Pendant mon stage chez Indigo Studio, j’ai conçu et mis en production LeadBoy, un agent conversationnel qui automatise la prospection de véhicules d’occasion : extraction d’annonces, échanges WhatsApp et négociation pilotée par l’IA, le tout centralisé dans un tableau de bord. J’y ai aussi développé des outils internes comme Tetris Formation et Plan Financier.',
      'Ce stage m’a permis d’intégrer des outils d’intelligence artificielle comme Claude Code au cœur de mon workflow : exploration de bases de code, refactoring, écriture de tests, revue et documentation. Je les utilise comme des accélérateurs encadrés par des pratiques rigoureuses (tests automatisés, validation des entrées, revue systématique) pour livrer plus vite sans sacrifier la qualité.',
      'Je recherche un poste de développeur full-stack dans une équipe où je pourrai contribuer à des produits concrets et continuer à progresser.',
    ],
    en: [
      'I hold a bachelor’s degree in computer science, application development track, from HELHa. I mainly work with TypeScript, Next.js, React and PostgreSQL (Supabase). On the server side I am comfortable with Node.js, Java and Spring Boot, as well as C# and ASP.NET Core.',
      'During my internship at Indigo Studio, I designed and shipped LeadBoy to production: a conversational agent that automates used-vehicle sourcing, from listing extraction to WhatsApp conversations and AI-driven negotiation, all centralised in a dashboard. I also built internal tools there, such as Tetris Formation and Plan Financier.',
      'This internship led me to embed AI tools such as Claude Code at the core of my workflow: codebase exploration, refactoring, test writing, review and documentation. I use them as accelerators framed by rigorous practices (automated tests, input validation, systematic review) to ship faster without trading off quality.',
      'I am looking for a full-stack developer role in a team where I can contribute to real products and keep growing.',
    ],
  } satisfies Record<Locale, string[]>,
  timeline: [
    {
      period: '2025 – 2026',
      title: { fr: 'Stage et travail de fin d’études, Indigo Studio', en: 'Internship and final-year project, Indigo Studio' },
      text: {
        fr: 'Conception et mise en production de LeadBoy, développement d’outils internes et intégration de Claude Code dans le workflow de développement.',
        en: 'Designed and shipped LeadBoy to production, built internal tools and integrated Claude Code into the development workflow.',
      },
    },
    {
      period: '2023 – 2026',
      title: {
        fr: 'Bachelier en informatique, orientation développement d’applications, HELHa',
        en: 'Bachelor in computer science, application development track, HELHa',
      },
      text: {
        fr: 'Développement web, mobile et desktop, bases de données, réseaux, design patterns et gestion de projet agile.',
        en: 'Web, mobile and desktop development, databases, networking, design patterns and agile project management.',
      },
    },
  ],
  contact: {
    email: 'sailorvanbercy2005@gmail.com',
    phone: '+32 497 20 67 05',
    phoneHref: 'tel:+32497206705',
    github: 'https://github.com/SailorVanbercy',
    githubHandle: 'SailorVanbercy',
    cv: '/cv-vanbercy-sailor.pdf',
  },
} as const;
