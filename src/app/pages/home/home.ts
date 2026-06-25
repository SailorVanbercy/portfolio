import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProjectService, Project } from '../../services/project-service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
  imports: [
    RouterLink
  ]
})
export class Home {
  private projectService = inject(ProjectService);
  featured: Project[] = this.projectService.getFeatured();
}
