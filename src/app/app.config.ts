import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { appShellRoutes } from '@pe-giphy/app-shell';
import { provideServiceWorker } from '@angular/service-worker';
import { provideHttpClient } from '@angular/common/http';
import { provideMultipleLanguage } from '@pe-giphy/language';
import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';

const ngZorroConfig: NzConfig = {
  theme: {
    'primaryColor': '#ffffffb3',
    'successColor': '#93D94E',
    'warningColor': '#F2AE30',
    'infoColor': '#41A0F2',
    'processingColor': '#0D0D0D',
    'errorColor': '#D92525'
  },
};


const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appShellRoutes, withViewTransitions()),
    provideHttpClient(),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideAnimations(),
    provideMultipleLanguage(),
    { provide: NZ_CONFIG, useValue: ngZorroConfig },
    { provide: NZ_ICONS, useValue: icons }
  ],
};
