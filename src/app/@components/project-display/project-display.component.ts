import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../app.component';
import { CommonModule } from '@angular/common';
import { CloudinaryService } from '../../cloudinary.service';
import { WindowSizeService } from '../../window-size.service';
import { TranslationService } from '../../transltate/translation.service';

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
    private windowSize: WindowSizeService,
    private translationService: TranslationService
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

  /**
   * Obtiene el nombre del proyecto según el idioma actual
   */
  getProjectName(): string {
    if (!this.project) {
      return '';
    }

    // Verificar si el idioma actual es inglés
    const currentLanguage = this.translationService.currentLang();

    let projectName: string;
    if (currentLanguage === 'en' && this.project.nameEn) {
      projectName = this.project.nameEn;
    } else {
      projectName = this.project.name;
    }

    // Retornar el nombre en mayúsculas
    return projectName.toUpperCase();
  }
}
