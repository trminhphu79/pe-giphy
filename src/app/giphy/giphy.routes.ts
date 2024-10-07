import { Route } from "@angular/router";

export const giphyRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import('./feature/giphy-list/giphy-list.component').then((c) => c.GiphyListComponent)
    },
    {
        path: ':slug',
        loadComponent: () => import('./feature/giphy-detail/giphy-detail.component').then((c) => c.GiphyDetailComponent)
    }
]