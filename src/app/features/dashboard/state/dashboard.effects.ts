import { Injectable } from '@angular/core';
import { CommonStateSelectors } from '@app/root-store/common';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  loadAssistantStatus,
  loadAssistantStatusSuccess,
  loadCatalog,
  loadCatalogFailure,
  loadCatalogSuccess,
  loadIncidentsStatus,
  loadIncidentsStatusSuccess,
  loadInstallationStatus,
  loadInstallationStatusSuccess,
  loadMarks,
  loadMarksFailure,
  loadMarksSuccess,
  loadMasterAppealsClosedState,
  loadMasterAppealsClosedStateSuccess,
  loadMetrics,
  loadMetricsFailure,
  loadMetricsSuccess,
} from './dashboard.actions';
import { DashboardService } from './dashboard.service';

@Injectable()
export class DashboardEffects {
  loadIncidentsStatus = createEffect(() =>
    this.actions$.pipe(
      ofType(loadIncidentsStatus),
      switchMap(() =>
        this.service
          .getIncidentsStatus()
          .pipe(map((incidentsStatus) => loadIncidentsStatusSuccess({ incidentsStatus })))
      )
    )
  );

  loadInstallationStat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadInstallationStatus),
      switchMap(() =>
        this.service
          .getInstallationStats()
          .pipe(map((installationStats) => loadInstallationStatusSuccess({ installationStats })))
      )
    );
  });

  loadAssistantStat$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadAssistantStatus),
      switchMap(() =>
        this.service.getAssistantStats().pipe(map((assistantStats) => loadAssistantStatusSuccess({ assistantStats })))
      )
    );
  });

  loadCatalog$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCatalog),
      concatLatestFrom(() => this.store.select(CommonStateSelectors.selectServiceCompanySapId)),
      switchMap(([p, sapId]) =>
        this.service.getCatalog({ ...p.params, sapId }).pipe(
          map((catalog) => loadCatalogSuccess({ catalog })),
          catchError((error) => of(loadCatalogFailure({ error })))
        )
      )
    )
  );

  loadMetrics$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMetrics),
      concatLatestFrom(() => this.store.select(CommonStateSelectors.selectServiceCompanySapId)),
      switchMap(([p, sapId]) =>
        this.service.getMetrics({ ...p.params, sapId }).pipe(
          map((metrics) => loadMetricsSuccess({ metrics })),
          catchError((error) => of(loadMetricsFailure({ error })))
        )
      )
    )
  );

  loadMarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMarks),
      concatLatestFrom(() => this.store.select(CommonStateSelectors.selectServiceCompanySapId)),
      switchMap(([p, sapId]) =>
        this.service.getMarks({ ...p.params, sapId }).pipe(
          map((marks) => loadMarksSuccess({ marks })),
          catchError((error) => of(loadMarksFailure({ error })))
        )
      )
    )
  );

  loadMasterAppealsClosedState$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadMasterAppealsClosedState),
      switchMap(() =>
        this.service
          .getMasterAppealsClosedState()
          .pipe(map((masterAppealsClosedState) => loadMasterAppealsClosedStateSuccess({ masterAppealsClosedState })))
      )
    );
  });

  constructor(private actions$: Actions, private service: DashboardService, private store: Store) {}
}
