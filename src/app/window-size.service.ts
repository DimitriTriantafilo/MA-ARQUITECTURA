import { Injectable, Signal, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class WindowSizeService {
  private _innerWidth = signal(0);
  private _innerHeight = signal(0);

  public readonly innerWidth: Signal<number> = this._innerWidth.asReadonly();
  public readonly innerHeight: Signal<number> = this._innerHeight.asReadonly();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this._innerWidth.set(window.innerWidth);
      this._innerHeight.set(window.innerHeight);
      window.addEventListener('resize', () => {
        this._innerWidth.set(window.innerWidth);
        this._innerHeight.set(window.innerHeight);
      });
    }
  }
}
