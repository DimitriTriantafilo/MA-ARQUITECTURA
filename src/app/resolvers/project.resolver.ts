import { inject } from '@angular/core';
import { ResolveFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError, take } from 'rxjs/operators';
import { Project } from '../app.component';
import { ProjectsService } from '../services/projects.service';

/**
 * Resolver para cargar un proyecto dinámicamente por su slug
 * Se ejecuta antes de renderizar el componente ProjectDetailComponent
 */
export const projectResolver: ResolveFn<Project | null> = (
  route: ActivatedRouteSnapshot
): Observable<Project | null> => {
  const projectsService = inject(ProjectsService);
  const router = inject(Router);
  // Obtener el slug del path de la ruta (el último segmento de la URL)
  const slug = route.url.length > 0 ? route.url[route.url.length - 1].path : '';

  console.log(`🔍 Resolving project with slug: ${slug}`);

  return projectsService.getProjectBySlug(slug).pipe(
    take(1),
    map((project) => {
      if (!project) {
        console.warn(
          `⚠️ Project not found for slug: ${slug}, redirecting to home`
        );
        router.navigate(['/']);
        return null;
      }
      console.log(`✅ Project resolved: ${project.name}`);
      return project;
    }),
    catchError((error) => {
      console.error('❌ Error resolving project:', error);
      router.navigate(['/']);
      return of(null);
    })
  );
};
