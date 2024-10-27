import { ChangeDetectionStrategy, Component, ElementRef, inject, input, Input, signal, ViewChild, WritableSignal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageLoaderService } from './pe-image-loader.service';
import { PeLoadingComponent } from '@pe-giphy/pe-loading'

@Component({
  selector: 'pe-image-loader',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    PeLoadingComponent,
  ],
  templateUrl: './pe-image-loader.component.html',
  styleUrl: './pe-image-loader.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeImageLoaderComponent {

  public width = input(null);
  public height = input(null);
  public altText = input(null);
  public imageSrc = input('');

  @ViewChild('imageEl') imageEl!: ElementRef;
  @ViewChild('divIntersectContainer') divIntersectContainer!: ElementRef;

  loading: WritableSignal<boolean> = signal(true);

  private readonly imageLoaderService: ImageLoaderService = inject(ImageLoaderService);

  observerCallback(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    for (let entry of entries) {
      if (entry.isIntersecting) {
        this.loading.set(true);
        const imgSrc = this.imageEl.nativeElement.getAttribute('data-imagesrc');

        this.imageLoaderService.loadImage(imgSrc).subscribe((objectUrl: string) => {
          if (objectUrl) {
            this.loading.set(false);
            this.imageEl.nativeElement.src = objectUrl;
            this.imageEl.nativeElement.classList.remove('thumbnail');
          }
        });

        observer.unobserve(entry.target);
      }
    }
  }

  ngAfterViewInit() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      this.observerCallback.bind(this),
      options
    );
    observer.observe(this.divIntersectContainer.nativeElement);
  }
}
