import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './@components/topbar/topbar.component';
import { CommonModule } from '@angular/common';
import { CloudinaryModule } from '@cloudinary/ng';
import { TranslatePipe } from './transltate/translate.pipe';
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
  loadVideo: boolean = false;
  constructor() {
    setTimeout(() => {
      this.showWelcome = false;
    }, 6000); // Se oculta después de 3 segundos
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
  description: string;
  rowSpan?: number;
  colSpan?: number;
}

export interface Image {
  rowSpan?: number;
  colSpan?: number;
  src: string;
  description?: string;
  featured?: boolean;
}
