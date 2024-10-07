import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MainSearchComponent } from '../../ui/main-search/main-search.component';

@Component({
  selector: 'pe-header',
  standalone: true,
  imports: [MainSearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
