import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CloudinaryService {
  private readonly CLOUDINARY_URL = 'https://res.cloudinary.com/dskkynwxb';
  private readonly CLOUDINARY_CLOUD_NAME = 'dskkynwxb';

  /**
   * Genera una URL optimizada de Cloudinary para imágenes
   */
  generateImageUrl(
    imageId: string,
    options: {
      width?: number;
      height?: number;
      quality?: string;
      format?: string;
      crop?: string;
    } = {}
  ): string {
    const {
      width,
      height,
      quality = 'q_auto:good',
      format = 'f_auto',
      crop = 'c_fill,g_auto',
    } = options;

    let url = `${this.CLOUDINARY_URL}/${crop}`;

    if (width && height) {
      url += `,h_${height},w_${width}`;
    } else if (width) {
      url += `,w_${width}`;
    } else if (height) {
      url += `,h_${height}`;
    }

    url += `/${quality}/${format}/${imageId}`;

    return url;
  }

  /**
   * Genera URL para imagen de fondo responsiva optimizada
   */
  generateBackgroundUrl(
    imageId: string,
    width: number,
    height: number
  ): string {
    // Usa el ancho real del viewport para optimizar el tamaño
    const optimizedWidth = Math.min(width, 1920); // Máximo 1920px para evitar archivos muy grandes
    const optimizedHeight = Math.min(height, 1080); // Máximo 1080px

    return this.generateImageUrl(imageId, {
      width: optimizedWidth,
      height: optimizedHeight,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:best',
    });
  }

  /**
   * Genera URL para imagen de galería optimizada
   */
  generateGalleryUrl(imageId: string, containerWidth?: number): string {
    // Si tenemos el ancho del contenedor, lo usamos para optimizar
    const size = containerWidth ? Math.min(containerWidth, 800) : 550;

    return this.generateImageUrl(imageId, {
      width: size,
      height: size,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:good',
    });
  }

  /**
   * Genera URL para imagen de proyecto destacado optimizada
   */
  generateFeaturedUrl(imageId: string, viewportWidth?: number): string {
    // Usa el ancho del viewport para optimizar el tamaño
    const width = viewportWidth ? Math.min(viewportWidth, 1200) : 1200;
    const height = Math.round(width * 0.6); // Proporción 5:3

    return this.generateImageUrl(imageId, {
      width,
      height,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:best',
    });
  }

  /**
   * Genera URL para imagen móvil optimizada
   */
  generateMobileUrl(imageId: string, width: number): string {
    // Para móvil, usamos el ancho real del dispositivo
    const optimizedWidth = Math.min(width, 600); // Máximo 600px para móvil

    return this.generateImageUrl(imageId, {
      width: optimizedWidth,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:good',
    });
  }

  /**
   * Genera URL para imagen de carrusel optimizada
   */
  generateCarouselUrl(
    imageId: string,
    containerWidth?: number,
    containerHeight?: number
  ): string {
    // Usa las dimensiones reales del contenedor del carrusel
    const width = containerWidth ? Math.min(containerWidth, 1200) : 1200;
    const height = containerHeight ? Math.min(containerHeight, 800) : 800;

    return this.generateImageUrl(imageId, {
      width,
      height,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:best',
    });
  }

  /**
   * Genera URL para thumbnail optimizado
   */
  generateThumbnailUrl(imageId: string, size: number = 200): string {
    return this.generateImageUrl(imageId, {
      width: size,
      height: size,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:low',
    });
  }

  /**
   * Genera URL para imagen con lazy loading progresivo
   */
  generateProgressiveUrl(
    imageId: string,
    width: number,
    height: number
  ): string {
    return (
      this.generateImageUrl(imageId, {
        width,
        height,
        crop: 'c_fill,g_auto',
        quality: 'q_auto:good',
      }) + ',fl_progressive'
    );
  }

  /**
   * Genera URL para imagen con ancho responsivo
   */
  generateResponsiveUrl(
    imageId: string,
    viewportWidth: number,
    maxWidth: number = 1920
  ): string {
    const optimizedWidth = Math.min(viewportWidth, maxWidth);

    return this.generateImageUrl(imageId, {
      width: optimizedWidth,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:good',
    });
  }
}
