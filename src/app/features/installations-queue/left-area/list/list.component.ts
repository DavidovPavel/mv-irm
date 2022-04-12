import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { NumberItem } from '@app/models';

import { InstallationQueueStore, QUEUE_SERVICECENTER_ID } from '../../store/installation-queue.store';
import { ServiceCenter, ServiceCenterQuotaGroup } from '../../store/models';

@Component({
  selector: 'app-service-centers-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  serviceCenterId = this.storage.getItem(QUEUE_SERVICECENTER_ID);
  quotaGroups$ = this.store.quotaGroups$;
  userQuotaGroups$ = this.store.userQuotaGroups$;

  @Input() serviceCenters!: ServiceCenter[] | null;
  @Input() currentGroupId: string | null = null;
  @Output() currentGroupIdChange = new EventEmitter<string | null>();

  constructor(private readonly store: InstallationQueueStore, private storage: LocalStorageService) {}

  ngOnInit(): void {
    this.init(this.serviceCenterId ? +this.serviceCenterId : null);
  }

  init(id: number | null): void {
    if (id) {
      this.store.fetchServiceCenterQuotaGroups(id);
      this.store.fetchServiceCenter(id);
    }
  }

  check(scGroups: ServiceCenterQuotaGroup[], userGroups: NumberItem[]): ServiceCenterQuotaGroup[] {
    return userGroups.length ? scGroups.filter((a) => userGroups.some((b) => a.quotaGroupId === b.id)) : [];
  }

  showServiceCentersDetails(id: number): void {
    this.serviceCenterId = id.toString();
    this.storage.setItem(QUEUE_SERVICECENTER_ID, this.serviceCenterId);
    this.init(id);
  }

  showDetailsByGroupId(e: MouseEvent, quotaGroupId: string, scId: number): void {
    if (this.serviceCenterId === scId.toString()) {
      e.stopPropagation();
      this.currentGroupId = this.currentGroupId === quotaGroupId ? null : quotaGroupId;
    } else {
      this.currentGroupId = quotaGroupId;
    }
    this.currentGroupIdChange.emit(this.currentGroupId);
  }
}
