import { Injectable } from '@angular/core';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as _moment from 'moment';
import { EMPTY, Observable } from 'rxjs';
import { exhaustMap, filter, map, switchMap } from 'rxjs/operators';

import {
  DateRequestParams,
  Limit,
  QuotaGroup,
  QuotaModel,
  RequestParams,
  ServiceCenter,
  UpdateResult,
} from '../models';
import { QuotasManagerApiService } from './quotas-api.service';

const moment = _moment;

export interface QuotasManagementState {
  params: RequestParams | null;
  date: DateRequestParams;
  serviceCenters: ServiceCenter[] | null;
  groups: QuotaGroup[] | null;
  limits: Limit[] | null;
}

const init = () => {
  const start = moment(Date.now()).toISOString();
  return {
    params: null,
    date: { start, end: start },
    serviceCenters: null,
    groups: null,
    limits: null,
  };
};
@Injectable()
export class QuotasManagementStore extends ComponentStore<QuotasManagementState> {
  constructor(private readonly api: QuotasManagerApiService, private readonly store: Store) {
    super(init());
  }

  /* selectors */
  readonly sapId$ = this.store
    .select(CommonStateSelectors.selectServiceCompanySapId)
    .pipe(filter((a): a is string => !!a));

  readonly settings$ = this.select((state) => state.params).pipe(filter((s): s is RequestParams => s !== null));
  readonly moment$ = this.select((state) => state.date).pipe(filter((m): m is DateRequestParams => m !== null));
  readonly serviceCenters$ = this.select((state) => state.serviceCenters);
  readonly groups$ = this.select((state) => state.groups);
  readonly limits$ = this.select((state) => state.limits);

  /* updaters */
  readonly loadMoment = this.updater((state, date: DateRequestParams) => ({ ...state, date }));
  readonly loadSettings = this.updater((state, params: RequestParams | null) => ({ ...state, params }));
  readonly loadServiceCenters = this.updater((state, serviceCenters: ServiceCenter[]) => ({
    ...state,
    serviceCenters,
  }));
  readonly loadQuotas = this.updater((state, groups: QuotaGroup[]) => ({ ...state, groups }));
  readonly loadLimits = this.updater((state, limits: Limit[]) => ({ ...state, limits }));

  /* effects */
  readonly fetchMoment = this.effect((moment$: Observable<DateRequestParams>) =>
    moment$.pipe(map((date) => this.loadMoment(date)))
  );

  readonly fetchSettings = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.sapId$),
      switchMap(([, sapId]) => this.api.getSettings$(sapId).pipe(map((params) => this.loadSettings(params))))
    )
  );

  readonly setSettings = this.effect((params$: Observable<RequestParams>) =>
    params$.pipe(
      concatLatestFrom(() => this.sapId$),
      switchMap(([params, sapId]) =>
        this.api.updateSettings(sapId, params).pipe(map((result) => this.loadSettings(result)))
      )
    )
  );

  readonly fetchServiceCenters = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.sapId$),
      switchMap(([, sapId]) => this.api.getServiceCenters(sapId).pipe(map((result) => this.loadServiceCenters(result))))
    )
  );

  readonly fetchQuotas = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => [this.settings$, this.moment$]),
      exhaustMap(([, params, date]) => this.api.loadQuotas(params, date).pipe(map((result) => this.loadQuotas(result))))
    )
  );

  readonly fetchLimits = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => [this.settings$, this.moment$]),
      exhaustMap(([, params, date]) => this.api.loadLimits(params, date).pipe(map((result) => this.loadLimits(result))))
    )
  );

  readonly updateQuotas = this.effect((quotas$: Observable<QuotaModel[]>) =>
    quotas$.pipe(
      concatLatestFrom(() => this.settings$),
      switchMap(([quotas, settings]) =>
        this.api.updateQuotas(quotas, settings).pipe(
          tapResponse(
            (result) => this.showResult(result),
            (error) => EMPTY
          )
        )
      )
    )
  );

  readonly exportToExcel = this.effect((a$: Observable<{start: string; end: string}>) =>
    a$.pipe(
      concatLatestFrom(() => [this.sapId$, this.settings$]),
      switchMap(([range, sapId, params]) => this.api.downloadToExcel(params, range, sapId))
    )
  );

  getSettings(sapId: string): RequestParams | null {
    return this.api.getSettings(sapId);
  }

  showResult(result: UpdateResult[]): void {
    const msg = result
      .filter((a) => a.msg)
      .map((a) => `${moment(a.date).format('DD.MM.yyyy')} - ${a.msg}`)
      .join('; ');

    this.store.dispatch(
      CommonStateActions.newMessage({
        message: {
          type: msg ? 'error' : 'notify',
          text: msg || 'Квоты успешно установлены.',
        },
      })
    );

    if (!msg) {
      this.fetchQuotas();
      this.fetchLimits();
    }
  }
}
