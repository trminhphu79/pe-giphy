import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { TranslocoService } from "@jsverse/transloco";
import { TranslocoModule } from "@jsverse/transloco";
import { PeSearchComponent } from '@pe-giphy/ui/pe-search';
import { PeSearchData } from '@pe-giphy/ui/pe-search';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY, TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';

@Component({
  selector: 'pe-top-bar',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    TranslocoModule,
    TranslocoModule,
    PeSearchComponent,
    RouterLink,
    RouterLinkActive,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {

  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');

  protected readonly darkMode = inject(TUI_DARK_MODE);

  switchValue = signal(false);
  visible = false;
  protected readonly items: WritableSignal<any[]> = signal([{
    label: "COMMON.LABEL.PROFILE",
  },
  {
    label: "COMMON.LABEL.CHANGE_THEME_LIGHT",
  }, {
    label: "COMMON.LABEL.LOGOUT",
  }])
  translocoService: TranslocoService = inject(TranslocoService);

  change(event: any) {
    console.log("event: ", event)
    this.translocoService.setDefaultLang(event?.target?.checked ? 'vi' : 'en')
  }

  searchChanges(event: PeSearchData) {
    console.log("PeSearchData: ", event)
  }

  perform(action: { label: string }, index: number) {
    if (index == 1) {
      action.label = action.label == 'COMMON.LABEL.CHANGE_THEME_LIGHT' ? 'COMMON.LABEL.CHANGE_THEME_DARK' : 'COMMON.LABEL.CHANGE_THEME_LIGHT'
      this.darkMode.set(action.label == 'COMMON.LABEL.CHANGE_THEME_DARK');

    }
  }

  protected reset(): void {
    this.darkMode.set(this.media.matches);
    this.storage.removeItem(this.key);
    console.log("reset: ", this.darkMode())
  }
}
