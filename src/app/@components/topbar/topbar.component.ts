import { Component, inject, OnInit } from '@angular/core';
import { TranslationService } from '../../transltate';
import { TranslatePipe } from '../../transltate/translate.pipe';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [TranslatePipe],
})
export class TopbarComponent implements OnInit {
  isMobile: boolean = false;
  private tranlationService = inject(TranslationService);
  constructor() {}

  ngOnInit() {}

  changeLanguage() {
    this.tranlationService.changeLanguage();
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
