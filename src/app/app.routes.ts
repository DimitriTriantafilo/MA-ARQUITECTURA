import { Routes } from '@angular/router';
import { ProjectListComponent } from './@components/project-list/project-list.component';
import { NosotrosComponent } from './@components/nosotros/nosotros.component';
import { HomeComponent } from './@components/home/home.component';
import { ProjectDetailComponent } from './@components/project-detail/project-detail.component';
import { projectResolver } from './resolvers/project.resolver';
import { projects } from './generated-routes';

/**
 * Proyectos cargados desde el archivo generado (generated-routes.ts)
 * Este archivo se genera automáticamente desde src/assets/data/projects.json
 * mediante el script scripts/generate-routes.js
 */
export { projects };

/**
 * Rutas principales de la aplicación
 * Las rutas de proyectos se generan dinámicamente desde el array cargado del JSON
 */
export const routes: Routes = [
  {
    path: 'contacto',
    loadComponent: () =>
      import('./@components/contacto/contacto.component').then(
        (m) => m.ContactoComponent
      ),
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'proyectos',
    component: ProjectListComponent,
  },
  {
    path: 'estudio',
    component: NosotrosComponent,
  },
  {
    path: 'servicios',
    loadComponent: () =>
      import('./@components/servicios/servicios.component').then(
        (m) => m.ServiciosComponent
      ),
  },
  // Rutas de proyectos generadas dinámicamente desde JSON
  // Cada proyecto en el array projects se convierte en una ruta prerrenderizada
  ...projects.map((project) => ({
    path: project.id || generateSlug(project.name),
    component: ProjectDetailComponent,
    resolve: { project: projectResolver },
  })),

  { path: '**', redirectTo: '' },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
