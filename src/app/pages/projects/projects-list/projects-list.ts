import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {ProjectService, Project} from '../../../services/project-service';

@Component({
  selector: 'app-projects-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './projects-list.html',
  styleUrls: ['./projects-list.scss'],
})
export class ProjectsList {

  constructor(private projectService: ProjectService) {}

  finishedProjects: Project[] = [];
  ongoingProjects: Project[] = [];

  ngOnInit() {
    this.finishedProjects = this.projectService.getFinished();
    this.ongoingProjects = this.projectService.getInProgress();
  }


}
