import { Route } from '@angular/router';
import { LayoutComponent } from '@pe-giphy/layout';

export const appShellRoutes: Route[] = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import("@pe-giphy/home-routes").then((routes) => routes.homeRoutes)
            },
            {
                path: 'channels',
                loadChildren: () => import('@pe-giphy/channels-routes').then((routes) => routes.channelRoutes)
            },
            {
                path: 'me',
                loadChildren: () => import('@pe-giphy/my-gifs-routes').then((c) => c.myGifsRoutes)
            },
        ]
    }
];
