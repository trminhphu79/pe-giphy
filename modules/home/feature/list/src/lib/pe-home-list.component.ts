import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeCardComponent } from "@pe-giphy/ui/pe-card";
import { PeSearchComponent } from "@pe-giphy/ui/pe-search";
import { GifApiService } from "@pe-giphy/pe-giphy-api";
import { GIFObject } from 'giphy-api';
import { Router } from '@angular/router';
@Component({
  selector: 'pe-pe-home-list',
  standalone: true,
  imports: [CommonModule, PeCardComponent, PeSearchComponent],
  templateUrl: './pe-home-list.component.html',
  styleUrl: './pe-home-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeHomeListComponent {
  items: WritableSignal<GIFObject[]> = signal([]);

  gifService = inject(GifApiService);
  router = inject(Router);

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.gifService.searchTrending({
      offset: 0,
      limit: 50,
    }).subscribe((r) => {
      console.log("trending data: ", r)
      this.items.set(r.data);
    })
  }

  favoriteClick(event: any) {
    console.log("favoriteClick", event)
  }

  titleClick(event: any) {
    if (!event?.id) {
      return
    }
    console.log("titleClick", event)
    this.router.navigateByUrl(`/gif/${event.id}`)
  }
}
