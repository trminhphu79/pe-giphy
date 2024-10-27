import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TuiSkeleton } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';

@Component({
  selector: 'pe-author-info',
  standalone: true,
  imports: [
    TuiButton,
    TuiSkeleton,
    CommonModule,
    NgOptimizedImage,
    BackgroundImageLoadDirective,
  ],
  templateUrl: './pe-author-info.component.html',
  styleUrl: './pe-author-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeAuthorInfoComponent {
  item = input<any>();
  loading = input<boolean>();
  defaultAsset = input<{
    avatarUrl: string,
    backgroundUrl: string
  }>({ avatarUrl: '', backgroundUrl: '' })

  authorAvatarLoading = signal(true);
  authorAvatar = computed(() => {
    if (!this.loading() && this.item()?.user?.avatar_url) {
      return this.item()?.user?.avatar_url
    }
    return this.defaultAsset().avatarUrl
  })

  backgroundLoading = signal(true);
  backgroundImg = computed(() => {
    if (!this.loading() && this.item()?.banner_image) {
      return this.item()?.banner_image
    }
    return (!this.loading() && this.defaultAsset().backgroundUrl)
  })


  onBackgroundImageLoad() {
    this.backgroundLoading.set(false);
  }
}
