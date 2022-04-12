import { Injectable } from '@angular/core';
import { DashboardStoreActions, DashboardStoreSelectors } from '@app/features/dashboard/state';
import { CatalogResponse } from '@app/features/dashboard/state/models/catalog-response.interface';
import { CityInfo } from '@app/features/dashboard/state/models/city-info.interface';
import { MarkResponse } from '@app/features/dashboard/state/models/mark-response.interface';
import { MetricResponse } from '@app/features/dashboard/state/models/metrics-response.interface';
import { ServiceCenterMetric } from '@app/features/dashboard/state/models/service-center-metric.interface';
import { Profile, ServiceCompany } from '@app/models';
import { CommonStateActions, CommonStateSelectors } from '@app/root-store/common';
import { RootState } from '@app/root-store/root-state';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, pluck, tap } from 'rxjs/operators';

export type chartColumns = 'CSI' | 'Инциденты' | 'Возвраты';
export type WeekData = { [key: string]: number };

export const MAP_PARAMS = 'mapParams';

const MIDDLE_CSI = 92;
const MIDDEL_INCIDENT = 1;

export enum Color {
  green = '#25af4e',
  yellow = '#fff200',
  red = '#e82020',
  undefined = '',
}

export interface MarkChart {
  mark: string;
  value: number;
  count: number;
}

@Injectable()
export class RatingService {
  constructor(private store: Store<RootState>) {
    this.store.dispatch(CommonStateActions.loadProfile());
  }

  private city$$ = new Subject<string>();
  city$ = this.city$$.asObservable();

  get City(): string {
    const storage = localStorage.getItem(MAP_PARAMS);
    return storage ? JSON.parse(storage).city : '';
  }

  getProfile(): Observable<Profile> {
    return this.store.select(CommonStateSelectors.selectProfile).pipe(filter((a): a is Profile => a !== null));
  }

  getServiceCompany(): Observable<ServiceCompany> {
    return this.store.select(CommonStateSelectors.selectServiceCompany).pipe(
      filter((a): a is ServiceCompany => a !== null),
      tap(() => {
        const params = {};
        this.store.dispatch(DashboardStoreActions.loadCatalog({ params }));
        this.store.dispatch(DashboardStoreActions.loadMetrics({ params }));
        this.store.dispatch(DashboardStoreActions.loadMarks({ params }));
      })
    );
  }

  getCityCatalog(): Observable<CityInfo[]> {
    return this.store.select(DashboardStoreSelectors.selectCatalog).pipe(
      filter((a): a is CatalogResponse => a !== null),
      pluck<CatalogResponse, CityInfo[]>('cities'),
      map((c) =>
        c.slice().sort((a, b) => {
          if (a.city.name > b.city.name) {
            return 1;
          }
          if (a.city.name < b.city.name) {
            return -1;
          }
          return 0;
        })
      )
    );
  }

  getMarks(): Observable<MarkResponse[]> {
    return this.store.select(DashboardStoreSelectors.selectMarks).pipe(filter((a): a is MarkResponse[] => a !== null));
  }

  getMetrics(): Observable<MetricResponse[]> {
    return this.store
      .select(DashboardStoreSelectors.selectMetrics)
      .pipe(filter((a): a is MetricResponse[] => a !== null));
  }

  setStorageByCity(city: string): void {
    this.city$$.next(city);
    let value = this.getValueStorage();
    value = { ...value, city };
    localStorage.setItem(MAP_PARAMS, JSON.stringify(value));
  }

  setStorageByZoom(param: { center: number[]; zoom: number }): void {
    let value = this.getValueStorage();
    value = { ...value, ...param };
    localStorage.setItem(MAP_PARAMS, JSON.stringify(value));
  }

  getValueStorage(): any {
    const storage = localStorage.getItem(MAP_PARAMS);
    return storage ? JSON.parse(storage) : {};
  }

  setColor(count: number, sc: ServiceCenterMetric): Color {
    if (count === 1) {
      const { monthCsiPerCity: csi, monthIncPerCity: inc } = sc;
      if (csi > MIDDLE_CSI && inc < MIDDEL_INCIDENT) {
        return Color.green;
      }
      if ((csi <= MIDDLE_CSI && inc <= MIDDEL_INCIDENT) || (csi >= MIDDLE_CSI && inc >= MIDDEL_INCIDENT)) {
        return Color.yellow;
      }

      if (csi < MIDDLE_CSI && inc > MIDDEL_INCIDENT) {
        return Color.red;
      }
    } else {
      const rank = sc.overallRank;
      if ((count >= 8 && rank <= 3) || (count >= 6 && rank <= 2) || rank === 1) {
        return Color.green;
      }
      if (
        (count >= 3 && count <= 5 && rank === 2) ||
        (count >= 4 && count <= 7 && rank === 3) ||
        (count >= 6 && count <= 9 && rank === 4) ||
        (count >= 8 && count <= 9 && rank === 5) ||
        (count === 9 && rank === 6)
      ) {
        return Color.yellow;
      }

      if (
        (count === 2 && rank === 2) ||
        (count === 3 && rank === 3) ||
        (rank === 4 && count >= 4 && count <= 5) ||
        (rank === 5 && count >= 5 && count <= 7) ||
        (rank === 6 && count >= 6 && count <= 8) ||
        (rank === 7 && count >= 7 && count <= 9) ||
        (rank === 8 && count <= 8 && count <= 9) ||
        (rank === 9 && count === 9)
      ) {
        return Color.red;
      }

      if (count >= 10) {
        if (rank >= 1 && rank <= 3) {
          return Color.green;
        }
        if (rank > 3 && rank <= count - 3) {
          return Color.yellow;
        }
        if (rank > count - 3) {
          return Color.red;
        }
      }
    }
    return Color.undefined;
  }
}
