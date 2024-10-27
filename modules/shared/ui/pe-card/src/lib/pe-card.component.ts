import { ChangeDetectionStrategy, Component, computed, ContentChild, Input, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
import { PeLoadingComponent } from '@pe-giphy/pe-loading';
import { PeImageLoaderComponent } from '@pe-giphy/pe-image-loader';
import { TuiButton, TuiIcon } from '@taiga-ui/core';
import { TuiAvatar } from '@taiga-ui/kit';
import {TuiLike} from '@taiga-ui/kit';

@Component({
  selector: 'pe-card',
  standalone: true,
  imports: [
    TuiIcon,
    TuiLike,
    TuiButton,
    CommonModule,
    TranslocoModule,
    NgOptimizedImage,
    PeLoadingComponent,
    PeImageLoaderComponent
  ],
  templateUrl: './pe-card.component.html',
  styleUrl: './pe-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeCardComponent {
  @Input() item!: any;
  @Input() wrapperClass: string = '';

  @ContentChild('footerTemplate') externalFooterTemplate!: TemplateRef<any>;
  @ContentChild('overlayTitleTemplate') externalOverlayTitleTemplate!: TemplateRef<any>;
  @ContentChild('overlayActionTemplate') externalOverlayActionTemplate!: TemplateRef<any>;
  @ContentChild('thumbnailTemplate') externalThumbnailTemplate!: TemplateRef<any>;

  loading: WritableSignal<boolean> = signal(true);

  titleClick = output();
  favoriteClick = output();

  imgWidth = computed(() => this.item.images.fixed_width.width);
  imgHeight = computed(() => this.item.images.fixed_width.height);

  imgLoading() {
    console.log('loading')
    this.loading.set(false)
  }

}
