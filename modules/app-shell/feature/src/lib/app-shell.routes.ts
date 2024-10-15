import { Route } from '@angular/router';
import { LayoutComponent } from '@pe-giphy/layout';

export const appShellRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('@pe-giphy/pe-home-list').then(m => m.PeHomeListComponent)
            },
            {
                path: ':slug',
                loadComponent: () => import('@pe-giphy/pe-home-detail').then(m => m.PeHomeDetailComponent)
            }
        ]
    }
];
