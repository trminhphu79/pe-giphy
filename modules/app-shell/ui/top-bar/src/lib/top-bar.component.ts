import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { TranslocoService } from "@jsverse/transloco";
import { TranslocoModule } from "@jsverse/transloco";
import { PeSearchComponent } from '@pe-giphy/ui/pe-search';
import { PeSearchData } from '@pe-giphy/ui/pe-search';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TUI_DARK_MODE, TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { AppStore } from "@pe-giphy/app-store";
@Component({
  selector: 'pe-top-bar',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    TuiIcon,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    RouterLink,
    NgOptimizedImage,
    TranslocoModule,
    TranslocoModule,
    PeSearchComponent,
    RouterLinkActive,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {

  private readonly router = inject(Router);

  protected readonly appStore = inject(AppStore);
  protected readonly darkMode = inject(TUI_DARK_MODE);

  protected userState = this.appStore.user;

  switchValue = signal(false);
  visible = false;
  protected readonly items: WritableSignal<any[]> = signal([
    {
      pageLink: 'me',
      label: "COMMON.LABEL.PROFILE",

    },
    {
      pageLink: 'logout',
      label: "COMMON.LABEL.LOGOUT",
    }
  ])

  translocoService: TranslocoService = inject(TranslocoService);
  searchChanges(event: PeSearchData) {
    console.log("PeSearchData: ", event)
  }

  clickAction(item: any) {
    switch (item.pageLink) {
      case 'me':
        this.router.navigate([item.pageLink])
        break;
      case 'logout':
        this.appStore.resetState({
          user: {
            avatarUrl: '',
            username: '',
            email: '',
            fullName: '',
            isLogin: false,
          }
        });
        break;
    }
  }

  register() {
    this.router.navigate(['/']);
    this.appStore.updateState({
      user: {
        isLogin: true,
        avatarUrl: 'https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/367735256_2400158307038395_7455402540095123111_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFpucHVmPlmdZqIJP7wD9THN64EtvPMcKw3rgS288xwrDu4Dj6NZaFhCAEgqzqYMCLL5Hp6CZdapNTLWPE2msQr&_nc_ohc=2Vlzl1eZIcUQ7kNvgEOlrTL&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=A8APLxhVBzdQ9Hl7e6IHTBK&oh=00_AYBV88o19rgf3Mz7ZCnrxiq3U321UF3oAO3XEK065N1uxQ&oe=67219BEF',
        fullName: 'Micheal Tran',
        username: 'micheal',
        email: ''
      }
    });
  }

  login() {

  }
}
