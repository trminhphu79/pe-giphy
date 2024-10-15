import { ChangeDetectionStrategy, Component, computed, ElementRef, input, Input, output, Output, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { debounceTime, distinctUntilChanged, filter, fromEvent, interval, Subject, takeUntil, tap } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { getNextPlaceholderText, INTERVAL_UPDATE_PLACEHOLDER } from './pe-search.constant';
import { Channels, PeSearchData } from './pe-search.model';
import { PeSearchType } from './pe-search.enum';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'pe-search',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    NzPopoverModule,
    NzMentionModule
  ],
  templateUrl: './pe-search.component.html',
  styleUrl: './pe-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeSearchComponent {

  keyword = input();
  channels = input<Channels[]>();
  searchChanges = output<PeSearchData>();

  showMention = signal(false);
  destroy$ = new Subject();
  @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef;

  placeholderText = signal('SEARCH.PLACE_HOLDER.SEARCH_GIF')

  inputValue?: string;
  webFrameworks = [
    { name: 'React', type: 'JavaScript' },
    { name: 'Angular', type: 'JavaScript' },
    { name: 'Laravel', type: 'PHP' },
    { name: 'Flask', type: 'Python' },
    { name: 'Django', type: 'Python' }
  ];

  valueWith = (data: { name: string; type: string }): string => data.name;

  onSelect(value: string): void {
    console.log(value);
  }

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
          this.showMention.set(true)
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
