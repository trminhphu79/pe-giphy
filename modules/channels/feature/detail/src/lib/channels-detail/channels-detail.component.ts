import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pe-channels-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './channels-detail.component.html',
  styleUrl: './channels-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChannelsDetailComponent {}
