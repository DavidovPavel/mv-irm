import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberItem, ParamRequest, QueryResult } from '@app/models';
import { ApiPoints } from '@app/models/api-points';
import { ApiService } from '@irm-ui/common';
import { asyncScheduler, EMPTY, Observable, scheduled } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';


import {
  ErrorMessage,
  ExpirationHistory,
  Incident,
  IncidentHistory,
  NumInCRM,
  UpdateIncident,
} from '../models';

import { ScoresUpdateModel } from '../models/expiration.interface';
import { HistoryDetails } from '../models/incident-history';
import { IncidentRequestCreateModel } from '../models/incident-request';
import { UpdateStatusOrComment } from '../models/update-status-comment';
import { PermissionManagementService } from '../permission-management.service';
import { ExpirationHistoryGroups } from './../models/expiration.interface';

export const DictionaryName = {
  shopId: 'Shop',
  cityId: 'City',
  serviceCenterId: 'ServiceCenter',
  serviceCompanyId: 'ServiceCompany',
  incidentRequestStatusType: [
    { id: 0, name: 'Создан' },
    { id: 1, name: 'В работе' },
    { id: 2, name: 'Назначен выезд' },
    { id: 3, name: 'Закрыт' },
  ],
  salesChannel: [
    { id: 0, name: 'Все' },
    { id: 1, name: 'Магазин' },
    { id: 3, name: 'Интернет-магазин' },
    { id: 4, name: 'Ручная заявка' },
    { id: 5, name: 'Проверка качества' },
  ],
  brand: [
    { id: 2, name: 'Мвидео' },
    { id: 3, name: 'Эльдорадо' },
  ],
  blameServiceCenterType: [
    { id: 0, name: 'Нет значения' },
    { id: 1, name: 'Нет - не вина СЦ' },
    { id: 2, name: 'Да - вина СЦ' },
  ],
  'creationDateRange.from': null,
  'creationDateRange.to': null,
  'closeDateRange.from': null,
  'closeDateRange.to': null,
  highlightExpirationYellow: false,
  highlightExpirationRed: false,
};

export type dictionaryName = keyof typeof DictionaryName;

@Injectable()
export class IncidentApiService {
  private apiUrl = ApiPoints.Incidents;

  constructor(private api: ApiService, private permissionService: PermissionManagementService) {}

  getDictionaryByName(name: dictionaryName, params: ParamRequest): Observable<QueryResult<NumberItem>> {
    const data = DictionaryName[name];
    if (typeof data === 'string') {
      return this.api.get(`${this.apiUrl}/${data}/search`, new HttpParams({ fromObject: params }));
    } else if (Array.isArray(data)) {
      return scheduled(
        [
          {
            data,
            totalSize: data.length,
            paginatedQuery: { pageIndex: 0, pageSize: 20 },
          },
        ],
        asyncScheduler
      );
    }
    return EMPTY;
  }

  getItemById(name: dictionaryName, id: number | number[]): Observable<NumberItem | NumberItem[]> {
    const source = DictionaryName[name];
    if (typeof source === 'string') {
      return id ? this.api.get(`${this.apiUrl}/${source}`, new HttpParams({ fromObject: { id: `${id}` } })) : EMPTY;
    } else if (Array.isArray(source)) {
      return scheduled(
        [Array.isArray(id) ? source.filter((a) => id.includes(+a.id)) : source.filter((a) => a.id === id)[0]],
        asyncScheduler
      );
    }
    return EMPTY;
  }

  searchIncident(data: ParamRequest): Observable<QueryResult<Incident>> {
    return this.api.get(`${this.apiUrl}/IncidentRequest/search`, new HttpParams({ fromObject: data }));
  }

  complicatedSearchIncident(search: string): Observable<QueryResult<Incident>> {
    const data = { search };
    return this.api.get(`${this.apiUrl}/IncidentRequest/search2`, new HttpParams({ fromObject: data }));
  }

  downloadToExcel(data: ParamRequest): Observable<never> {
    const param = new HttpParams({ fromObject: data });
    window.open(`${this.apiUrl}/IncidentRequest/excel?${param.toString()}`);
    return EMPTY;
  }

  downloadFile(id: number): Observable<never> {
    window.open(`${this.apiUrl}/FileStore/Download?id=${id}`);
    return EMPTY;
  }

  getIncidentRequest(id: number): Observable<Incident> {
    return this.api.get(`${this.apiUrl}/IncidentRequest/?id=${id}`);
  }

  updateIncidentRequestStatus(data: UpdateStatusOrComment): Observable<Incident> {
    const output = new FormData();
    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  updateIncidentRequest(data: UpdateIncident): Observable<Incident> {
    const output = new FormData();
    data.requestFiles.forEach((e) => output.append('requestFiles', e));
    data.commentFiles.forEach((e) => output.append('commentFiles', e));

    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  addToServiceCenterFileStores(source: { id: number; items: File[] }): Observable<Incident> {
    const output = new FormData();
    source.items.forEach((e) => output.append('commentFiles', e));

    const data = {
      id: source.id,
    };

    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  removeFromServiceCenterFileStores(source: { id: number; filesToDelete: number[] }): Observable<Incident> {
    const output = new FormData();
    const { id, filesToDelete } = source;

    const data = {
      id,
      filesToDelete,
    };

    output.append('data', JSON.stringify(data));
    return this.api.put(`${this.apiUrl}/IncidentRequest`, output);
  }

  checkNumInCRM(params: { numberZNU: string; incidentNumber: string }): Observable<NumInCRM> {
    return this.api.get(`${this.apiUrl}/IncidentNumberStatus`, new HttpParams({ fromObject: params }));
  }

  createRequest(data: IncidentRequestCreateModel): Observable<ErrorMessage> {
    const output = new FormData();
    data.requestFiles.forEach((e) => output.append('requestFiles', e));
    output.append('data', JSON.stringify(data.request));
    return this.api.post(`${this.apiUrl}/IncidentRequest`, output);
  }

  getPermissions(id?: number): Observable<string[]> {
    return this.api
      .get<{ permissions: string[] }>(`${this.apiUrl}/Permissions${id ? '?incidentRequestId=' + id : ''}`)
      .pipe(
        map((data: { permissions: string[] }) => data.permissions),
        tap((result) => this.permissionService.add(result))
      );
  }

  getCreateReason(): Observable<NumberItem[]> {
    return this.api.get<QueryResult<NumberItem>>(`${this.apiUrl}/IncidentCreationReason/search`).pipe(pluck('data'));
  }

  getServiceCenters(name: string): Observable<NumberItem[]> {
    return this.api.get(`${this.apiUrl}/ServiceCenter/search?name=${name}`).pipe(pluck('data'));
  }

  getExpirationHistory(params: { incidentRequestId: number }): Observable<ExpirationHistoryGroups[]> {
    return this.api
      .get<{ data: ExpirationHistory[] }>(
        `${this.apiUrl}/ExpirationHistory/search?incidentRequestId=${params.incidentRequestId}`
      )
      .pipe(
        pluck('data'),
        map((list) => this.groupByServiceCenterId(list))
      );
  }

  groupByServiceCenterId(list: ExpirationHistory[]): ExpirationHistoryGroups[] {
    const scIds = new Set<number>();
    list.forEach((a) => scIds.add(a.serviceCenterId));
    return Array.from(scIds.values())
      .map((serviceCenterId) => ({
        serviceCenterId,
        items: list.filter((a) => a.serviceCenterId === serviceCenterId),
      }))
      .map(({ serviceCenterId, items }) => ({
        serviceCenterId,
        items,
        id: items[0].id,
        highlight: items[0].highlight,
        serviceCenterName: items[0].serviceCenterName,
        scores: items[0].scores,
      }));
  }

  saveExpirationScores(params: ScoresUpdateModel): Observable<unknown> {
    return this.api.put(`${this.apiUrl}/Expiration`, params);
  }

  getHistory4Panel(id: number): Observable<IncidentHistory[]> {
    return this.api
      .get(`${this.apiUrl}/Events/history?aggregateId=${id}&pagination.pageIndex=0&pagination.pageSize=3`)
      .pipe(pluck('data'));
  }

  getHistory(id: number): Observable<IncidentHistory[]> {
    return this.api.get<QueryResult<IncidentHistory>>(`${this.apiUrl}/Events/history?aggregateId=${id}`).pipe(
      pluck('data'),
      map((data) =>
        data.map((item) => ({
          ...item,
          userData: JSON.parse(item.userMetadata),
          metaData: item.historyEventMetadata.map((a) => JSON.parse(a)),
        }))
      )
    );
  }

  getHistoryDetails(id: number, sid: number): Observable<HistoryDetails> {
    return this.api.get(`${this.apiUrl}/Events/particularEventHistory?agrregateId=${id}&snapshotId=${sid}`);
  }
}
