import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-privacy-friendly-video',
  standalone: true,
  imports: [CommonModule, SafePipe],
  template: `
    <div class="video-container" [class.loaded]="videoLoaded">
      <!-- Placeholder mientras carga -->
      <div *ngIf="!videoLoaded" class="video-placeholder">
        <div class="placeholder-content">
          <div class="play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p class="placeholder-text">Cargando video...</p>
        </div>
      </div>

      <!-- Video de YouTube -->
      <iframe
        *ngIf="showVideo"
        [src]="videoUrl | safe"
        [title]="videoTitle"
        [attr.aria-label]="videoTitle"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
        (load)="onVideoLoad()"
        (error)="onVideoError()"
      ></iframe>
    </div>
  `,
  styles: [
    `
      .video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: #000;
        overflow: hidden;
        z-index: 0;
      }

      .video-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(45deg, #1a1a1a, #2a2a2a);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1;
      }

      .placeholder-content {
        text-align: center;
        color: white;
      }

      .play-button {
        width: 80px;
        height: 80px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        transition: all 0.3s ease;
      }

      .play-button svg {
        width: 40px;
        height: 40px;
        color: white;
      }

      .placeholder-text {
        font-size: 16px;
        margin: 0;
        opacity: 0.8;
      }

      .video-container.loaded .video-placeholder {
        display: none;
      }

      iframe {
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        border: none !important;
        object-fit: cover !important;
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
        -webkit-touch-callout: none !important;
        -webkit-tap-highlight-color: transparent !important;
        touch-action: none !important;
        cursor: default !important;
      }

      /* Ocultar elementos de YouTube que puedan aparecer */
      iframe::before,
      iframe::after {
        display: none !important;
      }

      /* Prevenir cualquier interacción con el iframe */
      iframe * {
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }

      /* Estilos adicionales para asegurar que no se pueda interactuar */
      .video-container iframe {
        pointer-events: none !important;
        user-select: none !important;
        -webkit-user-select: none !important;
        -moz-user-select: none !important;
        -ms-user-select: none !important;
      }

      /* Media queries para móviles */
      @media (max-width: 768px) {
        .video-container {
          height: 55vw;
          max-height: 100vh;
        }
      }

      /* Ocultar completamente la interfaz de YouTube */
      iframe {
        /* Ocultar controles de YouTube */
        &::-webkit-media-controls,
        &::-webkit-media-controls-panel,
        &::-webkit-media-controls-play-button,
        &::-webkit-media-controls-timeline,
        &::-webkit-media-controls-current-time-display,
        &::-webkit-media-controls-time-remaining-display,
        &::-webkit-media-controls-mute-button,
        &::-webkit-media-controls-volume-slider,
        &::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
      }

      /* Ocultar elementos específicos de YouTube */
      .video-container iframe {
        /* Ocultar botón de YouTube */
        &[src*='youtube'] {
          /* Ocultar logo de YouTube */
          &::after {
            content: none !important;
          }
        }
      }

      /* Ocultar cualquier overlay de YouTube */
      .video-container iframe + *,
      .video-container iframe ~ * {
        display: none !important;
      }

      /* Ocultar elementos específicos de YouTube usando CSS más agresivo */
      .video-container iframe {
        /* Ocultar cualquier elemento que YouTube pueda insertar */
        & > * {
          display: none !important;
        }
      }

      /* Ocultar controles de YouTube usando selectores más específicos */
      .video-container iframe[src*='youtube'] {
        /* Ocultar controles nativos de YouTube */
        &::-webkit-media-controls {
          display: none !important;
        }

        &::-webkit-media-controls-panel {
          display: none !important;
        }

        &::-webkit-media-controls-play-button {
          display: none !important;
        }

        &::-webkit-media-controls-timeline {
          display: none !important;
        }

        &::-webkit-media-controls-current-time-display {
          display: none !important;
        }

        &::-webkit-media-controls-time-remaining-display {
          display: none !important;
        }

        &::-webkit-media-controls-mute-button {
          display: none !important;
        }

        &::-webkit-media-controls-volume-slider {
          display: none !important;
        }

        &::-webkit-media-controls-fullscreen-button {
          display: none !important;
        }
      }
    `,
  ],
})
export class PrivacyFriendlyVideoComponent implements OnInit, OnDestroy {
  @Input() videoTitle: string = 'Video de presentación MA Arquitectura';
  @Input() autoplay: boolean = true;
  @Input() muted: boolean = false; // Cambiado a false para habilitar sonido
  @Input() loop: boolean = true;

  videoUrl: string = '';
  videoLoaded = false;
  showVideo = false;
  isInViewport = false;
  private intersectionObserver?: IntersectionObserver;
  private loadTimeout?: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.generateOptimizedVideoUrl();
      this.showVideo = true;
      this.cdr.detectChanges();

      // Prevenir interacciones con el iframe después de que se cargue
      setTimeout(() => {
        this.preventIframeInteractions();
      }, 1000);
    }
  }

  private preventIframeInteractions(): void {
    const iframe = this.elementRef.nativeElement.querySelector('iframe');
    if (iframe) {
      // Prevenir eventos de mouse y touch con event listeners pasivos
      iframe.addEventListener(
        'click',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        { passive: false, capture: true }
      );

      iframe.addEventListener(
        'mousedown',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        { passive: false, capture: true }
      );

      iframe.addEventListener(
        'mouseup',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        { passive: false, capture: true }
      );

      // Event listeners touch pasivos para evitar warnings
      iframe.addEventListener(
        'touchstart',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        { passive: false, capture: true }
      );

      iframe.addEventListener(
        'touchend',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        { passive: false, capture: true }
      );

      // Establecer atributos para prevenir interacciones
      iframe.setAttribute(
        'style',
        iframe.getAttribute('style') +
          '; pointer-events: none !important; user-select: none !important; -webkit-user-select: none !important; -moz-user-select: none !important; -ms-user-select: none !important; -webkit-touch-callout: none !important; -webkit-tap-highlight-color: transparent !important; touch-action: none !important; cursor: default !important;'
      );
    }
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.loadTimeout) {
      clearTimeout(this.loadTimeout);
    }
  }

  private generateOptimizedVideoUrl(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Usar video de YouTube con configuración optimizada para autoplay
    const youtubeVideoId = 'V8PNccdgA-g';

    // Parámetros para forzar autoplay y ocultar controles
    const params = [
      'autoplay=1',
      'mute=1', // Mute es necesario para autoplay en la mayoría de dispositivos
      'loop=1',
      `playlist=${youtubeVideoId}`,
      'controls=0', // Sin controles
      'showinfo=0', // Sin información
      'rel=0', // Sin videos relacionados
      'modestbranding=1', // Branding mínimo
      'playsinline=1', // Reproducción en línea
      'disablekb=1', // Deshabilitar teclado
      'fs=0', // Sin pantalla completa
      'iv_load_policy=3', // Sin anotaciones
      'cc_load_policy=0', // Sin subtítulos
      'color=white', // Color del reproductor
      'start=0', // Inicio desde 0
      'end=0', // Sin fin específico
      'enablejsapi=1', // Habilitar API
      'origin=' + encodeURIComponent(window.location.origin),
      'widget_referrer=' + encodeURIComponent(window.location.href),
      'autohide=1', // Ocultar controles automáticamente
      'wmode=transparent', // Modo transparente
      'allowfullscreen=0', // Sin pantalla completa
      'allowtransparency=true', // Permitir transparencia
      'vq=hd720', // Calidad HD
    ];

    this.videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?${params.join(
      '&'
    )}`;

    // Para YouTube, no necesitamos verificar URL ni soporte de video
    this.videoLoaded = true;
  }

  onVideoLoad(): void {
    this.videoLoaded = true;
    this.cdr.detectChanges();
  }

  onVideoError(): void {
    console.error('Error al cargar el video de YouTube');
    // En caso de error, mantener el placeholder
    this.videoLoaded = false;
    this.cdr.detectChanges();
  }
}
