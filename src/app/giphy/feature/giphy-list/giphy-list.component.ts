import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pe-giphy-list',
  standalone: true,
  imports: [],
  templateUrl: './giphy-list.component.html',
  styleUrl: './giphy-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GiphyListComponent {

}
