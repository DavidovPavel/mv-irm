import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { LocalStorageService } from '@app/core/services/local-storage.service';

import { InstallationQueueStore, QUEUE_GROUP_ID } from '../store/installation-queue.store';
import { ServiceCenterQuotaGroup } from '../store/models';

@Component({
  selector: 'app-service-centers-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent {
  loading$ = this.store.loading$;
  serviceCenter$ = this.store.serviceCenter$;
  serviceCenterQoutaGroups$ = this.store.serviceCenterQuotaGroups$.pipe(nonNullable<ServiceCenterQuotaGroup[]>());

  currentGroupId: number | null = null;

  @Input() set currentGroup(value: string | null) {
    this.currentGroupId = value ? +value : null;
    if (this.currentGroupId) {
      this.storage.setItem(QUEUE_GROUP_ID, this.currentGroupId.toString());
    } else {
      this.storage.removeItem(QUEUE_GROUP_ID);
    }
  }

  constructor(private readonly store: InstallationQueueStore, private storage: LocalStorageService) {
    this.store.fetchSettingsReport();
  }

  trackByFn(index: number, item: ServiceCenterQuotaGroup): number {
    return item.quotaGroupId;
  }
}
