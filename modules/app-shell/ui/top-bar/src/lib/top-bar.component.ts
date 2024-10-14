import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from "@jsverse/transloco";
import { TranslocoModule } from "@jsverse/transloco";
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'pe-top-bar',
  standalone: true,
  imports: [CommonModule, TranslocoModule, NzSwitchModule, NzMenuModule, NzIconModule, TranslocoModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  switchValue = signal(false);
  translocoService: TranslocoService = inject(TranslocoService);

  change(event: any) {
    console.log("event: ", event)
    this.translocoService.setDefaultLang(event?.target?.checked ? 'vi' : 'en')
  }
}
