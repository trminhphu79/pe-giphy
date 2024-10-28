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
  readonly dataSource = input<GIFObject[]>([]);
  readonly disableFooter = input<boolean>(false);
  readonly disableOverlayAction = input<boolean>(false);
  readonly disableOverlayTitle = input<boolean>(false);

  readonly titleClick = output<any>()
  readonly favoriteClick = output<any>();
}
