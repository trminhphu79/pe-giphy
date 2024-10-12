import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutComponent } from "@pe-giphy/layout";
import { provideRouter, RouterModule, withViewTransitions } from '@angular/router';
import { appShellRoutes } from "./app-shell.routes";

@NgModule({
    declarations: [],
    imports: [CommonModule, LayoutComponent],
    providers: [
        provideRouter(appShellRoutes, withViewTransitions())
    ],
    exports: [RouterModule],
})
export class AppShellModule {}