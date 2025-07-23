import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import { TranslatePipe } from '../../transltate/translate.pipe';
import { isPlatformBrowser } from '@angular/common';
import { WindowSizeService } from '../../window-size.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  imports: [TranslatePipe],
  standalone: true, // Make sure this is set if you're using standalone components
})
export class NosotrosComponent implements OnInit {
  public innerWidth: number;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService
  ) {
    this.innerWidth = this.windowSize.innerWidth();
  }

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
}
