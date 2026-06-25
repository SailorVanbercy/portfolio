import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import {ProjectsList} from './pages/projects/projects-list/projects-list';
import {ProjectDetail} from './pages/projects/project-detail/project-detail';
import {About} from './pages/about/about';
import {Contact} from './pages/contact/contact';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'projets', component : ProjectsList},
  { path:'projets/:id', component : ProjectDetail},
  { path: 'about', component: About },
  { path: 'contact', component: Contact},
  { path: '**', redirectTo: '' },
];
