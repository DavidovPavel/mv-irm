import { ChipsManageService } from '@app/shared/chips-registry/chips-manage.service';
import { Injectable } from '@angular/core';
import { nonNullable } from '@app/core/func/pure';
import { NumberItem, ParamRequest, PaginatedQuery } from '@app/models';
import { CommonStateActions } from '@app/root-store/common';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { mergeMap, switchMap, tap } from 'rxjs/operators';

import { EquipmentInstallation } from './equipment-installation.interface';
import { EquipmentInstallationService } from './equipment-installation.service';
import { SearchParams } from './models';
import { ActivatedRoute } from '@angular/router';

export interface InstallationFilters {
  serviceStatus: NumberItem | null;
  serviceCenter: NumberItem | null;
  shop: NumberItem | null;
  city: NumberItem | null;
  serviceCompany: NumberItem | null;
  brand: NumberItem | null;
  appealType: NumberItem | null;
  saleDateStart: string | null;
  saleDateEnd: string | null;
  serviceDesiredDateStart: string | null;
  serviceDesiredDateEnd: string | null;
  serviceDateStart: string | null;
  serviceDateEnd: string | null;
  refundCheckDateStart: string | null;
  refundCheckDateEnd: string | null;
}

export interface InstallationRegister extends InstallationFilters {
  list: { response: EquipmentInstallation[]; totalCount: number } | null;
  serviceStatuss: NumberItem[] | null;
  serviceCenters: NumberItem[] | null;
  shops: NumberItem[] | null;
  citys: NumberItem[] | null;
  serviceCompanys: NumberItem[] | null;
  brands: NumberItem[] | null;
  appealTypes: NumberItem[] | null;
  chipCount: number;
}

export type dictionaryName = keyof InstallationFilters;

@Injectable()
export class InstallationRegisterStore extends ComponentStore<InstallationRegister> {
  constructor(
    private api: EquipmentInstallationService,
    private readonly store: Store,
    private readonly chips: ChipsManageService,
    private readonly route: ActivatedRoute
  ) {
    super({
      list: null,
      serviceStatus: null,
      serviceStatuss: null,
      serviceCenters: null,
      serviceCenter: null,
      shops: null,
      shop: null,
      citys: null,
      city: null,
      serviceCompany: null,
      serviceCompanys: null,
      brand: null,
      brands: null,
      appealType: null,
      appealTypes: null,
      saleDateStart: null,
      saleDateEnd: null,
      serviceDesiredDateStart: null,
      serviceDesiredDateEnd: null,
      serviceDateStart: null,
      serviceDateEnd: null,
      refundCheckDateStart: null,
      refundCheckDateEnd: null,
      chipCount: 0,
    });
  }

  /** selectors */
  readonly list$ = this.select((state) => state.list);
  readonly status$ = this.select((state) => state.serviceStatus);
  readonly statusList$ = this.select((state) => state.serviceStatuss).pipe(nonNullable<NumberItem[]>());
  readonly serviceCenters$ = this.select((state) => state.serviceCenters).pipe(nonNullable<NumberItem[]>());
  readonly serviceCenter$ = this.select((state) => state.serviceCenter);
  readonly cities$ = this.select((state) => state.citys).pipe(nonNullable<NumberItem[]>());
  readonly city$ = this.select((state) => state.city);
  readonly appealTypes$ = this.select((state) => state.appealTypes).pipe(nonNullable<NumberItem[]>());
  readonly appealType$ = this.select((state) => state.appealType);
  readonly brands$ = this.select((state) => state.brands).pipe(nonNullable<NumberItem[]>());
  readonly brand$ = this.select((state) => state.brand);
  readonly serviceCompanies$ = this.select((state) => state.serviceCompanys).pipe(nonNullable<NumberItem[]>());
  readonly serviceCompany$ = this.select((state) => state.serviceCompany);
  readonly shops$ = this.select((state) => state.shops).pipe(nonNullable<NumberItem[]>());
  readonly shop$ = this.select((state) => state.shop);
  readonly saleDateStart$ = this.select((state) => state.saleDateStart);
  readonly saleDateEnd$ = this.select((state) => state.saleDateEnd);
  readonly serviceDesiredDateStart$ = this.select((state) => state.serviceDesiredDateStart);
  readonly serviceDesiredDateEnd$ = this.select((state) => state.serviceDesiredDateEnd);
  readonly serviceDateStart$ = this.select((state) => state.serviceDateStart);
  readonly serviceDateEnd$ = this.select((state) => state.serviceDateEnd);
  readonly refundCheckDateStart$ = this.select((state) => state.refundCheckDateStart);
  readonly refundCheckDateEnd$ = this.select((state) => state.refundCheckDateEnd);
  readonly chipCount$ = this.select((state) => state.chipCount);

  /** updaters */
  readonly loadList = this.updater((state, list: { response: EquipmentInstallation[]; totalCount: number }) => ({
    ...state,
    list,
  }));

  readonly loadDictionary = this.updater((state, param: { name: dictionaryName; data: NumberItem[] }) => ({
    ...state,
    [`${param.name}s`]: param.data,
  }));

  readonly loadOne = this.updater(
    (state, param: { name: dictionaryName; data: NumberItem | NumberItem[] | string | true | null }) => {
      this.patchState({ chipCount: this.chips.items.size });
      return {
        ...state,
        [param.name]: param.data,
      };
    }
  );

  /** effects */
  readonly search = this.effect((a$: Observable<SearchParams>) =>
    a$.pipe(
      switchMap((params) =>
        this.api.search({ ...params, ...this.chips.toParams() }).pipe(
          tapResponse(
            (result) => this.loadList(result),
            (error) => this.showError('Ошибка загрузки списка заявок.', error)
          )
        )
      )
    )
  );

  readonly downloadToExcel = this.effect((params$: Observable<SearchParams>) =>
    params$.pipe(switchMap((params) => this.api.downloadToExcel({ ...params, ...this.chips.toParams() })))
  );

  readonly findAppealsByText = this.effect((a$: Observable<string>) =>
    a$.pipe(
      switchMap((filter) =>
        this.api.search({ filter }).pipe(
          tapResponse(
            (result) => this.loadList(result),
            (error) => this.showError('Ошибка загрузки результатов поиска.', error)
          )
        )
      )
    )
  );

  /** dictionaries */
  readonly fetchDictionary = this.effect((params$: Observable<{ name: dictionaryName; params?: ParamRequest }>) =>
    params$.pipe(
      mergeMap(({ name, params }) =>
        this.api.getDictionaryByName(name, params).pipe(
          tapResponse(
            (data) => this.loadDictionary({ name, data }),
            (error) => this.showError(`Ошибка при загрузке Справочника [ ${name.toUpperCase()} ]`, error)
          )
        )
      )
    )
  );

  readonly fetchOne = this.effect((a$: Observable<{ name: dictionaryName; id: number }>) =>
    a$.pipe(
      mergeMap(({ name, id }) =>
        this.api.getItemById(name, id).pipe(
          tapResponse(
            (data) => this.loadOne({ name, data }),
            (error) =>
              this.showError(`Ошибка при загрузке Элемента из справочника [ ${name.toUpperCase()}, ${id} ]`, error)
          )
        )
      )
    )
  );

  initChips(pq: PaginatedQuery): void {
    const pm = this.route.snapshot.paramMap;
    pm.keys
      .filter((a) => a !== 'pageIndex' && a !== 'pageSize')
      .filter((a): a is dictionaryName => !!a)
      .forEach((name) => {
        const data = pm.get(name);
        if (data !== null) {
          isNaN(+data) ? this.loadOne({ name, data }) : this.fetchOne({ name, id: +data });
        }
      });

    if (!pm.keys.length) {
      this.fetchOne({ name: 'serviceStatus', id: 0 });
    }

    const params = pm.keys.length ? this.route.snapshot.params : { serviceStatus: 0 };
    this.search({ ...pq, ...params });
  }

  showError(text: string, error?: unknown): void {
    console.warn(text, error);
    this.store.dispatch(CommonStateActions.newMessage({ message: { type: 'error', text } }));
  }
}
