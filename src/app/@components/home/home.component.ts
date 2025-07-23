import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public innerWidth: number = 0;
  public innerHeight: number = 0;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
      this.innerHeight = window.innerHeight;
    }
  }
}
