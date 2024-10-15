import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoService } from "@jsverse/transloco";
import { TranslocoModule } from "@jsverse/transloco";
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { PeSearchComponent } from '@pe-giphy/ui/pe-search';
import { PeSearchData } from '@pe-giphy/ui/pe-search';
@Component({
  selector: 'pe-top-bar',
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    NzSwitchModule,
    NzMenuModule,
    NzIconModule,
    TranslocoModule,
    NzDropDownModule,
    PeSearchComponent
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarComponent {
  switchValue = signal(false);
  visible = false;

  translocoService: TranslocoService = inject(TranslocoService);

  change(event: any) {
    console.log("event: ", event)
    this.translocoService.setDefaultLang(event?.target?.checked ? 'vi' : 'en')
  }

  searchChanges(event: PeSearchData) {
    console.log("PeSearchData: ", event)
  }
}
