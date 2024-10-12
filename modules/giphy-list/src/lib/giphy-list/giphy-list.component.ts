import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-giphy-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giphy-list.component.html',
  styleUrl: './giphy-list.component.css',
})
export class GiphyListComponent {}
