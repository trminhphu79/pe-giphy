import { InjectionToken } from '@angular/core'
import { AppState } from './model'
import { APP_STATE_BLANK } from './constant'

export const APP_STATE_TOKEN = new InjectionToken<AppState>('AppState', {
    providedIn: 'root',
    factory: () => APP_STATE_BLANK
})
