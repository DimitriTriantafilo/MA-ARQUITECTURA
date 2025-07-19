import { Routes } from '@angular/router';
import { generateSlug } from './app.routes';
import { Project } from './app.component';
import { projects } from './app.config';

export const serverRoutes: Routes = [
  ...projects.map((project: Project) => ({
    path: generateSlug(project.name),
    loadComponent: () =>
      import('./@components/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    data: { project },
  })),
];
