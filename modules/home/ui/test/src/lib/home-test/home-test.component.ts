import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-home-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-test.component.html',
  styleUrl: './home-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTestComponent {}
