import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-pe-home-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pe-home-detail.component.html',
  styleUrl: './pe-home-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeHomeDetailComponent {}
