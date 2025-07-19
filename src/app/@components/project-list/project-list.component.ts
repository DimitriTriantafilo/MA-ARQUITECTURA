import { Component } from '@angular/core';
import { TranslatePipe } from '../../transltate/translate.pipe';
import { Project } from '../../app.component';
import { ProjectDisplayComponent } from '../project-display/project-display.component';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../cloudinary.service';
import { projects } from '../../app.routes';

@Component({
  selector: 'app-project-list',
  imports: [TranslatePipe, ProjectDisplayComponent, CommonModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss',
})
export class ProjectListComponent {
  projects: Project[] = projects;
  constructor(private cloudinaryService: CloudinaryService) {}

  //   optimizeProjectImages() {
  //   this.projects = this.projects.map((project) => ({
  //     ...project,
  //     showImg: this.cloudinaryService.getOptimizedThumbnail(project.showImg),
  //     mainFeature: {
  //       ...project.mainFeature,
  //       link: this.cloudinaryService.getOptimizedDetailImage(
  //         project.mainFeature.link
  //       ),
  //     },
  //     images: project.images.map((img) => ({
  //       src: this.cloudinaryService.getOptimizedGalleryImage(img.src),
  //     })),
  //   }));
  // }
}
