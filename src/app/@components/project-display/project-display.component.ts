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

  // DIMENSIÓN FIJA: Se calcula UNA sola vez al inicializar
  private readonly fixedViewportWidth: number;

  constructor(
    private cloudinaryService: CloudinaryService,
    private windowSize: WindowSizeService,
    private translationService: TranslationService
  ) {
    // CALCULAR DIMENSIÓN UNA SOLA VEZ en el constructor
    this.fixedViewportWidth = this.windowSize.innerWidth();
  }

  ngOnInit() {}

  /**
   * Genera URL optimizada para la imagen del proyecto
   * Usa dimensiones fijas para evitar recargas innecesarias
   */
  getProjectImageUrl(): string {
    return this.cloudinaryService.generateFeaturedUrl(
      this.project.showImg,
      this.fixedViewportWidth
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
