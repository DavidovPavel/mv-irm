import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { nonNullable } from '@app/core/func/pure';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, startWith, tap } from 'rxjs/operators';

import { ServiceCenter, ServiceCenterQuotaGroup } from '../../store/models';
import {
  InstallationQueueStore,
  QUEUE_GROUP_ID,
  QUEUE_SERVICECENTER_ID,
  USER_QUOTAS,
} from './../../store/installation-queue.store';

@Component({
  selector: 'app-installation-queue-services',
  templateUrl: './installation-queue-services.component.html',
  styleUrls: ['./installation-queue-services.component.scss'],
})
export class InstallationQueueServicesComponent {
  source: ServiceCenter[] = [];
  formControl = new FormControl();

  loading$ = this.store.loading$;

  valueChanges$ = this.formControl.valueChanges.pipe(
    startWith(''),
    debounceTime(200),
    distinctUntilChanged(),
    tap((value) => {
      if (value) {
        const data = this.source.filter((a) => a.name.toLocaleLowerCase().includes(value.toString().toLowerCase()));
        this.store.loadServiceCenters(data);
      }
    })
  );

  serviceCenters$ = this.store.serviceCenters$.pipe(tap((a) => this.initValue(a)));

  serviceCenterQoutaGroups$ = this.store.serviceCenterQuotaGroups$.pipe(
    nonNullable<ServiceCenterQuotaGroup[]>(),
    map((a) => this.store.getGroupsInfoByGroups(a)),
    tap((a) => (this.quotaGroups$ = of(a)))
  );

  quotaGroups$ = this.store.quotaGroupsInfo$;

  constructor(
    private readonly store: InstallationQueueStore,
    private storage: LocalStorageService,
    private router: Router
  ) {
    this.store.fetchCheckInitQuotas();
    this.store.fetchServiceCenters();
  }

  initValue(a: ServiceCenter[]): void {
    if (!this.source.length) {
      this.source = a;
      const id = this.storage.getItem(QUEUE_SERVICECENTER_ID);
      if (id) {
        const item = this.source.find((b) => b.id === +id);
        this.formControl.setValue(item);
      }
    }
  }

  select(e: MatAutocompleteSelectedEvent): void {
    const { id } = e.option.value as ServiceCenter;
    this.storage.setItem(QUEUE_SERVICECENTER_ID, id.toString());
    this.store.fetchServiceCenterQuotaGroups(id);
  }

  clear(): void {
    this.quotaGroups$ = this.store.quotaGroupsInfo$;
    this.formControl.setValue('');
    this.storage.removeItem(QUEUE_SERVICECENTER_ID);
    this.store.loadServiceCenters(this.source);
    this.store.loadQuotaGroupsInfo();
  }

  currentGroup(id: string | number): void {
    const a = this.storage.getItem(USER_QUOTAS);
    if (a) {
      const arr = JSON.parse(a) as number[];
      if (!arr.includes(+id)) {
        arr.push(+id);
        this.storage.setItem(USER_QUOTAS, JSON.stringify(arr));
      }
    } else {
      this.storage.setItem(USER_QUOTAS, JSON.stringify([+id]));
    }
    this.storage.setItem(QUEUE_GROUP_ID, id.toString());
    this.router.navigate(['/installation-queue']);
  }

  displayFn(item: ServiceCenter): string {
    return item?.name ?? '';
  }
}
