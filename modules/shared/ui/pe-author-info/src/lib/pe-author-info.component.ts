import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiSkeleton, TuiTooltip } from '@taiga-ui/kit';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pe-author-info',
  standalone: true,
  imports: [
    TuiIcon,
    TuiTooltip,
    TuiButton,
    TuiSkeleton,
    CommonModule,
    NgOptimizedImage,
    TranslocoModule,
    BackgroundImageLoadDirective,
  ],
  templateUrl: './pe-author-info.component.html',
  styleUrl: './pe-author-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeAuthorInfoComponent {
  item = input<any>();
  loading = input<boolean>(true);
  defaultAsset = input<{
    avatarUrl: string,
    backgroundUrl: string
  }>({ avatarUrl: '', backgroundUrl: '' })

  protected readonly authorAvatarLoading = signal(true);
  protected readonly authorAvatar = computed(() => {
    if (!this.loading()) {
      return this.item()?.user?.avatar_url || this.defaultAsset().avatarUrl
    }
    return ''
  })

  protected readonly backgroundLoading = signal(true);
  protected readonly backgroundImg = computed(() => {
    if (!this.loading()) {
      return this.item()?.banner_image || this.defaultAsset().backgroundUrl
    }
  })


  onBackgroundImageLoad() {
    this.backgroundLoading.set(false);
  }

  protected toSocial(type: 'instagram' | 'portfolio') {
    switch (type) {
      case 'instagram':
        window.open(this.item()?.user?.instagram_url, '_blank')
        break;
      case 'portfolio':
        break;
    }
  }
}
