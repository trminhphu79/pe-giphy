import { ChangeDetectionStrategy, Component, ElementRef, input, Input, output, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, fromEvent, interval, Subject, takeUntil, tap } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { getNextPlaceholderText, INTERVAL_UPDATE_PLACEHOLDER } from './pe-search.constant';
import { Channels, PeSearchData } from './pe-search.model';
import { PeSearchType } from './pe-search.enum';

@Component({
  selector: 'pe-search',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './pe-search.component.html',
  styleUrl: './pe-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeSearchComponent {

  keyword = input();
  channels = input<Channels>();
  searchChanges = output<PeSearchData>();

  destroy$ = new Subject();
  @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef;

  placeholderText = signal('SEARCH.PLACE_HOLDER.SEARCH_GIF')

  ngOnInit() {
    interval(INTERVAL_UPDATE_PLACEHOLDER)
      .pipe(
        takeUntil(this.destroy$),
        tap(() => {
          this.placeholderText.set(getNextPlaceholderText(this.placeholderText()))
        })
      )
      .subscribe()

    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        filter((event: any) => event.key == 'Enter'),
        distinctUntilChanged(),
        tap((event) => {
          const keyword = event.target.value;
          const isSearchChannel = keyword?.[0] == '@';
          this.searchChanges.emit({
            keyword,
            type: isSearchChannel ? PeSearchType.CHANNEL : PeSearchType.MEDIA
          })
        })
      )
      .subscribe();
  }


  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
