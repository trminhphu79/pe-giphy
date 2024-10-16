import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink } from '@angular/router';
import { TuiDataList } from '@taiga-ui/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'pe-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslocoModule, TuiDataList, RouterLink, TuiIcon],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  MENU_ITEMS = signal([
    {
      label: 'MENU.HOME',
      active: true,
      icon: 'house',
      pageLink: '/'
    },
    {
      label: 'MENU.CHANNELS',
      active: false,
      icon: 'tv-minimal-play',
      pageLink: '/channels'
    },
    {
      label: 'MENU.MY_GIFS',
      active: false,
      icon: 'gift',
      pageLink: '/me'
    },
    // {
    //   label: 'MENU.MY_FAVORITES',
    //   active: false,
    //   icon: 'heart',
    //   pageLink: '/me/favorites'
    // }
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
