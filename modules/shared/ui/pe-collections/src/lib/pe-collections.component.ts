import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeCardComponent } from '@pe-giphy/ui/pe-card';
import { GIFObject } from 'giphy-api';

@Component({
  selector: 'pe-collections',
  standalone: true,
  imports: [
    CommonModule,
    PeCardComponent,
  ],
  templateUrl: './pe-collections.component.html',
  styleUrl: './pe-collections.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCollectionsComponent {
  dataSource = input<GIFObject[]>([]);
  titleClick = output<any>()
  favoriteClick = output<any>()
}
