import { defineProject } from './define';

export default defineProject({
  slug: 'cliniktime',
  title: 'ClinikTime',
  pitch: {
    fr: 'Plateforme de prise de rendez-vous médicaux avec espaces patient, médecin et administrateur.',
    en: 'Medical appointment booking platform with patient, doctor and administrator areas.',
  },
  category: 'academic',
  period: '2025 – 2026',
  team: { solo: false },
  role: {
    fr: 'Développeur full-stack : API ASP.NET Core (authentification, rendez-vous, disponibilités) et interface Angular.',
    en: 'Full-stack developer: ASP.NET Core API (authentication, appointments, availability) and Angular interface.',
  },
  context: {
    fr: 'Projet intégré de bloc 3 à la HELHa. L’objectif était de concevoir, de l’analyse (diagrammes de classes, processus BPMN) jusqu’au code, une application qui permet à un patient de trouver un praticien par spécialité et de réserver un créneau pour lui ou un proche, tandis que le médecin gère ses disponibilités et ses rendez-vous.',
    en: 'Year-3 integrated project at HELHa. The goal was to design, from analysis (class diagrams, BPMN processes) to code, an application that lets patients find a practitioner by specialty and book a slot for themselves or a relative, while doctors manage their availability and appointments.',
  },
  features: {
    fr: [
      'Inscription, connexion par JWT et réinitialisation du mot de passe par e-mail',
      'Recherche de praticiens par spécialité et réservation sur les créneaux libres',
      'Fiches patients pour soi et ses proches (enfants, parents)',
      'Annulation, modification et reprogrammation des rendez-vous',
      'Espace médecin : ouverture et blocage de disponibilités, liste des rendez-vous',
      'Back-office administrateur : gestion des utilisateurs et promotion d’un compte en médecin',
    ],
    en: [
      'Sign-up, JWT sign-in and password reset by e-mail',
      'Search practitioners by specialty and book available slots',
      'Patient records for oneself and relatives (children, parents)',
      'Cancel, edit and reschedule appointments',
      'Doctor area: open and block availability, list of appointments',
      'Admin back office: user management and promotion of an account to doctor',
    ],
  },
  architecture: {
    fr: 'Le back-end .NET 9 est découpé en trois projets : Domain (entités), Infrastructure (DbContext Entity Framework Core sur SQL Server) et API (contrôleurs REST versionnés /api/v1, services, utilitaires). L’authentification utilise des jetons JWT Bearer et des mots de passe hachés avec BCrypt ; les rôles Utilisateur, Médecin et Administrateur sont contrôlés par attributs d’autorisation. L’API est documentée avec Swagger et envoie les e-mails de réinitialisation par SMTP. Le front-end Angular, en composants standalone, s’organise en modules fonctionnels (auth, patient, médecin, admin) protégés par des guards de rôle, et consomme l’API via des services RxJS.',
    en: 'The .NET 9 back end is split into three projects: Domain (entities), Infrastructure (Entity Framework Core DbContext on SQL Server) and API (versioned /api/v1 REST controllers, services, utilities). Authentication uses JWT Bearer tokens and BCrypt-hashed passwords; User, Doctor and Admin roles are enforced through authorisation attributes. The API is documented with Swagger and sends password-reset e-mails over SMTP. The Angular front end, built with standalone components, is organised in feature areas (auth, patient, doctor, admin) protected by role guards, and consumes the API through RxJS services.',
  },
  stack: {
    frontend: ['angular', 'typescript', 'rxjs'],
    backend: ['csharp', 'aspnet-core'],
    database: ['sql-server', 'ef-core', 'sql'],
    security: ['jwt', 'bcrypt', 'rbac', 'cors'],
    architecture: ['rest-api', 'layered-architecture', 'openapi'],
    tooling: ['git', 'uml', 'bpmn'],
  },
  images: [
    {
      src: 'projects/cliniktime/01-accueil-patient.webp',
      alt: { fr: 'Accueil patient avec recherche et derniers rendez-vous', en: 'Patient home with search and latest appointments' },
      viewport: 'desktop',
    },
    {
      src: 'projects/cliniktime/02-recherche-praticien.webp',
      alt: { fr: 'Résultats de recherche d’un praticien par spécialité', en: 'Practitioner search results by specialty' },
      viewport: 'desktop',
    },
    {
      src: 'projects/cliniktime/03-prise-de-rendez-vous.webp',
      alt: { fr: 'Formulaire de prise de rendez-vous', en: 'Appointment booking form' },
      viewport: 'desktop',
    },
    {
      src: 'projects/cliniktime/04-fiches-patients.webp',
      alt: { fr: 'Fiches patients du compte et de ses proches', en: 'Patient records for the account and relatives' },
      viewport: 'desktop',
    },
    {
      src: 'projects/cliniktime/05-administration.webp',
      alt: { fr: 'Tableau de bord administrateur de gestion des accès', en: 'Administrator access management dashboard' },
      viewport: 'desktop',
    },
  ],
  links: { repo: 'https://github.com/SailorVanbercy/ClinikTime_Backend' },
  featured: false,
  order: 8,
});
