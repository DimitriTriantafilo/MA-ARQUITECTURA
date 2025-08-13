import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { WindowSizeService } from '../../window-size.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  private observers: IntersectionObserver[] = [];

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService,
    private router: Router
  ) {}

  get innerWidth() {
    return this.windowSize.innerWidth();
  }
  get innerHeight() {
    return this.windowSize.innerHeight();
  }

  getVerticalImageWidth(): number {
    // Calculamos el ancho real del contenedor (1/3 del ancho total menos gaps y padding)
    const containerWidth = Math.floor((this.innerWidth - 40) / 3); // 40px = padding + gaps
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
    return `https://res.cloudinary.com/dskkynwxb/c_scale,w_${width},h_${height}/q_auto:good/f_auto/${publicId}`;
  }

  // Funciones de navegación para proyectos
  navigateToReformaMigueletes() {
    this.router.navigate(['/reforma-migueletes']);
  }

  navigateToReformaBnb() {
    this.router.navigate(['/reforma-bnb']);
  }

  navigateToCasaIgor() {
    this.router.navigate(['/casa-igor']);
  }

  navigateToReformaSanfer() {
    this.router.navigate(['/reforma-sanfer']);
  }

  navigateToCasaWim() {
    this.router.navigate(['/casa-wim']);
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

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Delay para asegurar que el DOM esté completamente renderizado
      setTimeout(() => {
        this.setupIntersectionObservers();
      }, 100);
    }
  }

  ngOnDestroy() {
    this.observers.forEach((observer) => observer.disconnect());
  }

  private setupIntersectionObservers() {
    // Observer para proyectos horizontales
    const projectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectElement = entry.target as HTMLElement;
            const nameElement = projectElement.querySelector('.name');
            const divisorElement = projectElement.querySelector('.divisor');
            const m2Element = projectElement.querySelector('.m2');

            if (nameElement) {
              nameElement.classList.add('in-view');
            }
            if (divisorElement) {
              setTimeout(() => {
                divisorElement.classList.add('in-view');
              }, 100);
            }
            if (m2Element) {
              setTimeout(() => {
                m2Element.classList.add('in-view');
              }, 200);
            }

            // Solo ejecutar una vez
            projectObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Se activa cuando el 50% del elemento está visible
        rootMargin: '0px 0px -200px 0px', // Se activa cuando el elemento esté más arriba
      }
    );

    // Observer para proyectos verticales
    const verticalProjectObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectInfoElement = entry.target as HTMLElement;
            const nameElement = projectInfoElement.querySelector('.name');
            const divisorElement = projectInfoElement.querySelector('.divisor');
            const m2Element = projectInfoElement.querySelector('.m2');

            if (nameElement) {
              nameElement.classList.add('in-view');
            }
            if (divisorElement) {
              setTimeout(() => {
                divisorElement.classList.add('in-view');
              }, 100);
            }
            if (m2Element) {
              setTimeout(() => {
                m2Element.classList.add('in-view');
              }, 200);
            }

            // Solo ejecutar una vez
            verticalProjectObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observar elementos de proyectos horizontales
    const projectElements =
      this.el.nativeElement.querySelectorAll('.project-landig');
    projectElements.forEach((element: HTMLElement) => {
      projectObserver.observe(element);
    });

    // Observar elementos de información de proyectos verticales
    const projectInfoElements =
      this.el.nativeElement.querySelectorAll('.project-info');
    projectInfoElements.forEach((element: HTMLElement) => {
      verticalProjectObserver.observe(element);
    });

    // Animar el mensaje hero inmediatamente
    const heroElement =
      this.el.nativeElement.querySelector('.videoOverlay span');
    if (heroElement) {
      // Pequeño delay para que la animación sea visible
      setTimeout(() => {
        heroElement.classList.add('in-view');
      }, 500);
    }

    this.observers.push(projectObserver, verticalProjectObserver);
  }
}
