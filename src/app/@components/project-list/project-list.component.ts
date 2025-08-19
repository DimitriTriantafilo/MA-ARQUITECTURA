import { TranslatePipe } from '../../transltate/translate.pipe';
import { Component, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { Project } from '../../app.component';
import { ProjectDisplayComponent } from '../project-display/project-display.component';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { generateSlug, projects } from '../../app.routes';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-project-list',
  imports: [ProjectDisplayComponent, CommonModule, RouterModule, TranslatePipe],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  projects: Project[] = projects;
  isMobile = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 600;
    }
  }

  generateSlug = generateSlug;

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 600;
    }
  }

  getProjectGridStyle(project: Project) {
    if (this.isMobile) {
      // En móvil, no aplicar rowSpan ni colSpan
      return {
        'min-height': '250px',
      };
    } else {
      // En desktop, aplicar rowSpan y colSpan
      return {
        'grid-row': 'span ' + (project.rowSpan ? project.rowSpan : 1),
        'grid-column': 'span ' + (project.colSpan ? project.colSpan : 1),
        'min-height': '100px',
      };
    }
  }
}
