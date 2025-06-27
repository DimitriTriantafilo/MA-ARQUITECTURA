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

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  imports: [TranslatePipe],
  standalone: true, // Make sure this is set if you're using standalone components
})
export class NosotrosComponent implements OnInit {
  public innerWidth: number = 0;

  constructor(
    private el: ElementRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
  }
}
