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
      quality: 'q_auto:best', // Mejorado para mejor calidad
    });
  }

  /**
   * Genera URL para planos optimizada respetando la relación de aspecto
   */
  generatePlantaUrl(imageId: string, containerWidth?: number): string {
    // Para planos, optimizamos para mejor calidad y velocidad
    // Asegurar que el width sea siempre un entero para evitar problemas de carga
    const width = containerWidth
      ? Math.floor(Math.min(containerWidth, 1200))
      : 600;

    return this.generateImageUrl(imageId, {
      width: width,
      crop: 'c_fill,g_auto', // Mantener proporciones y evitar decimales
      quality: 'q_auto:good', // Balance entre calidad y velocidad
      format: 'f_auto', // Formato automático (WebP si es compatible)
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
    const optimizedWidth = Math.min(width, 800); // Aumentado para mejor calidad

    return this.generateImageUrl(imageId, {
      width: optimizedWidth,
      crop: 'c_fill,g_auto',
      quality: 'q_auto:best', // Mejorado para mejor calidad
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

  /**
   * Genera URL optimizada para videos de Cloudinary
   */
  generateVideoUrl(
    videoId: string,
    options: {
      quality?: string;
      format?: string;
      version?: string;
      width?: number;
      height?: number;
      bitrate?: string;
    } = {}
  ): string {
    const {
      quality = 'q_auto:good',
      format = 'f_auto',
      version = 'v1756439162',
      width = 1280,
      height = 720,
      bitrate = 'br_800k',
    } = options;

    // Los videos están en el cloud correcto
    const videoCloudUrl = 'https://res.cloudinary.com/dca5zr0rl/video/upload';

    // Optimizaciones para landing page - máximo 720p, bitrate reducido
    const optimizations = [
      `c_scale,w_${width},h_${height}`,
      bitrate,
      quality,
      format,
      'fl_progressive',
      'fl_attachment:Estudio_MA_v4_optimized',
    ].join(',');

    return `${videoCloudUrl}/${optimizations}/${version}/${videoId}.mp4`;
  }

  /**
   * Genera URL ultra-optimizada para videos de landing page
   * Cumple estándares de la industria 2025
   */
  generateOptimizedVideoUrl(
    videoId: string,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: string;
      bitrate?: string;
    } = {}
  ): string {
    const {
      maxWidth = 960, // Reducido de 1280 a 960 para mejor compresión
      maxHeight = 540, // Reducido de 720 a 540
      quality = 'q_auto:low',
      bitrate = 'br_400k', // Reducido de 600k a 400k
    } = options;

    const videoCloudUrl = 'https://res.cloudinary.com/dca5zr0rl/video/upload';

    // Optimizaciones ultra-agresivas para cumplir estándares
    const optimizations = [
      `c_scale,w_${maxWidth},h_${maxHeight}`,
      bitrate,
      quality,
      'f_auto',
      'fl_progressive', // Mejor compresión progresiva
    ].join(',');

    return `${videoCloudUrl}/${optimizations}/v1756439162/${videoId}.mp4`;
  }

  /**
   * Genera URL para video móvil optimizado
   * Cumple estándares móviles 2025
   */
  generateMobileVideoUrl(
    videoId: string,
    options: {
      quality?: string;
      bitrate?: string;
    } = {}
  ): string {
    const { quality = 'q_auto:low', bitrate = 'br_250k' } = options; // Reducido de 400k a 250k

    const videoCloudUrl = 'https://res.cloudinary.com/dca5zr0rl/video/upload';

    // Optimizaciones ultra-agresivas para móvil
    const optimizations = [
      'c_scale,w_480,h_270', // Reducido de 640x360 a 480x270
      bitrate,
      quality,
      'f_auto',
      'fl_progressive',
    ].join(',');

    return `${videoCloudUrl}/${optimizations}/v1756439162/${videoId}.mp4`;
  }

  /**
   * Genera URL de emergencia para conexiones lentas
   * Cumple estándares de conexiones lentas 2025
   */
  generateEmergencyVideoUrl(videoId: string): string {
    const videoCloudUrl = 'https://res.cloudinary.com/dca5zr0rl/video/upload';

    // Optimizaciones ultra-agresivas para conexiones lentas
    const optimizations = [
      'c_scale,w_320,h_180', // Reducido a 320x180 para máxima compresión
      'br_100k', // Reducido a 100kbps
      'q_auto:low',
      'f_auto',
      'fl_progressive',
    ].join(',');

    return `${videoCloudUrl}/${optimizations}/v1756439162/${videoId}.mp4`;
  }

  /**
   * Genera URL con formato WebM para navegadores modernos
   * Mejor compresión que MP4
   */
  generateWebMVideoUrl(
    videoId: string,
    options: {
      maxWidth?: number;
      maxHeight?: number;
      quality?: string;
      bitrate?: string;
    } = {}
  ): string {
    const {
      maxWidth = 960,
      maxHeight = 540,
      quality = 'q_auto:low',
      bitrate = 'br_300k', // WebM es más eficiente, podemos usar bitrate más bajo
    } = options;

    const videoCloudUrl = 'https://res.cloudinary.com/dca5zr0rl/video/upload';

    // Optimizaciones para WebM
    const optimizations = [
      `c_scale,w_${maxWidth},h_${maxHeight}`,
      bitrate,
      quality,
      'f_webm', // Formato WebM específico
      'fl_progressive',
    ].join(',');

    return `${videoCloudUrl}/${optimizations}/v1756439162/${videoId}.webm`;
  }
}
