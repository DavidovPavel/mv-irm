import { createReducer, on } from '@ngrx/store';

import * as DashboardActions from './dashboard.actions';
import { CatalogResponse } from './models/catalog-response.interface';
import { IncidentsStatus } from './models/incidents-status.interface';
import { MarkResponse } from './models/mark-response.interface';
import { MetricResponse } from './models/metrics-response.interface';
import { ServiceCenter } from './models/service-center.interface';
import { StatsModel } from './models/stats-model.interface';

export const storeKey = 'dashboard';

export interface State {
  metrics: MetricResponse[] | null;
  marks: MarkResponse[] | null;
  catalog: CatalogResponse | null;
  incidentsStatus: IncidentsStatus | null;
  installationStats: StatsModel | null;
  assistantStats: StatsModel | null;
  masterAppealsClosedState: string | null;
}

export const initialState: State = {
  metrics: null,
  marks: null,
  catalog: null,
  incidentsStatus: null,
  installationStats: null,
  assistantStats: null,
  masterAppealsClosedState: null,
};

export const reducer = createReducer(
  initialState,

  on(DashboardActions.loadIncidentsStatusSuccess, (state, { incidentsStatus }) => ({ ...state, incidentsStatus })),

  on(DashboardActions.loadInstallationStatusSuccess, (state, { installationStats }) => ({
    ...state,
    installationStats,
  })),

  on(DashboardActions.loadAssistantStatusSuccess, (state, { assistantStats }) => ({ ...state, assistantStats })),

  on(DashboardActions.loadMetrics, (state) => state),
  on(DashboardActions.loadMetricsSuccess, (state, { metrics }) => ({ ...state, metrics })),
  on(DashboardActions.loadMetricsFailure, (state, { error }) => ({ ...state })),

  on(DashboardActions.loadMarks, (state) => state),
  on(DashboardActions.loadMarksSuccess, (state, { marks }) => ({ ...state, marks })),
  on(DashboardActions.loadMarksFailure, (state, { error }) => ({ ...state })),

  on(DashboardActions.loadCatalog, (state) => state),
  on(DashboardActions.loadCatalogSuccess, (state, { catalog }) => ({ ...state, catalog })),
  on(DashboardActions.loadCatalogFailure, (state, { error }) => ({ ...state })),

  on(DashboardActions.loadMasterAppealsClosedState, (state) => ({ ...state, isLoading: true })),
  on(DashboardActions.loadMasterAppealsClosedStateSuccess, (state, { masterAppealsClosedState }) => ({
    ...state,
    masterAppealsClosedState,
  })),
);
