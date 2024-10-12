import { Route } from '@angular/router';
import { LayoutComponent } from '@pe-giphy/layout';

export const appShellRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('@pe-giphy/home').then(m => m.HomeComponent)
            }
        ]
    }
];
