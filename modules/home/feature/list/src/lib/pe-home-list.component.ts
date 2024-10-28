import { ChangeDetectionStrategy, Component, inject, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeCardComponent } from "@pe-giphy/ui/pe-card";
import { PeSearchComponent } from "@pe-giphy/ui/pe-search";
import { PeHomeDetailComponent } from "@pe-giphy/pe-home-detail";
import { GifApiService } from "@pe-giphy/pe-giphy-api";
import { Router } from '@angular/router';
import { HomeStore } from '@pe-giphy/home-data-access';
import { CdkVirtualScrollViewport, ScrollingModule } from '@angular/cdk/scrolling';
import { map, pairwise, filter, tap, throttleTime, switchMap } from 'rxjs';
import { TuiAlertService, TuiButton, TuiDialog, TuiDialogService } from '@taiga-ui/core';
import type { TuiDialogContext } from '@taiga-ui/core';
import { type PolymorpheusContent } from '@taiga-ui/polymorpheus';
import { Location } from '@angular/common';
import { SelfStore } from '@pe-giphy/my-gifs/data-access';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { PeGIFObject } from '@pe-giphy/models';

@Component({
  selector: 'pe-pe-home-list',
  standalone: true,
  imports: [CommonModule, PeCardComponent, PeSearchComponent, ScrollingModule, TuiButton, PeHomeDetailComponent, TranslocoModule],
  templateUrl: './pe-home-list.component.html',
  styleUrl: './pe-home-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeHomeListComponent {

  @ViewChild(CdkVirtualScrollViewport)
  private viewport!: CdkVirtualScrollViewport;
  @ViewChild('template') detailDialog!: PeHomeDetailComponent;


  private readonly alert = inject(TuiAlertService);
  private readonly store = inject(HomeStore);
  private readonly dialogs = inject(TuiDialogService);
  private readonly location = inject(Location);
  private readonly selfStore = inject(SelfStore);


  protected readonly items = this.store.trendingListMaped;
  protected readonly gifId = signal('');
  protected readonly loading = this.store.loading;
  protected readonly itemSize = signal(20);
  protected readonly throttleTime = signal(100);
  protected readonly showDialogDetail = signal(true);


  ngAfterViewInit(): void {
    this.viewport.elementScrolled()
      .pipe(
        map(() => this.viewport.measureScrollOffset('bottom')),
        pairwise(),
        filter(([y1, y2]) => y2 < y1 && y2 < 200),
        filter(() => !this.loading()),
        throttleTime(this.throttleTime()),
        tap(() => {
          this.store.loadMore$(null);
        }),
      ).subscribe()
  }

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
      this.store.updateItem(event);
    })
  }

  titleClick(event: any) {
    if (!event?.id) {
      return
    }
    this.gifId.set(event.id);
    this.location.go(`/gif/${event.id}`);
    this.showDialog(this.detailDialog);
    this.store.resetDetail();
  }

  protected showDialog(content: PolymorpheusContent<TuiDialogContext>): void {
    this.dialogs.open(content, {
      size: 'page',
      closeable: true,
      dismissible: true,
    }).subscribe({
      complete: () => {
        this.store.resetDetail();
        this.location.go(`/`);
      },
    });
  }

  trackById(id: any, item: any) {
    return id
  }
}