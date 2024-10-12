import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-main-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-view.component.html',
  styleUrl: './main-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainViewComponent {}
