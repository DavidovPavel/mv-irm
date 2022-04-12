import { Injectable } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { NumberItem, ParamRequest, Profile, QueryResult } from '@app/models';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { delay, map, mergeMap, switchMap } from 'rxjs/operators';

import { Chip } from '../incident-search/chips/chips.component';
import { ErrorMessage, Incident, IncidentRequestCreateModel, NumInCRM, ServiceCenter, Shop } from '../models';
import { DictionaryName, dictionaryName, IncidentApiService } from './incident-api.service';

export const SHOP_PARAM = 'shopId';
export const FLAG_SHOP_PARAM = 'clearedShopId';

export interface IncidentState {
  permissions: string[] | null;
  numInCRM: NumInCRM | null;
  createReasonProp: NumberItem[] | null;
  createResult: ErrorMessage | null;
  listIncidents: QueryResult<Incident> | null;

  cityId: NumberItem | null;
  shopId: NumberItem | null;
  serviceCenterId: NumberItem | null;
  serviceCompanyId: NumberItem | null;
  salesChannel: NumberItem | null;
  brand: NumberItem | null;
  blameServiceCenterType: NumberItem | null;
  incidentRequestStatusType: NumberItem[] | null;
  'creationDateRange.from': string | null;
  'creationDateRange.to': string | null;
  'closeDateRange.from': string | null;
  'closeDateRange.to': string | null;
  highlightExpirationYellow: true | null;
  highlightExpirationRed: true | null;

  serviceCenterIdList: ServiceCenter[] | null;
  shopIdList: Shop[] | null;
  cityIdList: NumberItem[] | null;
  serviceCompanyIdList: NumberItem[] | null;
  salesChannelList: NumberItem[] | null;
  brandList: NumberItem[] | null;
  blameServiceCenterTypeList: NumberItem[] | null;
  incidentRequestStatusTypeList: NumberItem[] | null;
  chips: Map<string, Chip>;
}

export const incidentState = {
  permissions: null,
  numInCRM: null,
  createReasonProp: null,
  createResult: null,
  listIncidents: null,

  cityId: null,
  shopId: null,
  serviceCenterId: null,
  serviceCompanyId: null,
  salesChannel: null,
  brand: null,
  blameServiceCenterType: null,
  incidentRequestStatusType: null,
  'creationDateRange.from': null,
  'creationDateRange.to': null,
  'closeDateRange.from': null,
  'closeDateRange.to': null,
  highlightExpirationYellow: null,
  highlightExpirationRed: null,

  cityIdList: null,
  shopIdList: null,
  serviceCenterIdList: null,
  serviceCompanyIdList: null,
  salesChannelList: null,
  brandList: null,
  blameServiceCenterTypeList: null,
  incidentRequestStatusTypeList: null,
  chips: new Map<string, Chip>(),
};

@Injectable()
export class IncidentStore extends ComponentStore<IncidentState> {
  constructor(private readonly api: IncidentApiService, private readonly store: Store) {
    super(incidentState);
  }

  /** selectors */
  readonly profile$ = this.store.select(CommonStateSelectors.selectProfile).pipe(nonNullable<Profile>());

  readonly listIncidents$ = this.select((state) => state.listIncidents).pipe(nonNullable<QueryResult<Incident>>());

  readonly createReasonProp$ = this.select((state) => state.createReasonProp).pipe(
    nonNullable<NumberItem[]>(),
    map((result) => result.sort((b, c) => (b.name < c.name ? -1 : b.name > c.name ? 1 : 0)))
  );
  readonly numInCRM$ = this.select((state) => state.numInCRM).pipe(nonNullable<NumInCRM>());
  readonly createResult$ = this.select((state) => state.createResult).pipe(nonNullable<ErrorMessage>());

  readonly serviceCenter$ = this.select((state) => state.serviceCenterId);
  readonly shop$ = this.select((state) => state.shopId);
  readonly serviceCompany$ = this.select((state) => state.serviceCompanyId);
  readonly city$ = this.select((state) => state.cityId);
  readonly salesChannel$ = this.select((state) => state.salesChannel);
  readonly brand$ = this.select((state) => state.brand);
  readonly blameServiceCenter$ = this.select((state) => state.blameServiceCenterType);
  readonly incidentRequestStatus$ = this.select((state) => state.incidentRequestStatusType);
  readonly creationDateRangeFrom$ = this.select((state) => state['creationDateRange.from']).pipe(delay(0));
  readonly creationDateRangeTo$ = this.select((state) => state['creationDateRange.to']).pipe(delay(0));
  readonly closeDateRangeFrom$ = this.select((state) => state['closeDateRange.from']).pipe(delay(0));
  readonly closeDateRangeTo$ = this.select((state) => state['closeDateRange.to']).pipe(delay(0));

  readonly serviceCenters$ = this.select((state) => state.serviceCenterIdList).pipe(nonNullable<ServiceCenter[]>());
  readonly shops$ = this.select((state) => state.shopIdList).pipe(nonNullable<Shop[]>());
  readonly serviceCompanies$ = this.select((state) => state.serviceCompanyIdList).pipe(nonNullable<NumberItem[]>());
  readonly cities$ = this.select((state) => state.cityIdList).pipe(nonNullable<NumberItem[]>());
  readonly salesChannels$ = this.select((state) => state.salesChannelList).pipe(nonNullable<NumberItem[]>());
  readonly brands$ = this.select((state) => state.brandList).pipe(nonNullable<NumberItem[]>());
  readonly blameServiceCenters$ = this.select((state) => state.blameServiceCenterTypeList).pipe(
    nonNullable<NumberItem[]>()
  );
  readonly incidentRequestStatuses$ = this.select((state) => state.incidentRequestStatusTypeList).pipe(
    nonNullable<NumberItem[]>()
  );
  readonly chips$ = this.select((state) => state.chips).pipe(nonNullable<Set<Chip>>());

  readonly highlightExpirationYellow$ = this.select((state) => state.highlightExpirationYellow);
  readonly highlightExpirationRed$ = this.select((state) => state.highlightExpirationRed);

  /** updaters */
  readonly loadPermissions = this.updater((state, permissions: string[] | null) => ({ ...state, permissions }));
  readonly loadNumInCRM = this.updater((state, numInCRM: NumInCRM) => ({ ...state, numInCRM }));
  readonly loadCreateResult = this.updater((state, createResult: ErrorMessage) => ({ ...state, createResult }));
  readonly loadListIncidents = this.updater((state, listIncidents: QueryResult<Incident>) => ({
    ...state,
    listIncidents,
  }));

  readonly loadCreateReasonProp = this.updater((state, createReasonProp: NumberItem[]) => ({
    ...state,
    createReasonProp,
  }));

  readonly loadDictionary = this.updater((state, param: { name: dictionaryName; data: NumberItem[] }) => ({
    ...state,
    [`${param.name}List`]: param.data,
  }));
  readonly loadOne = this.updater(
    (state, param: { name: dictionaryName; data: NumberItem | NumberItem[] | string | true | null }) => ({
      ...state,
      [param.name]: param.data,
    })
  );

  readonly addChip = this.updater((state, chip: Chip) => {
    state.chips.set(chip.key, chip);
    const chips = new Map([...state.chips.entries()]);
    return { ...state, chips };
  });

  readonly removeChip = this.updater((state, key: dictionaryName) => {
    state.chips.delete(key);
    this.loadOne({ name: key, data: null });
    const chips = new Map([...state.chips.entries()]);
    return { ...state, chips };
  });

  readonly clearChips = this.updater((state) => {
    Array.from(state.chips.values()).forEach((e) => {
      this.loadOne({ name: e.key, data: null });
    });
    const chips = new Map();
    return { ...state, chips };
  });

  /** effects */

  readonly fetchPermissions = this.effect((a$) =>
    a$.pipe(

      switchMap(() =>
        this.api.getPermissions().pipe(
          tapResponse(
            (result) => this.loadPermissions(result),
            (error) => this.showError('Ошибка при загрузке разрешений для пользователя.', error)
          )
        )
      )
    )
  );

  readonly createRequest = this.effect((params$: Observable<IncidentRequestCreateModel>) =>
    params$.pipe(
      switchMap((params) =>
        this.api.createRequest(params).pipe(
          tapResponse(
            () => this.loadCreateResult({ errCode: '00', errMessage: '' }),
            (error: any) =>
              this.loadCreateResult({
                errCode: '--',
                errMessage:
                  error.messages?.join('; ') || error.errors?.validations?.join('; ') || JSON.stringify(error),
              })
          )
        )
      )
    )
  );

  readonly fetchNumInCRM = this.effect((params$: Observable<{ numberZNU: string; incidentNumber: string }>) =>
    params$.pipe(
      switchMap((params) =>
        this.api.checkNumInCRM(params).pipe(
          tapResponse(
            (result) => this.loadNumInCRM(result),
            (error) => this.showError('Ошибка при проверки Номера CRM', error)
          )
        )
      )
    )
  );

  readonly fetchListIncidents = this.effect((params$: Observable<ParamRequest>) =>
    params$.pipe(
      switchMap((params) =>
        this.api.searchIncident(params).pipe(
          tapResponse(
            (result) => this.loadListIncidents(result),
            (error) => this.showError('Ошибка загрузки списка инцидентов.', error)
          )
        )
      )
    )
  );

  readonly fetchListIncidentsByText = this.effect((text$: Observable<string>) =>
    text$.pipe(
      switchMap((text) =>
        this.api.complicatedSearchIncident(text).pipe(
          tapResponse(
            (result) => this.loadListIncidents(result),
            (error) => this.showError('Ошибка загрузки списка инцидентов.', error)
          )
        )
      )
    )
  );

  readonly downloadToExcel = this.effect((params$: Observable<ParamRequest>) =>
    params$.pipe(switchMap((params) => this.api.downloadToExcel(params)))
  );

  readonly fetchCreateReasonProp = this.effect((a$) =>
    a$.pipe(
      switchMap(() =>
        this.api.getCreateReason().pipe(
          tapResponse(
            (result) => this.loadCreateReasonProp(result),
            (error) => this.showError('Ошибка при загрузке справочника "Причина создания".', error)
          )
        )
      )
    )
  );

  /** dictionaries */
  readonly fetchDictionary = this.effect((params$: Observable<{ name: dictionaryName; params: ParamRequest }>) =>
    params$.pipe(
      mergeMap((a) =>
        this.api.getDictionaryByName(a.name, a.params).pipe(
          tapResponse(
            ({ data }) => this.loadDictionary({ name: a.name, data }),
            (error) => this.showError(`Ошибка при загрузке Справочника [${DictionaryName[a.name]}]`, error)
          )
        )
      )
    )
  );

  readonly fetchOne = this.effect((a$: Observable<{ name: dictionaryName; id: number }>) =>
    a$.pipe(
      mergeMap((a) =>
        this.api.getItemById(a.name, a.id).pipe(
          tapResponse(
            (data) => this.loadOne({ name: a.name, data }),
            (error) =>
              this.showError(`Ошибка при загрузке Элемента из справочника [${DictionaryName[a.name]}, ${a.id}]`, error)
          )
        )
      )
    )
  );

  showError(text: string, error?: unknown): void {
    console.warn(text, error);
    this.store.dispatch(CommonStateActions.newMessage({ message: { type: 'error', text } }));
  }
}
