import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../app.component';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../cloudinary.service';
import { WindowSizeService } from '../../window-size.service';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.scss'],
  imports: [CommonModule],
})
export class ProjectDisplayComponent implements OnInit {
  @Input() project!: Project;
  @Input() index!: number;

  hovering: boolean = false;

  constructor(
    private cloudinaryService: CloudinaryService,
    private windowSize: WindowSizeService
  ) {}

  ngOnInit() {}

  /**
   * Genera URL optimizada para la imagen del proyecto
   */
  getProjectImageUrl(): string {
    const viewportWidth = this.windowSize.innerWidth();
    return this.cloudinaryService.generateFeaturedUrl(
      this.project.showImg,
      viewportWidth
    );
  }
}
