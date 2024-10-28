import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appBackgroundImageLoad]',
    standalone: true
})
export class BackgroundImageLoadDirective implements OnChanges {
    @Input() backgroundImageUrl: string | any = '';
    @Output() imageLoaded = new EventEmitter<void>();

    constructor(private el: ElementRef) { }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['backgroundImageUrl']) {
            this.checkBackgroundImageLoad();
        }
    }

    private checkBackgroundImageLoad(): void {
        if (!this.backgroundImageUrl) return;

        const img = new Image();
        img.src = this.backgroundImageUrl;

        img.onload = () => {
            this.el.nativeElement.style.backgroundImage = `url(${this.backgroundImageUrl})`;
            this.imageLoaded.emit();
        };

        img.onerror = () => {
            console.error('Failed to load background image');
        };
    }
}
