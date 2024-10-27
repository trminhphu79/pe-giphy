import {
    Directive,
    ElementRef,
    Output,
    EventEmitter,
    Input,
    OnDestroy,
    AfterViewInit,
    inject,
} from '@angular/core';

@Directive({
    selector: '[appInfiniteScroll]',
    standalone: true
})
export class InfiniteScrollDirective implements AfterViewInit, OnDestroy {
    @Output() loadMore = new EventEmitter<void>();
    @Input() loading: boolean = false;

    @Input() rootMargin: string = '0px 0px -200px 0px';
    @Input() threshold: number = 0.1;

    private observer!: IntersectionObserver;
    private readonly el: ElementRef = inject(ElementRef);


    ngAfterViewInit(): void {
        this.initObserver();
    }

    ngOnDestroy(): void {
        this.observer.disconnect();
    }

    private initObserver(): void {
        const options = {
            root: null,
            rootMargin: this.rootMargin,
            threshold: this.threshold,
        };

        console.log("initObserver: ", options)

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !this.loading) {
                    console.log("IntersectionObserver: ", entry)
                    this.loadMore.emit();
                }
            });
        }, options);

        this.observer.observe(this.el.nativeElement);
    }
}
