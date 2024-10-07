import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: LayoutComponent,
        loadChildren: () => import('./giphy/giphy.routes').then((r) => r.giphyRoutes)
    }
];
