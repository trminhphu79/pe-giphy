import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '@pe-giphy/top-bar';

@Component({
  selector: 'pe-main-view',
  standalone: true,
  imports: [CommonModule, TopBarComponent],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainViewComponent { }
