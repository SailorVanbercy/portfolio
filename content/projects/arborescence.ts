import { defineProject } from './define';

export default defineProject({
  slug: 'arborescence',
  title: 'Arborescence',
  pitch: {
    fr: 'Site vitrine pour une entreprise d’élagage, avec demande de devis et estimation de prix par IA à partir des photos des arbres.',
    en: 'Showcase website for a tree-care company, with quote requests and AI price estimation from photos of the trees.',
  },
  category: 'personal',
  period: '2026',
  team: { solo: true },
  role: {
    fr: 'Conception et développement complet : design, animations, formulaire de réservation, API de traitement, intégration de Claude Vision et envoi d’e-mails.',
    en: 'End-to-end design and development: design, animations, booking form, processing API, Claude Vision integration and e-mail delivery.',
  },
  context: {
    fr: 'Un élagueur reçoit beaucoup de demandes de devis sans savoir à l’avance l’ampleur du chantier. Arborescence est un site one-page qui présente l’entreprise et ses services, et propose un formulaire où le client décrit le travail et joint des photos. Une IA multimodale analyse ces photos pour fournir une première estimation de la complexité et d’une fourchette de prix, envoyée par e-mail au professionnel avec la demande.',
    en: 'A tree surgeon receives many quote requests without knowing the scope of the job in advance. Arborescence is a one-page website that presents the company and its services, with a form where clients describe the work and attach photos. A multimodal AI analyses the photos to give a first estimate of complexity and a price range, e-mailed to the professional along with the request.',
  },
  features: {
    fr: [
      'Site one-page responsive avec animations au défilement',
      'Formulaire de devis avec validation côté client et serveur (React Hook Form et Zod)',
      'Glisser-déposer de jusqu’à cinq photos',
      'Estimation par Claude Vision : complexité, observations, recommandations et fourchette de prix',
      'Envoi automatique d’un e-mail récapitulatif à l’élagueur via Resend',
      'Dégradation contrôlée : le formulaire fonctionne même sans clé IA configurée',
    ],
    en: [
      'Responsive one-page site with scroll animations',
      'Quote form with client- and server-side validation (React Hook Form and Zod)',
      'Drag-and-drop upload of up to five photos',
      'Claude Vision estimate: complexity, observations, recommendations and price range',
      'Automatic summary e-mail to the tree surgeon through Resend',
      'Graceful degradation: the form still works when no AI key is configured',
    ],
  },
  architecture: {
    fr: 'Application Next.js (App Router) en TypeScript, stylée avec Tailwind CSS et animée avec Framer Motion. Le formulaire envoie les photos encodées en base64 à un route handler qui revalide toutes les données avec un schéma Zod (types d’images, tailles, nombre de fichiers). Si des photos sont présentes, le serveur appelle l’API Claude avec des blocs image et un prompt qui impose une réponse structurée, puis construit l’e-mail envoyé avec Resend. Les clés d’API restent côté serveur et le site est prévu pour un déploiement sur Vercel.',
    en: 'Next.js (App Router) application in TypeScript, styled with Tailwind CSS and animated with Framer Motion. The form sends base64-encoded photos to a route handler that revalidates every field with a Zod schema (image types, sizes, file count). When photos are present, the server calls the Claude API with image blocks and a prompt that enforces a structured answer, then builds the e-mail sent through Resend. API keys stay on the server and the site targets a Vercel deployment.',
  },
  stack: {
    frontend: ['nextjs', 'react', 'typescript', 'tailwindcss', 'framer-motion', 'react-hook-form'],
    backend: ['nextjs-api-routes', 'resend'],
    security: ['zod'],
    infrastructure: ['vercel'],
    ai: ['claude-api', 'computer-vision', 'prompt-engineering'],
    tooling: ['git', 'eslint'],
  },
  images: [
    {
      src: 'projects/arborescence/01-accueil.webp',
      alt: { fr: 'Section d’accueil du site', en: 'Website hero section' },
      viewport: 'desktop',
    },
    {
      src: 'projects/arborescence/02-histoire.webp',
      alt: { fr: 'Section présentant l’histoire de l’entreprise et ses chiffres clés', en: 'Section presenting the company story and key figures' },
      viewport: 'desktop',
    },
    {
      src: 'projects/arborescence/03-reservation.webp',
      alt: { fr: 'Formulaire de demande de devis avec photos', en: 'Quote request form with photos' },
      viewport: 'desktop',
    },
    {
      src: 'projects/arborescence/04-mobile-accueil.webp',
      alt: { fr: 'Accueil en version mobile', en: 'Mobile hero section' },
      viewport: 'mobile',
    },
    {
      src: 'projects/arborescence/05-mobile-reservation.webp',
      alt: { fr: 'Formulaire de devis en version mobile', en: 'Mobile quote form' },
      viewport: 'mobile',
    },
  ],
  featured: false,
  order: 6,
});
