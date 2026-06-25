import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { ProjectService, Project } from '../../../services/project-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-detail.html',
  styleUrls: ['./project-detail.scss'],
})
export class ProjectDetail {

  project: Project | undefined;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    // Récupération du slug dans l'URL
    const slug = this.route.snapshot.paramMap.get('id');

    if (slug) {
      this.project = this.projectService.getBySlug(slug);
    }
  }

}
