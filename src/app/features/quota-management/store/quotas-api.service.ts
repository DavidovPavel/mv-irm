import { Injectable } from '@angular/core';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { ApiService } from '@irm-ui/common';
import * as _moment from 'moment';
import { asapScheduler, EMPTY, Observable, of, scheduled } from 'rxjs';
import { pluck } from 'rxjs/operators';

import {
  DateRequestParams,
  Limit,
  QuotaGroup,
  QuotaModel,
  RequestParams,
  ServiceCenter,
  UpdateResult,
} from '../models';

const momentjs = _moment;

@Injectable()
export class QuotasManagerApiService {
  private apiUrl = 'InstallationQueue/api/QuotasManagements/';
  constructor(private api: ApiService, private storage: LocalStorageService) {}

  getSettings(sapId: string): RequestParams | null {
    const settings = this.storage.getItem(sapId);
    return settings ? JSON.parse(settings) : null;
  }

  getSettings$(sapId: string): Observable<RequestParams | null> {
    return scheduled(of(this.getSettings(sapId)), asapScheduler);
  }

  updateSettings(sapId: string, params: RequestParams): Observable<RequestParams> {
    this.storage.setItem(sapId, JSON.stringify(params));
    return of(params);
  }

  getServiceCenters(sapId: string): Observable<ServiceCenter[]> {
    return this.api.get<ServiceCenter[]>(`${this.apiUrl}ServiceCenters?sapId=${sapId}`).pipe(pluck('serviceCenters'));
  }

  loadQuotas(params: RequestParams, moment: DateRequestParams): Observable<QuotaGroup[]> {
    return this.api
      .get<QuotaGroup[]>(
        `${this.apiUrl}Quotas?serviceCenterId=${params.serviceCenterId}&regionId=${params.regionId}&startDate=${moment.start}&endDate=${moment.start}`
      )
      .pipe(pluck('groups'));
  }

  loadLimits(params: RequestParams, moment: DateRequestParams): Observable<Limit[]> {
    let { start, end } = moment;
    if (start === end) {
      const date = momentjs(start);
      start = date.startOf('month').toISOString();
      end = date.endOf('month').toISOString();
    }
    return this.api
      .get<Limit[]>(
        `${this.apiUrl}Limits?serviceCenterId=${params.serviceCenterId}&regionId=${params.regionId}&startDate=${start}&endDate=${end}`
      )
      .pipe(pluck('limits'));
  }

  updateQuotas(quotas: QuotaModel[], params: RequestParams): Observable<UpdateResult[]> {
    return this.api.put<UpdateResult[]>(`${this.apiUrl}Quotas`, { quotas, ...params }).pipe(pluck('limits'));
  }

  downloadToExcel(params: RequestParams, range: { start: string; end: string }, sapId: string): Observable<never> {
    window.open(
      `${this.apiUrl}Excel?sapId=${sapId}&serviceCenterId=${params.serviceCenterId}&regionId=${params.regionId}&startDate=${range.start}&endDate=${range.end}`
    );
    return EMPTY;
  }
}
