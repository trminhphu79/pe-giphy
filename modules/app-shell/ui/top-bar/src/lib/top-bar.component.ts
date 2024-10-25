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
}
