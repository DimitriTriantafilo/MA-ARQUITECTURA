/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
(window as any)['__zone_symbol__PASSIVE_EVENTS'] = [
  'scroll',
  'touchstart',
  'touchmove',
];

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
