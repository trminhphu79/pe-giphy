import { Directive, ElementRef, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[appBackgroundImageLoad]',
    standalone: true
})
export class BackgroundImageLoadDirective implements OnChanges {
@Input() backgroundImageUrl: string | any = ''; // URL for the background image
    @Output() imageLoaded = new EventEmitter<void>(); // Event emitter for image load

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
            this.imageLoaded.emit(); // Emit when the image is loaded
        };

        img.onerror = () => {
            console.error('Failed to load background image');
        };
    }
}
