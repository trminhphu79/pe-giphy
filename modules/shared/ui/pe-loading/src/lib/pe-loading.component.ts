import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pe-loading.component.html',
  styleUrl: './pe-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeLoadingComponent {}
