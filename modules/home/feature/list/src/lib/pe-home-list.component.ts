import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeCardComponent } from "@pe-giphy/ui/pe-card";
import { PeSearchComponent } from "@pe-giphy/ui/pe-search";

@Component({
  selector: 'pe-pe-home-list',
  standalone: true,
  imports: [CommonModule, PeCardComponent, PeSearchComponent],
  templateUrl: './pe-home-list.component.html',
  styleUrl: './pe-home-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeHomeListComponent {
  items = signal([1, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5, 6, 7, 8, 9])
}
