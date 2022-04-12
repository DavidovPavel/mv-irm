import { Interval } from './../../quota-management/models/interval.interface';
import { Injectable } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { LocalStorageService } from '@app/core/services/local-storage.service';
import { NumberItem } from '@app/models';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { exhaustMap, filter, map, switchMap, tap } from 'rxjs/operators';

import { InstallationQueueApiService } from './installation-queue-api.service';
import {
  LimitParams,
  LimitsByDayParams,
  QuotaGroupInfo,
  RegionLimits,
  RegionLimitsData,
  ReportSettings,
  ServiceCenter,
  ServiceCenterQuotaGroup,
} from './models';

export const USER_QUOTAS = 'quota_groups';
export const QUEUE_SERVICECENTER_ID = 'queue_sc_id';
export const QUEUE_GROUP_ID = 'queue_group_id';

export interface InstallationQueueState {
  quotaGroups: NumberItem[] | null;
  quotaGroupsInfo: QuotaGroupInfo[] | null;
  userQuotaGroups: NumberItem[] | null;
  serviceCenters: ServiceCenter[] | null;
  serviceCenter: ServiceCenter | null;
  serviceCenterQuotaGroups: ServiceCenterQuotaGroup[] | null;
  settings: ReportSettings | null;
  initQuotas: boolean | null;
  headQuotas: boolean | null;
  regionLimits: RegionLimitsData | null;
  isLoading: boolean;
  regionLimitsByDay: RegionLimits[] | null;
  hasQuotas: { hasQuotas: boolean } | null;
}

@Injectable()
export class InstallationQueueStore extends ComponentStore<InstallationQueueState> {
  constructor(
    private readonly api: InstallationQueueApiService,
    private readonly store: Store,
    private storage: LocalStorageService
  ) {
    super({
      quotaGroups: null,
      quotaGroupsInfo: null,
      userQuotaGroups: null,
      serviceCenters: null,
      serviceCenter: null,
      serviceCenterQuotaGroups: null,
      settings: null,
      initQuotas: null,
      headQuotas: null,
      regionLimits: null,
      isLoading: false,
      regionLimitsByDay: null,
      hasQuotas: null,
    });
  }

  /* selectors */
  readonly loading$ = this.select((state) => state.isLoading);
  readonly sapId$ = this.store
    .select(CommonStateSelectors.selectServiceCompanySapId)
    .pipe(filter((a): a is string => !!a));

  readonly headQuotas$ = this.select((state) => state.headQuotas);
  readonly initQuotas$ = this.select((state) => state.initQuotas);
  readonly quotaGroups$ = this.select((state) => state.quotaGroups).pipe(nonNullable<NumberItem[]>());
  readonly quotaGroupsInfo$ = this.select((state) => state.quotaGroupsInfo).pipe(nonNullable<QuotaGroupInfo[]>());
  readonly userQuotaGroups$ = this.select((state) => state.userQuotaGroups).pipe(
    nonNullable<NumberItem[]>(),
    map((a) => a.sort((c, b) => c.id - b.id))
  );
  readonly serviceCenters$ = this.select((state) => state.serviceCenters).pipe(nonNullable<ServiceCenter[]>());
  readonly serviceCenter$ = this.select((state) => state.serviceCenter);
  readonly serviceCenterQuotaGroups$ = this.select((state) => state.serviceCenterQuotaGroups);
  readonly settings$ = this.select((state) => state.settings).pipe(
    nonNullable<ReportSettings>(),
    map((x) => {
      const now = new Date();
      return Array(x.numberOfDaysWithDateTo)
        .fill(0)
        .map((_, i) =>
          new Date(now.getFullYear(), now.getMonth(), now.getDate() + i + x.numberOfDaysWithDateFrom).toISOString()
        );
    })
  );
  readonly regionLimits$ = this.select((state) => state.regionLimits);
  readonly regionLimitsByDay$ = this.select((state) => state.regionLimitsByDay);
  readonly hasQuotas$ = this.select((state) => state.hasQuotas).pipe(nonNullable<{ hasQuotas: boolean }>());

  /* updaters */
  readonly isLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  readonly loadHeadQuotas = this.updater((state, headQuotas: boolean) => ({ ...state, headQuotas }));
  readonly loadInitQuotas = this.updater((state, initQuotas: boolean) => ({ ...state, initQuotas }));
  readonly loadQuotaGroups = this.updater((state, quotaGroups: NumberItem[]) => ({ ...state, quotaGroups }));
  readonly loadUserGroups = this.updater((state, userQuotaGroups: NumberItem[]) => ({ ...state, userQuotaGroups }));
  readonly loadServiceCenters = this.updater((state, serviceCenters: ServiceCenter[]) => ({
    ...state,
    serviceCenters,
  }));
  readonly loadServiceCenter = this.updater((state, serviceCenter: ServiceCenter | null) => ({
    ...state,
    serviceCenter,
  }));
  readonly loadServiceCenterQuotaGroups = this.updater(
    (state, serviceCenterQuotaGroups: ServiceCenterQuotaGroup[]) => ({ ...state, serviceCenterQuotaGroups })
  );
  readonly loadSettings = this.updater((state, settings: ReportSettings) => ({ ...state, settings }));
  readonly loadQuotaGroupsInfo = this.updater((state) => {
    const { serviceCenters, quotaGroups } = state;

    const id = this.storage.getItem(QUEUE_SERVICECENTER_ID);
    if (id) {
      this.fetchServiceCenterQuotaGroups(+id);
    }

    if (serviceCenters && quotaGroups && !id) {
      const quotaGroupsInfo = this.getGroupsInfo(serviceCenters, quotaGroups);
      return {
        ...state,
        quotaGroupsInfo,
      };
    } else {
      return state;
    }
  });

  readonly loadRegionLimits = this.updater((state, regionLimits: RegionLimitsData) => ({ ...state, regionLimits }));
  readonly loadRegionLimitsByDay = this.updater((state, regionLimitsByDay: RegionLimits[]) => ({
    ...state,
    regionLimitsByDay,
  }));
  readonly loadHasQuotas = this.updater((state, hasQuotas: { hasQuotas: boolean }) => ({ ...state, hasQuotas }));

  /* effects */
  readonly fetchUserQuotaGroups = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.quotaGroups$),
      map(([, a]) => this.loadUserGroups(this.getUserQuotaGroups(a)))
    )
  );

  readonly fetchServiceCenters = this.effect((a$) =>
    a$.pipe(
      tap(() => this.isLoading(true)),
      concatLatestFrom(() => this.sapId$),
      switchMap(([, sapId]) =>
        this.api.getServiceCentersBySapId(sapId).pipe(
          tapResponse(
            ({ serviceCenters, quotaGroups }) => {
              this.loadServiceCenters(serviceCenters);
              this.loadQuotaGroups(quotaGroups);
              this.loadQuotaGroupsInfo();
              this.isLoading(false);
            },
            (error) => this.showError('Ошибка загрузки списка Сервисных центров', error)
          )
        )
      )
    )
  );

  readonly fetchServiceCenter = this.effect((id$: Observable<number>) =>
    id$.pipe(
      concatLatestFrom(() => this.serviceCenters$.pipe(nonNullable<ServiceCenter[]>())),
      map(([id, list]) => list.find((a) => a.id === id) ?? null),
      tapResponse(
        (result) => this.loadServiceCenter(result),
        (error) => this.showError('Ошибка загрузки Сервисного цетра', error)
      )
    )
  );

  readonly fetchServiceCenterQuotaGroups = this.effect((id$: Observable<number>) =>
    id$.pipe(
      tap(() => this.isLoading(true)),
      concatLatestFrom(() => this.sapId$),
      exhaustMap(([id, sapId]) =>
        this.api.getServiceCenterQuotaGroupsBySapId(sapId, id).pipe(
          tapResponse(
            (result) => {
              this.loadServiceCenterQuotaGroups(result);
              this.isLoading(false);
            },
            (error) => this.showError('Ошибка загрузки Групп Квотирования для Сервисного Центра', error)
          )
        )
      )
    )
  );

  readonly fetchSettingsReport = this.effect((a$) =>
    a$.pipe(
      switchMap(() =>
        this.api.getSettings().pipe(
          tapResponse(
            (result) => this.loadSettings(result),
            (error) => this.showError('Ошибка получения настроек отчета.', error)
          )
        )
      )
    )
  );

  readonly fetchCheckInitQuotas = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.sapId$),
      exhaustMap(([, sapId]) =>
        this.api.checkInitQuotas(sapId).pipe(
          tapResponse(
            () => this.loadInitQuotas(true),
            (error) => this.showError('Ошибка проверки инициализации квот.', error)
          )
        )
      )
    )
  );

  readonly fetchHeadQuotas = this.effect((a$) =>
    a$.pipe(
      concatLatestFrom(() => this.sapId$),
      exhaustMap(([, sapId]) =>
        this.api.headQuotas(sapId).pipe(
          tapResponse(
            () => this.loadHeadQuotas(true),
            () => this.loadHeadQuotas(true)
          )
        )
      )
    )
  );

  readonly fetchServiceCenterRegionLimits = this.effect((p$: Observable<LimitParams>) =>
    p$.pipe(
      concatLatestFrom(() => this.sapId$),
      concatLatestFrom(() => this.serviceCenterQuotaGroups$),
      switchMap(([[params, sapId], quotaGroups]) => {
        if (quotaGroups) {
          return this.api.getServiceCenterQuotaGroupsRegionBySapId(sapId, params).pipe(
            tapResponse(
              (result) => {
                this.loadRegionLimits(result);
                const group = quotaGroups.find((a) => a.quotaGroupId === params.quotaGroupId);
                const region = group?.regions.find((a) => a.id === params.regionId);
                if (region && region.intervals === undefined) {
                  quotaGroups.forEach((a) => {
                    if (a.quotaGroupId === result.quotaGroupId) {
                      a.regions.forEach((b) => {
                        if (b.id === result.regionId) {
                          b.intervals = result.intervals;
                          b.intervalLimits = result.regionLimits;
                        }
                      });
                    }
                  });
                  this.loadServiceCenterQuotaGroups([...quotaGroups]);
                }
              },
              (error) => this.showError('Ошибка загрузки Лимитов для Групп Квотирования Сервисного Центра', error)
            )
          );
        } else {
          return of();
        }
      })
    )
  );

  readonly fetchRegionLimitsByDay = this.effect((a$: Observable<LimitsByDayParams>) =>
    a$.pipe(
      concatLatestFrom(() => this.sapId$),
      concatLatestFrom(() => this.regionLimits$),
      switchMap(([[params, sapId], regionLimits]) => {
        if (regionLimits === null || this.notEqual(params, regionLimits)) {
          return this.api.getServiceCenterQuotaGroupsRegionBySapId(sapId, params).pipe(
            map((result) => {
              this.loadRegionLimits(result);
              const limits = result.regionLimits.filter((a) => moment(a.date).isSame(params.day));
              return of(limits);
            })
          );
        } else {
          const limits = regionLimits.regionLimits.filter((a) => moment(a.date).isSame(params.day));
          return of(limits);
        }
      }),
      tapResponse(
        (result) => this.loadRegionLimitsByDay(result),
        (error) => this.showError('Ошибка загрузки Лимитов по дню.', error)
      )
    )
  );

  readonly fetchHasQuotas = this.effect((a$) =>
    a$.pipe(
      switchMap(() =>
        this.api.getHasQuotas().pipe(
          tapResponse(
            (result) => this.loadHasQuotas(result),
            (error) => this.showError('Ошибка проверки квот для Сервисной компании', error)
          )
        )
      )
    )
  );

  notEqual(a: LimitParams, b: LimitParams): boolean {
    return !(a.quotaGroupId === b.quotaGroupId && a.serviceCenterId === b.serviceCenterId && a.regionId === b.regionId);
  }

  showError(text: string, error?: unknown): void {
    console.warn(text, error);
    this.store.dispatch(CommonStateActions.newMessage({ message: { type: 'error', text } }));
  }

  getUserQuotaGroups(groups: NumberItem[]): NumberItem[] {
    const data = this.storage.storage.getItem(USER_QUOTAS);
    if (data) {
      const ids = JSON.parse(data) as number[];
      return groups.filter((a) => ids.includes(a.id));
    } else {
      return [];
    }
  }

  updateUserQuotaGroups(groups: number[]): void {
    this.storage.setItem(USER_QUOTAS, JSON.stringify(groups));
  }

  getGroupsInfo(serviceCenters: ServiceCenter[], quotaGroups: NumberItem[]): QuotaGroupInfo[] {
    return quotaGroups.map((b) => {
      const totalWithoutQuotas = this.totalWithoutQuotas(b.id, serviceCenters);
      return { ...b, totalWithoutQuotas };
    });
  }

  totalWithoutQuotas(id: number, serviceCenters: ServiceCenter[]): number {
    return serviceCenters.filter((a) => a.groups.find((b) => b.quotaGroupId === id && b.hasQuotas === false)).length;
  }

  getGroupsInfoByGroups(groups: ServiceCenterQuotaGroup[]): QuotaGroupInfo[] {
    return groups.map((a) => ({ id: a.quotaGroupId, name: a.quotaGroupName, regions: a.regions }));
  }
}
