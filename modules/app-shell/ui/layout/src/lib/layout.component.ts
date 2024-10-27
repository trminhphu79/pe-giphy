import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from '@pe-giphy/main-view';
import { NavBarComponent } from '@pe-giphy/nav-bar';
import { TopBarComponent } from '@pe-giphy/top-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pe-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MainViewComponent,
    NavBarComponent,
    TopBarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
