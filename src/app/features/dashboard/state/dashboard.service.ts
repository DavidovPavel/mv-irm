import { Injectable } from '@angular/core';
import { ApiService, httpParams } from '@irm-ui/common';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { CatalogParamsRequest } from './models/catalog-params-request';
import { CatalogResponse } from './models/catalog-response.interface';
import { IncidentsStatus } from './models/incidents-status.interface';
import { MarkParamsRequest } from './models/mark-params-request.interface';
import { MarkResponse } from './models/mark-response.interface';
import { MetricsParamsRequest } from './models/metrics-params-request.interface';
import { MetricResponse } from './models/metrics-response.interface';
import { StatsModel } from './models/stats-model.interface';

@Injectable()
export class DashboardService {
  constructor(private api: ApiService) {}

  getIncidentsStatus(): Observable<IncidentsStatus> {
    return this.api.get('Incidents/api/IncidentRequest/total');
  }

  getInstallationStats(): Observable<StatsModel> {
    return this.api.get('Main/api/EquipmentInstallation/stats');
  }

  getAssistantStats(): Observable<StatsModel> {
    return this.api.get('Main/api/MobileDigitalAssistant/stats');
  }

  getMetrics(params: Partial<MetricsParamsRequest>): Observable<MetricResponse[]> {
    return this.api
      .get<MetricResponse[]>('/Main/api/Digital/Metrics', params as unknown as httpParams)
      .pipe(pluck('metrics'));
  }

  getMarks(params: Partial<MarkParamsRequest>): Observable<MarkResponse[]> {
    return this.api.get<MarkResponse[]>('/Main/api/Digital/Marks', params as unknown as httpParams).pipe(pluck('data'));
  }

  getCatalog(params: Partial<CatalogParamsRequest>): Observable<CatalogResponse> {
    return this.api.get<CatalogResponse>('/Main/api/Digital/Catalog', params as unknown as httpParams);
  }

  getMasterAppealsClosedState(): Observable<string> {
    return this.api.get<number>('/Main/api/Masters/Appeals/states/closed').pipe(
      pluck<number, number>('percent'),
      map((a) => a.toFixed(2))
    );
  }
}
