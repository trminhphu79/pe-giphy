import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, Input, output, signal } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { HomeStore } from '@pe-giphy/home-data-access';
import { TuiButton, TuiIcon, TuiAlertService } from '@taiga-ui/core';
import { TranslocoModule, TranslocoService } from "@jsverse/transloco";
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AppStore } from '@pe-giphy/app-store';
import { ChannelStore } from "@pe-giphy/channels/data-access"
import { from, timer } from 'rxjs';

@Component({
  selector: 'pe-home-detail',
  standalone: true,
  imports: [
    TuiIcon,
    DatePipe,
    TuiButton,
    TuiAvatar,
    TuiSkeleton,
    CommonModule,
    TranslocoModule,
    NgOptimizedImage,
  ],
  templateUrl: './pe-home-detail.component.html',
  styleUrl: './pe-home-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeHomeDetailComponent {
  @Input() set slug(input: string) {
    this.store.loadDetail$(input);
  }

  public readonly viewMode = input(false);

  private readonly store = inject(HomeStore);
  private readonly channelStore = inject(ChannelStore);
  private readonly router = inject(Router);
  private readonly appStore = inject(AppStore);
  private readonly alert = inject(TuiAlertService)
  private readonly transloco = inject(TranslocoService);

  protected readonly item = this.store?.detailGif as any;
  protected readonly loading = this.store.loading;
  protected readonly imgLoading = signal(true);
  protected readonly avatarLoading = signal(true);

  protected readonly authorName = computed(() => {
    return this.item()?.user?.display_name || 'COMMON.LABEL.UNKNOWN_AUTHOR'
  })

  protected readonly defaultAuthorAvatar = computed(() => {
    if (!this.loading()) {
      return this.item()?.user?.avatar_url || this.appStore.defaultAsset.avatarUrl()
    }

    return ''
  });

  onAuthorTitleClick(username: string) {
    if (!username) {
      this.alert.open(this.transloco.translate('COMMON.LABEL.UNKNOWN_AUTHOR') + '...!', {
        label: 'Oops!',
        appearance: 'error'
      }).subscribe()
      return;
    }

    if (this.viewMode()) {
      (document.querySelector('[automation-id="tui-dialog__close"]') as HTMLDivElement)?.click()
    }

    this.channelStore.clearDetailChannel();
    this.store.resetDetail();
    this.channelStore.clearRelatedChannels();
    this.router.navigateByUrl(`/channels/${username}`)
  }

}
