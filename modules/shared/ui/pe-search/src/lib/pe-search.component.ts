import { AsyncPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, QueryList, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal, ViewChild, ViewChildren } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, filter, fromEvent, interval, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { getNextPlaceholderText, INTERVAL_UPDATE_PLACEHOLDER, MockItems } from './pe-search.constant';
import { Channels, PeSearchData } from './pe-search.model';
import { PeSearchType } from './pe-search.enum';
import { EMPTY_QUERY, TuiBooleanHandler } from '@taiga-ui/cdk';
import {
  TuiButton,
  TuiDataList,
  TuiDriver,
  TuiDropdown,
  tuiGetWordRange,
  TuiIcon,
  TuiInitialsPipe,
  TuiOption,
  TuiLoader
} from '@taiga-ui/core';
import { TuiAvatar, TuiChevron } from '@taiga-ui/kit';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiHighlight } from '@taiga-ui/kit';
import { TuiTextareaModule } from '@taiga-ui/legacy';

@Component({
  selector: 'pe-search',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslocoModule,
    AsyncPipe,
    FormsModule,
    NgStyle,
    NgForOf,
    NgIf,
    TuiAvatar,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    TuiIcon,
    TuiLoader,
    TuiHighlight,
    TuiTextareaModule,
    TuiInitialsPipe
  ],
  templateUrl: './pe-search.component.html',
  styleUrl: './pe-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeSearchComponent {

  keyword = input();
  channels = input<Channels[]>();
  searchChanges = output<PeSearchData>();

  destroy$ = new Subject();

  private cd: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef;
  @ViewChildren(TuiOption, { read: ElementRef })
  private readonly options: QueryList<ElementRef<HTMLElement>> = EMPTY_QUERY;


  protected readonly predicate: TuiBooleanHandler<Range> = (range) =>
    tuiGetWordRange(range).toString().startsWith('@');


  public readonly loading: WritableSignal<boolean> = signal(false);
  public readonly dataSource: WritableSignal<Array<any>> = signal([])
  public readonly dropdownOpen: WritableSignal<boolean> = signal(false);
  public readonly searchControl: WritableSignal<FormControl> = signal(new FormControl(null));
  public readonly placeholderText: WritableSignal<string> = signal('SEARCH.PLACE_HOLDER.SEARCH_GIF')


  onSelect(value: any): void {
    this.searchControl().setValue(value?.label)
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

    this.searchControl().valueChanges
      .pipe(
        tap(() => this.loading.set(true)),
        debounceTime(250),
        distinctUntilChanged(),
        map((v: string) => {
          if (v[0] == '@') {
            v.replace('@', '')
          }

          return v
        }),
        tap((value) => {
          const filterValue = []
          this.loading.set(filterValue.length == 0)
        }),
        delay(250),
        tap((value) => {
          const filterValue = MockItems.filter((item) => item.label.startsWith(value))
          this.dataSource.set(filterValue)
          this.loading.set(false)
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

  protected onArrow(event: Event, which: 'first' | 'last'): void {
    const item = this.options[which]
    if (!item) {
      return;
    }
    event.preventDefault();
    item.nativeElement.focus();
  }

  ngOnDestroy() {
    this.destroy$.next(null);
    this.destroy$.complete();
  }
}
