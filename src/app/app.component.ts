import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  isDevMode,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './@components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { CloudinaryModule } from '@cloudinary/ng';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, TopbarComponent, CloudinaryModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showWelcome = true;
  isMobile = false;
  loadVideo: boolean = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 600;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Optimize for production
      if (!isDevMode()) {
        // Production: Show splash screen briefly for branding
        this.showWelcome = true;
        setTimeout(() => {
          this.hideWelcome();
        }, 4000); // 4 segundos para una animación más lenta y fluida
        // Preload critical resources
        this.preloadCriticalResources();
      } else {
        // Development: Show splash screen for testing
        this.showWelcome = true;
        setTimeout(() => {
          this.hideWelcome();
        }, 4000);
      }
    }
  }

  private hideWelcome() {
    this.showWelcome = false;
  }

  private preloadCriticalResources(): void {
    // Preload critical images
    const criticalImages = ['assets/logo-blanco.webp', 'assets/ig-logo.png'];

    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  title = 'ma-arquitectura-landing';

  isHidden = false;
  lastScrollTop = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > this.lastScrollTop) {
      // Scrolling Down - Ocultar
      this.isHidden = true;
    } else {
      // Scrolling Up - Mostrar
      this.isHidden = false;
    }

    this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Evita valores negativos
  }
}

export interface Project {
  name: string;
  m2: string;
  location: string;
  showImg: string;
  mainFeature: {
    type: 'image' | 'video';
    link: string;
  };
  images: Image[];
  description?: string;
  year?: number;
  rowSpan?: number;
  colSpan?: number;
  plantaPreviaSrc?: string;
  plantaSrc?: string;
  style?: string;
}

export interface Image {
  rowSpan?: number;
  colSpan?: number;
  src: string;
  description?: string;
  featured?: boolean;
}
