import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { WindowSizeService } from '../../window-size.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public windowSize: WindowSizeService
  ) {}

  get innerWidth() {
    return this.windowSize.innerWidth();
  }
  get innerHeight() {
    return this.windowSize.innerHeight();
  }
}
