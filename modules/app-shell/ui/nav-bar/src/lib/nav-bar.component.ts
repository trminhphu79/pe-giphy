import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TuiDataList } from '@taiga-ui/core';
import { TuiIcon } from '@taiga-ui/core';

@Component({
  selector: 'pe-nav-bar',
  standalone: true,
  imports: [CommonModule, TranslocoModule, TuiDataList, RouterLink, TuiIcon, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  MENU_ITEMS = signal([
    {
      label: 'MENU.HOME',
      icon: 'house',
      pageLink: '/'
    },
    // {
    //   label: 'MENU.CHANNELS',
    //   icon: 'tv-minimal-play',
    //   pageLink: '/channels'
    // },
    {
      label: 'MENU.MY_GIFS',
      icon: 'gift',
      pageLink: '/me'
    },
  ])


  ngOnInit() {
  }
}
