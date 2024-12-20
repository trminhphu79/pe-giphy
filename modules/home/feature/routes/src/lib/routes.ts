import { Route } from "@angular/router";

export const homeRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import("@pe-giphy/pe-home-list").then((c) => c.PeHomeListComponent)
    },
    {
        path: 'gif/:slug',
        loadComponent: () => import("@pe-giphy/pe-home-detail").then((c) => c.PeHomeDetailComponent)
    },
    {
        path: 'gif2',
        loadComponent: () => import("@pe-giphy/home-test").then((c) => c.HomeTestComponent)
    }
]