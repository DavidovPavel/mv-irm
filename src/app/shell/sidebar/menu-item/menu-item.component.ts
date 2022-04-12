import { Component, Input } from '@angular/core';
import { MenuItem } from '@app/root-store/common/models/menu-item.interface';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() item!: MenuItem;
  @Input() isSidebarOpened = true;
}
