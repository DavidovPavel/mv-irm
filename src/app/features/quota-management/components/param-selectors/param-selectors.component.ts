import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith, tap } from 'rxjs/operators';

import { Region, RequestParams, ServiceCenter } from './../../models';
import { QuotasManagementStore } from './../../store/quotas-management.store';

@Component({
  selector: 'app-param-selectors',
  templateUrl: './param-selectors.component.html',
})
export class ParamSelectorsComponent implements OnInit {
  serviceCenterFc = new FormControl();
  regionFc = new FormControl();

  @Input() serviceCenters!: ServiceCenter[];
  @Input() preset!: RequestParams | null;

  region$ = this.regionFc.valueChanges.pipe(
    tap((regionId) => {
      const serviceCenterId = +this.serviceCenterFc.value;
      this.store.setSettings({ serviceCenterId, regionId });
      this.store.fetchQuotas();
      this.store.fetchLimits();
    })
  );

  regions$ = this.serviceCenterFc.valueChanges.pipe(
    startWith(''),
    map(() => this.getRegions())
  );

  constructor(private readonly store: QuotasManagementStore) {}

  ngOnInit(): void {
    this.serviceCenterFc.setValue(this.preset?.serviceCenterId ?? this.serviceCenters[0]?.id);
  }

  getRegions(): Region[] {
    const regions = this.serviceCenters.find((a) => this.serviceCenterFc.value === a.id)?.regions ?? [];
    this.regionFc.setValue(this.preset?.regionId ?? regions[0]?.id);
    this.preset = null;
    return regions;
  }
}
