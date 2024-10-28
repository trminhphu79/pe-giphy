import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeCollectionsComponent } from '@pe-giphy/pe-collections';
import { PeAuthorInfoComponent } from '@pe-giphy/pe-author-info';
import { PeActionTabsComponent } from '@pe-giphy/pe-action-tabs';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';
import { TuiIcon, TuiButton, TuiDropdown, TuiDataList } from '@taiga-ui/core';
import { TuiTabs, TuiAvatar, TuiChevron, TuiSkeleton } from '@taiga-ui/kit';
import { SelfStore } from '@pe-giphy/my-gifs/data-access';
import { AppStore } from '@pe-giphy/app-store';
@Component({
  selector: 'pe-self',
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
  templateUrl: './self.component.html',
  styleUrl: './self.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelfComponent {
  store = inject(SelfStore);
  appStore = inject(AppStore);

  protected readonly item = this.store.detailChannel;
  protected readonly loading = this.store.loading;
  protected readonly relatedGifs = this.store.relatedGifs;

  titleClick(v: any) { }

  ngOnInit() {
    this.store.loadMe$(null);
  }
}
