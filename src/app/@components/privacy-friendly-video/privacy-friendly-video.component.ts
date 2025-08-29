import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
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
        *ngIf="showVideo && isInViewport"
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
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        object-fit: cover;
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
      this.setupIntersectionObserver();
      // Mostrar el video después de un pequeño delay para mejorar UX
      setTimeout(() => {
        this.showVideo = true;
        this.cdr.detectChanges();
        console.log('Video mostrado, URL:', this.videoUrl);

        // Establecer un timeout para detectar si el video no carga
        this.loadTimeout = setTimeout(() => {
          if (!this.videoLoaded) {
            console.warn('Timeout: El video no se cargó en 10 segundos');
            this.onVideoError();
          }
        }, 10000);
      }, 100);
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
    this.videoUrl = `https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&loop=1&playlist=${youtubeVideoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;

    console.log('URL del video de YouTube generada:', this.videoUrl);
    console.log('Video ID:', youtubeVideoId);

    // No necesitamos verificar URL ni soporte de video para YouTube
    this.videoLoaded = true;
  }

  private tryAlternativeVideoUrls(): void {
    // Para YouTube, no necesitamos URLs alternativas
    console.log('YouTube no requiere URLs alternativas');
  }

  private testVideoUrl(): void {
    if (!this.videoUrl) return;

    // Hacer una petición HEAD para verificar si el video existe
    fetch(this.videoUrl, { method: 'HEAD' })
      .then((response) => {
        if (!response.ok) {
          console.error('Video URL no accesible:', this.videoUrl);
          console.error('Status:', response.status, response.statusText);
          // Intentar URLs alternativas si la principal falla
          setTimeout(() => {
            this.tryAlternativeVideoUrls();
          }, 1000);
        } else {
          console.log('Video URL accesible:', this.videoUrl);
        }
      })
      .catch((error) => {
        console.error('Error verificando video URL:', error);
        // Intentar URLs alternativas si hay error de red
        setTimeout(() => {
          this.tryAlternativeVideoUrls();
        }, 1000);
      });
  }

  private setupIntersectionObserver(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.isInViewport = true;
            this.cdr.detectChanges();
          } else {
            this.isInViewport = false;
            this.cdr.detectChanges();
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.1,
      }
    );

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  onVideoLoad(): void {
    console.log('Video de YouTube cargado exitosamente');
    this.videoLoaded = true;
    this.cdr.detectChanges();
  }

  onVideoError(): void {
    console.error('Error al cargar el video de YouTube');
    console.error('Video URL:', this.videoUrl);

    // En caso de error, mostrar el placeholder
    this.videoLoaded = false;
    this.cdr.detectChanges();
  }
}
