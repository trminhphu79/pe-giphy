import { Provider } from "@angular/core";
import { AppConfigState } from "./model";
import { APP_CONFIG } from "./di";

export const    providerAppConfigInitialize = (config: AppConfigState): Provider => {
    return {
        provide: APP_CONFIG,
        useValue: config
    }
}