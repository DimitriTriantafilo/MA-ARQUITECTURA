import { Injectable, Signal, computed } from '@angular/core';
import { WindowSizeService } from './window-size.service';

@Injectable({ providedIn: 'root' })
export class BreakpointService {
  constructor(private windowSize: WindowSizeService) {}

  public readonly isMobile: Signal<boolean> = computed(
    () => this.windowSize.innerWidth() <= 600
  );

  public readonly isTablet: Signal<boolean> = computed(
    () =>
      this.windowSize.innerWidth() > 600 && this.windowSize.innerWidth() <= 1024
  );

  public readonly isDesktop: Signal<boolean> = computed(
    () => this.windowSize.innerWidth() > 1024
  );

  public readonly isMobileOrTablet: Signal<boolean> = computed(
    () => this.windowSize.innerWidth() <= 1024
  );
}
