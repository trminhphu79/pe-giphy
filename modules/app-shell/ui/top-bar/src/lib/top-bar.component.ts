import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from "@jsverse/transloco";
import { TranslocoModule } from "@jsverse/transloco";
import { NzSwitchModule } from 'ng-zorro-antd/switch';

@Component({
  selector: 'pe-top-bar',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NzSwitchModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  switchValue = signal(false);
}
