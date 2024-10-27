import { Route } from "@angular/router";

export const channelRoutes: Route[] = [
    {
        path: ':slug',
        loadComponent: () => import("@pe-giphy/channels-detail").then((c) => c.ChannelsDetailComponent)
    }
]