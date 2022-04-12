import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NumberItem, ParamRequest } from '@app/models';
import { ApiPoints } from '@app/models/api-points';
import { ApiService } from '@irm-ui/common';
import { NgxPermissionsService } from 'ngx-permissions';
import { asyncScheduler, EMPTY, Observable, scheduled } from 'rxjs';
import { map, pluck, tap } from 'rxjs/operators';

import { EquipmentInstallation } from './equipment-installation.interface';
import { dictionaryName } from './installation-registry.store';
import { Operation, SearchParams } from './models';

export const Dictionary: {[key: string]: NumberItem[]} = {
  appealStatus: [
    { name: 'Новые', id: 0 },
    { name: 'Приняты в работу', id: 1 },
    { name: 'Установка произведена', id: 2 },
    { name: 'Отказ от установки', id: 3 },
    { name: 'Брак техники', id: 4 },
    { name: 'Архив отказов за полгода', id: 5 },
    {
      name: 'Архив установок за полгода',
      id: 6,
    },
    { name: 'Все заявки', id: 7 },
  ],
  serviceStatus: [
    { id: 0, name: 'Действующая' },
    { id: 1, name: 'Аннулированная' },
    { id: 2, name: 'Срок действия истек' },
    { id: 10, name: 'Не оплачена' },
    { id: 11, name: 'Удалена' },
  ],
  appealType: [
    { id: 0, name: 'Магазин' },
    { id: 1, name: 'Интернет-магазин' },
    { id: 2, name: 'TradeService' },
    { id: 3, name: 'Ручная заявка' },
    { id: 4, name: 'Проверка качества' },
    { id: 5, name: 'Last Mile' },
  ],
  brand: [
    { id: 2, name: 'Мвидео' },
    { id: 3, name: 'Эльдорадо' },
  ],
};

@Injectable()
export class EquipmentInstallationService {
  private readonly apiPoint = ApiPoints.EquipmentInstallation;
  constructor(private api: ApiService, private ps: NgxPermissionsService) {}

  getDictionaryByName(name: dictionaryName, params?: ParamRequest): Observable<NumberItem[]> {
    const data = name in Dictionary ? Object.getOwnPropertyDescriptor(Dictionary, name)?.value : name;
    if (typeof data === 'string') {
      const fromObject = params ?? {};
      return this.api.get(`${this.apiPoint}/${data}`, new HttpParams({ fromObject })).pipe(pluck('response'));
    } else if (Array.isArray(data)) {
      return scheduled(
        [
          data,
          // totalSize: data.length,
          // paginatedQuery: { pageIndex: 0, pageSize: 20 },
          // },
        ],
        asyncScheduler
      );
    }
    return EMPTY;
  }

  getItemById(name: dictionaryName, id: number | number[]): Observable<NumberItem | NumberItem[]> {
    const source = name in Dictionary ? Object.getOwnPropertyDescriptor(Dictionary, name)?.value : name;
    if (typeof source === 'string') {
      return id
        ? this.api.get(`${this.apiPoint}/${source}`, new HttpParams({ fromObject: { id: `${id}` } })).pipe(
            pluck<unknown, NumberItem[]>('response'),
            map((a) => a[0])
          )
        : EMPTY;
    } else if (Array.isArray(source)) {
      return scheduled(
        [Array.isArray(id) ? source.filter((a) => id.includes(+a.id)) : source.filter((a) => a.id === id)[0]],
        asyncScheduler
      );
    }
    return EMPTY;
  }

  getPermissions(id: string): Observable<string[]> {
    return this.api
      .get<string[]>(`${this.apiPoint}/Permission?AppealId=${id}`)
      .pipe(tap((result) => this.ps.addPermission(result)));
  }

  getEquipmentInstallation(id: string): Observable<EquipmentInstallation> {
    return this.api.get(`${this.apiPoint}/Appeal/${id}`);
  }

  updateEquipmentInstallation(id: string, request: Operation[]): Observable<EquipmentInstallation> {
    return this.api.patch(`${this.apiPoint}/Appeal/${id}`, request);
  }

  search(model: SearchParams): Observable<{ response: EquipmentInstallation[]; totalCount: number }> {
    const fromObject = Object.keys(model).reduce<ParamRequest>((p, c) => ({ ...p, [c]: `${(model as any)[c]}` }), {});
    const params = new HttpParams({ fromObject });
    return this.api.get(`${this.apiPoint}/Search?${params.toString()}`);
  }

  downloadToExcel(model: SearchParams): Observable<never> {
    const fromObject = Object.keys(model).reduce<ParamRequest>((p, c) => ({ ...p, [c]: `${(model as any)[c]}` }), {});
    const param = new HttpParams({ fromObject });
    window.open(`${this.apiPoint}/Appeal/excel?${param.toString()}`);
    return EMPTY;
  }
}
