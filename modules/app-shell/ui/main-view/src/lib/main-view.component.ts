import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '@pe-giphy/top-bar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'pe-main-view',
  standalone: true,
  imports: [CommonModule, TopBarComponent, RouterOutlet],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainViewComponent { }
