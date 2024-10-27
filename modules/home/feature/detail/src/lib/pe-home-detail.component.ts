import { ChangeDetectionStrategy, Component, computed, inject, input, Input, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeStore } from '@pe-giphy/home-data-access';
import { TuiButton, TuiIcon, TuiDialogService } from '@taiga-ui/core';
import { TranslocoModule } from "@jsverse/transloco";
import { TuiAvatar, TuiSkeleton } from '@taiga-ui/kit';
import { timer } from 'rxjs';


@Component({
  selector: 'pe-home-detail',
  standalone: true,
  imports: [
    TuiIcon,
    TuiButton,
    TuiAvatar,
    TuiSkeleton,
    CommonModule,
    TranslocoModule,
    NgOptimizedImage
  ],
  templateUrl: './pe-home-detail.component.html',
  styleUrl: './pe-home-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeHomeDetailComponent {
  @Input() set slug(input: string) {
    this.store.loadDetail$(input);
  }

  public readonly viewMode = input(false);

  private readonly store = inject(HomeStore);
  protected readonly loading = this.store.loading;
  protected readonly item = this.store.detailGif as any;
  protected readonly defaultAuthorAvatar = computed(() => !this.loading() && 'https://avatars.githubusercontent.com/u/11832552');
}
