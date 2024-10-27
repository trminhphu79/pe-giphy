import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChannelStore } from '@pe-giphy/channels/data-access';
import { TuiAvatar, TuiSkeleton, TuiTabs, TuiChevron } from '@taiga-ui/kit';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';
import { AppStore } from '@pe-giphy/app-store';
import { TuiButton, TuiDataList, TuiDropdown, TuiIcon } from '@taiga-ui/core';
import { Router } from '@angular/router';
import { PeCollectionsComponent } from '@pe-giphy/pe-collections';
import { PeAuthorInfoComponent } from '@pe-giphy/pe-author-info';
import { PeActionTabsComponent } from '@pe-giphy/pe-action-tabs';

@Component({
  selector: 'pe-channels-detail',
  standalone: true,
  imports: [
    TuiIcon,
    TuiTabs,
    TuiButton,
    TuiAvatar,
    TuiChevron,
    TuiDropdown,
    TuiDataList,
    TuiSkeleton,
    CommonModule,
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

  protected readonly appStore = inject(AppStore);
  protected readonly channelStore = inject(ChannelStore);

  protected readonly item = this.channelStore.detailChannel;
  protected readonly loading = this.channelStore.loading;
  protected readonly relatedGifs = this.channelStore.relatedGifs;

  private readonly router = inject(Router);

  favoriteClick(event: any) { }

  titleClick(event: any) {
    console.log('event: ', event)
    if (!event?.id) {
      return
    }
    this.channelStore.clearRelatedChannels();
    this.router.navigateByUrl(`gif/${event.id}`).then()
  }
}
