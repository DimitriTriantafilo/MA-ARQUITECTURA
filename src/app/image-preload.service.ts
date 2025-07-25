import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ImagePreloadService {
  private preloadedImages = new Set<string>();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  /**
   * Precarga una imagen específica
   */
  preloadImage(src: string): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    if (this.preloadedImages.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.preloadedImages.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  /**
   * Precarga múltiples imágenes
   */
  preloadImages(sources: string[]): Promise<void[]> {
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve([]);
    }

    return Promise.all(sources.map((src) => this.preloadImage(src)));
  }

  /**
   * Verifica si una imagen ya está precargada
   */
  isPreloaded(src: string): boolean {
    return this.preloadedImages.has(src);
  }

  /**
   * Limpia la caché de imágenes precargadas
   */
  clearCache(): void {
    this.preloadedImages.clear();
  }

  /**
   * Precarga imágenes críticas para el carrusel
   */
  preloadCarouselImages(imageSources: string[]): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    // Precarga las primeras 3 imágenes del carrusel
    const criticalImages = imageSources.slice(0, 3);
    this.preloadImages(criticalImages).catch(console.error);
  }
}
