import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideClientHydration(),
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
