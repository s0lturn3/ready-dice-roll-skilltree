import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { CustomPreset } from './custom-preset';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginGuard } from './shared/guards/login.guard';
import { authInterceptor } from './shared/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    [
      AuthGuard,
      LoginGuard
    ],
    provideHttpClient(
      withInterceptors([ authInterceptor ]),
    ),

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
