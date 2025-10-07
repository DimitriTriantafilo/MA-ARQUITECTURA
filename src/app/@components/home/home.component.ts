import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { WindowSizeService } from '../../window-size.service';
import { TranslatePipe } from '../../transltate/translate.pipe';
// @ts-ignore: Suppress error if type declarations are missing
import { PrivacyFriendlyVideoComponent } from '../privacy-friendly-video/privacy-friendly-video.component';
import { ImagePreloadService } from '../../image-preload.service';
import { TranslationService } from '../../transltate/translation.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TranslatePipe, PrivacyFriendlyVideoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];

  // DIMENSIONES FIJAS: Se calculan UNA sola vez al inicializar
  // Esto evita recargas innecesarias de imágenes de Cloudinary cuando cambia el tamaño de la pantalla
  // (como cuando se cierra/abre la barra de navegación del navegador)
  public readonly fixedViewportWidth: number;
  public readonly fixedViewportHeight: number;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService,
    private router: Router,
    private imagePreloadService: ImagePreloadService,
    private translationService: TranslationService
  ) {
    // CALCULAR DIMENSIONES UNA SOLA VEZ en el constructor
    // Esto evita recargas innecesarias de imágenes de Cloudinary
    this.fixedViewportWidth = this.windowSize.innerWidth();
    this.fixedViewportHeight = this.windowSize.innerHeight();
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Precargar recursos críticos de forma asíncrona
      setTimeout(() => {
        this.imagePreloadService.preloadCriticalResources();
      }, 100);

      // Fijar el tamaño de las imágenes para prevenir cambios dinámicos
      this.fixImageHeights();
    }
  }

  // ELIMINADOS: Los getters dinámicos que causaban recargas innecesarias
  // get innerWidth() { return this.windowSize.innerWidth(); }
  // get innerHeight() { return this.windowSize.innerHeight(); }

  getVerticalImageWidth(): number {
    // Calculamos el ancho real del contenedor (1/3 del ancho total menos gaps y padding)
    const containerWidth = Math.floor((this.fixedViewportWidth - 40) / 3); // 40px = padding + gaps
    // Limitamos el ancho máximo para optimizar el consumo de red
    return Math.min(containerWidth, 600);
  }

  getVerticalImageHeight(): number {
    // Para imágenes verticales, calculamos una altura proporcional
    // Usamos una relación de aspecto típica de imagen vertical (3:4 o 4:5)
    const containerWidth = this.getVerticalImageWidth();
    // Relación de aspecto 4:5 (más vertical)
    return Math.floor(containerWidth * 1.25);
  }

  // Función para generar URL optimizada de Cloudinary
  getOptimizedImageUrl(
    publicId: string,
    width: number,
    height: number
  ): string {
    return `https://res.cloudinary.com/dskkynwxb/c_scale,w_${width},h_${height}/q_auto:good/f_auto,fl_force_strip,fl_progressive/${publicId}`;
  }

  /**
   * Obtiene el nombre del proyecto Casa Wim según el idioma actual
   */
  getCasaWimName(): string {
    return this.translationService.translate('casaWim').toUpperCase();
  }

  /**
   * Obtiene el nombre del proyecto Reforma Sanfer según el idioma actual
   */
  getReformaSanferName(): string {
    return this.translationService.translate('reformaSanfer').toUpperCase();
  }

  /**
   * Obtiene la ubicación San Andrés de Giles según el idioma actual
   */
  getSanAndresGilesLocation(): string {
    return this.translationService.translate('sanAndresGiles').toUpperCase();
  }

  /**
   * Fija el tamaño de las imágenes de proyectos SOLO en móvil para prevenir cambios dinámicos
   * cuando se muestra/oculta la barra de navegación del navegador
   */
  private fixImageHeights(): void {
    // Solo ejecutar en móvil
    if (this.fixedViewportWidth > 768) {
      return;
    }

    // Esperar a que el DOM esté listo
    setTimeout(() => {
      // SOLO las imágenes de proyectos, NO el video principal
      const projectImageContainers = this.el.nativeElement.querySelectorAll(
        '.project-landig, .project-vertical, .vertical-image-container'
      );

      projectImageContainers.forEach((container: HTMLElement) => {
        // Obtener el tamaño inicial del viewport
        const initialHeight = window.innerHeight;

        // Fijar el tamaño de manera definitiva SOLO en móvil
        container.style.height = `${initialHeight}px`;
        container.style.minHeight = `${initialHeight}px`;
        container.style.maxHeight = `${initialHeight}px`;
      });
    }, 100);
  }

  // ELIMINADO: Ya no se necesita el event listener de resize
  // Las alturas se fijan UNA sola vez al inicializar

  // Funciones de navegación para proyectos
  navigateToReformaMigueletes() {
    this.router.navigate(['/reforma-migueletes']);
  }

  navigateToReformaBnb() {
    this.router.navigate(['/reforma-bnb']);
  }

  navigateToCasaIgor() {
    this.router.navigate(['/reforma-igor']);
  }

  navigateToReformaSanfer() {
    this.router.navigate(['/reforma-sanfer']);
  }

  navigateToCasaWim() {
    this.router.navigate(['/casa-wim']);
  }

  navigateToProjects() {
    this.router.navigate(['/proyectos']);
  }

  // Funciones de hover
  onProjectHover(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('hovered');
  }

  onProjectLeave(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('hovered');
  }

  onViewMoreHover(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.add('hovered');
  }

  onViewMoreLeave(event: MouseEvent) {
    const element = event.currentTarget as HTMLElement;
    element.classList.remove('hovered');
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        this.setupIntersectionObservers();
        this.setupLazyLoading();
        this.setupProjectTextObserver();
        this.setupHeroTextObserver();

        // Fijar el tamaño de las imágenes después de que el DOM esté completamente listo
        this.fixImageHeights();
      }, 500); // Aumentado a 500ms para asegurar que todo esté cargado
    }
  }

  ngOnDestroy() {
    // Limpiar todos los observers
    this.observers.forEach((observer) => observer.disconnect());

    // ELIMINADO: Ya no hay event listener de resize que limpiar
    // Las alturas se fijan UNA sola vez al inicializar
  }

  private setupIntersectionObservers(): void {
    // Configurar lazy loading para imágenes
    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset['src']) {
              img.setAttribute('src', img.dataset['src']);
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    // Observar todas las imágenes con data-src
    const lazyImages = this.el.nativeElement.querySelectorAll('img[data-src]');
    lazyImages.forEach((img: HTMLImageElement) => {
      imageObserver.observe(img);
    });

    this.observers.push(imageObserver);
  }

  private setupLazyLoading(): void {
    // Usar el servicio de preload para optimizar la carga de recursos
    this.imagePreloadService.lazyLoadResources(
      '.project-landig img, .vertical-image-container img',
      (element) => {
        const img = element as HTMLImageElement;
        if (img.dataset['src']) {
          img.setAttribute('src', img.dataset['src']);
          img.removeAttribute('data-src');
        }
      }
    );
  }

  private setupProjectTextObserver(): void {
    // Observer para los textos de los proyectos
    const projectTextObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectElement = entry.target as HTMLElement;
            projectElement.classList.add('in-view');
          } else {
            // Opcional: remover la clase cuando sale del viewport
            const projectElement = entry.target as HTMLElement;
            projectElement.classList.remove('in-view');
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    // Observar todos los elementos de texto de los proyectos
    const projectTexts = this.el.nativeElement.querySelectorAll(
      '.name, .m2, .divisor'
    );

    projectTexts.forEach((textElement: Element) => {
      projectTextObserver.observe(textElement);
    });

    this.observers.push(projectTextObserver);
  }

  private setupHeroTextObserver(): void {
    // Observer para el texto del hero
    const heroTextObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const heroText = entry.target as HTMLElement;
            heroText.classList.add('in-view');
            heroTextObserver.unobserve(heroText); // Solo una vez
          }
        });
      },
      {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1,
      }
    );

    // Observar el texto del hero
    const heroText = this.el.nativeElement.querySelector('.hero-text');
    if (heroText) {
      heroTextObserver.observe(heroText);
    }

    this.observers.push(heroTextObserver);
  }
}
