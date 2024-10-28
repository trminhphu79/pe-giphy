import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { PeSearchComponent, PeSearchType } from '@pe-giphy/ui/pe-search';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TUI_DARK_MODE, TuiAlertService, TuiButton, TuiDataList, TuiDialogContext, TuiDialogService, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiButtonLoading, TuiChevron } from '@taiga-ui/kit';
import { AppStore } from "@pe-giphy/app-store";
import { HomeStore } from "@pe-giphy/home-data-access";
import { ChannelStore } from "@pe-giphy/channels/data-access";
import { PeUploadComponent } from "@pe-giphy/ui/pe-upload";
import { type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { SelfStore } from "@pe-giphy/my-gifs/data-access";
import { UploadGifOptions } from '@pe-giphy/models';
import { catchError, tap } from 'rxjs';

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
    TuiButtonLoading,
    NgOptimizedImage,
    TranslocoModule,
    TranslocoModule,
    PeSearchComponent,
    RouterLinkActive,
    PeUploadComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {

  private readonly router = inject(Router);
  private readonly dialogs = inject(TuiDialogService);
  private readonly alert = inject(TuiAlertService);
  private readonly transloco = inject(TranslocoService);

  protected readonly appStore = inject(AppStore);
  protected readonly darkMode = inject(TUI_DARK_MODE);
  protected readonly homeStore = inject(HomeStore);
  protected readonly selfStore = inject(SelfStore);
  protected readonly channelStore = inject(ChannelStore);

  protected readonly loading = computed(() => {
    return this.homeStore.loading() || this.channelStore.loading();
  })

  protected uploadLoading = this.selfStore.loading;
  protected readonly suggestionItems = computed(() => {
    if (this.currentSearchMode() == PeSearchType.CHANNEL) {
      return this.channelStore.suggestionChannels()
    }
    return this.homeStore.suggestionTags()
  })

  protected readonly suggestionTags = this.homeStore.suggestionTags;

  protected readonly userState = this.appStore.user;
  private readonly currentSearchMode: WritableSignal<PeSearchType> = signal(PeSearchType.GIF);
  private readonly currentPage: WritableSignal<'CHANNEL' | 'HOME'> = signal('HOME');

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

  @ViewChild('uploadCompTempRef') uploadCompTempRef!: ElementRef<PeUploadComponent>;
  @ViewChild(PeUploadComponent) peComponent!: PeUploadComponent;

  searchChanges(input: { keyword: string, type: PeSearchType }) {

    if (!input.keyword) {
      this.homeStore.loadTrending$(null);
      this.getSearchForPage();
      return;
    }

    if (input.type == PeSearchType.CHANNEL) {
      input.keyword = "@" + input.keyword;
    }

    this.homeStore.clearTrendingData();
    this.homeStore.clearFilterModel();
    if (input.keyword) {
      this.homeStore.searchGifs$(input.keyword);
      this.getSearchForPage();
    }
  }

  keywordChanges(keyword: string) {
    if (!keyword) {
      this.homeStore.clearSuggestionTags();
      this.channelStore.clearSuggestionChannels();
    }
    const isSearchChannel = keyword?.[0] == '@';
    this.currentSearchMode.set(isSearchChannel ? PeSearchType.CHANNEL : PeSearchType.GIF);
    if (isSearchChannel) {
      keyword = keyword.replace("@", '');
      this.channelStore.searchChannels$(keyword);
    } else {
      if (keyword) {
        this.homeStore.searchSuggestionTags$(keyword);
        return;
      }
    }
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
    this.appStore.setLogin(true);
  }

  login() {
    this.appStore.setLogin(true);
  }

  getSearchForPage() {
    if (this.router.url === '/' || this.router.url === '') {
      return
    }
    this.router.navigate(['/'])
  }

  protected openDialogUpload() {
    this.dialogs.open(this.uploadCompTempRef, {
      size: 'l',
      closeable: true,
      label: 'Upload Your Animations',
    }).subscribe();
  }

  protected cancel() {
    if (this.uploadLoading()) {
      this.alert.open(this.transloco.translate('COMMON.LABEL.CAN_NOT_CLOSE_WHEN_UPLOADING'), {
        label: 'Close dialog',
        appearance: 'warning',
      }).subscribe()
      return;
    }
    (document.querySelector('[automation-id="tui-dialog__close"]') as HTMLDivElement)?.click()
  }

  protected saveFiles() {
    if (!this.peComponent.isValid) {
      this.peComponent.formInstance.markAllAsTouched();
      return;
    }

    this.selfStore.uploadGif({
      username: this.appStore.user().username,
      files: this.peComponent.formValue.attachment || [],
      source_post_url: this.peComponent.formValue?.sourcePostUrl || '',
      source_image_url: this.peComponent.formValue?.sourceImageUrl || '',
      tags: this.peComponent.formValue.tags?.join(",") || ''
    })
      .pipe(
        catchError((err) => {
          this.alert.open(this.transloco.translate('COMMON.LABEL.UPLOAD_GIF_FAIL'), {
            label: 'Upload',
            appearance: 'error',
          }).subscribe()
          return err;
        }),
        tap(() => {
          this.alert.open(this.transloco.translate('COMMON.LABEL.UPLOAD_GIF_SUCCESS'), {
            label: 'Upload',
            appearance: 'info',
          }).subscribe();
          this.cancel();
        })
      )
      .subscribe()
  }
}
