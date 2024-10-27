import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiTabs } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'pe-action-tabs',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabs,
    TuiButton,
  ],
  templateUrl: './pe-action-tabs.component.html',
  styleUrl: './pe-action-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeActionTabsComponent {
  tabs = input(['Collections', 'Followers'])
  selectedTabChanges = output<string>()

  protected activeElement = String(this.tabs()[0]);

  protected get activeItemIndex(): number {
    return this.tabs().indexOf(this.activeElement);
  }

  protected stop(event: Event): void {
    event.stopPropagation();
  }

  protected onClick(activeElement: string): void {
    this.activeElement = activeElement;
    this.selectedTabChanges.emit(this.activeElement);
  }
}
