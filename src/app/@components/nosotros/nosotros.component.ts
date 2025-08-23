import { TranslatePipe } from '../../transltate/translate.pipe';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { WindowSizeService } from '../../window-size.service';
import { BreakpointService } from '../../breakpoint.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  imports: [TranslatePipe],
  standalone: true,
})
export class NosotrosComponent implements OnInit {
  get innerWidth() {
    return this.windowSize.innerWidth();
  }
  get innerHeight() {
    return this.windowSize.innerHeight();
  }

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService,
    public breakpoint: BreakpointService
  ) {}

  ngOnInit() {
    // Ya no es necesario asignar innerWidth manualmente
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const scrollY = window.scrollY;
    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

    const parallaxImages = document.querySelectorAll('.profile-img');
    parallaxImages.forEach((img) => {
      const rect = img.getBoundingClientRect();
      const offset = rect.top - window.innerHeight;

      if (offset < 0) {
        img.classList.add('parallax-effect');
      } else {
        img.classList.remove('parallax-effect');
      }
    });
  }

  getOptimizedImageUrl(
    publicId: string,
    width: number,
    height: number
  ): string {
    return `https://res.cloudinary.com/dskkynwxb/c_scale,w_${width},h_${height}/q_auto:good/f_auto/${publicId}`;
  }

  getVerticalImageWidth(): number {
    // Para profile-img2, usamos un ancho fijo más pequeño en móvil
    if (this.innerWidth <= 600) {
      // En móvil, usamos un ancho fijo más pequeño para evitar pixelación
      return 300;
    } else {
      // En desktop, usamos el 35% del ancho de la pantalla
      const containerWidth = Math.floor(this.innerWidth * 0.35);
      return Math.min(containerWidth, 600);
    }
  }

  getVerticalImageHeight(): number {
    // Para profile-img2, calculamos una altura proporcional
    const containerWidth = this.getVerticalImageWidth();
    if (this.innerWidth <= 600) {
      // En móvil, usamos una relación de aspecto más cuadrada
      return Math.floor(containerWidth * 0.75); // 3:4 ratio
    } else {
      // En desktop, usamos relación de aspecto 16:9
      return Math.floor(containerWidth * 0.5625); // 9/16 = 0.5625
    }
  }

  getProfileImageWidth(): number {
    // Para profile-img, usamos el 30% del ancho de la pantalla (como en el CSS)
    const containerWidth = Math.floor(this.innerWidth * 0.3);
    // Limitamos el ancho máximo para optimizar el consumo de red
    return Math.min(containerWidth, 600);
  }

  getProfileImageHeight(): number {
    // Para profile-img, calculamos una altura proporcional
    // Usamos una relación de aspecto típica de retrato
    const containerWidth = this.getProfileImageWidth();
    // Relación de aspecto 3:4 (más natural para fotos de perfil)
    return Math.floor(containerWidth * 1.33); // 4/3 = 1.33
  }
}
