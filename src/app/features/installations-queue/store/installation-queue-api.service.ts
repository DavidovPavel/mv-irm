import { Injectable } from '@angular/core';
import { NumberItem } from '@app/models';
import { ApiPoints } from '@app/models/api-points';
import { ApiService } from '@irm-ui/common';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import {
  Interval,
  LimitParams,
  RegionLimits,
  RegionLimitsData,
  ReportSettings,
  ServiceCenter,
  ServiceCenterQuotaGroup,
} from './models';

@Injectable({
  providedIn: 'root',
})
export class InstallationQueueApiService {
  private apiUrl = ApiPoints.InstallationQueue;
  constructor(private api: ApiService) {}

  getServiceCentersBySapId(sapId: string): Observable<{ serviceCenters: ServiceCenter[]; quotaGroups: NumberItem[] }> {
    return this.api.get(`${this.apiUrl}/QuotasServiceCenters/ServiceCenters?sapId=${sapId}`);
  }

  getServiceCenterQuotaGroupsBySapId(sapId: string, serviceCenterId: number): Observable<ServiceCenterQuotaGroup[]> {
    return this.api
      .get(`${this.apiUrl}/QuotasServiceCenters?sapId=${sapId}&serviceCenterId=${serviceCenterId}`)
      .pipe(pluck('groups'));
  }

  getServiceCenterQuotaGroupsRegionBySapId(sapId: string, params: LimitParams): Observable<RegionLimitsData> {
    const { quotaGroupId, regionId, serviceCenterId } = params;
    return this.api
      .get<{ intervals: Interval[]; regionLimits: RegionLimits[] }>(
        `${this.apiUrl}/QuotasServiceCenters/QuotaGroups/Region?sapId=${sapId}&serviceCenterId=${serviceCenterId}&quotaGroupId=${quotaGroupId}&regionId=${regionId}`
      )
      .pipe(
        map(({ intervals, regionLimits }) => ({
          serviceCenterId,
          quotaGroupId,
          regionId,
          regionLimits,
          intervals,
        }))
      );
  }

  checkInitQuotas(sapId: string): Observable<object> {
    return this.api.post(`${this.apiUrl}/ServiceCompanies/Queues`, { sapId });
  }

  headQuotas(sapId: string): Observable<object> {
    return this.api.head(`${this.apiUrl}/ServiceCompanies/${sapId}/Quotas/Groups`);
  }

  getSettings(): Observable<ReportSettings> {
    return this.api.get<ReportSettings>(`${this.apiUrl}/Quotas/Reports/Settings`);
  }

  getHasQuotas(): Observable<{ hasQuotas: boolean }> {
    return this.api.get(`${this.apiUrl}/ServiceCompanies/Queues/HasQuotas`);
  }
}
