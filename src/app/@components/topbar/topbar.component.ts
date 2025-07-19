import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TranslationService } from '../../transltate';
import { TranslatePipe } from '../../transltate/translate.pipe';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [
    TranslatePipe,
    MatMenuModule,
    MatIconModule,
    CommonModule,
    RouterModule,
  ],
  animations: [
    trigger('languageChange', [
      state(
        'en',
        style({
          transform: 'translateY(0)',
        })
      ),
      state(
        'es',
        style({
          transform: 'translateY(-100%)',
        })
      ),
      transition('en <=> es', [animate('0.3s ease')]),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  isMobile: boolean = false;
  public translationService = inject(TranslationService);
  openMenu: boolean = false;
  private clickListener!: () => void;

  @ViewChild('burgerMenu') burgerMenuRef!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.setupClickListener();
  }

  ngOnDestroy() {
    // Limpiar el listener cuando el componente se destruya
    if (this.clickListener) {
      this.clickListener();
    }
  }

  changeLanguage() {
    this.translationService.changeLanguage();
  }

  private setupClickListener() {
    // Usamos setTimeout para asegurarnos que la vista esté renderizada
    setTimeout(() => {
      this.clickListener = this.renderer.listen(
        'document',
        'click',
        (event: MouseEvent) => {
          if (!this.openMenu) return;

          const burgerMenu = this.burgerMenuRef?.nativeElement;
          const menuButton = document.querySelector('.menu-container button');

          // Verificamos si el click fue fuera del menú y del botón
          const clickedOutside = !burgerMenu?.contains(event.target);

          if (clickedOutside) {
            this.openMenu = false;
          }
        }
      );
    });
  }
  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.openMenu = !this.openMenu;
  }
  scrollToItem(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });

      // Asegúrate de que se ajuste el scroll en caso de que haya un encabezado fijo
      const headerOffset = 0; // Cambia este valor según la altura de tu encabezado
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}
