import { Injectable } from '@angular/core';

export interface Project {
  title: string;
  description: string;
  slug: string;
  status: 'done' | 'progress';
  technologies: string[];
  isGroup : boolean;
  url? : string;
  images? : string[];   // Captures d'écran (galerie sur la page détail)
  featured? : boolean;  // Mis en avant sur la page d'accueil
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  private projects: Project[] = [

    // 🔵 TERMINÉS
    {
      title: 'LeadBoy',
      description: 'Travail de fin d\'études réalisé chez Indigo Studio : un agent IA conversationnel qui automatise l\'acquisition de véhicules d\'occasion. Le système extrait les annonces AutoScout24 via un navigateur automatisé, contacte les vendeurs sur WhatsApp et conduit une négociation pilotée par l\'IA, puis centralise fiches et échanges dans un tableau de bord temps réel. En production depuis septembre 2025.',
      slug: 'leadboy',
      status: 'done',
      technologies: ['Next.js', 'TypeScript', 'Supabase', 'Playwright', 'WhatsApp API', 'Claude AI'],
      isGroup : false,
      featured : true,
      images : [
        'projects/leadboy/pipeline.png',
        'projects/leadboy/scraper.png',
        'projects/leadboy/conversation.png',
        'projects/leadboy/negociation.png',
        'projects/leadboy/envoi-masse.png',
        'projects/leadboy/login.png'
      ]
    },
    {
      title: 'Moit-Moit',
      description: 'Application web de gestion de dépenses partagées sur le thème du célèbre manga One Piece.',
      slug: 'moit-moit',
      status: 'done',
      technologies: ['HTML', 'CSS','JavaScript', 'PHP', 'MySQL'],
      isGroup : true
    },
    {
      title: 'The Lost Grimoire',
      description: 'Application de prise de notes en Markdown avec organisation hiérarchique en arborescence de dossiers et de fichiers. Projet d\'examen réalisé en groupe.',
      slug: 'the-lost-grimoire',
      status: 'done',
      technologies: ['React', 'Spring Boot', 'Java', 'Markdown'],
      isGroup : true,
      featured : true
    },
    {
      title: 'Are You the New Emilien ?',
      description: 'Jeu de plateau basé sur le jeu "Tu te mets combien ?".',
      slug: 'emilien',
      status: 'done',
      technologies: ['Java', 'JavaFX'],
      isGroup : true
    },
    {
      title: 'Adresseur IP',
      description: 'Logiciel Python d\'adressage IP et de gestion de réseaux',
      slug: 'adressage-ip',
      status: 'done',
      technologies: ['Python', 'customTkinter', 'SQLite'],
      isGroup : true
    },
    {
      title: 'Gestion de Cinéma',
      description: 'Logiciel de gestion d\'un cinéma développé en langage procédural',
      slug: 'cinema',
      status: 'done',
      technologies: ['C'],
      isGroup : true
    },
    {
      title: 'Gestion d\'étudiants',
      description: 'Logiciel de gestion d\'étudiants et d\'envoi de mails développé en VBA',
      slug: 'vba',
      status: 'done',
      technologies: ['vba'],
      isGroup : false
    },

    {
      title: 'ClinikTime',
      description: 'Site web de prise de rendez-vous médicaux.',
      slug: 'kliniktime',
      status: 'done',
      technologies: ['Angular', 'C#', 'ASP.NET', 'MySQL'],
      isGroup : true,
      featured : true
    },
    {
      title: 'FoodSnap',
      description: 'Application mobile de gestion de recettes.',
      slug: 'foodsnap',
      status: 'done',
      technologies: ['Flutter', 'Dart'],
      isGroup : false
    },
    {
      title: 'Zombie High School',
      description: 'Jeu vidéo 2D développé en C++.',
      slug: 'zombie-hs',
      status: 'done',
      technologies: ['C++', 'SFML'],
      isGroup : true
    }
  ];

  // 👉 Récupérer tous les projets
  getAll() {
    return this.projects;
  }

  // 👉 Projets terminés
  getFinished() {
    return this.projects.filter(p => p.status === 'done');
  }

  // 👉 Projets en cours
  getInProgress() {
    return this.projects.filter(p => p.status === 'progress');
  }

  // 👉 Projets mis en avant (page d'accueil)
  getFeatured() {
    return this.projects.filter(p => p.featured);
  }

  // 👉 Récupérer un projet via son slug
  getBySlug(slug: string) {
    return this.projects.find(p => p.slug === slug);
  }
}
