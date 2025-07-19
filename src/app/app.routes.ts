import { Routes } from '@angular/router';
// import { ProjectDetailComponent } from './project-detail/project-detail.component';
// import { HomeComponent } from './home/home.component';
import { Project } from './app.component';
import { projects } from './app.config';
import { ProjectListComponent } from './@components/project-list/project-list.component';
import { NosotrosComponent } from './@components/nosotros/nosotros.component';
import { HomeComponent } from './@components/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    // children: [
    //   ...projects.map((project: Project) => ({
    //     path: generateSlug(project.name),
    //     // component: ProjectDetailComponent,
    //     data: { project },
    //   })),
    // ],
  },
  {
    path: 'proyectos',
    component: ProjectListComponent,
    // children: [
    //   ...projects.map((project: Project) => ({
    //     path: generateSlug(project.name),
    //     // component: ProjectDetailComponent,
    //     data: { project },
    //   })),
    // ],
  },
  {
    path: 'estudio',
    component: NosotrosComponent,
  },
  //   ...projects?.map((project: Project) => ({
  //     path: generateSlug(project.name),
  //     // component: ProjectDetailComponent,
  //     data: { project },
  //   })),

  { path: '**', redirectTo: '' },
];

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
