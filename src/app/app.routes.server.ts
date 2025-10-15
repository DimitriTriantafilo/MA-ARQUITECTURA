import { Routes } from '@angular/router';
import { generateSlug, projects } from './app.routes';
import { Project } from './app.component';
import { projectResolver } from './resolvers/project.resolver';

/**
 * Rutas específicas del servidor para SSR/Prerendering
 * Estas rutas se generan en build time para prerenderizar todos los proyectos
 * Los proyectos se cargan desde el archivo generado (generated-routes.ts)
 */
export const serverRoutes: Routes = [
  ...projects.map((project: Project) => ({
    path: project.id || generateSlug(project.name),
    loadComponent: () =>
      import('./@components/project-detail/project-detail.component').then(
        (m) => m.ProjectDetailComponent
      ),
    resolve: { project: projectResolver },
  })),
];
