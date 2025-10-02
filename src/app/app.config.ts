import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { ConfirmationService, MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { CustomPreset } from './custom-preset';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    // PrimeNG
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: CustomPreset
      },
      ripple: true
    }),

    MessageService,
    ConfirmationService
  ]
};
