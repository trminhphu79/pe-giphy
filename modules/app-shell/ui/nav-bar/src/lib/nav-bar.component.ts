import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pe-nav-bar',
  standalone: true,
  imports: [CommonModule, NzMenuModule, NzIconModule, TranslocoModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  MENU_ITEMS = signal([
    {
      label: 'MENU.HOME',
      active: true,
      icon: 'ic_home'
    },
    {
      label: 'MENU.TRENDING',
      active: false,
      icon: 'ic_trending'
    },
    {
      label: 'MENU.MY_GIFS',
      active: false,
      icon: 'ic_gif'
    },
    {
      label: 'MENU.MY_FAVORITES',
      active: false,
      icon: 'ic_favorite'
    }
  ])

  onClicked(item: { label: string, active: boolean, icon: string }, index: number) {
    item.active = true;
    this.MENU_ITEMS.update((items) => {
      items.forEach((item, idx) => {
        idx != index && (item.active = false);
      })

      return items;
    })
  }
}
