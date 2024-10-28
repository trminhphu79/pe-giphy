import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelStore } from '@pe-giphy/channels/data-access';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';
import { AppStore } from '@pe-giphy/app-store';
import { TuiAlertService } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { PeCollectionsComponent } from '@pe-giphy/pe-collections';
import { PeAuthorInfoComponent } from '@pe-giphy/pe-author-info';
import { PeActionTabsComponent } from '@pe-giphy/pe-action-tabs';
import { SelfStore } from '@pe-giphy/my-gifs/data-access';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { PeGIFObject } from '@pe-giphy/models';

@Component({
  selector: 'pe-channels-detail',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    PeAuthorInfoComponent,
    PeActionTabsComponent,
    PeCollectionsComponent,
    BackgroundImageLoadDirective,
  ],
  templateUrl: './channels-detail.component.html',
  styleUrl: './channels-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsDetailComponent {
  @Input() set slug(input: string) {
    this.channelStore.loadDetail$(input);
  }

  protected readonly alert = inject(TuiAlertService);
  protected readonly appStore = inject(AppStore);
  protected readonly selfStore = inject(SelfStore);
  protected readonly transloco = inject(TranslocoService);
  protected readonly channelStore = inject(ChannelStore);

  protected readonly tabs = this.channelStore.tabs;
  protected readonly item = this.channelStore.detailChannel;
  protected readonly loading = this.channelStore.loading;
  protected readonly relatedGifs = this.channelStore.relatedGifs;

  private readonly router = inject(Router);

  favoriteClick(event: PeGIFObject) {
    this.selfStore.likeGifs$(event).subscribe((existing) => {
      let label = 'Liked';
      if (existing) {
        label = 'Disliked'
      }

      this.alert.open('', {
        label,
        appearance: 'success',
      }).subscribe();
      this.channelStore.updateItem(event);
    })
  }

  titleClick(event: any) {
    if (!event?.id) {
      return
    }
    this.channelStore.clearRelatedChannels();
    this.router.navigateByUrl(`gif/${event.id}`).then()
  }

  ngOnDestroy(): void {
    this.channelStore.clearSuggestionChannels();
    this.channelStore.clearDetailChannel();
    this.channelStore.clearRelatedChannels();
  }
}
