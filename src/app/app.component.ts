import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './@components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { CloudinaryModule } from '@cloudinary/ng';
import { TranslatePipe } from './transltate/translate.pipe';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    TopbarComponent,
    CloudinaryModule,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showWelcome = true;
  isMobile = false;
  loadVideo: boolean = false;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 600;
    }
    setTimeout(() => {
      this.showWelcome = false;
    }, 3500); // Se oculta después de la animación
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
}

export interface Image {
  rowSpan?: number;
  colSpan?: number;
  src: string;
  description?: string;
  featured?: boolean;
}
