import { Component, Input } from '@angular/core';
import { MatBadgeSize } from '@angular/material/badge';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() badgeCount: number;

  @Input() color: ThemePalette;

  @Input() size: MatBadgeSize;
}
