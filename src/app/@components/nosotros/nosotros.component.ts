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

    // Activar el efecto del parallax 2 inmediatamente al cargar el componente
    setTimeout(() => {
      const parallax2Image = document.querySelector('.profile-img2');
      if (parallax2Image) {
        parallax2Image.classList.add('parallax2-effect');
      }
    }, 100); // Pequeño delay para asegurar que el DOM esté listo
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

    // Efecto para parallax 2 (imagen del estudio)
    const parallax2Image = document.querySelector('.profile-img2');
    if (parallax2Image) {
      const rect = parallax2Image.getBoundingClientRect();
      const offset = rect.top - window.innerHeight;
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (isVisible) {
        parallax2Image.classList.add('parallax2-effect');
      } else {
        parallax2Image.classList.remove('parallax2-effect');
      }
    }
  }

  getOptimizedImageUrl(
    publicId: string,
    width: number,
    height: number
  ): string {
    // Usar mejor calidad para todas las pantallas
    const quality = 'q_auto:best';
    return `https://res.cloudinary.com/dskkynwxb/c_scale,w_${width},h_${height}/${quality}/f_auto,fl_force_strip,fl_progressive/${publicId}`;
  }

  getVerticalImageWidth(): number {
    // Para profile-img2, calculamos el ancho basado en el contenedor disponible
    if (this.innerWidth <= 600) {
      // En móvil, usar el ancho completo menos padding
      return Math.min(this.innerWidth - 40, 800); // Aumentado para mejor calidad
    } else if (this.innerWidth <= 900) {
      // En pantallas web pequeñas, usar 50% del ancho disponible
      const containerWidth = Math.floor(this.innerWidth * 0.5);
      return Math.min(containerWidth, 700);
    } else if (this.innerWidth <= 1200) {
      // En pantallas web medianas, usar 45% del ancho
      const containerWidth = Math.floor(this.innerWidth * 0.45);
      return Math.min(containerWidth, 800);
    } else {
      // En desktop grande, usar 40% del ancho
      const containerWidth = Math.floor(this.innerWidth * 0.4);
      return Math.min(containerWidth, 900);
    }
  }

  getVerticalImageHeight(): number {
    // Para profile-img2, calculamos la altura basada en la proporción original de la imagen
    const containerWidth = this.getVerticalImageWidth();
    // Usar proporción 3:2 (más natural para fotos de estudio apaisadas)
    return Math.floor(containerWidth * 0.667); // 2/3 = 0.667
  }

  getProfileImageWidth(): number {
    // Para profile-img, usamos el 30% del ancho de la pantalla (como en el CSS)
    if (this.innerWidth <= 600) {
      // En móvil, aumentamos el ancho para mejor calidad
      return 400; // Aumentado para mejor calidad
    } else {
      const containerWidth = Math.floor(this.innerWidth * 0.3);
      // Limitamos el ancho máximo para optimizar el consumo de red
      return Math.min(containerWidth, 600);
    }
  }

  getProfileImageHeight(): number {
    // Para profile-img, calculamos una altura proporcional
    // Usamos una relación de aspecto típica de retrato
    const containerWidth = this.getProfileImageWidth();
    // Relación de aspecto 4:3 (más natural para fotos de perfil)
    return Math.floor(containerWidth * 1.33); // 4/3 = 1.33
  }
}
