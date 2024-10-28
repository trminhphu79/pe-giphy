import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pe-author-info',
  standalone: true,
  imports: [
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

  authorAvatarLoading = signal(true);
  authorAvatar = computed(() => {
    if (!this.loading()) {
      return this.item()?.user?.avatar_url || this.defaultAsset().avatarUrl
    }
    return ''
  })

  backgroundLoading = signal(true);
  backgroundImg = computed(() => {
    if (!this.loading()) {
      return this.item()?.banner_image || this.defaultAsset().backgroundUrl
    }
  })


  onBackgroundImageLoad() {
    this.backgroundLoading.set(false);
  }
}
