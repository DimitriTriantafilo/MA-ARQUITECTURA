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
    `,
  ],
})
export class PrivacyFriendlyVideoComponent implements OnInit, OnDestroy {
  @Input() videoTitle: string = 'Video de presentación MA Arquitectura';
  @Input() autoplay: boolean = true;
  @Input() muted: boolean = true;
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
      console.log('Inicializando componente de video...');
      this.generateOptimizedVideoUrl();
      this.showVideo = true;
      this.cdr.detectChanges();
      console.log('Video mostrado, URL:', this.videoUrl);

      // Prevenir interacciones con el iframe después de que se cargue
      setTimeout(() => {
        this.preventIframeInteractions();
      }, 1000);
    }
  }

  private preventIframeInteractions(): void {
    const iframe = this.elementRef.nativeElement.querySelector('iframe');
    if (iframe) {
      // Prevenir eventos de mouse y touch
      iframe.addEventListener(
        'click',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        true
      );

      iframe.addEventListener(
        'mousedown',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        true
      );

      iframe.addEventListener(
        'mouseup',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        true
      );

      iframe.addEventListener(
        'touchstart',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        true
      );

      iframe.addEventListener(
        'touchend',
        (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          return false;
        },
        true
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

    // Usar video de YouTube con la URL proporcionada
    const youtubeVideoId = 'V8PNccdgA-g';
    this.videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&color=white&start=0&end=0&vq=hd720`;

    // Para YouTube, no necesitamos verificar URL ni soporte de video
    this.videoLoaded = true;
  }

  onVideoLoad(): void {
    console.log('Video de YouTube cargado exitosamente');
    this.videoLoaded = true;
    this.cdr.detectChanges();
  }

  onVideoError(): void {
    // En caso de error, mantener el placeholder
    this.videoLoaded = false;
    this.cdr.detectChanges();
  }
}
