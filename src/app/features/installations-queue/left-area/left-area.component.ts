import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

import { InstallationQueueStore, QUEUE_GROUP_ID, QUEUE_SERVICECENTER_ID } from '../store/installation-queue.store';
import { ServiceCenter } from '../store/models';

@Component({
  selector: 'app-left-area',
  templateUrl: './left-area.component.html',
  styleUrls: ['./left-area.component.scss'],
})
export class LeftAreaComponent {
  currentGroupId = this.storage.getItem(QUEUE_GROUP_ID);
  formControl = new FormControl();
  showNotQuotasOnly = false;
  source: ServiceCenter[] | null = null;
  filtered: ServiceCenter[] = [];

  valueChanges$ = this.formControl.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    tap((value) => {
      if (value) {
        this.storage.removeItem(QUEUE_SERVICECENTER_ID);
      }
      this.storage.removeItem(QUEUE_GROUP_ID);
      if (this.source) {
        this.filtered = this.source.filter((a) => a.name.toLocaleLowerCase().includes(value));
      }
    })
  );

  serviceCenters$ = this.store.serviceCenters$.pipe(
    tap((a) => {
      if (!this.source) {
        this.source = a;
        this.filtered = a;
      }
    })
  );

  constructor(private readonly storage: LocalStorageService, private readonly store: InstallationQueueStore) {
    this.store.fetchCheckInitQuotas();
    this.store.fetchServiceCenters();
  }

  filterByQuotas(): void {
    this.showNotQuotasOnly = !this.showNotQuotasOnly;
    if (this.source) {
      this.filtered = this.showNotQuotasOnly ? this.source.filter((a) => !a.hasQuotas) : this.source;
    }
  }

  filterByGroups(groups: number[]): void {
    if (this.source) {
      this.filtered = groups.length
        ? this.source.filter((a) =>
            a.groups.filter((b) => groups.includes(b.quotaGroupId)).some((b) => b.hasQuotas === false)
          )
        : this.source;
    }
  }
}
