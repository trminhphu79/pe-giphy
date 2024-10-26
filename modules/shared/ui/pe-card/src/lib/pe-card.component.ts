import { ChangeDetectionStrategy, Component, ContentChild, Input, output, signal, TemplateRef, WritableSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';
@Component({
  selector: 'pe-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, TranslocoModule],
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

}
