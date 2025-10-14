import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { map, catchError, tap, shareReplay } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { Project } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  private projectsCache$?: Observable<Project[]>;
  private projectsSubject = new BehaviorSubject<Project[]>([]);

  // URL del JSON - puede ser local o externo
  private readonly PROJECTS_JSON_URL = '/assets/data/projects.json';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  /**
   * Obtiene todos los proyectos
   * Implementa caché para evitar múltiples requests
   */
  getProjects(): Observable<Project[]> {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.http
        .get<Project[]>(this.PROJECTS_JSON_URL)
        .pipe(
          tap((projects) => {
            console.log(`✅ Loaded ${projects.length} projects from JSON`);
            this.projectsSubject.next(projects);
          }),
          catchError((error) => {
            console.error('❌ Error loading projects:', error);
            return of([]);
          }),
          shareReplay(1) // Cache the result
        );
    }

    return this.projectsCache$;
  }

  /**
   * Obtiene un proyecto por su ID
   */
  getProjectById(id: string): Observable<Project | null> {
    return this.getProjects().pipe(
      map((projects) => {
        const project = projects.find((p) => p.id === id);
        if (!project) {
          console.warn(`⚠️ Project not found: ${id}`);
        }
        return project || null;
      })
    );
  }

  /**
   * Obtiene un proyecto por su slug (generado del nombre)
   */
  getProjectBySlug(slug: string): Observable<Project | null> {
    return this.getProjects().pipe(
      map((projects) => {
        const project = projects.find(
          (p) => this.generateSlug(p.name) === slug || p.id === slug
        );
        if (!project) {
          console.warn(`⚠️ Project not found with slug: ${slug}`);
        }
        return project || null;
      })
    );
  }

  /**
   * Genera un slug a partir del nombre del proyecto
   * Mantiene compatibilidad con el sistema anterior
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');
  }

  /**
   * Obtiene los proyectos de forma síncrona desde el caché
   * Útil para SSR/prerendering
   */
  getProjectsSync(): Project[] {
    return this.projectsSubject.value;
  }

  /**
   * Invalida el caché y fuerza una recarga
   * Útil si se actualiza el JSON externamente
   */
  refreshProjects(): Observable<Project[]> {
    this.projectsCache$ = undefined;
    return this.getProjects();
  }

  /**
   * Valida que un proyecto tenga los campos mínimos requeridos
   */
  validateProject(project: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!project.id) errors.push('Missing required field: id');
    if (!project.name) errors.push('Missing required field: name');
    if (!project.showImg) errors.push('Missing required field: showImg');
    if (!project.images || !Array.isArray(project.images))
      errors.push('Missing or invalid field: images (must be array)');
    if (project.images && project.images.length === 0)
      errors.push('images array is empty');

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Valida todos los proyectos del JSON
   */
  validateAllProjects(): Observable<{
    valid: boolean;
    totalProjects: number;
    errors: Array<{ projectId: string; errors: string[] }>;
  }> {
    return this.getProjects().pipe(
      map((projects) => {
        const projectErrors: Array<{ projectId: string; errors: string[] }> =
          [];

        projects.forEach((project, index) => {
          const validation = this.validateProject(project);
          if (!validation.valid) {
            projectErrors.push({
              projectId: project.id || `Project #${index}`,
              errors: validation.errors,
            });
          }
        });

        return {
          valid: projectErrors.length === 0,
          totalProjects: projects.length,
          errors: projectErrors,
        };
      })
    );
  }
}
