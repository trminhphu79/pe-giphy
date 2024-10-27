import { inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandlerFn,
} from '@angular/common/http';
import { APP_CONFIG } from "@pe-giphy/app-config";

export function apiKeyIntorceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
    const appConfig = inject(APP_CONFIG);
    const modifiedReq = req.clone({
        setParams: {
            ...req.params.keys().reduce((params, key) => {
                params[key] = req.params.get(key)!;
                return params;
            }, {} as { [key: string]: string }),
            api_key: appConfig.apiKey,
        },
    });
    return next(modifiedReq);
}
