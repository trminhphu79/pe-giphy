import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiTabs } from '@taiga-ui/kit';
import { TuiButton } from '@taiga-ui/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'pe-action-tabs',
  standalone: true,
  imports: [
    CommonModule,
    TuiTabs,
    TuiButton,
    TranslocoModule,
  ],
  templateUrl: './pe-action-tabs.component.html',
  styleUrl: './pe-action-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeActionTabsComponent {
  tabs = input<Array<{ label: string, value: string }>>([])
  selectedTabChanges = output<string>()

  protected activeElement = '';

  protected get activeItemIndex(): number {
    return this.tabs().findIndex((item) => item.value == this.activeElement)
  }

  protected stop(event: Event): void {
    event.stopPropagation();
  }

  protected onClick(activeElement: { label: string, value: string }): void {
    this.activeElement = activeElement.value;
    this.selectedTabChanges.emit(this.activeElement);
  }
}
