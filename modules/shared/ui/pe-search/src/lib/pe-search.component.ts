import { AsyncPipe, NgForOf, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectorRef, computed, QueryList, WritableSignal } from '@angular/core';
import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal, ViewChild, ViewChildren } from '@angular/core';
import { debounceTime, delay, distinctUntilChanged, filter, fromEvent, interval, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { TranslocoModule } from '@jsverse/transloco';
import { getNextPlaceholderText, INTERVAL_UPDATE_PLACEHOLDER, MockItems } from './pe-search.constant';
import { PeSearchData, SuggestionItem } from './pe-search.model';
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
import { TuiAvatar, TuiChevron, TuiSkeleton } from '@taiga-ui/kit';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiHighlight } from '@taiga-ui/kit';
import { TuiTextareaModule } from '@taiga-ui/legacy';

@Component({
  selector: 'pe-search',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    NgStyle,
    TuiIcon,
    TuiLoader,
    TuiAvatar,
    TuiButton,
    TuiChevron,
    TuiDataList,
    TuiDropdown,
    TuiSkeleton,
    TuiHighlight,
    TuiTextareaModule,
    AsyncPipe,
    FormsModule,
    TranslocoModule,
    ReactiveFormsModule,

    TuiInitialsPipe
  ],
  templateUrl: './pe-search.component.html',
  styleUrl: './pe-search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeSearchComponent {

  keyword = input();
  suggestionItems = input<SuggestionItem[]>([]);
  loading = input(false);

  searchChanges = output<string>();
  keywordChanges = output<string>();

  getClassEmptyContent = computed(() => {
    if (!this.loading() && !this.suggestionItems().length) {
      return 'show-empty-content'
    }

    return ''
  })

  destroy$ = new Subject();

  @ViewChild('inputSearch', { static: true }) inputSearch!: ElementRef;
  @ViewChildren(TuiOption, { read: ElementRef })
  private readonly options: QueryList<ElementRef<HTMLElement>> = EMPTY_QUERY;


  protected readonly predicate: TuiBooleanHandler<Range> = (range) =>
    tuiGetWordRange(range).toString().startsWith('@');

  public readonly dropdownOpen: WritableSignal<boolean> = signal(false);
  public readonly searchControl: WritableSignal<FormControl> = signal(new FormControl(null));
  public readonly placeholderText: WritableSignal<string> = signal('SEARCH.PLACE_HOLDER.SEARCH_GIF')


  onSelect(value: SuggestionItem): void {
    this.searchChanges.emit(value.name as string)
    this.searchControl().setValue(value?.name)
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
        tap((value) => {
          if (!value) {
            this.keywordChanges.emit('');
          }
        }),
        filter(() => !this.suggestionItems()?.length),
        debounceTime(250),
        distinctUntilChanged(),
        tap((value) => {
          this.keywordChanges.emit(value)
        })
      )
      .subscribe()

    fromEvent(this.inputSearch.nativeElement, 'keyup')
      .pipe(
        filter((event: any) => event.key == 'Enter'),
        distinctUntilChanged(),
        tap((event) => {
          const keyword = event.target.value;
          this.searchChanges.emit(keyword)
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
