import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { NumberItem } from '@app/models';

import { groupIcon } from '../../store/group-icons';
import { InstallationQueueStore, USER_QUOTAS } from '../../store/installation-queue.store';

@Component({
  selector: 'app-user-quotas',
  templateUrl: './user-quotas.component.html',
  styleUrls: ['./user-quotas.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserQuotasComponent {
  groupControl = new FormControl();

  groups = new Set<number>();
  @Output() changeGroups = new EventEmitter<number[]>();

  groups$ = this.store.quotaGroups$;
  userGroups$ = this.store.userQuotaGroups$;

  constructor(private readonly store: InstallationQueueStore, private storage: LocalStorageService) {
    this.store.fetchUserQuotaGroups();
  }

  check(groups: NumberItem[]): NumberItem[] {
    const s = this.storage.getItem(USER_QUOTAS);
    if (s) {
      const ids = JSON.parse(s);
      return groups.filter((a) => ids.includes(a.id));
    }
    return [];
  }

  setCurrentGroup(groupId: number): void {
    if (this.groups.has(groupId)) {
      this.groups.delete(groupId);
    } else {
      this.groups.add(groupId);
    }
    this.changeGroups.emit(Array.from(this.groups.values()));
  }

  selectionChangeGroupMenu(data: MatSelectChange): void {
    const value = data.value as NumberItem[];
    console.log(value);
    this.store.loadUserGroups(value);
    this.store.updateUserQuotaGroups(value.map((a) => +a.id));
  }

  icon(id: number): string | undefined {
    return groupIcon.get(id);
  }

  label(name: string): string {
    return name
      .split(' ')
      .slice(0, 2)
      .map((a) => a[0])
      .join('')
      .toUpperCase();
  }
}
