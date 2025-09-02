import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  VideoConfig,
  DEFAULT_VIDEO_CONFIG,
  MOBILE_VIDEO_CONFIG,
  PRODUCTION_VIDEO_CONFIG,
} from '../config/video.config';

export interface VideoLoadOptions {
  autoplay: boolean;
  muted: boolean;
  loop: boolean;
  quality: 'hd720' | 'hd1080' | 'auto';
  mobileOptimized: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class VideoLoadingService {
  private isMobile = false;
  private isIOS = false;
  private isAndroid = false;
  private isSafari = false;
  private isChrome = false;
  private config: VideoConfig = DEFAULT_VIDEO_CONFIG; // Inicializar con valor por defecto

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      // Primero detectar capacidades del dispositivo
      this.detectDeviceCapabilities();

      // Luego configurar según el dispositivo detectado
      this.config = this.isMobile ? MOBILE_VIDEO_CONFIG : DEFAULT_VIDEO_CONFIG;

      // En producción, usar configuración específica
      if (
        window.location.hostname !== 'localhost' &&
        window.location.hostname !== '127.0.0.1'
      ) {
        this.config = PRODUCTION_VIDEO_CONFIG;
      }
    } else {
      this.config = DEFAULT_VIDEO_CONFIG;
    }
  }

  private detectDeviceCapabilities(): void {
    const userAgent = navigator.userAgent.toLowerCase();

    // Detección de dispositivo móvil
    this.isMobile =
      /mobile|android|iphone|ipad|phone|blackberry|opera mini|windows phone/i.test(
        userAgent
      );

    // Detección de sistema operativo
    this.isIOS = /iphone|ipad|ipod/i.test(userAgent);
    this.isAndroid = /android/i.test(userAgent);

    // Detección de navegador
    this.isSafari = /safari/i.test(userAgent) && !/chrome/i.test(userAgent);
    this.isChrome = /chrome/i.test(userAgent);

    // Solo loggear si la configuración ya está disponible
    if (this.config && this.config.enableDebugLogging) {
      console.log('Capacidades del dispositivo detectadas:', {
        isMobile: this.isMobile,
        isIOS: this.isIOS,
        isAndroid: this.isAndroid,
        isSafari: this.isSafari,
        isChrome: this.isChrome,
        userAgent: userAgent,
        config: this.config,
      });
    }
  }

  generateYouTubeUrl(videoId: string, options: VideoLoadOptions): string {
    const baseParams = [
      `autoplay=${options.autoplay ? '1' : '0'}`,
      `mute=${options.muted ? '1' : '0'}`,
      `loop=${options.loop ? '1' : '0'}`,
      `playlist=${videoId}`,
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
      'origin=' +
        (isPlatformBrowser(this.platformId)
          ? encodeURIComponent(window.location.origin)
          : ''),
      'widget_referrer=' +
        (isPlatformBrowser(this.platformId)
          ? encodeURIComponent(window.location.href)
          : ''),
      'autohide=1', // Ocultar controles automáticamente
      'wmode=transparent', // Modo transparente
      'allowfullscreen=0', // Sin pantalla completa
      'allowtransparency=true', // Permitir transparencia
    ];

    // Parámetros específicos para móviles
    if (this.isMobile || options.mobileOptimized) {
      // Calidad optimizada para móviles
      const quality =
        options.quality === 'auto'
          ? this.config.youtubeSettings.mobileQuality
          : options.quality;
      baseParams.push(`vq=${quality}`);

      // Parámetros específicos para iOS
      if (this.isIOS) {
        baseParams.push('playsinline=1');

        // iOS requiere autoplay con mute para funcionar
        if (options.autoplay) {
          baseParams.push('autoplay=1');
          baseParams.push('mute=1'); // iOS siempre requiere mute para autoplay
          baseParams.push('playsinline=1');
        }
      }

      // Parámetros específicos para Android
      if (this.isAndroid) {
        if (options.autoplay) {
          baseParams.push('autoplay=1');
          baseParams.push('playsinline=1');
          // Android puede manejar autoplay mejor que iOS
          if (!options.muted) {
            baseParams.push('mute=0');
          }
        }
      }

      // Parámetros específicos para Safari
      if (this.isSafari) {
        baseParams.push('playsinline=1');

        // Safari en iOS tiene restricciones especiales
        if (this.isIOS) {
          if (options.autoplay) {
            // Safari iOS puede reproducir con autoplay si está mute
            baseParams.push('autoplay=1');
            baseParams.push('mute=1');
          }

          if (this.config.enableDebugLogging) {
            console.warn(
              'Safari iOS detectado. Configurando autoplay con mute para compatibilidad.'
            );
          }
        }
      }
    } else {
      // Parámetros para desktop
      const quality =
        options.quality === 'auto'
          ? this.config.youtubeSettings.desktopQuality
          : options.quality;
      baseParams.push(`vq=${quality}`);

      // Desktop puede manejar autoplay con sonido
      if (options.autoplay) {
        baseParams.push('autoplay=1');
        if (!options.muted) {
          baseParams.push('mute=0');
        }
      }
    }

    const url = `https://www.youtube.com/embed/${videoId}?${baseParams.join(
      '&'
    )}`;

    if (this.config.enableDebugLogging) {
      console.log('URL de YouTube generada:', url);
      console.log('Opciones aplicadas:', options);
      console.log('Dispositivo detectado:', {
        isMobile: this.isMobile,
        isIOS: this.isIOS,
        isAndroid: this.isAndroid,
        isSafari: this.isSafari,
        isChrome: this.isChrome,
      });
    }

    return url;
  }

  canAutoplayWithSound(): boolean {
    // Verificar si el dispositivo puede reproducir con sonido
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    // iOS y Safari tienen restricciones estrictas
    if (this.isIOS && this.isSafari) {
      return false;
    }

    // Android Chrome generalmente permite autoplay con sonido
    if (this.isAndroid && this.isChrome) {
      return true;
    }

    // Desktop generalmente permite autoplay con sonido
    return !this.isMobile;
  }

  getOptimalVideoSettings(): VideoLoadOptions {
    const canAutoplayWithSound = this.canAutoplayWithSound();

    return {
      autoplay: true,
      muted: !canAutoplayWithSound, // Mute solo si no se puede reproducir con sonido
      loop: true,
      quality: this.isMobile ? 'hd720' : 'hd1080',
      mobileOptimized: this.isMobile,
    };
  }

  // Método para verificar si el video se está cargando correctamente
  async checkVideoLoadability(videoId: string): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    return new Promise((resolve) => {
      const testIframe = document.createElement('iframe');
      testIframe.style.display = 'none';
      testIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1`;

      const timeout = setTimeout(() => {
        document.body.removeChild(testIframe);
        resolve(false);
      }, this.config.timeoutDuration);

      testIframe.onload = () => {
        clearTimeout(timeout);
        document.body.removeChild(testIframe);
        resolve(true);
      };

      testIframe.onerror = () => {
        clearTimeout(timeout);
        document.body.removeChild(testIframe);
        resolve(false);
      };

      document.body.appendChild(testIframe);
    });
  }

  // Método para obtener la configuración actual
  getConfig(): VideoConfig {
    return this.config;
  }

  // Método para verificar si estamos en producción
  isProduction(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    return (
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    );
  }
}
