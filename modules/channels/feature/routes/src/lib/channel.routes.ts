import { Route } from "@angular/router";

export const channelRoutes: Route[] = [
    {
        path: '',
        loadComponent: () => import("@pe-giphy/channels-list").then((c) => c.ChannelsListComponent)
    },
    {
        path: ':slug',
        loadComponent: () => import("@pe-giphy/channels-detail").then((c) => c.ChannelsDetailComponent)
    }
]