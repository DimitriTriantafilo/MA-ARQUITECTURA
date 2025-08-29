import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CloudinaryService } from './cloudinary.service';

@Injectable({
  providedIn: 'root',
})
export class ImagePreloadService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cloudinaryService: CloudinaryService
  ) {}

  /**
   * Precarga una imagen de forma asíncrona
   */
  preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  }

  /**
   * Precarga múltiples imágenes
   */
  preloadImages(sources: string[]): Promise<void[]> {
    return Promise.all(sources.map((src) => this.preloadImage(src)));
  }

  /**
   * Precarga un video de forma asíncrona
   */
  preloadVideo(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!isPlatformBrowser(this.platformId)) {
        resolve();
        return;
      }

      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => resolve();
      video.onerror = () => reject(new Error(`Failed to load video: ${src}`));
      video.src = src;
    });
  }

  /**
   * Precarga recursos críticos para mejorar LCP
   */
  preloadCriticalResources(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Comentar la precarga del video hasta que se resuelva el problema
    // const videoUrl = this.cloudinaryService.generateVideoUrl(
    //   'Estudio_MA_v4_T.sin_cursiva_1_r887lz'
    // );

    // Usar fetch con prioridad baja para precargar el video
    // fetch(videoUrl, {
    //   method: 'HEAD',
    //   priority: 'low' as any,
    // }).catch(() => {
    //   // Ignorar errores de precarga
    // });

    // Precargar imágenes críticas
    const criticalImages = [
      'https://res.cloudinary.com/dskkynwxb/c_fill,g_auto,w_1920,h_1080/q_auto:good/f_auto/v1754942701/ipo4oxlyv7kdjxz4gt4r.jpg',
      'https://res.cloudinary.com/dskkynwxb/c_fill,g_auto,w_1920,h_1080/q_auto:good/f_auto/v1754489409/frmnllkumg1734je5ut2.jpg',
    ];

    criticalImages.forEach((src) => {
      this.preloadImage(src).catch(() => {
        // Ignorar errores de precarga
      });
    });
  }

  /**
   * Optimiza la carga de recursos usando Intersection Observer
   */
  lazyLoadResources(
    selector: string,
    callback: (element: Element) => void
  ): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1,
      }
    );

    const elements = document.querySelectorAll(selector);
    elements.forEach((element) => observer.observe(element));
  }
}
