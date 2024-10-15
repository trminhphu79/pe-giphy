import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pe-card.component.html',
  styleUrl: './pe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCardComponent {}
