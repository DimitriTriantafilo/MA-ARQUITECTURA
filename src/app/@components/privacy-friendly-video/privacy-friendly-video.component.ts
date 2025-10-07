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
    <!-- Contenedor principal del video -->
    <div class="video-wrapper">
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

        <!-- Botón de play manual (aparece cuando autoplay está bloqueado) -->
        <div
          *ngIf="showPlayButton && !isPlaying"
          class="manual-play-overlay"
          (click)="playVideo()"
        >
          <div class="manual-play-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p class="manual-play-text">Toca para reproducir</p>
        </div>

        <!-- Video de YouTube -->
        <iframe
          *ngIf="showVideo"
          [src]="videoUrl | safe"
          [title]="videoTitle"
          [attr.aria-label]="videoTitle"
          frameborder="0"
          modestbranding="1"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
          (load)="onVideoLoad()"
          (error)="onVideoError()"
        ></iframe>
      </div>

      <!-- Botón de volumen toggle - FUERA del contenedor del video -->
      <div
        class="volume-toggle"
        (click)="toggleVolume()"
        [class.muted]="isMuted"
        *ngIf="isPlaying"
      >
        <svg
          *ngIf="isMuted"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="volume-icon"
        >
          <path
            d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
          />
        </svg>
        <svg
          *ngIf="!isMuted"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="volume-icon"
        >
          <path
            d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
          />
        </svg>
      </div>
    </div>
  `,
  styles: [
    `
      /* Contenedor principal que envuelve todo */
      .video-wrapper {
        position: relative;
        width: 100%;
        height: 100dvh;
        overflow: hidden;
      }

      .video-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        overflow: hidden;
        z-index: 1;
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
        z-index: 2;
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

      /* Overlay de play manual (cuando autoplay está bloqueado) */
      .manual-play-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 100;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .manual-play-overlay:hover {
        background: rgba(0, 0, 0, 0.8);
      }

      .manual-play-overlay:hover .manual-play-button {
        transform: scale(1.1);
        background: rgba(255, 255, 255, 0.2);
      }

      .manual-play-button {
        width: 100px;
        height: 100px;
        background: rgba(255, 255, 255, 0.15);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
      }

      .manual-play-button svg {
        width: 50px;
        height: 50px;
        color: white;
        margin-left: 5px; /* Centrar visualmente el triángulo */
      }

      .manual-play-text {
        font-size: 18px;
        color: white;
        margin: 0;
        opacity: 0.9;
        font-weight: 500;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      /* Botón de volumen toggle - POSICIONADO FUERA del contenedor del video */
      .volume-toggle {
        position: absolute;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0.95);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 9999;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
        pointer-events: auto;
        /* Asegurar que esté por encima de todo */
        transform: translateZ(0);
        will-change: transform;
      }

      .volume-toggle:hover {
        background: rgba(0, 0, 0, 1);
        transform: scale(1.1) translateZ(0);
        box-shadow: 0 6px 25px rgba(0, 0, 0, 1);
      }

      /* CAMBIO: Fondo negro cuando está muted (sin rojo) */
      .volume-toggle.muted {
        background: rgba(0, 0, 0, 0.95);
      }

      .volume-toggle.muted:hover {
        background: rgba(0, 0, 0, 1);
      }

      .volume-icon {
        width: 24px;
        height: 24px;
        color: white;
        transition: all 0.3s ease;
        filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.8));
        pointer-events: none;
      }

      /* IFRAME CON Z-INDEX BAJO PARA QUE NO CUBRA EL BOTÓN */
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
        z-index: 1 !important;
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

      /* Media queries para móviles - CAMBIO: Botón más pequeño */
      @media (max-width: 768px) {
        .video-wrapper {
          height: 55vw;
          max-height: 100dvh;
        }

        .volume-toggle {
          bottom: 10px;
          right: 15px;
          width: 24px;
          height: 24px;
        }

        .volume-icon {
          width: 18px;
          height: 18px;
        }

        .manual-play-button {
          width: 80px;
          height: 80px;
        }

        .manual-play-button svg {
          width: 40px;
          height: 40px;
        }

        .manual-play-text {
          font-size: 16px;
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
  @Input() muted: boolean = true; // Cambiado a true para autoplay garantizado
  @Input() loop: boolean = true;

  videoUrl: string = '';
  videoLoaded = false;
  showVideo = false;
  isInViewport = false;
  isMuted = true; // Estado del mute
  showPlayButton = false; // Mostrar botón de play manual cuando autoplay falle
  isPlaying = false; // Estado de reproducción
  private intersectionObserver?: IntersectionObserver;
  private loadTimeout?: any;
  private youtubePlayer: any; // Player de YouTube API
  private autoplayAttempts = 0; // Contador de intentos de autoplay
  private readonly MAX_AUTOPLAY_ATTEMPTS = 3;

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

      // Cargar YouTube API y inicializar el player
      this.loadYouTubeAPI();
    }
  }

  private loadYouTubeAPI(): void {
    // Verificar si la API ya está cargada
    if ((window as any)['YT'] && (window as any)['YT'].Player) {
      this.initializeYouTubePlayer();
    } else {
      // Cargar la API de YouTube
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // Esperar a que la API esté lista
      (window as any)['onYouTubeIframeAPIReady'] = () => {
        this.initializeYouTubePlayer();
      };
    }
  }

  private initializeYouTubePlayer(): void {
    const iframe = this.elementRef.nativeElement.querySelector('iframe');
    if (iframe) {
      // Crear el player de YouTube
      this.youtubePlayer = new (window as any)['YT'].Player(iframe, {
        events: {
          onReady: (event: any) => {
            // El player está listo
            this.videoLoaded = true;
            this.cdr.detectChanges();

            // Intentar reproducir automáticamente
            this.attemptAutoplay();
          },
          onStateChange: (event: any) => {
            const YT = (window as any)['YT'];

            // Manejar cambios de estado del video
            if (event.data === YT.PlayerState.PLAYING) {
              this.isPlaying = true;
              this.showPlayButton = false; // Ocultar botón si está reproduciéndose
              this.videoLoaded = true;
              this.cdr.detectChanges();
            } else if (
              event.data === YT.PlayerState.PAUSED ||
              event.data === YT.PlayerState.CUED
            ) {
              this.isPlaying = false;

              // Si el video no está reproduciéndose después de un tiempo, mostrar botón
              setTimeout(() => {
                if (
                  !this.isPlaying &&
                  this.autoplayAttempts >= this.MAX_AUTOPLAY_ATTEMPTS
                ) {
                  this.showPlayButton = true;
                  this.cdr.detectChanges();
                }
              }, 2000);
            }
          },
        },
      });
    }
  }

  private attemptAutoplay(): void {
    if (
      !this.youtubePlayer ||
      this.autoplayAttempts >= this.MAX_AUTOPLAY_ATTEMPTS
    ) {
      this.showPlayButton = true;
      this.cdr.detectChanges();
      return;
    }

    this.autoplayAttempts++;

    try {
      // Intentar reproducir
      this.youtubePlayer.playVideo();

      // Verificar si está reproduciéndose después de un segundo
      setTimeout(() => {
        const playerState = this.youtubePlayer.getPlayerState();
        const YT = (window as any)['YT'];

        if (playerState !== YT.PlayerState.PLAYING) {
          // No está reproduciéndose, intentar de nuevo
          if (this.autoplayAttempts < this.MAX_AUTOPLAY_ATTEMPTS) {
            this.attemptAutoplay();
          } else {
            // Mostrar botón de play manual
            this.showPlayButton = true;
            this.cdr.detectChanges();
          }
        }
      }, 1000);
    } catch (error) {
      console.warn('Autoplay bloqueado, mostrando botón de play manual', error);
      this.showPlayButton = true;
      this.cdr.detectChanges();
    }
  }

  playVideo(): void {
    if (this.youtubePlayer && this.youtubePlayer.playVideo) {
      this.youtubePlayer.playVideo();
      this.showPlayButton = false;
      this.isPlaying = true;
      this.cdr.detectChanges();
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
    // Destruir el player de YouTube
    if (this.youtubePlayer && this.youtubePlayer.destroy) {
      this.youtubePlayer.destroy();
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

  toggleVolume(): void {
    this.isMuted = !this.isMuted;
    this.cdr.detectChanges();

    // USAR LA API DE YOUTUBE EN LUGAR DE CAMBIAR EL SRC
    if (this.youtubePlayer && this.youtubePlayer.setVolume) {
      if (this.isMuted) {
        // Poner mute: volumen 0
        this.youtubePlayer.setVolume(0);
        this.youtubePlayer.mute();
      } else {
        // Quitar mute: volumen 50 (valor medio)
        this.youtubePlayer.unMute();
        this.youtubePlayer.setVolume(50);
      }
    } else {
      // Fallback: si la API no está disponible, usar el método anterior
      const iframe = this.elementRef.nativeElement.querySelector('iframe');
      if (iframe) {
        const currentSrc = iframe.src;
        if (this.isMuted) {
          // Poner mute
          iframe.src = currentSrc.replace('mute=0', 'mute=1');
        } else {
          // Quitar mute
          iframe.src = currentSrc.replace('mute=1', 'mute=0');
        }
      }
    }
  }
}
