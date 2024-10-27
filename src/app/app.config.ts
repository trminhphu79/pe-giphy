import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom, APP_INITIALIZER } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { appShellRoutes } from '@pe-giphy/app-shell';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideMultipleLanguage } from '@pe-giphy/language';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { environment } from 'src/environments/environment';
import { providerAppConfigInitialize } from "@pe-giphy/app-config";
import { apiKeyIntorceptor } from "@pe-giphy/utils";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appShellRoutes, withComponentInputBinding()),
    provideHttpClient(
      withInterceptors([apiKeyIntorceptor])
    ),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    provideMultipleLanguage(),
    NG_EVENT_PLUGINS,
    providerAppConfigInitialize(environment),
  ],
};
