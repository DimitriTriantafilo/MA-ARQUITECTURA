import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    // Optimizaciones de rendimiento
    {
      provide: 'APP_CONFIG',
      useValue: {
        enablePerformanceOptimizations: !isDevMode(),
        enableLazyLoading: true,
        enableImageOptimization: true,
        enableVideoOptimization: true,
      },
    },
  ],
};
