import { HistoryMetaData } from './../models/incident-history';
import { Injectable } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { NumberItem, Profile, ZNUInfo } from '@app/models';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  BlameServiceCenterType,
  Incident,
  IncidentHistory,
  IncidentRequestStatusTypeName,
  UpdateIncident,
  UpdateStatusOrComment,
} from '../models';
import { ExpirationHistoryGroups, ScoresUpdateModel } from '../models/expiration.interface';
import { HistoryDetails } from '../models/incident-history';
import { IncidentApiService } from './incident-api.service';

type optionType = {
  [key: string]: string | number;
};

export const getOptionsFromDictionary = (dict: optionType) =>
  Object.keys(dict)
    .filter((k) => typeof dict[k] === 'string')
    .map((k) => ({ id: +k, name: `${dict[k]}` }));

export interface IncidentCardState {
  incidentId: number | null;
  permissions: string[] | null;
  incident: Incident | null;
  createReasonProp: NumberItem[] | null;
  requestStatusOptions: NumberItem[];
  blameServiceCenterOptions: NumberItem[];
  serviceCenters: NumberItem[] | null;
  expirationHistory: ExpirationHistoryGroups[] | null;
  history: IncidentHistory[] | null;
  historyDetails: HistoryDetails | HistoryMetaData[] | null;
}

export const incidentCardState = {
  incidentId: null,
  permissions: null,
  incident: null,
  createReasonProp: null,
  serviceCenters: null,
  requestStatusOptions: getOptionsFromDictionary(IncidentRequestStatusTypeName),
  blameServiceCenterOptions: getOptionsFromDictionary(BlameServiceCenterType),
  expirationHistory: null,
  history: null,
  historyDetails: null,
};

@Injectable()
export class IncidentCardStore extends ComponentStore<IncidentCardState> {
  constructor(private readonly api: IncidentApiService, private readonly store: Store) {
    super(incidentCardState);
  }

  /** selectors */
  readonly profile$ = this.store.select(CommonStateSelectors.selectProfile).pipe(nonNullable<Profile>());
  readonly znuInfo$ = this.store.select(CommonStateSelectors.selectZNUInfo).pipe(nonNullable<ZNUInfo>());
  readonly incidentId$ = this.select((state) => state.incidentId).pipe(nonNullable<number>());
  readonly permissions$ = this.select((state) => state.permissions).pipe(nonNullable<string[]>());
  readonly incident$ = this.select((state) => state.incident).pipe(nonNullable<Incident>());
  readonly createReasonProp$ = this.select((state) => state.createReasonProp).pipe(
    nonNullable<NumberItem[]>(),
    map((result) => result.sort((b, c) => (b.id < c.id ? -1 : b.id > c.id ? 1 : 0)))
  );
  readonly requestStatusOptions$ = this.select((state) => state.requestStatusOptions);
  readonly blameServiceCenterOptions$ = this.select((state) => state.blameServiceCenterOptions);
  readonly serviceCenters$ = this.select((state) => state.serviceCenters).pipe(nonNullable<NumberItem[]>());
  readonly expirationHistory$ = this.select((state) => state.expirationHistory).pipe(
    nonNullable<ExpirationHistoryGroups[]>(),
    map((list) => list.sort((a, b) => a.serviceCenterId - b.serviceCenterId))
  );
  readonly history$ = this.select((state) => state.history);
  readonly historyDetails$ = this.select((state) => state.historyDetails);

  /** updaters */
  readonly loadIncidentId = this.updater((state, incidentId: number) => ({ ...state, incidentId }));
  readonly loadPermissions = this.updater((state, permissions: string[] | null) => ({ ...state, permissions }));
  readonly loadIncident = this.updater((state, incident: Incident | null) => ({ ...state, incident }));
  readonly loadCreateReasonProp = this.updater((state, createReasonProp: NumberItem[]) => ({
    ...state,
    createReasonProp,
  }));

  readonly loadServiceCenters = this.updater((state, serviceCenters: NumberItem[]) => ({ ...state, serviceCenters }));
  readonly loadExpirationHistory = this.updater((state, expirationHistory: ExpirationHistoryGroups[]) => ({
    ...state,
    expirationHistory,
  }));
  readonly loadHistory = this.updater((state, history: IncidentHistory[]) => ({ ...state, history }));
  readonly loadHistoryDetails = this.updater((state, historyDetails: HistoryDetails) => ({...state, historyDetails}));

  /** effects */
  readonly fetchIncidentId = this.effect((id$: Observable<string | null>) =>
    id$.pipe(
      nonNullable<string>(),
      tap(() => {
        this.loadPermissions(null);
        this.loadIncident(null);
      }),
      map((id) => this.loadIncidentId(+id))
    )
  );

  readonly fetchPermissions = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.incidentId$),
      switchMap(([, id]) =>
        this.api.getPermissions(id).pipe(
          tapResponse(
            (result) => this.loadPermissions(result),
            (error) => this.showError('Ошибка при загрузке разрешений для пользователя.', error)
          )
        )
      )
    )
  );

  readonly fetchIncident = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.incidentId$),
      switchMap(([, id]) =>
        this.api.getIncidentRequest(id).pipe(
          tapResponse(
            (result) => this.loadIncident(result),
            (error) => this.showError('Ошибка при загрузке Карточки запроса в СЦ.', error)
          )
        )
      )
    )
  );

  readonly updateIncident = this.effect((p$: Observable<UpdateIncident>) =>
    p$.pipe(
      switchMap((data) =>
        this.api.updateIncidentRequest(data).pipe(
          tapResponse(
            () => {
              this.fetchPermissions();
              this.fetchIncident();
            },
            (error) => this.showError('Ошибка при обновлении Карточки запроса в СЦ.', error)
          )
        )
      )
    )
  );

  readonly updateRequestStatus = this.effect((a$: Observable<UpdateStatusOrComment>) =>
    a$.pipe(
      switchMap((data) =>
        this.api.updateIncidentRequestStatus(data).pipe(
          tapResponse(
            () => {
              this.fetchPermissions();
              this.fetchIncident();
            },
            (error) => this.showError('Ошибка при обновлении Статуса карточки запроса в СЦ.', error)
          )
        )
      )
    )
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

  readonly fetchServiceCenters = this.effect((a$: Observable<string>) =>
    a$.pipe(
      switchMap((name) =>
        this.api.getServiceCenters(name).pipe(
          tapResponse(
            (result) => this.loadServiceCenters(result),
            (error) => this.showError('Ошибка при загрузке справочника "Сервисные центры".', error)
          )
        )
      )
    )
  );

  readonly fetchZNUInfo = this.effect((coupon$: Observable<string>) =>
    coupon$.pipe(tap((couponNumber) => this.store.dispatch(CommonStateActions.loadZNUInfo({ couponNumber }))))
  );

  readonly downloadFile = this.effect((fileId$: Observable<number>) =>
    fileId$.pipe(switchMap((id) => this.api.downloadFile(id)))
  );

  readonly addToServiceCenterFileStores = this.effect((a$: Observable<{ id: number; items: File[] }>) =>
    a$.pipe(
      switchMap((data) =>
        this.api.addToServiceCenterFileStores(data).pipe(
          tapResponse(
            () => this.fetchIncident(),
            (error) => this.showError('Ошибка при добавлении файла к комментарию.', error)
          )
        )
      )
    )
  );

  readonly removeFromServiceCenterFileStores = this.effect((a$: Observable<{ id: number; filesToDelete: number[] }>) =>
    a$.pipe(
      switchMap((data) =>
        this.api.removeFromServiceCenterFileStores(data).pipe(
          tapResponse(
            () => this.fetchIncident(),
            (error) => this.showError('Ошибка при удалении файла комментария.', error)
          )
        )
      )
    )
  );

  readonly fetchExpirationHistory = this.effect((a$: Observable<{ incidentRequestId: number }>) =>
    a$.pipe(
      switchMap((params) =>
        this.api.getExpirationHistory(params).pipe(
          tapResponse(
            (result) => this.loadExpirationHistory(result),
            (error) => this.showError('Ошибка загрузки Истории просрочек', error)
          )
        )
      )
    )
  );

  readonly saveExpirationScores = this.effect((a$: Observable<ScoresUpdateModel>) =>
    a$.pipe(
      concatLatestFrom(() => this.incidentId$),
      switchMap(([params, incidentRequestId]) =>
        this.api.saveExpirationScores(params).pipe(
          tapResponse(
            () => {
              this.fetchExpirationHistory({ incidentRequestId });
            },
            (error) => this.showError('Ошибка при сохранении изменения Просрочки', error)
          )
        )
      )
    )
  );

  readonly fetchHistory4Panel = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.incidentId$),
      switchMap(([, id]) =>
        this.api.getHistory4Panel(id).pipe(
          tapResponse(
            (result) => this.loadHistory(result),
            (error) => this.showError('Ошибка при загрузке истории событий.', error)
          )
        )
      )
    )
  );

  readonly fetchHistory = this.effect((a$: Observable<number>) =>
    a$.pipe(
      switchMap((id) =>
        this.api.getHistory(id).pipe(
          tapResponse(
            (result) => this.loadHistory(result),
            (error) => this.showError('Ошибка при загрузке истории событий.', error)
          )
        )
      )
    )
  );

  readonly fetchHistoryDetails = this.effect((a$: Observable<[number, number]>) =>
    a$.pipe(
      switchMap(([id, sid]) =>
        this.api.getHistoryDetails(id, sid).pipe(
          tapResponse(
            (result) => this.loadHistoryDetails(result),
            (error) => this.showError('Ошибка при загрузке подробностей для истории событий.', error)
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
