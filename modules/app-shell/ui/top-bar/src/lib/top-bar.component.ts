import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { NgForOf, NgIf, NgOptimizedImage, NgStyle } from '@angular/common';
import { TranslocoModule } from "@jsverse/transloco";
import { PeSearchComponent, PeSearchType } from '@pe-giphy/ui/pe-search';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TUI_DARK_MODE, TuiButton, TuiDataList, TuiDialogContext, TuiDialogService, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { TuiChevron } from '@taiga-ui/kit';
import { AppStore } from "@pe-giphy/app-store";
import { HomeStore } from "@pe-giphy/home-data-access";
import { ChannelStore } from "@pe-giphy/channels/data-access";
import { PeUploadComponent } from "@pe-giphy/ui/pe-upload";
import { type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { SelfStore } from "@pe-giphy/my-gifs/data-access";
import { UploadGifOptions } from '@pe-giphy/models';

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
    PeUploadComponent,
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {

  private readonly router = inject(Router);
  private readonly dialogs = inject(TuiDialogService);

  protected readonly appStore = inject(AppStore);
  protected readonly darkMode = inject(TUI_DARK_MODE);
  protected readonly homeStore = inject(HomeStore);
  protected readonly selfStore = inject(SelfStore);
  protected readonly channelStore = inject(ChannelStore);

  protected readonly loading = computed(() => {
    return this.homeStore.loading() || this.channelStore.loading();
  })

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

  searchChanges(event: string) {
    switch (this.getSearchForPage()) {
      case PeSearchType.CHANNEL:
        console.log("searchChanges in channel page")
        this.searchInChannelPage(event)
        break;
      case PeSearchType.GIF:
        console.log("searchChanges in home page")
        this.searchInHomePage(event)
        break;
    }
  }

  searchInChannelPage(keyword: string) { }

  searchInHomePage(keyword: string) {
    if (this.currentSearchMode() == PeSearchType.CHANNEL) {
      if (!keyword) {
        this.homeStore.clearTrendingData();
        // this.channelStore.loadTrending$(null);
        return;
      }

      if (keyword) {
        // this.homeStore.searchGifs$(keyword);
      }
    } else {
      if (!keyword) {
        this.homeStore.clearTrendingData();
        this.homeStore.loadTrending$(null);
        return;
      }

      if (keyword) {
        this.homeStore.searchGifs$(keyword);
      }
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

  getSearchForPage() {
    return window.location?.pathname?.includes?.('channels') ? PeSearchType.CHANNEL : PeSearchType.GIF
  }

  protected upload() {
    this.showDialog(this.uploadCompTempRef);
  }

  protected showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      size: 'auto',
      closeable: true,
      dismissible: true,
      label: 'Upload Your Animations',
    }).subscribe({
      complete: () => {
        // this.location.go(`/`);
      },
    });
  }

  protected submitUpload(event: UploadGifOptions) {
    console.log("Event", event);
    this.selfStore.uploadGif$(event);
  }

  protected cancel() {

  }

  protected save() {
    console.log("uploadComponent: ", this.peComponent.formValue)
  }
}
