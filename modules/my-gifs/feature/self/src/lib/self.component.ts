import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-self',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './self.component.html',
  styleUrl: './self.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfComponent {}
