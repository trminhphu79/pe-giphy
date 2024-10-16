import { Route } from "@angular/router";

export const myGifsRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import("@pe-giphy/self").then((c) => c.SelfComponent)
    },
    {
        path: 'upload',
        loadComponent: () => import("@pe-giphy/upload").then((c) => c.UploadComponent)
    }
]