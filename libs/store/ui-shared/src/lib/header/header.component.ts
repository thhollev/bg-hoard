import { Component, Input } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'bg-hoard-header',
  standalone: true,
  imports: [MatToolbarModule],
  template: `<mat-toolbar color="primary">
    {{ title }}
  </mat-toolbar>`,
  styleUrls: ['./header.component.less'],
})
export class HeaderComponent {
  @Input() title = '';
}
