import { RegionsComponent } from './../regions/regions.component';
import { Component, HostBinding, Input } from '@angular/core';

import { ServiceCenterQuotaGroup } from '../../store/models';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent {
  groupId!: number | null;

  @Input() group!: ServiceCenterQuotaGroup;
  @Input() set currentGroupId(value: number | null) {
    this.groupId = value;
    this.group.isExpanded = this.groupId === this.group.quotaGroupId;
  }

  @HostBinding('class') get css(): string {
    return this.groupId === this.group.quotaGroupId ? 'active' : '';
  }

  setHeight(c: RegionsComponent): void {
    c.expand(c.height());
  }
}
