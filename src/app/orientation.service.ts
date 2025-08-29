import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrientationService {

  constructor() { }

  /**
   * Checks if the device is in landscape orientation
   */
  isLandscape(): boolean {
    if (typeof window === 'undefined') return false;
    
    // Check if screen orientation API is available
    if (screen.orientation) {
      return screen.orientation.type.includes('landscape');
    }
    
    // Fallback to window dimensions
    return window.innerWidth > window.innerHeight;
  }

  /**
   * Checks if the device is mobile
   */
  isMobileDevice(): boolean {
    if (typeof window === 'undefined') return false;

    // Detectar dispositivos móviles por User Agent
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA =
      /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
        userAgent
      );

    // Detectar por características táctiles
    const hasTouchScreen =
      'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Detectar por tamaño de pantalla (más restrictivo para escritorio)
    const isSmallScreen = window.innerWidth <= 768;

    // Detectar por densidad de píxeles (dispositivos móviles suelen tener alta densidad)
    const isHighDPI = window.devicePixelRatio > 1;

    // Combinar múltiples indicadores para mayor precisión
    return (
      (isMobileUA && hasTouchScreen) ||
      (isSmallScreen && hasTouchScreen && isHighDPI)
    );
  }

  /**
   * Gets the current orientation type
   */
  getOrientation(): 'portrait' | 'landscape' {
    return this.isLandscape() ? 'landscape' : 'portrait';
  }
}
