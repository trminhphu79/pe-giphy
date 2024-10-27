import { ChangeDetectionStrategy, Component, computed, inject, InjectionToken, input, Input, output, signal } from '@angular/core';
import { CommonModule, DatePipe, NgOptimizedImage } from '@angular/common';
import { HomeStore } from '@pe-giphy/home-data-access';
import { TuiButton, TuiIcon, TuiDialogContext, TuiDialogService, TuiDialogComponent } from '@taiga-ui/core';
import { TranslocoModule } from "@jsverse/transloco";
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { Router } from '@angular/router';
import { injectContext } from '@taiga-ui/polymorpheus';
import { AppStore } from '@pe-giphy/app-store';


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
  private readonly router = inject(Router);
  private readonly appStore = inject(AppStore);

  protected readonly item = this.store?.detailGif as any;
  protected readonly loading = this.store.loading;
  protected readonly imgLoading = signal(true);
  protected readonly avatarLoading = signal(true);

  protected readonly authorName = computed(() => {
    if (this.loading()) {
      return null
    }

    return this.item().user.display_name || 'COMMON.LABEL.UNKNOWN_AUTHOR'
  })

  protected readonly defaultAuthorAvatar = computed(() => (!this.loading() && this.item?.user?.avatar_url()) || this.appStore?.defaultAsset?.avatarUrl());

  onAuthorTitleClick(username: string) {
    if (this.viewMode()) {
      (document.querySelector('[automation-id="tui-dialog__close"]') as HTMLDivElement)?.click()
    }

    this.router.navigateByUrl(`/channels/${username}`).then(() => {
      this.store.resetDetail();
    })
  }
}
