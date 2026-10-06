import { defineProject } from './define';

export default defineProject({
  slug: 'leadboy',
  title: 'LeadBoy',
  pitch: {
    fr: 'Agent IA qui prospecte des véhicules d’occasion sur WhatsApp, de l’extraction des annonces jusqu’à la négociation du prix.',
    en: 'AI agent that sources used vehicles over WhatsApp, from listing extraction all the way to price negotiation.',
  },
  category: 'professional',
  period: '2025 – 2026',
  team: { solo: false, size: 2 },
  role: {
    fr: 'Développeur full-stack (stage et TFE chez Indigo Studio) : moteur de négociation IA, sécurisation de l’API, internationalisation, tests et mise en production sur VPS.',
    en: 'Full-stack developer (internship and final-year project at Indigo Studio): AI negotiation engine, API hardening, internationalisation, testing and production rollout on a VPS.',
  },
  context: {
    fr: 'Un négociant automobile passait des heures à repérer des annonces, contacter les vendeurs un par un et négocier par message. LeadBoy automatise toute cette chaîne : il extrait les annonces AutoScout24, contacte les vendeurs sur WhatsApp, qualifie le véhicule puis négocie le prix grâce à un agent conversationnel, tout en laissant l’humain reprendre la main à tout moment. L’outil est en production depuis septembre 2025.',
    en: 'A car dealer spent hours finding listings, contacting sellers one by one and negotiating by message. LeadBoy automates the whole chain: it extracts AutoScout24 listings, reaches sellers on WhatsApp, qualifies the vehicle and negotiates the price through a conversational agent, while a human can take over at any time. The tool has been in production since September 2025.',
  },
  features: {
    fr: [
      'Extraction automatisée d’annonces AutoScout24 avec un navigateur headless (recherche par URL, lot ou nouveautés)',
      'Pipeline de prospection en Kanban avec glisser-déposer et statuts (nouveau, en cours, à relancer, gagné, perdu)',
      'Envoi WhatsApp en masse avec file d’attente, délais humains simulés (8 à 45 s) et circuit breaker anti-boucle',
      'Agent négociateur basé sur Claude : recherche web des prix professionnels, analyse des photos (vision) et stratégie de prix déterministe',
      'Profilage psychologique du vendeur et choix de tactiques de négociation configurables (LeadCore)',
      'Sandbox « LeadLab » pour tester l’IA sur des véhicules réels avant de l’exposer aux vendeurs',
      'Interface disponible en français, anglais et néerlandais',
    ],
    en: [
      'Automated AutoScout24 listing extraction with a headless browser (by URL, batch or new arrivals)',
      'Kanban prospecting pipeline with drag and drop and statuses (new, ongoing, follow-up, won, lost)',
      'Bulk WhatsApp sending with a queue, simulated human delays (8 to 45 s) and an anti-loop circuit breaker',
      'Claude-based negotiation agent: web search for dealer prices, photo analysis (vision) and deterministic pricing strategy',
      'Seller psychological profiling and configurable negotiation tactics (LeadCore)',
      '“LeadLab” sandbox to test the AI on real vehicles before exposing it to sellers',
      'Interface available in French, English and Dutch',
    ],
  },
  architecture: {
    fr: 'L’application Next.js (App Router) regroupe l’interface et une quarantaine de route handlers d’API validés par Zod. Un serveur Node.js/Express séparé pilote WhatsApp via Baileys, découpé en neuf modules (connexion, messages, envoi en masse, circuit breaker, WebSocket temps réel). Les messages entrants sont transmis à l’API de chat, qui reconstruit le contexte du véhicule, appelle le pipeline IA (Claude Sonnet et Haiku, Grok pour le profilage, RAG LlamaIndex sur un playbook de négociation) puis renvoie la réponse avec un délai humain. Les données (véhicules, messages, médias) sont stockées dans Supabase/PostgreSQL. L’ensemble est conteneurisé avec Docker Compose et déployé sur un VPS durci (UFW, Fail2Ban) derrière Traefik avec certificats Let’s Encrypt.',
    en: 'The Next.js (App Router) application hosts the UI and around forty API route handlers validated with Zod. A separate Node.js/Express server drives WhatsApp through Baileys, split into nine modules (connection, messages, bulk sending, circuit breaker, real-time WebSocket). Incoming messages are forwarded to the chat API, which rebuilds the vehicle context, runs the AI pipeline (Claude Sonnet and Haiku, Grok for profiling, LlamaIndex RAG over a negotiation playbook) and replies with a human-like delay. Data (vehicles, messages, media) lives in Supabase/PostgreSQL. Everything is containerised with Docker Compose and deployed on a hardened VPS (UFW, Fail2Ban) behind Traefik with Let’s Encrypt certificates.',
  },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss', 'radix-ui', 'next-intl', 'dnd-kit'],
    backend: ['nodejs', 'nextjs-api-routes', 'express', 'baileys', 'websocket', 'supabase', 'cheerio'],
    database: ['postgresql', 'sql'],
    security: ['jwt', 'zod', 'rate-limiting', 'cors', 'security-headers'],
    architecture: ['rest-api', 'circuit-breaker', 'web-scraping', 'i18n'],
    infrastructure: ['docker', 'docker-compose', 'traefik', 'linux-vps'],
    testing: ['vitest', 'playwright'],
    ai: ['claude-api', 'grok-api', 'llamaindex', 'ai-agents', 'prompt-engineering', 'claude-code'],
    tooling: ['git', 'eslint'],
  },
  images: [
    {
      src: 'projects/leadboy/01-pipeline.webp',
      alt: {
        fr: 'Pipeline de prospection : compteurs par statut et liste des véhicules extraits',
        en: 'Prospecting pipeline: counters per status and list of extracted vehicles',
      },
      viewport: 'desktop',
    },
    {
      src: 'projects/leadboy/02-conversation.webp',
      alt: {
        fr: 'Conversation WhatsApp menée par l’agent avec un vendeur',
        en: 'WhatsApp conversation led by the agent with a seller',
      },
      viewport: 'desktop',
    },
    {
      src: 'projects/leadboy/03-negociation.webp',
      alt: {
        fr: 'Panneau de négociation : prix, offres, stratégie, tactiques et profil du vendeur',
        en: 'Negotiation panel: price, offers, strategy, tactics and seller profile',
      },
      viewport: 'mobile',
    },
    {
      src: 'projects/leadboy/04-extracteur.webp',
      alt: {
        fr: 'Extracteur d’annonces AutoScout24 avec historique des recherches',
        en: 'AutoScout24 listing extractor with search history',
      },
      viewport: 'desktop',
    },
    {
      src: 'projects/leadboy/05-envoi-masse.webp',
      alt: {
        fr: 'Envoi WhatsApp en masse avec file d’attente et délais',
        en: 'Bulk WhatsApp sending with queue and delays',
      },
      viewport: 'desktop',
    },
    {
      src: 'projects/leadboy/06-landing.webp',
      alt: { fr: 'Page d’accueil publique de LeadBoy', en: 'LeadBoy public landing page' },
      viewport: 'desktop',
    },
  ],
  featured: true,
  order: 1,
});
