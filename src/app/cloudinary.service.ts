import { Injectable } from '@angular/core';
import { Cloudinary, CloudinaryImage } from '@cloudinary/url-gen';
import { fill, scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { quality } from '@cloudinary/url-gen/actions/delivery';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  private cld: Cloudinary;

  constructor() {
    this.cld = new Cloudinary({
      cloud: {
        cloudName: 'dskkynwxb',
      },
      url: {
        secure: true,
      },
    });
  }

  // Extrae el public ID de una URL de Cloudinary
  private extractPublicId(fullUrl: string): string {
    try {
      const url = new URL(fullUrl);
      const pathParts = url.pathname.split('/');
      const uploadIndex = pathParts.indexOf('upload');

      if (uploadIndex === -1 || uploadIndex >= pathParts.length - 2) {
        return fullUrl; // Si no es URL válida de Cloudinary
      }

      return pathParts[uploadIndex + 2].split('.')[0];
    } catch {
      return fullUrl; // Si no es URL válida
    }
  }

  // Optimiza imagen para vista previa (proyectos)
  getOptimizedThumbnail(fullUrl: string): string {
    const publicId = this.extractPublicId(fullUrl);
    return this.cld
      .image(publicId)
      .resize(fill().width(500).height(500).gravity('auto'))
      .delivery(quality('auto:good'))
      .format('auto')
      .toURL();
  }

  // Optimiza imagen para vista detallada
  getOptimizedDetailImage(fullUrl: string): string {
    const publicId = this.extractPublicId(fullUrl);
    return this.cld
      .image(publicId)
      .resize(scale().width(1200))
      .delivery(quality('auto:best'))
      .format('auto')
      .toURL();
  }

  // Para imágenes en galería
  getOptimizedGalleryImage(fullUrl: string, width: number = 800): string {
    const publicId = this.extractPublicId(fullUrl);
    return this.cld
      .image(publicId)
      .resize(scale().width(width))
      .delivery(quality('auto:good'))
      .format('auto')
      .resize(scale().width(width))
      .toURL();
  }
}
