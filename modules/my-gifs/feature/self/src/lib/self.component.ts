import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeCollectionsComponent } from '@pe-giphy/pe-collections';
import { PeAuthorInfoComponent } from '@pe-giphy/pe-author-info';
import { PeActionTabsComponent } from '@pe-giphy/pe-action-tabs';
import { BackgroundImageLoadDirective } from '@pe-giphy/directives';
import { TuiIcon, TuiButton, TuiDropdown, TuiDataList } from '@taiga-ui/core';
import { TuiTabs, TuiAvatar, TuiChevron, TuiSkeleton } from '@taiga-ui/kit';
import { SelfStore, TabActionEnum } from '@pe-giphy/my-gifs/data-access';
import { AppStore } from '@pe-giphy/app-store';
import { Router } from '@angular/router';
import { GIFObject } from 'giphy-api';
import { PeGIFObject } from '@pe-giphy/models';
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
  router = inject(Router);
  appStore = inject(AppStore);

  protected readonly loading = this.store.loading;
  protected readonly tabActions = this.store.tabActions;
  protected readonly selectedList = this.store.selectedList;
  protected readonly detailChannel = this.store.detailChannel;

  titleClick(event: PeGIFObject) {
    this.router.navigateByUrl(`gif/${event.id}`).then()
  }

  selectedTabChanges(event: any) {
    this.store.setTab(event)
  }

  ngOnDestroy() {
    this.store.setTab(TabActionEnum.COLLECTION)
  }
}
