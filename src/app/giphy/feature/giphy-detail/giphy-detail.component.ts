import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pe-giphy-detail',
  standalone: true,
  imports: [],
  templateUrl: './giphy-detail.component.html',
  styleUrl: './giphy-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiphyDetailComponent {

}
