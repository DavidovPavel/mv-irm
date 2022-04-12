import { Component, Input } from '@angular/core';

import { groupIcon } from '../../store/group-icons';
import { ServiceCenterQuotaGroup } from '../../store/models';

@Component({
  selector: 'app-header-group',
  templateUrl: './header-group.component.html',
  styleUrls: ['./header-group.component.scss'],
})
export class HeaderGroupComponent {
  @Input() group!: ServiceCenterQuotaGroup;

  icon(id: number): string {
    return groupIcon.get(id) ?? '';
  }
}
