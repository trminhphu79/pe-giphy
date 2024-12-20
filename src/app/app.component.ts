import { RouterOutlet } from '@angular/router';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { WA_LOCAL_STORAGE, WA_WINDOW } from '@ng-web-apis/common';
import { TUI_DARK_MODE, TUI_DARK_MODE_KEY, TuiButton, TuiOption, TuiIcon } from '@taiga-ui/core';
import { TuiRoot } from '@taiga-ui/core';
import { TuiDropdown } from '@taiga-ui/core';
import { APP_CONFIG } from '@pe-giphy/app-config';

@Component({
  standalone: true,
  imports: [RouterOutlet, TuiRoot, TuiDropdown, TuiButton, TuiOption, TuiIcon],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'pe-giphy';
  private readonly key = inject(TUI_DARK_MODE_KEY);
  private readonly storage = inject(WA_LOCAL_STORAGE);
  private readonly media = inject(WA_WINDOW).matchMedia('(prefers-color-scheme: dark)');

  protected readonly darkMode = inject(TUI_DARK_MODE);
  protected readonly appConfig = inject(APP_CONFIG);

  protected reset(): void {
    this.darkMode.set(this.media.matches);
    this.storage.removeItem(this.key);
  }

  protected open = false;

  protected onClick(): void {
    this.open = !this.open;
  }

  protected onObscured(obscured: any): void {
    if (obscured) {
      this.open = false;
    }
  }

  protected onActiveZone(active: any): void {
    this.open = active && this.open;
  }
}
