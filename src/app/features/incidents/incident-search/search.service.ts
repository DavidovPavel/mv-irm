import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap } from 'rxjs/operators';

import { IncidentStore } from './../store/incident.store';

@Injectable()
export class SearchService {
  form = this.fb.group({
    incidentNumber: '',
    incidentRequestStatusType: '',
    serviceCenterId: '',
    salesChannel: '',
    serviceCompanyId: '',
    cityId: '',
    shopId: '',
    brand: '',
    blameServiceCenterType: '',
    'creationDateRange.from': '',
    'creationDateRange.to': '',
    'closeDateRange.from': '',
    'closeDateRange.to': '',
    highlightExpirationYellow: '',
    highlightExpirationRed: '',
    page: '',
  });

  constructor(
    public readonly store: IncidentStore,
    public router: Router,
    public route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  formChanges(): Observable<unknown> {
    return this.form.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      map((a) => this.clearEmpty(a, {})),
      tap((a) => this.router.navigate(['./', a]))
    );
  }

  fillForm(): void {
    const param = this.route.snapshot.params;
    Object.keys(param).forEach((key) => {
      this.form.controls[key].setValue(
        key === 'incidentRequestStatusType'
          ? param[key].split(',').map((a: string) => +a)
          : isNaN(Number(param[key]))
          ? param[key]
          : +param[key]
      );
    });
  }

  clearEmpty<T>(value: any, source: T): T {
    return Object.keys(value).reduce<T>(
      (p, c) =>
        Array.isArray(value[c])
          ? value[c].length
            ? { ...p, [c]: value[c] }
            : { ...p }
          : value[c] !== '' && value[c] !== null
          ? { ...p, [c]: value[c] }
          : { ...p },
      source
    );
  }
}
