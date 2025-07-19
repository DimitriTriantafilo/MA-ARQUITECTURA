import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './@components/topbar/topbar.component';
import { ProjectDisplayComponent } from './@components/project-display/project-display.component';
import { CommonModule } from '@angular/common';
import { NosotrosComponent } from './@components/nosotros/nosotros.component';
import { ProjectDetailDialogComponent } from './@components/project-detail-dialog/project-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { CloudinaryModule } from '@cloudinary/ng';
import { CloudinaryService } from './cloudinary.service';
import { TranslatePipe } from './transltate/translate.pipe';
import { FooterComponent } from './@components/footer/footer.component';
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

  // scrollToItem(elementId: string): void {
  //   const element = document.getElementById(elementId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth', block: 'start' });

  //     // Asegúrate de que se ajuste el scroll en caso de que haya un encabezado fijo
  //     const headerOffset = 0; // Cambia este valor según la altura de tu encabezado
  //     const elementPosition = element.getBoundingClientRect().top;
  //     const offsetPosition = elementPosition + window.scrollY - headerOffset;

  //     window.scrollTo({
  //       top: offsetPosition,
  //       behavior: 'smooth',
  //     });
  //   }
  // }

  // openProjectDetail(project: Project) {
  //   console.log(project);
  //   let dialogRef = this.dialog.open(ProjectDetailDialogComponent, {
  //     width: '100%',
  //     data: project,
  //     panelClass: 'full-width-dialog',
  //     maxWidth: '100%',
  //     enterAnimationDuration: '500ms',
  //     height: '100%',
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {});
  // }

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
